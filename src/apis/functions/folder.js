import { API_ENDPOINTS, apiGet } from '../config';

export async function fetchSubfoldersByName(parentFolderName) {
  try {
    if (!parentFolderName) {
      throw new Error('Parent folder name is required');
    }
    return await apiGet(API_ENDPOINTS.FOLDERS, { parent_name: parentFolderName });
  } catch (error) {
    console.error('Error fetching subfolders by name:', error);
    return [];
  }
}

export async function fetchSubfoldersById(parentFolderId) {
  try {
    if (!parentFolderId) {
      throw new Error('Parent folder ID is required');
    }
    return await apiGet(API_ENDPOINTS.FOLDERS, { parent_id: parentFolderId });
  } catch (error) {
    console.error('Error fetching subfolders by ID:', error);
    return [];
  }
}

export async function getFolderById(folderId) {
  try {
    if (!folderId) {
      throw new Error('Folder ID is required');
    }
    return await apiGet(`${API_ENDPOINTS.FOLDERS}/${folderId}`);
  } catch (error) {
    console.error('Error fetching folder by ID:', error);
    return null;
  }
}