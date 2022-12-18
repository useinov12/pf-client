import React, { ChangeEvent, Dispatch, useState } from 'react';
import clsx from 'clsx';
import Button from '@/components/buttons/Button';
import { isPasswordMatch, hasMissingInputs } from '@/lib/form.validation';
import toast from 'react-hot-toast';
import { register } from '@/services/user/actions';

const SignUp: React.FC<{
  setToggleForm: Dispatch<boolean>;
  className?: string;
}> = ({ setToggleForm, className }) => {

  const [formInputs, setFormInputs] = useState(emptyForm);
  const { username, password, first_name, last_name, passwordChecker } =
    formInputs;

  const credentials = { username, password, first_name, last_name };

  function handleCredentials(e: ChangeEvent<HTMLInputElement>) {
    setFormInputs({
      ...formInputs,
      [e.target.name]: e.target.value,
    });
  }

  async function onRegisterSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!isPasswordMatch(password, passwordChecker)) {
      toast.error('Password does not match!');
      return;
    }

    if (hasMissingInputs(credentials)) {
      toast.error(`Fill all missing fields!`);
      return;
    }

    const { status } = await register(credentials);

    if (status === 201) {
      setFormInputs(emptyForm);
      setToggleForm(true);
    }
  }

  return (
    <form
      action='#'
      onSubmit={onRegisterSubmit}
      className={clsx(`flex  flex-col px-3 w-80`, className)}
    >
      <h1 className='text-center text-gray-700'>
        Sign Up
      </h1>
      <p className='mb-6 text-center text-sm text-gray-700'>
        Create a new account
      </p>

      <label
        htmlFor='username'
        className='flex-col py-1 text-sm font-normal text-gray-500'
      >
        Enter email:
      </label>
      <input
        id='username'
        type='text'
        name='username'
        value={username}
        onChange={(e) => handleCredentials(e)}
        className={clsx(
          'shawod-slate-800 mb-1 rounded py-1',
          'border-gray-300 text-dark shadow-md'
        )}
      />

      <label
        htmlFor='first_name'
        className='flex-col py-1 text-sm font-normal text-gray-500'
      >
        Enter your first name:
      </label>
      <input
        type='text'
        name='first_name'
        value={first_name}
        onChange={(e) => handleCredentials(e)}
        className={clsx(
          'shawod-slate-800 mb-1 rounded py-1',
          'border-gray-300 text-dark shadow-md'
        )}
      />

      <label
        htmlFor='last_name'
        className='flex-col py-1 text-sm font-normal text-gray-500'
      >
        Enter your last name:
      </label>
      <input
        type='text'
        name='last_name'
        value={last_name}
        onChange={(e) => handleCredentials(e)}
        className={clsx(
          'shawod-slate-800 mb-1 rounded py-1',
          'border-gray-300 text-dark shadow-md'
        )}
      />

      <label
        htmlFor='password'
        className='flex-col py-1 text-sm font-normal text-gray-500'
      >
        Enter password:
      </label>
      <input
        type='password'
        name='password'
        value={password}
        onChange={(e) => handleCredentials(e)}
        className={clsx(
          'shawod-slate-800 mb-1 rounded py-1',
          'border-gray-300 text-dark shadow-md'
        )}
      />
      <label
        htmlFor='passwordChecker'
        className='flex-col py-1 text-sm font-normal text-gray-500'
      >
        Re-enter password:
      </label>
      <input
        type='password'
        name='passwordChecker'
        value={passwordChecker}
        onChange={(e) => handleCredentials(e)}
        className={clsx(
          'shawod-slate-800 mb-1 rounded py-1',
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
        Create account
      </Button>
    </form>
  );
};

export default SignUp;

const emptyForm = {
  username: '',
  first_name: '',
  last_name: '',
  password: '',
  passwordChecker: '',
};
