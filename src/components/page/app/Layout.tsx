import { ReactNode, useEffect, useState } from 'react';
import clsx from 'clsx';
import { useTheme } from '@/context/ThemeProvider';
import Sidebar, { MobileMenuButton } from './Sidebar';
import ThemeButton from '@/components/ThemeSwitch';
import { useRouter } from 'next/router';
import Logo from '@/components/Logo';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/Tooltip';
import { AppPageProvider } from '@/context/AppPageContext';
import LayoutCommon from '@/components/LayoutCommon';
import { MobileSidebar } from './Sidebar';

export default function Layout({ children }: { children: ReactNode }) {

  return (
    <AppPageProvider>
      <LayoutCommon withWrapper className='h-screen'>
        <Navbar />
        <main
          className='relative flex h-5/6 w-full
          gap-2 overflow-hidden px-1
          transition-all duration-75'
        >
          <Sidebar className='hidden md:block' />
          <MobileSidebar />
          <MainSection>{children}</MainSection>
        </main>
      </LayoutCommon>
    </AppPageProvider>
  );
}

const MainSection = ({ children }: { children: ReactNode }) => {
  const { mode } = useTheme();
  const router = useRouter();
  const location = router.asPath.slice(5).toUpperCase();
  return (
    <section
      className={clsx(
        'w-screen rounded border',
        mode === 'light' ? 'border-dark/50' : 'border-gray-300/50',
        'px-2 py-1'
      )}
    >
      <div className='flex items-center justify-between px-2 md:hidden '>
        <MobileMenuButton />
        <h2>{location}</h2>
      </div>
      {children}
    </section>
  );
};

const Navbar = () => {
  const router = useRouter();
  const location = router.asPath.slice(5).toUpperCase();

  return (
    <header className='flex items-center justify-between py-3 px-2'>
      <div className='flex items-center justify-center gap-10'>
        <Tooltip placement='right-start'>
          <TooltipTrigger>
            <Logo />
          </TooltipTrigger>
          <TooltipContent className='rounded bg-gray-600 p-1 text-sm text-white '>
            <p>Landing page</p>
          </TooltipContent>
        </Tooltip>

        <strong className='hidden md:block'>{location}</strong>
      </div>

      <nav className='flex items-center gap-2'>
        <ThemeButton />
      </nav>
    </header>
  );
};
