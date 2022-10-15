import React, { ChangeEvent } from 'react';
import axios from 'axios';
import Logo from '@/components/Logo';
import Button from '@/components/buttons/Button';
import clsx from 'clsx';
import Cookies from 'js-cookie';
// import jwt from 'jsonwebtoken';
import { register, login } from '@/services/user.service';

const LoginForm = ({
  openLoginForm,
  setOpenLoginForm,
}: {
  openLoginForm: boolean;
  setOpenLoginForm: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [toggle, setToggle] = React.useState(false);
  const [registerCred, setRegisterCred] = React.useState({
    username: '',
    first_name: '',
    last_name: '',
    password: '',
  });
  const [loginrCred, setLoginCred] = React.useState({
    username: '',
    password: '',
  });
  const [message, setMessage] = React.useState('');

  function handleRegisterCredentials(e: ChangeEvent<HTMLInputElement>) {
    setRegisterCred({
      ...registerCred,
      [e.target.name]: e.target.value,
    });
  }
  function handleLogInCredentials(e: ChangeEvent<HTMLInputElement>) {
    setLoginCred({
      ...loginrCred,
      [e.target.name]: e.target.value,
    });
  }

  async function handleCreate(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const credentials = {
      username: registerCred.username,
      password: registerCred.password,
      first_name: registerCred.first_name,
      last_name: registerCred.last_name,
    };
    register(credentials);
    // if status === 201
    // clean inputs
    // close form
    // display toast
    // else
    // display toast error message
  }

  async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const credentials = {
      username: registerCred.username,
      password: registerCred.password,
    };
    const response = await login(credentials);

    if (response && response.status === 200) {
      console.log('SUCCESS');
      // Cookies.set('response', data)
      // display success toast
      // set user state
      // close loginForm
      Cookies.get('token') || '';
    } else {
      //else display error message
      console.log('ERROR');
    }
  }

  async function handleLogOut() {
    return 1
  }

  return (
    <div
      className={clsx(
        'h-screen w-screen',
        'fixed inset-0 z-50 flex items-center ',
        'justify-center bg-dark/75 transition duration-500 ease-out',
        openLoginForm ? 'block' : 'hidden '
      )}
    >
      <section
        className={clsx(
          'justify-top relative flex  h-3/4 ',
          'w-full flex-col items-center rounded-md bg-white ',
          'p-2 shadow-lg shadow-dark/40 sm:w-96'
        )}
      >
        <button
          className={clsx(
            'absolute right-4 top-2',
            'text-2xl font-bold text-zinc-900'
          )}
          onClick={() => setOpenLoginForm(false)}
        >
          X
        </button>

        <p className='mt-4 text-lg font-semibold'>Sign in to</p>
        <Logo />

        <div className='mt-4 flex w-full justify-center text-dark'>
          <Button
            variant='light'
            className='shawod-slate-800 flex w-2/4 justify-center shadow-md '
            onClick={() => setToggle(true)}
          >
            Sign In
          </Button>
          <Button
            variant='light'
            className='shawod-slate-800 flex w-2/4 justify-center shadow-md '
            onClick={() => setToggle(false)}
          >
            Sign Up
          </Button>
        </div>

        {/* SIGN UP */}
        <SignUpForm
          handleRegisterCredentials={handleRegisterCredentials}
          handleSubmit={handleCreate}
          toggle={toggle}
          message={message}
        />

        {/* SIGN IN */}
        <SignInForm
          handleLogInCredentials={handleLogInCredentials}
          handleSubmit={handleLogin}
          toggle={toggle}
          message={message}
        />
      </section>
    </div>
  );
};

export default LoginForm;

// #region SignUpForm
const SignUpForm: React.FC<{
  handleRegisterCredentials: any;
  handleSubmit: any;
  toggle: any;
  message: any;
}> = ({ handleRegisterCredentials, handleSubmit, toggle, message }) => {
  return (
    <form
      onSubmit={handleSubmit}
      className={`flex w-full flex-col p-2  ${
        toggle === false ? 'block' : 'hidden'
      }`}
    >
      <h2 className='mt-2 mb-2 text-dark'>Sign Up</h2>
      <h3>{message}</h3>
      <label className='flex-col text-lg font-semibold text-zinc-700'>
        Enter email:
      </label>
      <input
        id='username'
        type='text'
        name='username'
        onChange={(e) => handleRegisterCredentials(e)}
        className={clsx(
          'shawod-slate-800 mb-1 rounded',
          'border-gray-300 text-dark shadow-md'
        )}
      />

      <label className='flex-col text-lg font-semibold text-zinc-700'>
        Enter your first name:
      </label>
      <input
        type='text'
        name='first_name'
        onChange={(e) => handleRegisterCredentials(e)}
        className={clsx(
          'shawod-slate-800 mb-1 rounded',
          'border-gray-300 text-dark shadow-md'
        )}
      />

      <label className='flex-col text-lg font-semibold text-zinc-700'>
        Enter your last name:
      </label>
      <input
        type='text'
        name='last_name'
        onChange={(e) => handleRegisterCredentials(e)}
        className={clsx(
          'shawod-slate-800 mb-1 rounded',
          'border-gray-300 text-dark shadow-md'
        )}
      />

      <label className='flex-col text-lg font-semibold text-zinc-700'>
        Enter password:
      </label>
      <input
        type='password'
        name='password'
        onChange={(e) => handleRegisterCredentials(e)}
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
// #endregion

// #region SignUpForm
const SignInForm: React.FC<{
  handleLogInCredentials: any;
  handleSubmit: any;
  toggle: any;
  message: any;
}> = ({ handleLogInCredentials, handleSubmit, toggle, message }) => {
  return (
    <form
      onSubmit={handleSubmit}
      className={`flex w-full flex-col p-2  ${
        toggle === true ? 'block' : 'hidden'
      }`}
    >
      <h2 className='mt-2 mb-2 text-dark'>Sign In</h2>
      <label className='flex-col text-lg font-semibold text-zinc-700'>
        {' '}
        Enter email:
      </label>
      <input
        type='text'
        name='username'
        onChange={(e) => handleLogInCredentials(e)}
        className={clsx(
          'shawod-slate-800 mb-1 rounded',
          'border-gray-300 text-dark shadow-md'
        )}
      />

      <label className='flex-col text-lg font-semibold text-zinc-700'>
        {' '}
        Enter password:{' '}
      </label>
      <input
        type='password'
        name='password'
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
// #endregion
