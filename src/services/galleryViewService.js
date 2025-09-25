import { MediaAPI, FolderAPI } from "../apis";

/**
 * Fetches gallery view data including images and event info
 * @param {Object} options - Configuration options
 * @param {string} options.folderId - Encoded folder ID
 * @param {Object|null} options.passedEventInfo - Event info from navigation state
 * @param {Function|null} onProgress - Optional progress callback for preloading (0-100)
 * @returns {Promise<Object>} Gallery view data object
 */
export const fetchGalleryViewData = async (options = {}, onProgress = null) => {
  const { folderId, passedEventInfo } = options;
  
  // If no folderId provided, return empty data
  if (!folderId) {
    if (onProgress) onProgress(100);
    return {
      images: [],
      eventInfo: { event_name: "", event_date: "" }
    };
  }

  try {
    if (onProgress) onProgress(20);
    
    // Decode the folder ID
    const decodedFolderId = decodeURIComponent(atob(folderId));
    
    if (onProgress) onProgress(40);
    
    // Fetch images
    const images = await MediaAPI.fetchImagesByFolderId(decodedFolderId);
    
    if (onProgress) onProgress(70);
    
    let eventInfo = { event_name: "", event_date: "" };
    
    // Only fetch folder info if we don't have it from navigation state
    if (!passedEventInfo || !passedEventInfo.eventName || !passedEventInfo.eventDate) {
      if (decodedFolderId) {
        const folder = await FolderAPI.getFolderById(decodedFolderId);
        if (folder) {
          eventInfo = {
            event_name: folder.event_name || folder.name || "",
            event_date: folder.event_date || folder.date || ""
          };
        }
      }
    } else {
      // Use passed event info
      eventInfo = {
        event_name: passedEventInfo.eventName,
        event_date: passedEventInfo.eventDate
      };
    }
    
    if (onProgress) onProgress(100);
    
    return {
      images,
      eventInfo
    };
  } catch (error) {
    console.error('Error fetching gallery view data:', error);
    if (onProgress) onProgress(100);
    
    return {
      images: [],
      eventInfo: { event_name: "", event_date: "" }
    };
  }
};

/**
 * Utility function to decode folder ID safely
 * @param {string} folderId - Encoded folder ID
 * @returns {string|null} Decoded folder ID or null if invalid
 */
export const decodeFolderId = (folderId) => {
  try {
    return decodeURIComponent(atob(folderId));
  } catch (error) {
    console.error('Error decoding folder ID:', error);
    return null;
  }
};