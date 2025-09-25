import { FolderAPI, MediaAPI } from "../apis";

/**
 * Fetches complete gallery data including tabs, subfolders, and images
 * @param {string|null} specificTab - Optional tab name to fetch data for, defaults to first tab
 * @param {Function|null} onProgress - Optional progress callback for preloading (0-100)
 * @returns {Promise<Object>} Gallery data object
 */
export const fetchGalleryData = async (specificTab = null, onProgress = null) => {
  // Fetch all tabs
  if (onProgress) onProgress(20);
  const tabs = await FolderAPI.fetchSubfoldersByName("kp-gallery");

  if (tabs.length === 0) {
    if (onProgress) onProgress(100);
    return {
      tabs: [],
      activeTab: null,
      subfolders: [],
      imagesBySubfolder: {},
    };
  }

  if (onProgress) onProgress(40);

  // Determine active tab
  const activeTab = specificTab || tabs[0].name;
  const tabObj = tabs.find((t) => t.name === activeTab);
  
  if (!tabObj) {
    throw new Error(`Tab "${activeTab}" not found`);
  }

  // Fetch subfolders for the active tab
  const subfolders = await FolderAPI.fetchSubfoldersById(tabObj.id);

  if (onProgress) onProgress(60);

  // Fetch images for all subfolders
  const imagePromises = subfolders.map(async (sf) => {
    const images = await MediaAPI.fetchImagesByFolderId(sf.id);
    return { id: sf.id, images };
  });

  if (onProgress) onProgress(80);
  const results = await Promise.all(imagePromises);
  
  const imagesBySubfolder = {};
  results.forEach(({ id, images }) => {
    imagesBySubfolder[id] = images;
  });

  if (onProgress) onProgress(100);

  return {
    tabs,
    activeTab,
    subfolders,
    imagesBySubfolder,
  };
};

/**
 * Fetches data for a specific tab only (when switching tabs)
 * @param {Array} tabs - Available tabs
 * @param {string} tabName - Name of the tab to fetch data for
 * @returns {Promise<Object>} Tab-specific data
 */
export const fetchTabData = async (tabs, tabName) => {
  const tabObj = tabs.find((t) => t.name === tabName);
  
  if (!tabObj) {
    throw new Error(`Tab "${tabName}" not found`);
  }

  const subfolders = await FolderAPI.fetchSubfoldersById(tabObj.id);

  const imagePromises = subfolders.map(async (sf) => {
    const images = await MediaAPI.fetchImagesByFolderId(sf.id);
    return { id: sf.id, images };
  });

  const results = await Promise.all(imagePromises);
  const imagesBySubfolder = {};
  results.forEach(({ id, images }) => {
    imagesBySubfolder[id] = images;
  });

  return {
    subfolders,
    imagesBySubfolder,
  };
};