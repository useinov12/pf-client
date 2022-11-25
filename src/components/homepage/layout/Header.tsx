import React from 'react';
import clsx from 'clsx';
import Cookies from 'js-cookie';
import Image from 'next/image';
import Link from 'next/link';
import Button from '@/components/buttons/Button';
import { LoginCardComponent as LoginForm } from '@/components/LoginForm/Form';
import { FaMoon, FaSun } from 'react-icons/fa';
import { ThemeContext } from '@/context/ThemeProvider';
import { LoginFormContext } from '@/context/LoginFormProvider';
import { useUser } from '@/services/user';

export default function Header() {
  const { mode, setMode } = React.useContext(ThemeContext);
  const { setOpenLoginForm } = React.useContext(LoginFormContext);

  const [isLoaded, setIsLoaded] = React.useState(false);
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);

  const { data, isLoading } = useUser();

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  React.useEffect(() => {
    if (Cookies.get('token')) {
      console.log(Cookies.get('token'));
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }

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
        <Link href='/'>
          <Image
            src={'/images/logo.png'}
            width={70}
            height={64}
            className='cursor-pointer'
          />
        </Link>
        <ul className={clsx('inline-flex items-center gap-2')}>
          <li>
            <LoginButton
              mode={mode}
              isLoggedIn={isLoggedIn}
              setOpenLoginForm={setOpenLoginForm}
              isLoading={isLoading}
            />
          </li>
          <li>
            <Button
              className='py-2'
              variant={mode === 'dark' ? 'light' : 'dark'}
              onClick={() => {
                setMode(mode === 'light' ? 'dark' : 'light');
              }}
            >
              {mode === 'light' ? <FaMoon /> : <FaSun />}
            </Button>
          </li>
        </ul>
      </div>

      <LoginForm />
    </nav>
  );
}

const LoginButton = ({
  mode,
  isLoggedIn,
  setOpenLoginForm,
  isLoading,
}: {
  mode: string;
  isLoggedIn: boolean;
  isLoading: boolean;
  setOpenLoginForm: any;
}) => {
  return (
    <>
      {isLoggedIn ? (
        <Link href='/cabinet'>
          <Button
            variant={mode === 'dark' ? 'light' : 'dark'}
            className='text-md py-1'
            isLoading={isLoading}
          >
            Cabinet
          </Button>
        </Link>
      ) : (
        <Button
          className='py-1'
          variant={mode === 'dark' ? 'light' : 'dark'}
          onClick={() => setOpenLoginForm(true)}
          isLoading={isLoading}
        >
          Login
        </Button>
      )}
    </>
  );
};
