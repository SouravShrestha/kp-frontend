import { ContentAPI } from "../apis";

/**
 * Fetches packages data with proper error handling
 * @param {Function|null} onProgress - Optional progress callback for preloading (0-100)
 * @returns {Promise<Object>} Packages data object
 */
export const fetchPackagesData = async (onProgress = null) => {
  try {
    if (onProgress) onProgress(25);
    if (onProgress) onProgress(50);
    
    const packages = await ContentAPI.fetchPackages();
    
    if (onProgress) onProgress(75);
    if (onProgress) onProgress(100);

    return {
      packages: packages || [],
      activePackage: packages && packages.length > 0 ? packages[0] : null,
    };
  } catch (error) {
    if (onProgress) onProgress(100);
    console.error('Error fetching packages data:', error);
    
    return {
      packages: [],
      activePackage: null,
    };
  }
};