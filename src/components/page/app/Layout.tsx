import { ReactNode } from 'react';

import LayoutCommon from '@/components/shared/LayoutCommon';

import { MobileSidebar, Navbar } from './Navbar';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <LayoutCommon className='min-h-screen w-screen' withWrapper>
      <Navbar />
      <main className=''>
        <MobileSidebar />
        {children}
      </main>
    </LayoutCommon>
  );
}
