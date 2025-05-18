'use client';

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
import { SignupValidation } from '@/lib/validation';
import Loader from '@/components/ui/shared/Loader';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import {
  useCreateUserquery,
  useSignInAccount,
} from '@/lib/react-query/queriesAndMutations';
import { useUserContext } from '@/context/AuthContext';

const SignupForm = () => {
  const navigate = useNavigate();
  const { checkAuthUser, isLoading: isUserLoading } = useUserContext();

  // use react query
  const { mutateAsync: createUserAccount, isPending: isCreatingAccount } =
    useCreateUserquery();

  const { mutateAsync: signInAccount, isPending: isSigningIn } =
    useSignInAccount();
  // 1. Define your form.
  const form = useForm<z.infer<typeof SignupValidation>>({
    resolver: zodResolver(SignupValidation),
    defaultValues: {
      name: '',
      username: '',
      email: '',
      password: '',
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof SignupValidation>) {
    // creating a new user using action crateUserAccount function
    const newUser = await createUserAccount(values);
    if (!newUser) return toast.error('Sign up failed please try again'); // if user is not created, display error message
    toast.success('Signup successful');
    // asign user to session
    const session = await signInAccount({
      email: values.email,
      password: values.password,
    });
    if (!session) return toast.error('Sign in failed please try again');
    // redirect to login page
    const isLoggedIn = await checkAuthUser();
    if (isLoggedIn) {
      form.reset();
      navigate('/');
    } else {
      toast.error('Sign in failed please try again');
    }
  }
  return (
    <Form {...form}>
      <div className='sm:w-80 flex flex-col items-center  '>
        <img src='/assets/images/logo.svg' alt='logo' />
        <h2 className='h3-bold md:h2-bold pt-3 sm:pt-5'>
          Create a new account
        </h2>
        <p className='text-light-3 small-medium md:base-regular'>
          To use Snapgram, please enter your details
        </p>

        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='flex flex-col gap-4 w-full mt-4'
        >
          <FormField
            control={form.control}
            name='name'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input type='text' className='shad-input' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='username'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input type='text' className='shad-input' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='email'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type='email' className='shad-input' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='password'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type='password' className='shad-input' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type='submit' className='shad-button_primary'>
            {isCreatingAccount || isUserLoading || isSigningIn ? (
              <div className='flex items-center gap-2'>
                <Loader /> Loading ...
              </div>
            ) : (
              'Sign up'
            )}
          </Button>
          <p className='text-small-regular tetxt-light-2 text-center'>
            Already have an account?
            <Link
              to='/sign-in'
              className='text-primary-500 text-small-semibold ml-1 '
            >
              {' '}
              Log in
            </Link>
          </p>
        </form>
      </div>
    </Form>
  );
};

export default SignupForm;
