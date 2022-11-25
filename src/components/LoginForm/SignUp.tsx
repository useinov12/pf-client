import React, { ChangeEvent } from 'react';
import clsx from 'clsx';
import Button from '@/components/buttons/Button';
import { RegisterFormCredentials } from './Form';

interface SignUpProps {
  credentials: RegisterFormCredentials;
  handleCredentials: (e: ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
  className?: string;
}

const SignUp: React.FC<SignUpProps> = ({
  credentials,
  handleCredentials,
  handleSubmit,
  className,
}) => {
  return (
    <form
      action='#'
      onSubmit={handleSubmit}
      className={clsx(`flex w-full flex-col p-2`, className)}
    >
      <h2 className='mt-2 mb-2 text-center font-light text-gray-600'>
        Sign Up
      </h2>
      <label
        htmlFor='username'
        className='flex-col text-lg font-normal text-gray-500'
      >
        Enter email:
      </label>
      <input
        id='username'
        type='text'
        name='username'
        value={credentials.username}
        onChange={(e) => handleCredentials(e)}
        className={clsx(
          'shawod-slate-800 mb-1 rounded',
          'border-gray-300 text-dark shadow-md'
        )}
      />

      <label
        htmlFor='first_name'
        className='flex-col text-lg font-normal text-gray-500'
      >
        Enter your first name:
      </label>
      <input
        type='text'
        name='first_name'
        value={credentials.first_name}
        onChange={(e) => handleCredentials(e)}
        className={clsx(
          'shawod-slate-800 mb-1 rounded',
          'border-gray-300 text-dark shadow-md'
        )}
      />

      <label
        htmlFor='last_name'
        className='flex-col text-lg font-normal text-gray-500'
      >
        Enter your last name:
      </label>
      <input
        type='text'
        name='last_name'
        value={credentials.last_name}
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
        Enter password:
      </label>
      <input
        type='password'
        name='password'
        value={credentials.password}
        onChange={(e) => handleCredentials(e)}
        className={clsx(
          'shawod-slate-800 mb-1 rounded',
          'border-gray-300 text-dark shadow-md'
        )}
      />
      <label
        htmlFor='passwordChecker'
        className='flex-col text-lg font-normal text-gray-500'
      >
        Re-enter password:
      </label>
      <input
        type='password'
        name='passwordChecker'
        value={credentials.passwordChecker}
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

export default SignUp;
