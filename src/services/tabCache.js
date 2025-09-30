/**
 * Tab Cache Service
 * Caches tab data in localStorage with 30 minute expiry
 */

const CACHE_PREFIX = 'kp_tab_';
const CACHE_DURATION = 20 * 60 * 1000; // 30 minutes

class TabCache {
  getCacheKey(tabName) {
    return `${CACHE_PREFIX}${tabName}`;
  }

  isValid(timestamp) {
    return Date.now() - timestamp < CACHE_DURATION;
  }

  get(tabName) {
    try {
      const cached = localStorage.getItem(this.getCacheKey(tabName));
      if (cached) {
        const data = JSON.parse(cached);
        if (this.isValid(data.timestamp)) {
          return {
            subfolders: data.subfolders,
            imagesBySubfolder: data.imagesBySubfolder,
            fromCache: true
          };
        }
      }
    } catch (error) {
      console.warn('Tab cache read error:', error);
    }
    return null;
  }

  set(tabName, subfolders, imagesBySubfolder) {
    try {
      const data = {
        subfolders,
        imagesBySubfolder,
        timestamp: Date.now()
      };
      localStorage.setItem(this.getCacheKey(tabName), JSON.stringify(data));
    } catch (error) {
      console.warn('Tab cache write error:', error);
    }
  }

  clear(tabName) {
    localStorage.removeItem(this.getCacheKey(tabName));
  }

  clearAll() {
    Object.keys(localStorage).forEach(key => {
      if (key.startsWith(CACHE_PREFIX)) {
        localStorage.removeItem(key);
      }
    });
  }
}

export default new TabCache();