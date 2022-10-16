import * as React from 'react';
import LoginForm from '@/components/LoginForm';
import clsx from 'clsx';
import { FaMoon, FaSun } from 'react-icons/fa';

import Logo from '@/components/Logo';
import Button from '../buttons/Button';
import User from '../User';
import { ThemeContext } from '@/context/ThemeProvider';
import { UserContext } from '@/context/UserProvider';

export default function Header() {
  const { mode, setMode } = React.useContext(ThemeContext);
  const { user } = React.useContext(UserContext);

  const [openLoginForm, setOpenLoginForm] = React.useState(false);
  return (
    <header
      className={clsx(
        'top-0 z-50 h-24',
        mode === 'dark' ? 'text-white' : 'text-black',
        'px-1 py-4',
        'sm:px-2 sm:py-4',
        'sm:py-4 md:px-4',
        'sm:py-4 lg:px-4'
      )}
    >
      <LoginForm
        openLoginForm={openLoginForm}
        setOpenLoginForm={setOpenLoginForm}
      />

      <div className='flex items-center justify-between '>
        <Logo withText={true} mode={mode} />
        <nav className='flex'>
          {user ? (
            <User />
          ) : (
            <Button
              className={clsx(
                'mx-1 mt-2'
                // 'text-base',
              )}
              variant={mode === 'dark' ? 'light' : 'dark'}
              onClick={() => setOpenLoginForm(true)}
            >
              Login
            </Button>
          )}
          <Button
            className={clsx(
              'mx-1 mt-2'
              // 'text-base',
            )}
            variant={mode === 'dark' ? 'light' : 'dark'}
            onClick={() => {
              setMode(mode === 'light' ? 'dark' : 'light');
              setOpenLoginForm(false);
            }}
          >
            {mode === 'light' ? <FaMoon /> : <FaSun />}
          </Button>
        </nav>
      </div>
    </header>
  );
}

