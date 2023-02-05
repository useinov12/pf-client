import clsx from 'clsx';
import { ReactNode } from 'react';

import LayoutCommon from '@/components/shared/LayoutCommon';

import { MobileSidebar, Navbar } from './Navbar';

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
  return (
    <section
      className={clsx('overflow-x-hidden overflow-y-scroll', 'h-full w-full')}
    >
      {children}
    </section>
  );
}
