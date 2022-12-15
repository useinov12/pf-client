import { useEffect, useState, useContext } from 'react';
import Link from 'next/link';
import Button from '@/components/buttons/Button';
import { LoginFormContext } from '@/context/LoginFormProvider';
import { useAuth } from '@/services/user/AuthProvider';
import ThemeButton from '../ThemeButton';
import Logo from '@/components/Logo';
import clsx from 'clsx';

export default function Navbar() {
  const { user } = useAuth();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className={clsx(
        'mx-auto px-4 sm:max-w-screen-sm',
        'md:max-w-screen-lg ',
        'lg:max-w-screen-xl',
        'h-full w-full',
        isLoaded && 'fade-in-start'
      )}
    >
      <nav className='flex items-center justify-between py-3' data-fade='1'>
        <Logo />
        <ul className='inline-flex items-center gap-2'>
          <li>
            {user ? <CabinetLink /> : <LoginButton />}
          </li>
          <li>
            <ThemeButton />
          </li>
        </ul>
      </nav>
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
  const { handleOpenLoginForm } = useContext(LoginFormContext);
  return (
    <Button
      className='py-1'
      variant='theme-dependent'
      onClick={()=>handleOpenLoginForm()}
    >
      Login
    </Button>
  );
};
