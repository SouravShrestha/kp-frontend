import { useState, useCallback, useRef } from "react";
import { FolderAPI, MediaAPI, ContentAPI } from "../apis";
import { fetchGalleryData } from "../services/galleryService";
import { fetchPackagesData } from "../services/packagesService";
import { fetchFaqData } from "../services/faqService";
import { fetchGalleryViewData } from "../services/galleryViewService";

// Persistent cache that survives component unmounts
const globalCache = new Map();

// Cache duration options
const CACHE_DURATIONS = {
  SHORT: 5 * 60 * 1000, // 5 minutes
  MEDIUM: 20 * 60 * 1000, // 20 minutes
  LONG: 2 * 60 * 60 * 1000, // 2 hours
  VERY_LONG: 24 * 60 * 60 * 1000, // 24 hours
};

const CACHE_DURATION = CACHE_DURATIONS.MEDIUM;

export const useUniversalPagePreloader = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const currentLoadingRef = useRef(null);

  const preloadPageData = useCallback(async (pageName, options = {}) => {
    // Cancel any ongoing loading
    if (currentLoadingRef.current) {
      currentLoadingRef.current.cancelled = true;
    }

    // Create new loading tracker
    const loadingTracker = { cancelled: false };
    currentLoadingRef.current = loadingTracker;

    // Check cache first - include options in cache key for gallery-view
    const cacheKey = pageName === 'gallery-view' && options.folderId 
      ? `page_${pageName}_${options.folderId}` 
      : `page_${pageName}`;
    const cached = globalCache.get(cacheKey);

    if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
      // Update last accessed time for cache retention tracking
      cached.lastAccessed = Date.now();
      globalCache.set(cacheKey, cached);

      // Show smooth loading animation for cached data
      if (!loadingTracker.cancelled) {
        setIsLoading(true);
        setProgress(0);

        // Smooth progressive loading animation
        const smoothProgressSteps = [
          { progress: 15, delay: 20 },
          { progress: 35, delay: 40 },
          { progress: 60, delay: 60 },
          { progress: 85, delay: 80 },
          { progress: 100, delay: 100 },
        ];

        smoothProgressSteps.forEach(({ progress, delay }) => {
          setTimeout(() => {
            if (!loadingTracker.cancelled) {
              setProgress(progress);
            }
          }, delay);
        });

        setTimeout(() => {
          if (!loadingTracker.cancelled) {
            setIsLoading(false);
            setProgress(0);
          }
        }, 250);
      }

      return cached.data;
    }

    if (!loadingTracker.cancelled) {
      setIsLoading(true);
      setProgress(10);
    }

    try {
      let data = null;
      let minLoadingTime = 500; // Minimum loading time for better UX

      switch (pageName) {
        case "gallery":
          data = await preloadGalleryData();
          minLoadingTime = 800;
          break;
        case "packages":
          data = await preloadPackagesData();
          minLoadingTime = 600;
          break;
        case "faq":
          data = await preloadFaqData();
          minLoadingTime = 600;
          break;
        case "gallery-view":
          data = await preloadGalleryViewData(options);
          minLoadingTime = 800;
          break;
        case "contact":
        case "home":
        default:
          // For pages without API data, show quick loading
          data = {};
          setProgress(50);
          await new Promise((resolve) => setTimeout(resolve, 200));
          setProgress(100);
          minLoadingTime = 400;
          break;
      }

      // Cache the data with timestamp and access tracking
      globalCache.set(cacheKey, {
        data,
        timestamp: Date.now(),
        lastAccessed: Date.now(),
      });

      // Ensure minimum loading time for better UX
      const loadingStart = Date.now();
      const elapsed = Date.now() - loadingStart;
      const remainingTime = Math.max(0, minLoadingTime - elapsed);

      if (remainingTime > 0) {
        await new Promise((resolve) => setTimeout(resolve, remainingTime));
      }

      // Keep loading state for a brief moment to show completion
      setTimeout(() => {
        if (!loadingTracker.cancelled) {
          setIsLoading(false);
          setProgress(0);
          currentLoadingRef.current = null;
        }
      }, 200);

      return data;
    } catch (error) {
      console.error(`Error preloading ${pageName} data:`, error);
      if (!loadingTracker.cancelled) {
        setIsLoading(false);
        setProgress(0);
        currentLoadingRef.current = null;
      }
      throw error;
    }
  }, []);

  const preloadGalleryData = async () => {
    try {
      const galleryData = await fetchGalleryData(null, setProgress);
      return galleryData;
    } catch (error) {
      console.error('Error preloading gallery data:', error);
      setProgress(100);
      return {
        tabs: [],
        activeTab: null,
        subfolders: [],
        imagesBySubfolder: {},
      };
    }
  };

  const preloadPackagesData = async () => {
    return await fetchPackagesData(setProgress);
  };

  const preloadFaqData = async () => {
    return await fetchFaqData(setProgress);
  };

  const preloadGalleryViewData = async (options = {}) => {
    return await fetchGalleryViewData(options, setProgress);
  };

  const getPreloadedData = useCallback((pageName, options = {}) => {
    // Use same cache key logic as preloadPageData
    const cacheKey = pageName === 'gallery-view' && options.folderId 
      ? `page_${pageName}_${options.folderId}` 
      : `page_${pageName}`;
    const cached = globalCache.get(cacheKey);

    if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
      return cached.data;
    }
    return null;
  }, []);

  const clearPreloadedData = useCallback((pageName) => {
    // This function is used for manual clearing via debug tools
    const cacheKey = `page_${pageName}`;
    globalCache.delete(cacheKey);
  }, []);

  const clearAllPreloadedData = useCallback(() => {
    // This function is for manual clearing via debug tools
    globalCache.clear();
    setProgress(0);
  }, []);

  const getCacheInfo = useCallback(() => {
    const now = Date.now();
    const info = {};

    globalCache.forEach((value, key) => {
      const age = Math.floor((now - value.timestamp) / 1000);
      const timeLeft = Math.floor(
        (CACHE_DURATION - (now - value.timestamp)) / 1000
      );
      const expired = now - value.timestamp > CACHE_DURATION;
      const lastAccessed = value.lastAccessed
        ? Math.floor((now - value.lastAccessed) / 1000)
        : age;

      info[key] = {
        age,
        timeLeft: expired ? 0 : timeLeft,
        expired,
        size: JSON.stringify(value.data).length,
        lastAccessed,
      };
    });

    return info;
  }, []);

  const clearCache = useCallback((pageName = null) => {
    if (pageName) {
      const cacheKey = `page_${pageName}`;
      globalCache.delete(cacheKey);
    } else {
      globalCache.clear();
    }
  }, []);

  const refreshCache = useCallback(
    async (pageName) => {
      clearCache(pageName);
      return await preloadPageData(pageName);
    },
    [preloadPageData]
  );

  const cleanupExpiredCache = useCallback(() => {
    const now = Date.now();
    globalCache.forEach((value, key) => {
      if (now - value.timestamp > CACHE_DURATION) {
        globalCache.delete(key);
      }
    });
  }, []);

  return {
    isLoading,
    progress,
    preloadPageData,
    getPreloadedData,
    clearPreloadedData,
    clearAllPreloadedData,
    getCacheInfo,
    cleanupExpiredCache,
    clearCache,
    refreshCache,
    CACHE_DURATION,
  };
};
