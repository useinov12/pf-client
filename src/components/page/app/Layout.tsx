import { ReactNode } from 'react';
import clsx from 'clsx';
import { useTheme } from '@/context/ThemeProvider';
import Sidebar, { MobileMenuButton } from './Sidebar';
import ThemeButton from '@/components/shared/ThemeSwitch';
import { useRouter } from 'next/router';
import Logo from '@/components/shared/Logo';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/shared/Tooltip';
import { AppPageProvider } from '@/context/AppPageContext';
import LayoutCommon from '@/components/shared/LayoutCommon';

export default function Layout({
  children,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <AppPageProvider>
      <LayoutCommon withWrapper className='h-screen'>
        <Navbar />
        <MainSection>{children}</MainSection>
      </LayoutCommon>
    </AppPageProvider>
  );
}

function MainSection({ children }: { children: ReactNode }) {
  const { mode } = useTheme();
  return (
    <section
      className={clsx(
        'h-[85vh] w-full',
        'border-t border-b sm:rounded-md sm:border',
        mode === 'light' ? 'border-gray-100/50' : 'border-gray-300/20',
        mode === 'light' ? 'bg-dark/10' : 'bg-gray-300/10',
        'overflow-hidden drop-shadow'
      )}
    >
      <SectionHeader />
      <div className='flex h-full w-full'>
        <Sidebar />
        <main className='z-0 ml-20'>{children}</main>
      </div>
    </section>
  );
}

function SectionHeader() {
  const { mode } = useTheme();
  const router = useRouter();
  const location = router.asPath.slice(5).toUpperCase();
  return (
    <div
      className={clsx(
        'border-b',
        'flex items-center justify-between px-5 py-3',
        mode === 'light' ? 'bg-gray-400' : 'bg-gray-900',
        mode === 'light' ? 'border-gray-500/50'  : 'border-gray-300/20'
      )}
    >
      <MobileMenuButton />
      <strong className='text-xl'>{location}</strong>
    </div>
  );
}

function Navbar() {
  return (
    <header className='flex items-center justify-between py-1 px-2'>
      <div className='flex items-center justify-center gap-10'>
        <Tooltip placement='right-start'>
          <TooltipTrigger>
            <Logo />
          </TooltipTrigger>
          <TooltipContent className='rounded bg-gray-600 p-1 text-sm text-white '>
            <p>Landing page</p>
          </TooltipContent>
        </Tooltip>
      </div>

      <nav className='flex items-center gap-2'>
        <ThemeButton />
      </nav>
    </header>
  );
}
