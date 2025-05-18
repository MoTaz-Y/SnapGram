import type { INewPost, INewUser } from '@/types';
import { account, appwriteConfig, avatars, databases, storage } from './config';
import { Query, ID } from 'appwrite';

export async function createUserAccount(user: INewUser) {
  try {
    const newAccount = await account.create(
      ID.unique(),
      user.email,
      user.password,
      user.name
    );
    if (!newAccount) throw new Error('Account not created');
    const avatarUrl = avatars.getInitials(user.name);
    const newUser = await saveUserToDB({
      accountId: newAccount.$id,
      email: user.email,
      name: user.name,
      username: user.username,
      imageUrl: avatarUrl,
    });
    return newUser;
  } catch (error) {
    console.log(error);
    return error;
  }
}

export async function saveUserToDB({
  accountId,
  email,
  name,
  username,
  imageUrl,
}: {
  accountId: string;
  email: string;
  name: string;
  username: string;
  imageUrl: URL | string;
}) {
  try {
    //this comes from appwrite documentation
    const user = await databases.createDocument(
      appwriteConfig.databaseId, //database id
      appwriteConfig.userCollectionId, //collection id
      ID.unique(),
      {
        accountId,
        email,
        name,
        username,
        imageUrl,
      }
    );
    return user;
  } catch (error) {
    throw new Error('User not created' + error);
  }
}

export async function signInAccount(user: { email: string; password: string }) {
  const { email, password } = user;

  try {
    // Attempt to create a new session directly.
    // If a session already exists for this user, Appwrite might handle it
    // or you might need to explicitly delete an old session if Appwrite doesn't allow concurrent sessions for the same user.
    const session = await account.createEmailPasswordSession(email, password);

    // After successful session creation, get the account details
    const currentAccount = await account.get();

    // Check if user exists in DB and save if not
    const existingUser = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      [Query.equal('accountId', currentAccount.$id)]
    );

    if (existingUser.total === 0) {
      const avatarUrl = avatars.getInitials(currentAccount.name);
      await saveUserToDB({
        accountId: currentAccount.$id,
        email: currentAccount.email,
        name: currentAccount.name,
        username: currentAccount.name, // Or a generated username if different from name
        imageUrl: avatarUrl,
      });
    } else {
      console.log('User found in DB.');
    }

    return session;
  } catch (error) {
    console.error('Error during sign in:', error);
    // It's important to throw the error or return a value indicating failure
    // so the calling code (e.g., in SigninForm.tsx) can handle it.
    throw new Error('Sign in failed. Please check credentials or try again.');
    // Or, depending on how you want to handle it in the UI:
    // return null;
  }
}

export async function getCurrentUser() {
  try {
    const currentAccount = await account.get();
    if (!currentAccount)
      throw new Error('No current account from account.get()'); // More specific error

    const currentUserDoc = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      [Query.equal('accountId', currentAccount.$id)]
    );

    if (!currentUserDoc || currentUserDoc.documents.length === 0) {
      // This case might happen if a user has an Appwrite auth session but no corresponding document in your users collection.
      // You might want to log them out or attempt to create the user document here.
      console.warn(
        'User has session but no DB record. Account ID:',
        currentAccount.$id
      );
      // For now, let's treat this as 'user not fully set up' or 'user not found in DB'
      throw new Error('User document not found in database.');
    }
    return currentUserDoc.documents[0];
  } catch (error) {
    // console.error('Error in getCurrentUser:', error);
    // Return null or throw a more specific error to be handled by AuthContext
    // This helps distinguish between 'no session' and other errors.
    // If account.get() fails due to no session, Appwrite throws an error that will be caught here.
    console.error('Error in getCurrentUser:', error);
    return null;
  }
}

export async function signOutAccount() {
  try {
    const session = await account.deleteSession('current');
    return session;
  } catch (error) {
    console.log(error);
  }
}

// // ================================================== POSTS APPWRITE
// //create post
// export async function createPost(post: INewPost) {
//   try {
//     // Upload file to appwrite storage
//     const uploadedFile = await uploadFile(post.file[0]);
//     if (!uploadedFile) throw new Error('File upload failed');

//     // Get file url
//     const fileUrl = getFilePreview(uploadedFile.$id);
//     if (!fileUrl) {
//       // Delete the storage file if we can't get the URL
//       await deleteFile(uploadedFile.$id);
//       throw new Error('File URL creation failed');
//     }
//     // Convert tags into array
//     const tags = post.tags?.replace(/ /g, '').split(',') || [];

//     // Create post
//     const newPost = await databases.createDocument(
//       appwriteConfig.databaseId,
//       appwriteConfig.postCollectionId,
//       ID.unique(),
//       {
//         creator: post.userId,
//         caption: post.caption,
//         imageUrl: fileUrl,
//         imageId: uploadedFile.$id,
//         location: post.location,
//         tags: tags,
//       }
//     );
//     if (!newPost) {
//       // Delete the storage file if we can't create the post
//       await deleteFile(uploadedFile.$id);
//       throw new Error('Post creation failed');
//     }
//     return newPost;
//   } catch (error) {
//     console.log(error);
//   }
// }
// export async function uploadFile(file: File) {
//   try {
//     const uploadedFile = await storage.createFile(
//       appwriteConfig.storageId,
//       ID.unique(),
//       file
//     );
//     return uploadedFile;
//   } catch (error) {
//     console.log(error);
//   }
// }
// // ================================================== GET FILE URL
// export function getFilePreview(fileId: string) {
//   try {
//     const fileUrl = storage.getFilePreview(appwriteConfig.storageId, fileId);
//     if (!fileUrl) throw new Error('File URL creation failed');
//     return fileUrl;
//   } catch (error) {
//     console.log(error);
//   }
// }
// // ================================================== DELETE FILE
// export async function deleteFile(fileId: string) {
//   try {
//     await storage.deleteFile(appwriteConfig.storageId, fileId);
//     return { status: 'ok' };
//   } catch (error) {
//     console.log(error);
//   }
// }

