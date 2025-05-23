import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '../ui/textarea';
import FileUploader from '../ui/shared/FileUploader';
import { PostValidation } from '@/lib/validation';
import { useUserContext } from '@/context/AuthContext';
import { toast } from 'sonner';
import type { Models } from 'appwrite';
import { useNavigate } from 'react-router-dom';
import {
  useCreatePost,
  // useDeletePost,
  useUpdatePost,
} from '@/lib/react-query/queriesAndMutations';

type PostFromProps = {
  post?: Models.Document;
  action: 'Create' | 'Update' | 'Delete';
};

export default function PostForm({ post, action }: PostFromProps) {
  const { user } = useUserContext();
  const navigate = useNavigate();
  // ...
  // 1. Define your form.
  const form = useForm<z.infer<typeof PostValidation>>({
    resolver: zodResolver(PostValidation),
    defaultValues: {
      caption: post ? post?.caption : '',
      file: [],
      location: post ? post.location : '',
      tags: post ? post.tags.join(',') : '',
    },
  });
  console.log(post);
  console.log('============================post');

  // React Query
  const { mutateAsync: createPost, isPending: isLoadingCreate } =
    useCreatePost();
  const { mutateAsync: updatePost, isPending: isLoadingUpdate } =
    useUpdatePost();
  // const { mutateAsync: deletePost, isPending: isLoadingDelete } =
  //   useDeletePost();

  // 2. Define a submit handler.
  async function onSubmit(value: z.infer<typeof PostValidation>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.

    // Creating a new post. ACTION === 'CREATE'
    if (post && action === 'Update') {
      const upodatedPost = await updatePost({
        ...value,
        postId: post?.$id,
        imageId: post?.imageId,
        imageUrl: post?.imageUrl,
      });
      if (!upodatedPost) {
        toast.error('Something went wrong');
      }
      navigate(`/posts/${post?.$id}`);
      return;
    } /*else if (post && action === 'Delete') {
      const deletedPost = await deletePost(post?.$id, post?.imageId);
      if (!deletedPost) {
        toast.error('Something went wrong');
      }
      navigate('/');
      return;
    }*/
    const newPost = await createPost({ ...value, userId: user.id });
    if (!newPost) {
      toast.error('Something went wrong');
    } else {
      form.reset();
      if (isLoadingCreate) {
        console.log('Post is creating now');
      }
      toast.success('Post created successfully');
      navigate('/');
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='flex flex-col gap-9 w-full max-w-5xl'
      >
        <FormField
          control={form.control}
          name='caption'
          render={({ field }) => (
            <FormItem>
              <FormLabel className='shad-form_label'>Caption</FormLabel>
              <FormControl>
                <Textarea
                  className='shad-textarea custom-scrollbar'
                  {...field}
                />
              </FormControl>
              <FormMessage className='shad-form_message' />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='file'
          render={({ field }) => (
            <FormItem>
              <FormLabel className='shad-form_label'>Add Photos</FormLabel>
              <FormControl>
                <FileUploader
                  fieldChange={field.onChange}
                  mediaUrl={post?.imageUrl}
                />
              </FormControl>
              <FormMessage className='shad-form_message' />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='location'
          render={({ field }) => (
            <FormItem>
              <FormLabel className='shad-form_label'>Add Location</FormLabel>
              <FormControl>
                <Input type='text' className='shad-input' {...field} />
              </FormControl>
              <FormMessage className='shad-form_message' />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='tags'
          render={({ field }) => (
            <FormItem>
              <FormLabel className='shad-form_label'>
                Add tags (separated by comma " ,")
              </FormLabel>
              <FormControl>
                <Input
                  type='text'
                  className='shad-input'
                  placeholder='Js, ReactJs, NextJs'
                  {...field}
                />
              </FormControl>
              <FormMessage className='shad-form_message' />
            </FormItem>
          )}
        />
        <div className='flex gap-4 items-center justify-end'>
          <Button type='button' className='shad-button_dark_4'>
            Cancel
          </Button>
          <Button
            type='submit'
            className='shad-button_primary whitespace-nowrap'
            disabled={isLoadingCreate || isLoadingUpdate}
          >
            {isLoadingCreate || isLoadingUpdate ? 'Loading...' : action}
          </Button>
        </div>
      </form>
    </Form>
  );
}
