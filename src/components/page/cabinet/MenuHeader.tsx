import React from 'react'
import clsx from 'clsx';
import { useTheme } from '@/context/ThemeProvider';


function MenuHeader({children}:{children:JSX.Element | JSX.Element [] }){
    const { mode } = useTheme()
    return (
      <header
        className={clsx(
          'w-full',
          'sticky top-0 z-40',
          'flex items-center justify-between px-7 py-4',
          mode === 'light' ? 'bg-gray-300' : 'bg-gray-900'
        )}
      >
        {children}
      </header>
    );
  };

export default MenuHeader