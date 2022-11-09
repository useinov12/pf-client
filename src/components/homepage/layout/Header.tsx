import * as React from 'react';
import { Form as LoginForm } from '@/components/LoginForm/Form';
import clsx from 'clsx';
import { FaMoon, FaSun } from 'react-icons/fa';

import Button from '../../buttons/Button';
import User from '../../User';
import { ThemeContext } from '@/context/ThemeProvider';
import { UserContext } from '@/context/UserProvider';
import Image from 'next/image';
import Link from 'next/link';
import { LoginFormContext } from '@/context/LoginFormProvider';

export default function Header() {
  const { mode, setMode } = React.useContext(ThemeContext);
  const { setOpenLoginForm } = React.useContext(LoginFormContext);
  const { user } = React.useContext(UserContext);

  return (
    <nav
      className={clsx(
        'top-0 z-50 ',
        'py-3 px-3',
        mode === 'dark' ? 'text-white' : 'text-black',
        'mx-auto',
        'flex',
        'items-center justify-between',
        'sm:max-w-screen-sm',
        'md:max-w-screen-md ',
        'lg:max-w-screen-lg',
        'xl:max-w-screen-xl'
      )}
    >
      <LoginForm/>
      
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
          {user ? (
            // <User />
            <Link href='/cabinet'>
              <Button className='text-md py-1'>Cabinet</Button>
            </Link>
          ) : (
            <Button
              className='py-1'
              variant={mode === 'dark' ? 'light' : 'dark'}
              onClick={() => setOpenLoginForm(true)}
            >
              Login
            </Button>
          )}
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
    </nav>
  );
}