// // get recent posts
// export async function getRecentPosts() {
//   try {
//     const posts = await databases.listDocuments(
//       appwriteConfig.databaseId,
//       appwriteConfig.postCollectionId,
//       [Query.orderDesc('$createdAt'), Query.limit(20)]
//     );
//     if (!posts) throw new Error('Posts not found');
//     return posts;
//   } catch (error) {
//     console.log(error);
//   }
// }

// ===================================================== POSTS APPWRITE
// // ================================================== GET FILE URL
// تم تعديل نوع الإرجاع إلى string
export function getFileViewUrl(fileId: string): string {
  try {
    const fileUrlString = storage.getFileView(appwriteConfig.storageId, fileId);

    if (!fileUrlString) {
      console.error(
        '[getFileViewUrl] storage.getFileView returned null, undefined, or empty string for fileId:',
        fileId
      );
      throw new Error('Appwrite SDK getFileView returned a falsy string value');
    }
    return fileUrlString;
  } catch (error) {
    console.error('[getFileViewUrl] Error for fileId:', fileId, error);
    throw error;
  }
}

// ================================================== CREATE POST
export async function createPost(post: INewPost) {
  if (!post.file || post.file.length === 0) {
    console.error('[createPost] No file provided in post data.');
    throw new Error('No file provided for the post.');
  }

  try {
    const uploadedFile = await uploadFile(post.file[0]);
    if (!uploadedFile || !uploadedFile.$id) {
      console.error('[createPost] File upload failed or $id is missing.');
      throw new Error('File upload failed or $id is missing.');
    }

    const actualFileUrlString = getFileViewUrl(uploadedFile.$id);

    if (!actualFileUrlString) {
      console.error(
        '[createPost] getFileViewUrl returned a falsy string value.'
      );
      await deleteFile(uploadedFile.$id);
      throw new Error(
        'File URL creation failed (getFileViewUrl returned falsy string).'
      );
    }

    const tags = post.tags?.replace(/ /g, '').split(',') || [];

    const postDataForAppwrite = {
      creator: post.userId,
      caption: post.caption,
      imageUrl: actualFileUrlString, // استخدام الرابط النصي مباشرة
      imageId: uploadedFile.$id,
      location: post.location,
      tags: tags,
    };

    const newPostDocument = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.postCollectionId,
      ID.unique(),
      postDataForAppwrite
    );

    if (!newPostDocument) {
      console.error(
        '[createPost] Post document creation failed (newPostDocument is falsy).'
      );
      await deleteFile(uploadedFile.$id);
      throw new Error('Post document creation failed');
    }

    return newPostDocument;
  } catch (error) {
    console.error('[createPost] Error caught:', error);
    throw error;
  }
}

// ================================================== UPLOAD FILE
export async function uploadFile(file: File) {
  try {
    const uploadedFile = await storage.createFile(
      appwriteConfig.storageId,
      ID.unique(),
      file
    );
    return uploadedFile;
  } catch (error) {
    console.log(error);
  }
}
// ================================================== DELETE FILE
export async function deleteFile(fileId: string) {
  try {
    await storage.deleteFile(appwriteConfig.storageId, fileId);
    return { status: 'ok' };
  } catch (error) {
    console.log(error);
  }
}

// get recent posts
export async function getRecentPosts() {
  try {
    const posts = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.postCollectionId,
      [Query.orderDesc('$createdAt'), Query.limit(20)]
    );
    if (!posts) throw new Error('Posts not found');
    return posts;
  } catch (error) {
    console.log(error);
  }
}

// ==================================================  LIKE POST
export async function likePost(postId: string, likesArray: string[]) {
  try {
    const updatedPost = await databases.updateDocument(
      appwriteConfig.databaseId,
      appwriteConfig.postCollectionId,
      postId,
      {
        likes: likesArray,
      }
    );
    if (!updatedPost) throw new Error('Post not updated');
    return updatedPost;
  } catch (error) {
    console.log(error);
  }
}

// ==================================================  SAVE POST
export async function savePost(postId: string, userId: string) {
  try {
    const updatedPost = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.saveCollectionId,
      ID.unique(),
      {
        user: userId,
        post: postId,
      }
    );
    if (!updatedPost) throw new Error('Post not saved');
    return updatedPost;
  } catch (error) {
    console.log(error);
  }
}

// ==================================================  DELETE SAVED POST
export async function deleteSavedPost(savedRecordId: string) {
  try {
    const statusCode = await databases.deleteDocument(
      appwriteConfig.databaseId,
      appwriteConfig.saveCollectionId,
      savedRecordId
    );
    if (statusCode !== 204) throw new Error('Post not deleted');
    return { status: 'ok' };
  } catch (error) {
    console.log(error);
  }
}
// ==================================================  GET SAVED POSTS
export async function getSavedPosts(userId: string) {
  try {
    const posts = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.saveCollectionId,
      [Query.equal('user', userId)]
    );
    if (!posts) throw new Error('Posts not found');
    return posts;
  } catch (error) {
    console.log(error);
  }
}
