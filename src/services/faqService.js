import { ContentAPI } from "../apis";

/**
 * Fetches FAQ categories data with proper error handling
 * @param {Function|null} onProgress - Optional progress callback for preloading (0-100)
 * @returns {Promise<Object>} FAQ data object
 */
export const fetchFaqData = async (onProgress = null) => {
  try {
    if (onProgress) onProgress(25);
    if (onProgress) onProgress(50);
    
    const categories = await ContentAPI.fetchFaqs();
    
    if (onProgress) onProgress(75);
    if (onProgress) onProgress(100);

    return {
      categories: Array.isArray(categories) ? categories : [],
    };
  } catch (error) {
    if (onProgress) onProgress(100);
    console.error('Error fetching FAQ data:', error);
    
    return {
      categories: [],
    };
  }
};