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
  console.log(email, password);
  try {
    // التحقق من وجود جلسة حالية
    const currentSession = await account.getSession('current');
    if (currentSession) {
      const currentAccount = await account.get();
      const existingUser = await databases.listDocuments(
        appwriteConfig.databaseId,
        appwriteConfig.userCollectionId,
        [Query.equal('accountId', currentSession.$id)]
      );

      //  لو مش موجود، نحفظه
      if (existingUser.total === 0) {
        const avatarUrl = avatars.getInitials(currentAccount.name);
        await saveUserToDB({
          accountId: currentAccount.$id,
          email: currentAccount.email,
          name: currentAccount.name,
          username: currentAccount.name,
          imageUrl: avatarUrl,
        });
      }
      console.log('User already has an active session:', currentSession);
      console.log(currentSession);
      console.log('-*-*-*-*-*-*-*-currentSession');
      return currentSession;
    } else {
      const session = await account.createEmailPasswordSession(email, password);
      console.log(session);

      //  بعد ما المستخدم يدخل، نجيب بياناته
      const currentAccount = await account.get();

      //  ندور عليه في قاعدة البيانات
      const existingUser = await databases.listDocuments(
        appwriteConfig.databaseId,
        appwriteConfig.userCollectionId,
        [Query.equal('accountId', currentAccount.$id)]
      );

      //  لو مش موجود، نحفظه
      if (existingUser.total === 0) {
        const avatarUrl = avatars.getInitials(currentAccount.name);
        await saveUserToDB({
          accountId: currentAccount.$id,
          email: currentAccount.email,
          name: currentAccount.name,
          username: currentAccount.name,
          imageUrl: avatarUrl,
        });
      }

      return session;
    }
  } catch (error) {
    // مفيش جلسة حالية، وده طبيعي لو المستخدم مش مسجل دخول
    console.log('No active session found. Proceeding to sign in.' + error);
  }
}

export async function getCurrentUser() {
  try {
    const currentAccount = await account.get();
    console.log('====================currentAccount');
    console.log(currentAccount);
    if (!currentAccount) throw new Error('User not found');
    const currentUser = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      [Query.equal('accountId', currentAccount.$id)]
    );
    console.log('====================currentUser');
    console.log(currentUser);
    if (!currentUser) throw new Error('User not found');
    console.log(currentUser.documents);
    return currentUser.documents[0];
  } catch (error) {
    throw new Error('User not found' + error);
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
