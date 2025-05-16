import {
  // useQuery,
  useMutation,
  // useQueryClient,
  // useInfiniteQuery,
} from '@tanstack/react-query';
import { createUserAccount, signInAccount } from '../appwrite/api';
import type { INewUser } from '@/types';

export const useCreateUserquery = () => {
  return useMutation({
    mutationFn: async (user: INewUser) => await createUserAccount(user),
  });
};
export const useSignInAccount = () => {
  return useMutation({
    mutationFn: async (user: { email: string; password: string }) =>
      await signInAccount(user),
  });
};
