import { API_BASE_URL } from "../constants/api";

export async function fetchCloudinaryImages(folder) {
  try {
    const res = await fetch(`${API_BASE_URL}/api/images/by-folder-name/${folder}`);
    const data = await res.json();
    return data;
  } catch (err) {
    console.error('Error fetching Cloudinary images:', err);
    return [];
  }
}

export async function fetchCloudinaryImagesById(folderId) {
  try {
    const res = await fetch(`${API_BASE_URL}/api/images/${folderId}`);
    const data = await res.json();
    return data;
  } catch (err) {
    console.error('Error fetching Cloudinary images:', err);
    return [];
  }
}
