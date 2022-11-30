import { useContext, useState, useEffect } from 'react';
import clsx from 'clsx';
import { ThemeContext } from '@/context/ThemeProvider';
import Navbar from './Navbar';

const Layout = ({ children }: { children: JSX.Element[] }) => {
  const { mode } = useContext(ThemeContext);

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
        'h-screen w-screen',
        'overflow-hidden',
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
        <Navbar />
        <main
          className='flex h-5/6 w-full flex-col gap-3 md:flex-row'
          data-fade='2'
        >
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
