import React, { ChangeEvent } from 'react';
import clsx from 'clsx';
import Button from '@/components/buttons/Button';

const Login: React.FC<{
    credentials: {
      username: string;
      first_name: string;
      last_name: string;
      password: string;
    };
    handleLogInCredentials: (e: ChangeEvent<HTMLInputElement>) => void;
    handleSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
    toggle: boolean;
  }> = ({ credentials, handleLogInCredentials, handleSubmit, toggle }) => {
    return (
      <form
        onSubmit={handleSubmit}
        className={`flex w-full flex-col p-2  ${
          toggle === true ? 'block' : 'hidden'
        }`}
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
          value={credentials.username}
          onChange={(e) => handleLogInCredentials(e)}
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
          value={credentials.password}
          onChange={(e) => handleLogInCredentials(e)}
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
export default Login