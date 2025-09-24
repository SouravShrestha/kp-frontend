
import { API_ENDPOINTS, apiGet } from '../config';

export async function fetchTestimonials() {
  try {
    return await apiGet(API_ENDPOINTS.TESTIMONIALS);
  } catch (error) {
    console.error('Error fetching testimonials:', error);
    return [];
  }
}

export async function fetchFaqs() {
  try {
    return await apiGet(API_ENDPOINTS.FAQS);
  } catch (error) {
    console.error('Error fetching FAQs:', error);
    return [];
  }
}

export async function fetchPackages() {
  try {
    return await apiGet(API_ENDPOINTS.PACKAGES);
  } catch (error) {
    console.error('Error fetching packages:', error);
    return [];
  }
}