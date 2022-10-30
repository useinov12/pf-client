import * as React from 'react';
import LoginForm from '@/components/LoginForm';
import clsx from 'clsx';
import { FaMoon, FaSun } from 'react-icons/fa';

import Button from '../buttons/Button';
import User from '../User';
import { ThemeContext } from '@/context/ThemeProvider';
import { UserContext } from '@/context/UserProvider';
import Image from 'next/image';

export default function Header() {
  const { mode, setMode } = React.useContext(ThemeContext);
  const { user } = React.useContext(UserContext);

  const [openLoginForm, setOpenLoginForm] = React.useState(false);
  return (
    <nav
      className={clsx(
        'top-0 z-50 ',
        'py-3',
        mode === 'dark' ? 'text-white' : 'text-black',
        'max-w-screen-xl',
        'mx-auto',
        'flex',
        'items-center justify-between',
        'max-w-screen-md',
        'lg:max-w-screen-xl'
      )}
    >
      <LoginForm
        openLoginForm={openLoginForm}
        setOpenLoginForm={setOpenLoginForm}
      />
      <Image src={'/images/logo.png'} width={90} height={80} />
      <ul className={clsx( 'inline-flex gap-5 items-center')}>
        <li>
          {user ? (
            <User />
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
              setOpenLoginForm(false);
            }}
          >
            {mode === 'light' ? <FaMoon /> : <FaSun />}
          </Button>
        </li>
      </ul>
    </nav>
  );
}
