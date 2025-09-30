export const API_ENDPOINTS = {
  IMAGES_BY_FOLDER: "/api/images/by-folder-name",
  IMAGES_BY_ID: "/api/images",
  FOLDERS: "/api/folders",
  TESTIMONIALS: "/api/testimonials",
  FAQS: "/api/faqs",
  PACKAGES: "/api/packages",
  SEND_EMAIL: "/api/email/submit-form",
};
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

export async function apiRequest(endpoint, options = {}) {
  try {
    const url = `${API_BASE_URL}${endpoint}`;
    const config = {
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
      ...options,
    };

    const response = await fetch(url, config);

    if (!response.ok) {
      throw new Error(
        `API request failed: ${response.status} ${response.statusText}`
      );
    }

    return await response.json();
  } catch (error) {
    console.error(`API request error for ${endpoint}:`, error);
    throw error;
  }
}

export async function apiGet(endpoint, params = {}) {
  const searchParams = new URLSearchParams(params);
  const url = searchParams.toString()
    ? `${endpoint}?${searchParams}`
    : endpoint;

  return apiRequest(url, { method: "GET" });
}

export async function apiPost(endpoint, data = {}) {
  return apiRequest(endpoint, {
    method: "POST",
    body: JSON.stringify(data),
  });
}
