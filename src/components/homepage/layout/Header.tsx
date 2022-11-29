import React from 'react';
import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import Button from '@/components/buttons/Button';
import { FaMoon, FaSun } from 'react-icons/fa';
import { ThemeContext } from '@/context/ThemeProvider';
import { LoginFormContext } from '@/context/LoginFormProvider';
import { LoginCardComponent as LoginForm } from '@/components/LoginForm/Form';
import { User, useUser } from '@/services/user';
// import { requestLinkToken } from '@/services/api';
import { requestLinkToken } from '@/services/plaid';

export default function Header({user}:{user:User | null }) {
  const { mode } = React.useContext(ThemeContext);

  const [isLoaded, setIsLoaded] = React.useState(false);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <nav
      className={clsx(
        'top-0 z-50 ',
        'py-3 px-3',
        mode === 'dark' ? 'text-white' : 'text-black',
        'mx-auto',
        'sm:max-w-screen-sm',
        'md:max-w-screen-lg ',
        'lg:max-w-screen-xl',
        isLoaded && 'fade-in-start'
      )}
    >
      <div className='flex items-center justify-between' data-fade='1'>
        <Button onClick={requestLinkToken}>create</Button>
        <Link href='/'>
          <Image
            src={'/images/logo.png'}
            width={70}
            height={64}
            className='cursor-pointer'
          />
        </Link>
        <ul className='inline-flex items-center gap-2'>
          <li>{user ? <CabinetLink /> : <LoginButton />}</li>
          <li>
            <ThemeButton />
          </li>
        </ul>
      </div>
      <LoginForm />
    </nav>
  );
}

const CabinetLink = () => {
  const { mode, setMode } = React.useContext(ThemeContext);
  return (
    <Link href='/cabinet'>
      <Button
        variant={mode === 'dark' ? 'light' : 'dark'}
        className='text-md py-1'
      >
        Cabinet
      </Button>
    </Link>
  );
};

const LoginButton = () => {
  const { setOpenLoginForm } = React.useContext(LoginFormContext);
  const { mode } = React.useContext(ThemeContext);
  return (
    <Button
      className='py-1'
      variant={mode === 'dark' ? 'light' : 'dark'}
      onClick={() => setOpenLoginForm(true)}
    >
      Login
    </Button>
  );
};

const ThemeButton = () => {
  const { mode, setMode } = React.useContext(ThemeContext);
  return (
    <Button
      className='py-2'
      variant={mode === 'dark' ? 'light' : 'dark'}
      onClick={() => {
        setMode(mode === 'light' ? 'dark' : 'light');
      }}
    >
      {mode === 'light' ? <FaMoon /> : <FaSun />}
    </Button>
  );
};
