import clsx from 'clsx';
import { useRouter } from 'next/router';
import { ChangeEvent, FormEvent,useEffect, useState } from 'react';
import toast from 'react-hot-toast';

import { isValidEmailInput } from '@/lib/formValidation';
import { clearRedirect,getRedirect } from '@/lib/lastRedirect';
import logger from '@/lib/logger';

import Button from '@/components/buttons/Button';

import { useLoginForm } from '@/context/LoginFormProvider';
import { login, useCashedClient } from '@/services/auth/actions';
import { useAuth } from '@/services/auth/queries';

export default function Login({ className }: { className?: string }) {
  return <Form className={className} />;
}

function Form({ className }: { className?: string }) {
  const queryClient = useCashedClient();
  const router = useRouter();
  const { isSuccess, isLoading, data: user, refetch } = useAuth();
  const { handleOpenLoginForm } = useLoginForm();

  const [formInputs, setFormInputs] = useState({ username: '', password: '' });
  const { username, password } = formInputs;

  function handleCredentials(e: ChangeEvent<HTMLInputElement>) {
    setFormInputs({
      ...formInputs,
      [e.target.name]: e.target.value,
    });
  }

  async function onLoginSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!isValidEmailInput(username)) {
      toast.error('Enter valid email address');
      return;
    }

    const { status } = await login({ username, password });
    logger(status, 'Submit Login Form Response');

    if (status === 200) {
      /* invalidate query to trigger update cashed user */
      queryClient.invalidateQueries(['user']);
      refetch();
    }
  }

  /* handle redirect on successfull login*/
  useEffect(() => {
    if (!isLoading) {
      if (user) {
        const lastVisited = getRedirect();

        if (!lastVisited || lastVisited === '/signup') {
          router.push('/app/cabinet');
        } else {
          router.push(lastVisited);
        }

        clearRedirect();
        handleOpenLoginForm(); /* close login form */

        logger({}, '⚪️ Redirect triggered');
      }
    }
  }, [router, isLoading, user]);

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
