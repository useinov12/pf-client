import * as React from 'react';
import Header from './Navbar';
import Footer from './Footer';
import clsx from 'clsx';
import { ThemeContext } from '@/context/ThemeProvider';

export default function Layout({ children }: { children: React.ReactNode }) {
  const { mode } = React.useContext(ThemeContext);


  return (
    <div
      className={clsx(
        'w-screen',
        'overflow-x-hidden',
        mode === 'dark' ? 'text-gray-100' : 'text-gray-800',
        mode === 'dark'
          ? 'bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gray-700 via-gray-900 to-black '
          : 'bg-[conic-gradient(at_top,_var(--tw-gradient-stops))] from-gray-700 via-gray-100 to-gray-700 '
      )}
    >
      <Header />
      <main className='relative h-full w-full snap-y'>{children}</main>
      <Footer />
    </div>
  );
}
