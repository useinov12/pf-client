import { ReactNode } from 'react';
import clsx from 'clsx';
import { useTheme } from '@/context/ThemeProvider';
import Sidebar, { MobileMenuButton } from './Sidebar';
import ThemeSwitch from '@/components/shared/ThemeSwitch';
import Logo from '@/components/shared/Logo';
import LayoutCommon from '@/components/shared/LayoutCommon';
import Link from 'next/link';
import Button from '@/components/buttons/Button';
import { RiUserSettingsFill } from 'react-icons/ri';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <LayoutCommon className='h-screen w-screen 2xl:py-4' withWrapper>
      <ContentWrapper>
        <Navbar />
        <main className='flex h-[90vh] w-full'>
          <Sidebar />
          {children}
        </main>
      </ContentWrapper>
    </LayoutCommon>
  );
}

function ContentWrapper({ children }: { children: ReactNode }) {
  const { mode } = useTheme();

  return (
    <section
      className={clsx(
        'overflow-x-hidden overflow-y-scroll',
        'h-full w-full',
        '2xl:rounded 2xl:border',
        mode === 'light' ? 'border-gray-400/50' : 'border-gray-300/20',
        mode === 'light' ? 'bg-gray-200' : 'bg-gray-900'
      )}
    >
      {children}
    </section>
  );
}

function Navbar() {
  const { mode } = useTheme();
  return (
    <div
      className={clsx(
        'h-16',
        'border-b',
        'flex items-center justify-between px-3 py-0',
        mode === 'light' ? 'border-gray-500/50' : 'border-gray-300/20'
      )}
    >
      <div className='inline-flex items-center gap-1'>
        <MobileMenuButton />
        <div className='inline-flex items-center gap-2'>
          <Logo
            width={62}
            height={56}
            className='scale-100 hover:scale-[1.03]'
          />
          <h3 className='mt-2 hidden sm:block'>Personal Finance</h3>
        </div>
      </div>
      <div className='inline-flex items-center gap-3'>
        <CabinetLink />
        <ThemeSwitch />
      </div>
    </div>
  );
}

const CabinetLink = () => {
  return (
    <Link href='/cabinet'>
      <Button
        variant='transparent'
        className='text-md inline-flex items-center gap-1 py-1'
      >
        <RiUserSettingsFill className='text-3xl sm:text-2xl' />
        <span className='hidden sm:block'>Cabinet</span>
      </Button>
    </Link>
  );
};
