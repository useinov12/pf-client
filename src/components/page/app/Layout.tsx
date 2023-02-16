import clsx from 'clsx';
import { ReactNode, useEffect, useState } from 'react';

import Sidebar from '@/components/page/app/Sidebar';
import LayoutCommon from '@/components/shared/LayoutCommon';

import { Navbar } from './Navbar';

export default function Layout({ children }: { children: ReactNode }) {
  const [isLoaded, setIsLoaded] = useState(false);

  /* little delay before start page fade-in */
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);
  return (
    <LayoutCommon
      className={clsx(
        'h-auto min-h-screen w-screen',
        isLoaded && 'fade-in-start',
        'overflow-hidden'
      )}
      withWrapper
    >
      <Navbar />
      <main>
        <Sidebar />
        {children}
      </main>
    </LayoutCommon>
  );
}
