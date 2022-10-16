import * as React from 'react';
import Header from './Header';
import Footer from './Footer';
import clsx from 'clsx';

import { ThemeContext } from '@/context/ThemeProvider';

export default function Layout({ children }: { children: React.ReactNode }) {
  const { color, mode } = React.useContext(ThemeContext);
  const textColor = mode === 'dark' ? 'text-gray-300' : 'text-gray-800';

  return (
    <div
      className={clsx(
        'w-full overflow-x-hidden',
        mode === 'dark' ? 'bg-zinc-900' : 'bg-gray-50',
        color,
        textColor
      )}
    >
      <Header />
      <div className={clsx('relative h-full', 'min-h-[90vh] w-screen', 'py-8')}>
        {children}
      </div>
      <Footer />
    </div>
  );
}
