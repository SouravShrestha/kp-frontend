import { API_BASE_URL } from "../constants/api";

export async function fetchSubfoldersByName(parentFolderName) {
  try {
  const res = await fetch(`${API_BASE_URL}/api/folders?parent_name=${parentFolderName}`);
    if (!res.ok) throw new Error('Failed to fetch subfolders');
    return await res.json();
  } catch (err) {
    console.error('Error fetching gallery subfolders:', err);
    return [];
  }
}

export async function fetchSubfoldersById(parentFolderId) {
  try {
  const res = await fetch(`${API_BASE_URL}/api/folders?parent_id=${parentFolderId}`);
    if (!res.ok) throw new Error('Failed to fetch subfolders');
    return await res.json();
  } catch (err) {
    console.error('Error fetching gallery subfolders:', err);
    return [];
  }
}

// Fetch a single folder by its id
export async function getFolderById(folderId) {
  try {
  const res = await fetch(`${API_BASE_URL}/api/folders/${folderId}`);
    if (!res.ok) throw new Error('Failed to fetch folder');
    return await res.json();
  } catch (err) {
    console.error('Error fetching folder by id:', err);
    return null;
  }
}