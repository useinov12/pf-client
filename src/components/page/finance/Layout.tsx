import React from 'react';
import clsx from 'clsx';
import Image from 'next/image';
import { ThemeContext } from '@/context/ThemeProvider';
import Button from '@/components/buttons/Button';
import { FaMoon, FaSun } from 'react-icons/fa';
import Link from 'next/link';
import Navbar from './Navbar';

const Layout = ({ children }: { children: JSX.Element }) => {
  const { mode, setMode } = React.useContext(ThemeContext);
  return (
    <div
      className={clsx(
        'h-screen w-screen',
        'overflow-hidden',
        mode === 'dark' ? 'bg-dark text-gray-100' : 'bg-gray-200 text-gray-800'
      )}
    >
      <div
        className={clsx(
          'mx-auto px-3 sm:max-w-screen-sm',
          'md:max-w-screen-md ',
          'lg:max-w-screen-2xl',
          'h-full w-full'
        )}
      >
        <Header />

        <main className='flex h-5/6 w-full gap-2'>
          <Navbar />
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;



const Header = () => {
  const { mode, setMode } = React.useContext(ThemeContext);
  return (
    <header className='flex items-center justify-between py-3'>
      <div className='flex items-center gap-20'>
        <Link href='/'>
          <Image
            src={'/images/logo.png'}
            width={70}
            height={64}
            className='cursor-pointer'
          />
        </Link>
        <h3>Overview</h3>
      </div>

      <div className='flex items-center gap-2'>
        <Button
          className='text-md py-1'
          variant={mode === 'dark' ? 'light' : 'dark'}
          onClick={() => {}}
        >
          U
        </Button>
        <Button
          className='py-2'
          variant={mode === 'dark' ? 'light' : 'dark'}
          onClick={() => {
            setMode(mode === 'light' ? 'dark' : 'light');
          }}
        >
          {mode === 'light' ? <FaMoon /> : <FaSun />}
        </Button>
      </div>
    </header>
  );
};
