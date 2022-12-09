import React, { ChangeEvent, useState } from 'react';
import clsx from 'clsx';
import Button from '@/components/buttons/Button';
import { isValidEmailInput } from '@/lib/form.validation';
import toast from 'react-hot-toast';
import { login, useCashedClient } from '@/services/user/actions';
import logger from '@/lib/logger';
import { useRouter } from 'next/router';
import { useAuth } from '@/services/user/AuthProvider';

const Login: React.FC<{ className?: string }> = ({ className }) => {
  const QueryClient = useCashedClient();
  const router = useRouter();
  const { getRedirect, clearRedirect } = useAuth();

  const [formInputs, setFormInputs] = useState(emptyForm);
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
      /* update cashed user */
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
      className={clsx('flex w-full flex-col p-2', className)}
    >
      <h2 className='mt-2 mb-2 text-center font-light text-gray-600'>
        Sign In
      </h2>
      <label
        htmlFor='username-login'
        className='flex-col text-lg font-normal text-gray-500'
      >
        {' '}
        Enter email:
      </label>
      <input
        id='username-login'
        type='text'
        name='username'
        value={username}
        onChange={(e) => handleCredentials(e)}
        className={clsx(
          'shawod-slate-800 mb-1 rounded',
          'border-gray-300 text-dark shadow-md'
        )}
      />

      <label
        htmlFor='password'
        className='flex-col text-lg font-normal text-gray-500'
      >
        {' '}
        Enter password:{' '}
      </label>
      <input
        id='password'
        type='password'
        name='password'
        value={password}
        onChange={(e) => handleCredentials(e)}
        className={clsx(
          'shawod-slate-800 mb-1 rounded',
          'border-gray-300 text-dark shadow-md'
        )}
      />
      <Button
        variant='dark'
        type='submit'
        className={clsx(
          'shawod-slate-800 mb-1 rounded',
          'flex justify-center border-gray-300 shadow-md'
        )}
      >
        Submit
      </Button>
    </form>
  );
};
export default Login;

const emptyForm = {
  username: '',
  password: '',
};
