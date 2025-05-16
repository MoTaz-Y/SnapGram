import type { INewUser } from '@/types';
import { account, appwriteConfig, avatars, databases } from './config';
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
  console.log('Attempting to sign in with:', email);

  try {
    // Attempt to create a new session directly.
    // If a session already exists for this user, Appwrite might handle it
    // or you might need to explicitly delete an old session if Appwrite doesn't allow concurrent sessions for the same user.
    const session = await account.createEmailPasswordSession(email, password);
    console.log('Session created:', session);

    // After successful session creation, get the account details
    const currentAccount = await account.get();

    // Check if user exists in DB and save if not
    const existingUser = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      [Query.equal('accountId', currentAccount.$id)]
    );

    if (existingUser.total === 0) {
      console.log('User not found in DB, saving...');
      const avatarUrl = avatars.getInitials(currentAccount.name);
      await saveUserToDB({
        accountId: currentAccount.$id,
        email: currentAccount.email,
        name: currentAccount.name,
        username: currentAccount.name, // Or a generated username if different from name
        imageUrl: avatarUrl,
      });
      console.log('User saved to DB.');
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
    // console.log('====================currentAccount');
    // console.log(currentAccount);
    if (!currentAccount)
      throw new Error('No current account from account.get()'); // More specific error

    const currentUserDoc = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      [Query.equal('accountId', currentAccount.$id)]
    );
    // console.log('====================currentUserDoc');
    // console.log(currentUserDoc);

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
    // console.log(currentUserDoc.documents[0]);
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
