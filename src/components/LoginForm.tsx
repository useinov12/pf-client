import React, { ChangeEvent } from 'react';
import Logo from '@/components/Logo';
import Button from '@/components/buttons/Button';
import clsx from 'clsx';
import Cookies from 'js-cookie';
import { register, login } from '@/services/user.service';
import toast from 'react-hot-toast';
import { AiOutlineClose } from 'react-icons/ai';

const LoginForm: React.FC<{
  openLoginForm: boolean;
  setOpenLoginForm: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ openLoginForm, setOpenLoginForm }) => {
  const [toggle, setToggle] = React.useState(false);
  const [credentials, setCredentials] = React.useState({
    username: '',
    first_name: '',
    last_name: '',
    password: '',
  });

  function handleCredentials(e: ChangeEvent<HTMLInputElement>) {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  }

  async function handleCreate(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const cred = {
      username: credentials.username,
      password: credentials.password,
      first_name: credentials.first_name,
      last_name: credentials.last_name,
    };
    const { status, data, message } = await register(cred);

    if (status === 201) {
      toast.success(message);
      setCredentials({
        username: '',
        first_name: '',
        last_name: '',
        password: '',
      });
      setToggle(true);
    } else {
      toast.error(message);
    }
  }

  async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const cred = {
      username: credentials.username,
      password: credentials.password,
    };
    const { status, data, message } = await login(cred);

    if (status === 200) {
      console.log(data);
      Cookies.set('response', data.detail.data.access_token, { secure: true });
      toast.success(message);
      // set user state
      setCredentials({
        username: '',
        first_name: '',
        last_name: '',
        password: '',
      });
      setOpenLoginForm(false);
    } else {
      //else display error message
      toast.error(message);
      console.log(data);
    }
  }

  async function handleLogOut() {
    // unset JWT from cookie
    // clear user context state
    //
    return 1;
  }

  return (
    <div
      className={clsx(
        'fixed inset-0 z-50 h-screen w-screen overflow-y-hidden',
        'flex items-center justify-center px-8',
        openLoginForm
          ? 'scroll-y-none pointer-events-auto bg-opacity-50 bg-clip-padding backdrop-blur-sm backdrop-filter '
          : 'pointer-events-none opacity-0',
        'transition-all delay-100 duration-200'
      )}
    >
      <section
        className={clsx(
          'h-4/5 w-full sm:w-[28rem]',
          'justify-top relative flex ',
          'flex-col items-center rounded-xl bg-white ',
          'p-2 shadow-lg shadow-dark/40',
          openLoginForm ? 'scale-100 opacity-100' : 'scale-0 opacity-0',
          'transition-all duration-200'
        )}
      >
        <button
          className={clsx(
            'absolute right-3 top-3',
            'text-2xl font-bold text-zinc-900'
          )}
          onClick={() => setOpenLoginForm(false)}
        >
          <AiOutlineClose className='text-4xl' />
        </button>

        <p className='mt-10 text-2xl font-semibold text-gray-500'>Sign in to</p>
        <Logo />
        <div className='my-1 h-1 w-3/4 rounded bg-gray-500' />

        <div className='mt-4 flex w-full justify-center '>
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
          toggle={toggle}
          credentials={credentials}
          handleSubmit={handleCreate}
          handleRegisterCredentials={handleCredentials}
        />

        {/* SIGN IN */}
        <SignInForm
          toggle={toggle}
          credentials={credentials}
          handleSubmit={handleLogin}
          handleLogInCredentials={handleCredentials}
        />
      </section>
    </div>
  );
};

export default LoginForm;

// #region SignUpForm
const SignUpForm: React.FC<{
  credentials: {
    username: string;
    first_name: string;
    last_name: string;
    password: string;
  };
  handleRegisterCredentials: (e: ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
  toggle: boolean;
}> = ({ credentials, handleRegisterCredentials, handleSubmit, toggle }) => {
  return (
    <form
      onSubmit={handleSubmit}
      className={`flex w-full flex-col p-2  ${
        toggle === false ? 'block' : 'hidden'
      }`}
    >
      <h2 className='mt-2 mb-2 text-gray-500 font-extralight text-center'>Sign Up</h2>
      <label
        htmlFor='username'
        className='flex-col text-lg text-gray-500 font-normal'
      >
        Enter email:
      </label>
      <input
        id='username'
        type='text'
        name='username'
        value={credentials.username}
        onChange={(e) => handleRegisterCredentials(e)}
        className={clsx(
          'shawod-slate-800 mb-1 rounded',
          'border-gray-300 text-dark shadow-md'
        )}
      />

      <label
        htmlFor='first_name'
        className='flex-col text-lg text-gray-500 font-normal'
      >
        Enter your first name:
      </label>
      <input
        type='text'
        name='first_name'
        value={credentials.first_name}
        onChange={(e) => handleRegisterCredentials(e)}
        className={clsx(
          'shawod-slate-800 mb-1 rounded',
          'border-gray-300 text-dark shadow-md'
        )}
      />

      <label
        htmlFor='last_name'
        className='flex-col text-lg text-gray-500 font-normal'
      >
        Enter your last name:
      </label>
      <input
        type='text'
        name='last_name'
        value={credentials.last_name}
        onChange={(e) => handleRegisterCredentials(e)}
        className={clsx(
          'shawod-slate-800 mb-1 rounded',
          'border-gray-300 text-dark shadow-md'
        )}
      />

      <label
        htmlFor='password'
        className='flex-col text-lg text-gray-500 font-normal'
      >
        Enter password:
      </label>
      <input
        type='password'
        name='password'
        value={credentials.password}
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
      <h2 className='mt-2 mb-2 text-gray-500 text-center font-extralight'>Sign In</h2>
      <label
        htmlFor='username-login'
        className='flex-col text-lg text-gray-500 font-normal'
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
        className='flex-col text-lg text-gray-500 font-normal'
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
// #endregion
