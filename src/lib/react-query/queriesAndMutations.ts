import {
  // useQuery,
  useMutation,
  useQuery,
  useQueryClient,
  // useQueryClient,
  // useInfiniteQuery,
} from '@tanstack/react-query';
import {
  createPost,
  createUserAccount,
  getRecentPosts,
  signInAccount,
  signOutAccount,
} from '../appwrite/api';
import type { INewPost, INewUser } from '@/types';
import { QUERY_KEYS } from './queryKeys';

// ============================================================
// AUTH QUERIES
// ============================================================
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
export const useSignOutAccount = () => {
  return useMutation({
    mutationFn: signOutAccount,
  });
};

// ============================================================
// POST QUERIES
// ============================================================

// ................create post
export const useCreatePost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (post: INewPost) => createPost(post),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_RECENT_POSTS],
      });
    },
  });
};

//................ get recent posts
export const useGetRecentPosts = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_RECENT_POSTS],
    queryFn: getRecentPosts,
  });
};
