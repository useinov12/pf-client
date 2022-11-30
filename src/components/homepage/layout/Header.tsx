import React from 'react';
import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import Button from '@/components/buttons/Button';
import { ThemeContext } from '@/context/ThemeProvider';
import { LoginFormContext } from '@/context/LoginFormProvider';
import { LoginCardComponent as LoginForm } from '@/components/LoginForm/Form';
import { useUser } from '@/services/user';
import ThemeButton from '../ThemeButton';

export default function Header() {
  const { mode } = React.useContext(ThemeContext);

  const [isLoaded, setIsLoaded] = React.useState(false);

  const { user } = useUser();

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
  return (
    <Link href='/cabinet'>
      <Button
        variant='theme-dependent'
        className='text-md py-1'
      >
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


