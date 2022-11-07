import * as React from 'react';
import Header from './Header';
import Footer from './Footer';
import clsx from 'clsx';

import { ThemeContext } from '@/context/ThemeProvider';

export default function Layout({ children }: { children: React.ReactNode }) {
  const { color, mode } = React.useContext(ThemeContext);

  return (
    <>
      <div
        className={clsx(
          'w-screen',
          'overflow-x-hidden',
          mode === 'dark' ? 'bg-dark text-gray-100' : 'bg-gray-200 text-gray-800',
          color,
        )}
      >
        <Header />
        <div
          className={clsx(
            'relative h-full',
            'w-full',
            'py-8',
          )}
        >
          {children}
        </div>
        <Footer />
      </div>
    </>
  );
}
