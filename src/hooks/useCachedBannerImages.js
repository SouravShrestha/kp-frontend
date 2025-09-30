import { useState, useEffect, useRef } from 'react';
import { MediaAPI } from '../apis';
import bannerCacheService from '../services/bannerCacheService';

/**
 * Custom hook for cached banner images
 * 
 * Strategy:
 * 1. Check cache first → render immediately if found
 * 2. Fetch fresh data in background
 * 3. Update UI only if data changed
 * 4. Cache new data for future use
 * 
 * @param {string} folderName - Cloudinary folder name to fetch images from
 * @returns {object} { images, loading, fromCache, cacheInfo, error, refetch }
 */
export const useCachedBannerImages = (folderName) => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fromCache, setFromCache] = useState(false);
  const [cacheInfo, setCacheInfo] = useState(null);
  const [error, setError] = useState(null);
  const mountedRef = useRef(true);
  const lastFetchRef = useRef(null);

  // Helper to extract image URLs
  const extractImageUrls = (data) => {
    if (!Array.isArray(data)) return [];
    return data.map(item => item.cloudinary_image_url).filter(Boolean);
  };

  // Helper to compare image arrays
  const arraysEqual = (arr1, arr2) => {
    if (arr1.length !== arr2.length) return false;
    return arr1.every((url, index) => url === arr2[index]);
  };

  // Fetch fresh data from API
  const fetchFreshData = async (isBackgroundFetch = false) => {
    try {
      const data = await MediaAPI.fetchImagesByFolderName(folderName);
      const newImages = extractImageUrls(data);
      
      if (!mountedRef.current) return;

      // Cache the fresh data
      if (newImages.length > 0) {
        await bannerCacheService.cacheImages(folderName, newImages);
        
        // Optional: preload images in background
        bannerCacheService.preloadImages(newImages);
      }

      // Only update state if data actually changed or it's the initial load
      if (!isBackgroundFetch || !arraysEqual(images, newImages)) {
        setImages(newImages);
        setError(null);
      }

      lastFetchRef.current = Date.now();
      
    } catch (err) {
      console.error('Failed to fetch banner images:', err);
      if (!mountedRef.current) return;
      
      // Only set error if we don't have cached images to show
      if (images.length === 0) {
        setError('Failed to load images');
      }
    }
  };

  // Load cached data and fetch fresh data
  const loadImages = async () => {
    try {
      // Step 1: Check cache first
      const cachedResult = await bannerCacheService.getCachedImages(folderName);
      
      if (!mountedRef.current) return;

      if (cachedResult.fromCache && cachedResult.images.length > 0) {
        // Step 2: Render cached data immediately
        setImages(cachedResult.images);
        setFromCache(true);
        setLoading(false);
        setCacheInfo({
          source: cachedResult.cacheType,
          timestamp: cachedResult.timestamp
        });

        // Step 3: Fetch fresh data in background
        setTimeout(() => fetchFreshData(true), 100);
      } else {
        // No cache: fetch fresh data
        setFromCache(false);
        await fetchFreshData(false);
        setLoading(false);
      }
    } catch (err) {
      console.error('Failed to load cached images:', err);
      if (!mountedRef.current) return;
      
      setError('Failed to load images');
      setLoading(false);
    }
  };

  // Refresh function to manually refetch
  const refetch = async () => {
    setLoading(true);
    setError(null);
    await fetchFreshData(false);
    setLoading(false);
  };

  // Initialize on mount
  useEffect(() => {
    mountedRef.current = true;
    loadImages();

    return () => {
      mountedRef.current = false;
    };
  }, [folderName]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      mountedRef.current = false;
    };
  }, []);

  return {
    images,
    loading,
    fromCache,
    cacheInfo,
    error,
    refetch
  };
};

/**
 * Hook for managing banner cache (debug/admin purposes)
 */
export const useBannerCacheManager = () => {
  const [cacheInfo, setCacheInfo] = useState(null);

  const refreshCacheInfo = async () => {
    const info = await bannerCacheService.getCacheInfo();
    setCacheInfo(info);
  };

  const clearAllCache = async () => {
    await bannerCacheService.clearAllCache();
    await refreshCacheInfo();
  };

  const clearFolderCache = async (folderName) => {
    const cacheKey = bannerCacheService.getCacheKey(folderName);
    localStorage.removeItem(cacheKey);
    await bannerCacheService.removeFromIndexedDB(folderName);
    await refreshCacheInfo();
  };

  useEffect(() => {
    refreshCacheInfo();
  }, []);

  return {
    cacheInfo,
    refreshCacheInfo,
    clearAllCache,
    clearFolderCache
  };
};