import clsx from 'clsx';
import Link from 'next/link';
import { ReactNode, useContext, useEffect, useState } from 'react';
import { BsFacebook, BsGithub, BsInstagram, BsTwitter } from 'react-icons/bs';

import Button from '@/components/buttons/Button';
import UnderlineLink from '@/components/links/UnderlineLink';
import LayoutCommon from '@/components/shared/LayoutCommon';

import { LoginFormContext } from '@/context/LoginFormProvider';
import { useTheme } from '@/context/ThemeProvider';
import { useAuth } from '@/services/auth/queries';

import ThemeButton from '../../shared/ThemeSwitch';

export default function Layout({ children }: { children: ReactNode }) {
  const [isLoaded, setIsLoaded] = useState(false);

  /* little delay before start page fade-in */
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <LayoutCommon isLoaded={isLoaded}>
      <Navbar />
      <main className='relative overflow-hidden' data-fade='2'>
        {children}
      </main>
      <Footer />
    </LayoutCommon>
  );
}

const Navbar = () => {
  const { data: user } = useAuth();

  return (
    <div
      className={clsx(
        'mx-auto px-8 sm:max-w-screen-sm',
        'md:max-w-screen-xl ',
        'lg:max-w-screen-2xl',
        'h-full w-full'
      )}
    >
      <nav className='py-3' data-fade='1'>
        <ul className='flex items-center justify-between'>
          <div />
          <ul className='inline-flex items-center gap-2'>
            <li>{user && user.firstName}</li>
            <li>{user ? <AppLink /> : <LoginButton />}</li>
            <li>
              <ThemeButton />
            </li>
          </ul>
        </ul>
      </nav>
    </div>
  );
};

const AppLink = () => {
  return (
    <Link href='/app/overview'>
      <Button variant='transparent' className='text-md py-1'>
        Open app
      </Button>
    </Link>
  );
};

const LoginButton = () => {
  const { handleOpenLoginForm } = useContext(LoginFormContext);
  return (
    <Button
      className='py-1'
      variant='transparent'
      onClick={handleOpenLoginForm}
    >
      Sign In
    </Button>
  );
};

const Footer = () => {
  const { mode } = useTheme();
  return (
    <footer
      className={clsx(
        mode === 'dark' ? 'text-white' : 'text-black',
        'bottom-2 z-50',
        'border-t py-2 ',
        'w-screen',
        mode === 'dark' ? 'border-gray-50' : 'border-dark'
      )}
    >
      <ul className='flex h-20 w-full items-center justify-center gap-4'>
        {[BsFacebook, BsInstagram, BsTwitter, BsGithub].map((Icon, i) => (
          <li
            className='text-3xl hover:cursor-pointer hover:text-primary-500'
            key={`icon-${i}`}
          >
            <Icon />
          </li>
        ))}
      </ul>

      <section className='text-center'>
        © {new Date().getFullYear()}
        <UnderlineLink href='/' className='pl-1'>
          PersonalFinance
        </UnderlineLink>
      </section>
    </footer>
  );
};
