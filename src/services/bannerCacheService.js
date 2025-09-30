/**
 * Banner Image Cache Service
 * 
 * Provides intelligent caching for banner images using:
 * - localStorage for metadata and small datasets
 * - IndexedDB for larger image datasets
 * - Cache-first strategy with background refresh
 */

const CACHE_PREFIX = 'kp_banner_';
const CACHE_VERSION = '1.0';
const CACHE_DURATION = 20 * 60 * 1000; // 20 minutes in milliseconds
const MAX_LOCALSTORAGE_SIZE = 100; // Max images for localStorage (small datasets)

class BannerCacheService {
  constructor() {
    this.dbName = 'KrivaPicturesBannerCache';
    this.dbVersion = 1;
    this.storeName = 'bannerImages';
    this.db = null;
  }

  /**
   * Initialize IndexedDB
   */
  async initDB() {
    if (this.db) return this.db;

    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.dbName, this.dbVersion);

      request.onerror = () => reject(request.error);
      request.onsuccess = () => {
        this.db = request.result;
        resolve(this.db);
      };

      request.onupgradeneeded = (event) => {
        const db = event.target.result;
        if (!db.objectStoreNames.contains(this.storeName)) {
          const store = db.createObjectStore(this.storeName, { keyPath: 'id' });
          store.createIndex('folderName', 'folderName', { unique: false });
          store.createIndex('timestamp', 'timestamp', { unique: false });
        }
      };
    });
  }

  /**
   * Generate cache key for a folder
   */
  getCacheKey(folderName) {
    return `${CACHE_PREFIX}${folderName}_v${CACHE_VERSION}`;
  }

  /**
   * Check if cached data is still valid
   */
  isCacheValid(timestamp) {
    return Date.now() - timestamp < CACHE_DURATION;
  }

  /**
   * Get cached images for a folder (localStorage first, then IndexedDB)
   */
  async getCachedImages(folderName) {
    const cacheKey = this.getCacheKey(folderName);
    
    try {
      // Try localStorage first (faster access)
      const localData = localStorage.getItem(cacheKey);
      if (localData) {
        const { images, timestamp } = JSON.parse(localData);
        if (this.isCacheValid(timestamp)) {
          return {
            images,
            fromCache: true,
            cacheType: 'localStorage',
            timestamp
          };
        }
      }

      // Fallback to IndexedDB for larger datasets
      await this.initDB();
      const transaction = this.db.transaction([this.storeName], 'readonly');
      const store = transaction.objectStore(this.storeName);
      const request = store.get(folderName);

      return new Promise((resolve) => {
        request.onsuccess = () => {
          const result = request.result;
          if (result && this.isCacheValid(result.timestamp)) {
            resolve({
              images: result.images,
              fromCache: true,
              cacheType: 'IndexedDB',
              timestamp: result.timestamp
            });
          } else {
            resolve({ images: [], fromCache: false });
          }
        };
        request.onerror = () => resolve({ images: [], fromCache: false });
      });
    } catch (error) {
      console.warn('Cache retrieval failed:', error);
      return { images: [], fromCache: false };
    }
  }

  /**
   * Cache images for a folder
   */
  async cacheImages(folderName, images) {
    const timestamp = Date.now();
    const cacheKey = this.getCacheKey(folderName);
    const cacheData = { images, timestamp };

    try {
      // Use localStorage for small datasets
      if (images.length <= MAX_LOCALSTORAGE_SIZE) {
        localStorage.setItem(cacheKey, JSON.stringify(cacheData));
        // Remove from IndexedDB if it exists there
        await this.removeFromIndexedDB(folderName);
      } else {
        // Use IndexedDB for larger datasets
        await this.saveToIndexedDB(folderName, images, timestamp);
        // Remove from localStorage if it exists there
        localStorage.removeItem(cacheKey);
      }
    } catch (error) {
      console.warn('Cache storage failed:', error);
    }
  }

  /**
   * Save to IndexedDB
   */
  async saveToIndexedDB(folderName, images, timestamp) {
    await this.initDB();
    const transaction = this.db.transaction([this.storeName], 'readwrite');
    const store = transaction.objectStore(this.storeName);
    
    const data = {
      id: folderName,
      folderName,
      images,
      timestamp
    };

    return new Promise((resolve, reject) => {
      const request = store.put(data);
      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  }

  /**
   * Remove from IndexedDB
   */
  async removeFromIndexedDB(folderName) {
    try {
      await this.initDB();
      const transaction = this.db.transaction([this.storeName], 'readwrite');
      const store = transaction.objectStore(this.storeName);
      store.delete(folderName);
    } catch (error) {
      // Silently fail - not critical
    }
  }

  /**
   * Clear all cached data
   */
  async clearAllCache() {
    try {
      // Clear localStorage
      const keys = Object.keys(localStorage);
      keys.forEach(key => {
        if (key.startsWith(CACHE_PREFIX)) {
          localStorage.removeItem(key);
        }
      });

      // Clear IndexedDB
      await this.initDB();
      const transaction = this.db.transaction([this.storeName], 'readwrite');
      const store = transaction.objectStore(this.storeName);
      store.clear();
    } catch (error) {
      console.warn('Cache clearing failed:', error);
    }
  }

  /**
   * Get cache info for debugging
   */
  async getCacheInfo() {
    const info = {
      localStorage: {},
      indexedDB: {},
      totalSize: 0
    };

    // Check localStorage
    const keys = Object.keys(localStorage);
    keys.forEach(key => {
      if (key.startsWith(CACHE_PREFIX)) {
        try {
          const data = JSON.parse(localStorage.getItem(key));
          const folderName = key.replace(CACHE_PREFIX, '').replace(`_v${CACHE_VERSION}`, '');
          info.localStorage[folderName] = {
            imageCount: data.images?.length || 0,
            timestamp: data.timestamp,
            isValid: this.isCacheValid(data.timestamp),
            size: new Blob([localStorage.getItem(key)]).size
          };
        } catch (e) {
          // Skip invalid entries
        }
      }
    });

    // Check IndexedDB
    try {
      await this.initDB();
      const transaction = this.db.transaction([this.storeName], 'readonly');
      const store = transaction.objectStore(this.storeName);
      const request = store.getAll();

      await new Promise((resolve) => {
        request.onsuccess = () => {
          request.result.forEach(item => {
            info.indexedDB[item.folderName] = {
              imageCount: item.images?.length || 0,
              timestamp: item.timestamp,
              isValid: this.isCacheValid(item.timestamp)
            };
          });
          resolve();
        };
        request.onerror = resolve;
      });
    } catch (error) {
      // IndexedDB not available or failed
    }

    return info;
  }

  /**
   * Preload images in the background (optional optimization)
   */
  async preloadImages(images) {
    if (!Array.isArray(images)) return;

    // Create image objects to trigger browser caching
    const promises = images.map(url => {
      return new Promise((resolve) => {
        const img = new Image();
        img.onload = resolve;
        img.onerror = resolve; // Don't fail the whole process
        img.src = url;
      });
    });

    // Don't wait for all to complete, just start the process
    Promise.all(promises).catch(() => {
      // Silent fail - preloading is optional
    });
  }
}

// Create singleton instance
const bannerCacheService = new BannerCacheService();

export default bannerCacheService;