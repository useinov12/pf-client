import { ReactNode } from 'react';
import clsx from 'clsx';
import { useTheme } from '@/context/ThemeProvider';
import { Navbar, MobileSidebar } from './Navbar';
import LayoutCommon from '@/components/shared/LayoutCommon';


export default function Layout({ children }: { children: ReactNode }) {
  return (
    <LayoutCommon className='h-screen w-screen' withWrapper>
      <ContentWrapper>
        <Navbar />
        <main className='flex h-[90vh] w-full'>
          <MobileSidebar />
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
        '2xl:border-l 2xl:border-r',
        mode === 'light' ? 'border-gray-400/50' : 'border-gray-300/20',
        mode === 'light' ? 'bg-gray-300' : 'bg-gray-900'
      )}
    >
      {children}
    </section>
  );
}
