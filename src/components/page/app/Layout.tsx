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

export default function Layout({
  children,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <LayoutCommon withWrapper className='h-screen w-screen 2xl:py-5 2xl:px-4'>
      <ContentWrapper>
        <Navbar />
        <div className='flex h-full w-full '>
          <Sidebar />
          <main className='z-0 w-full px-3'>{children}</main>
        </div>
      </ContentWrapper>
    </LayoutCommon>
  );
}

function ContentWrapper({ children }: { children: ReactNode }) {
  const { mode } = useTheme();
  return (
    <section
      className={clsx(
        'overflow-hidden',
        'h-screen w-screen  2xl:h-[90vh]',
        '2xl:rounded 2xl:border',
        mode === 'light' ? 'border-gray-400/50' : 'border-gray-300/20',
        // mode === 'light' ? 'bg-dark/10' : 'bg-gray-300/10'
        // mode === 'light' ? 'bg-gray-300' : 'bg-gray-900',
        mode === 'light' ? 'bg-gray-200' : 'bg-gray-900',
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
          <h3 className='mt-2'>Personal Finance</h3>
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
        <RiUserSettingsFill className='text-2xl' />
        <span>Cabinet</span>
      </Button>
    </Link>
  );
};
