import React, { ChangeEvent, useState } from 'react';
import clsx from 'clsx';
import Button from '@/components/buttons/Button';
import { isValidEmailInput } from '@/lib/form.validation';
import toast from 'react-hot-toast';
import { login, useCashedClient } from '@/services/user/actions';
import logger from '@/lib/logger';
import { useRouter } from 'next/router';
import { useAuth } from '@/services/user/AuthProvider';

function Login({ className }: { className?: string }) {
  // const { isLoading } = useAuth();
  return <Form className={className} />;
}

function Form({ className }: { className?: string }) {
  const QueryClient = useCashedClient();
  const router = useRouter();
  const { getRedirect, clearRedirect, isSuccess } = useAuth();

  const [formInputs, setFormInputs] = useState({ username: '', password: '' });
  const { username, password } = formInputs;

  function handleCredentials(e: ChangeEvent<HTMLInputElement>) {
    setFormInputs({
      ...formInputs,
      [e.target.name]: e.target.value,
    });
  }

  async function onLoginSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!isValidEmailInput(username)) {
      toast.error('Invalid email address!');
      return;
    }

    const { status } = await login({ username, password });
    logger(status, 'Submit Login Form Response');

    if (status === 200) {
      /* invalidate query to trigger update cashed user */
      QueryClient.invalidateQueries('user');

      const lastVisited = getRedirect();

      if (lastVisited) {
        router.push(lastVisited);
        clearRedirect();
      } else router.push('/cabinet');
    }
  }

  return (
    <form
      onSubmit={onLoginSubmit}
      className={clsx('flex w-80 flex-col p-4', className)}
    >
      <h1 className='text-center text-gray-700'>Sign In</h1>
      <p className='mb-6 text-center text-sm text-gray-700'>
        Sign in to access your account
      </p>
      <label
        htmlFor='username-login'
        className='flex-col py-1 text-sm font-normal text-gray-500'
      >
        Email address
      </label>
      <input
        id='username-login'
        type='text'
        name='username'
        value={username}
        onChange={(e) => handleCredentials(e)}
        placeholder='Your@address.com'
        className={clsx(
          'shawod-slate-800 mb-1 rounded',
          'border-gray-300 text-dark shadow-md'
        )}
      />

      <label
        htmlFor='password'
        className='flex-col py-1 text-sm font-normal text-gray-500'
      >
        Password
      </label>
      <input
        id='password'
        type='password'
        name='password'
        value={password}
        onChange={(e) => handleCredentials(e)}
        placeholder='****'
        className={clsx(
          'shawod-slate-800 mb-1 rounded',
          'border-gray-300 text-dark shadow-md'
        )}
      />
      <Button
        variant='dark'
        type='submit'
        className={clsx(
          'py-2',
          'shawod-slate-800 my-3 rounded',
          'flex justify-center border-gray-300 shadow-md'
        )}
      >
        Sign in
      </Button>
    </form>
  );
}
export default Login;
