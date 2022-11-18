import * as React from 'react';
import Header from './Header';
import Footer from './Footer';
import clsx from 'clsx';
import LoginFormProvider from '@/context/LoginFormProvider';
import { ThemeContext } from '@/context/ThemeProvider';


export default function Layout({ children }: { children: React.ReactNode }) {
  const { color, mode } = React.useContext(ThemeContext);

  return (
    <LoginFormProvider>
      <div
        className={clsx(
          'w-screen',
          'overflow-x-hidden',
          mode === 'dark' ? 'text-gray-100' : 'text-gray-800',
          mode === 'dark' 
          ? 'bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gray-700 via-gray-900 to-black ' 
          : 'bg-[conic-gradient(at_top,_var(--tw-gradient-stops))] from-gray-700 via-gray-100 to-gray-700 ',
          color,
        )}
      >
        <Header />
        <div
          className='relative h-full w-full'
        >
          {children}
        </div>
        <Footer />
      </div>
    </LoginFormProvider>
  );
}
