import type { INewUser } from '@/types';
import { account, appwriteConfig, avatars, databases, ID } from './config';

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
    console.log(error);
    return error;
  }
}

export async function signInAccount(user: { email: string; password: string }) {
  const { email, password } = user;
  try {
    const session = await account.createEmailPasswordSession(email, password);
    return session;
  } catch (error) {
    console.log(error);
    return error;
  }
}
