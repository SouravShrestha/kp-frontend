import { API_ENDPOINTS, apiGet } from '../config';

export async function fetchImagesByFolderName(folder) {
  try {
    return await apiGet(`${API_ENDPOINTS.IMAGES_BY_FOLDER}/${folder}`);
  } catch (error) {
    console.error('Error fetching images by folder name:', error);
    return [];
  }
}

export async function fetchImagesByFolderId(folderId) {
  try {
    return await apiGet(`${API_ENDPOINTS.IMAGES_BY_ID}/${folderId}`);
  } catch (error) {
    console.error('Error fetching images by folder ID:', error);
    return [];
  }
}