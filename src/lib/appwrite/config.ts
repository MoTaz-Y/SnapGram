import { Client, Account, Databases, Storage, Avatars } from 'appwrite';

export const appwriteConfig = {
  URL: import.meta.env.VITE_APPWRITE_URL,
  projectId: import.meta.env.VITE_APPWRITE_PROJECT_ID,
  databaseId: import.meta.env.VITE_APPWRITE_DATABASE_ID,
  storageId: import.meta.env.VITE_APPWRITE_STORAGE_ID,
  userCollectionId: import.meta.env.VITE_APPWRITE_USER_COLLECTION_KEY,
  postCollectionId: import.meta.env.VITE_APPWRITE_POST_COLLECTION_KEY,
  saveCollectionId: import.meta.env.VITE_APPWRITE_SAVES_COLLECTION_KEY,
};

export const client = new Client();
client.setEndpoint(appwriteConfig.URL).setProject(appwriteConfig.projectId); // Replace with your project ID
export const account = new Account(client);
export const databases = new Databases(client);
export const storage = new Storage(client);
export const avatars = new Avatars(client);

export { ID } from 'appwrite';
