import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Button from '@/components/buttons/Button';
import { LoginFormContext } from '@/context/LoginFormProvider';
import { LoginCardComponent as LoginForm } from '@/components/LoginForm/Form';
import { useUser } from '@/services/user';
import ThemeButton from '../ThemeButton';
import Logo from '@/components/Logo';
import clsx from 'clsx';

export default function Navbar() {
  const { user } = useUser();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoaded, setIsLoaded] = React.useState(false);

  useEffect(() => {
    if (user) setIsLoggedIn(true);
    else setIsLoggedIn(false);
  }, [user]);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className={clsx(
        'mx-auto px-3 sm:max-w-screen-sm',
        'md:max-w-screen-lg ',
        'lg:max-w-screen-xl',
        'h-full w-full',
        isLoaded && 'fade-in-start'
      )}
    >
      <nav className='flex items-center justify-between py-3' data-fade='1'>
        <Logo />
        <ul className='inline-flex items-center gap-2'>
          <li>{isLoggedIn ? <CabinetLink /> : <LoginButton />}</li>
          <li>
            <ThemeButton />
          </li>
        </ul>
      </nav>
      <LoginForm />
    </div>
  );
}

const CabinetLink = () => {
  return (
    <Link href='/cabinet'>
      <Button variant='theme-dependent' className='text-md py-1'>
        Cabinet
      </Button>
    </Link>
  );
};

const LoginButton = () => {
  const { setOpenLoginForm } = React.useContext(LoginFormContext);
  return (
    <Button
      className='py-1'
      variant='theme-dependent'
      onClick={() => setOpenLoginForm(true)}
    >
      Login
    </Button>
  );
};
