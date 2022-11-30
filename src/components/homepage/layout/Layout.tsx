import * as React from 'react';
import Header from './Navbar';
import Footer from './Footer';
import clsx from 'clsx';
import { ThemeContext } from '@/context/ThemeProvider';

export default function Layout({ children }: { children: React.ReactNode }) {
  const { mode } = React.useContext(ThemeContext);

  const [isLoaded, setIsLoaded] = React.useState(false);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

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
      <div
        className={clsx(
          'mx-auto px-3 sm:max-w-screen-sm',
          'md:max-w-screen-lg ',
          'lg:max-w-screen-xl',
          'h-full w-full',
          isLoaded && 'fade-in-start'
        )}
      >
        <Header />
        <main className='relative h-full w-full'>{children}</main>
        <Footer />
      </div>
    </div>
  );
}
