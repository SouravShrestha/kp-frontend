import { fetchImagesByFolderName, fetchImagesByFolderId } from "./functions/media";
import {
  fetchSubfoldersByName,
  fetchSubfoldersById,
  getFolderById,
} from "./functions/folder";
import {
  fetchTestimonials,
  fetchFaqs,
  fetchPackages,
} from "./functions/content";
import { sendEmail } from "./functions/communication";

export const MediaAPI = {
  fetchImagesByFolderName,
  fetchImagesByFolderId,
};

export const FolderAPI = {
  fetchSubfoldersByName,
  fetchSubfoldersById,
  getFolderById,
};

export const ContentAPI = {
  fetchTestimonials,
  fetchFaqs,
  fetchPackages,
};

export const CommunicationAPI = {
  sendEmail
};
