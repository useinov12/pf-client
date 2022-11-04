import React, { ChangeEvent } from 'react';
import Button from '@/components/buttons/Button';
import clsx from 'clsx';
import Cookies from 'js-cookie';
import { register, login } from '@/services/user.service';
import toast from 'react-hot-toast';
import { AiOutlineClose } from 'react-icons/ai';
import jwt from 'jsonwebtoken';
import { UserContext } from '@/context/UserProvider';
import Image from 'next/image';
import SignUp from './SignUp';
import Login from './Login';
import Card from '../homepage/cards/Card';

const Form: React.FC<{
  openLoginForm: boolean;
  setOpenLoginForm: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ openLoginForm, setOpenLoginForm }) => {
  const { user, setUser } = React.useContext(UserContext);

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

  async function onSubmitRegister(e: React.FormEvent<HTMLFormElement>) {
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

  async function onSubmitLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const cred = {
      username: credentials.username,
      password: credentials.password,
    };
    const { status, data, message } = await login(cred);

    type JwtPayload = {
      exp: number;
      first: string;
      last: string;
      username: string;
    };

    if (status === 200) {
      Cookies.set('token', data.detail.data.access_token, { secure: true });
      toast.success(message);

      const { first, last, username } = jwt.decode(
        data.detail.data.access_token
      ) as JwtPayload;

      setUser({ email: username, firstName: first, lastName: last });

      setCredentials({
        username: '',
        first_name: '',
        last_name: '',
        password: '',
      });

      setOpenLoginForm(false);
    } else {
      toast.error(message);
    }
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
      <Card
        className={clsx(
          'h-5/6 w-full sm:w-[28rem]',
          'justify-top relative flex ',
          'flex-col items-center rounded-xl  ',
          'shadow-lg shadow-dark/40',
          openLoginForm ? 'scale-100 opacity-100' : 'scale-0 opacity-0',
          'transition-all duration-200'
        )}
      >
        <section className='w-full h-full flex flex-col items-center px-2'>
          <button
            className={clsx(
              'absolute right-3 top-3',
              'text-2xl font-bold text-zinc-900'
            )}
            onClick={() => setOpenLoginForm(false)}
          >
            <AiOutlineClose className='text-4xl' />
          </button>

          <p className='mt-10 text-lg font-normal uppercase text-dark'>
            Sign in to
          </p>
          {/* <Image src={'/images/logo.png'} width={110} height={110} /> */}
          <h3 className='text-3xl text-dark drop-shadow'>PersonalFinance</h3>

          <div className='mt-4 flex w-full justify-center '>
            <Button
              variant='light'
              className='shawod-slate-800 flex w-2/4 justify-center text-gray-600 shadow-md'
              onClick={() => setToggle(true)}
            >
              Sign In
            </Button>
            <Button
              variant='light'
              className='shawod-slate-800 flex w-2/4 justify-center text-gray-600 shadow-md'
              onClick={() => setToggle(false)}
            >
              Sign Up
            </Button>
          </div>

          <SignUp
            toggle={toggle}
            credentials={credentials}
            handleSubmit={onSubmitRegister}
            handleRegisterCredentials={handleCredentials}
          />

          <Login
            toggle={toggle}
            credentials={credentials}
            handleSubmit={onSubmitLogin}
            handleLogInCredentials={handleCredentials}
          />

        </section>
      </Card>
    </div>
  );
};

export {Form};