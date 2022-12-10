import React, { useContext, useState } from 'react';
import clsx from 'clsx';
import Login from '@/components/LoginForm/Login';
import SignUp from '@/components/LoginForm/SignUp';
import Logo from '@/components/Logo';

import Button from '@/components/buttons/Button';
import { ThemeContext } from '@/context/ThemeProvider';
import ThemeButton from '@/components/page/landing/ThemeButton';

export default function LoginPage() {
  const {mode} = useContext(ThemeContext)
  return (
    <div
      className={clsx(
        'h-screen w-screen',
        'transition-all delay-75 duration-150',
        mode === 'light' ? 
        'bg-gradient-to-bl from-gray-200 via-gray-400 to-white'
        : 'bg-gradient-to-bl from-gray-700 via-gray-900 to-black ',
        'flex flex-col items-center justify-center'
      )}
    >
      <FormCard />
    </div>
  );
}

const FormCard = () => {
  const [toggleForm, setToggleForm] = useState(false);

  return (
    <div
      className={clsx(
        'w-5/6 sm:w-1/3 md:w-2/6',
        ' py-4  px-2',
        ' rounded-md bg-gray-50',
        'flex flex-col items-center justify-center'
      )}
    >
      <Logo />

      <div className='mt-4 flex w-full justify-center gap-2'>
        <Button
          variant='light'
          className='flex w-2/4 justify-center'
          onClick={() => setToggleForm(true)}
        >
          Sign In
        </Button>
        <Button
          variant='light'
          className='flex w-2/4 justify-center'
          onClick={() => setToggleForm(false)}
        >
          Sign Up
        </Button>
      </div>

      {toggleForm ? <Login /> : <SignUp setToggleForm={setToggleForm} />}
    </div>
  );
};