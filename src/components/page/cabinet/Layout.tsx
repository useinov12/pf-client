import clsx from 'clsx';
import { useState, useEffect, ReactNode } from 'react';
// import Navbar from './Navbar';
import LayoutCommon from '@/components/shared/LayoutCommon';
import Logo from '@/components/shared/Logo';
import ThemeSwitch from '@/components/shared/ThemeSwitch';

const Layout = ({ children }: { children: ReactNode }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  /* little delay before start page fade-in */
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <LayoutCommon className={clsx(
      'h-screen w-screen',
      isLoaded && 'fade-in-start'
    )} withWrapper>
      <Navbar />
      <main className='flex h-5/6 flex-col gap-2 md:flex-row' data-fade='2'>
        {children}
      </main>
    </LayoutCommon>
  );
};

export default Layout;



const Navbar = () => {
  return (
    <nav className='flex items-center justify-between py-3' data-fade='1'>
      <div className='inline-flex items-center gap-4'>
        <Logo />
      </div>
      <div className='flex justify-center gap-3'>
        <ThemeSwitch />
      </div>
    </nav>
  );
};
