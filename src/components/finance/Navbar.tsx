import React from 'react';
import clsx from 'clsx';
import { ThemeContext } from '@/context/ThemeProvider';

const Navbar = () => {
  const { mode, setMode } = React.useContext(ThemeContext);
  return (
    <nav
      className={clsx(
        'h-full w-16 rounded border',
        mode === 'light' ? 'border-dark/50' : 'border-gray-300/50'
      )}
    >
      <ul className='flex flex-col items-center gap-2 py-2'>
        {['O', 'B', 'A', 'T'].map((item, i) => (
          <li
            key={item}
            className={clsx(
              'flex h-12 w-12 items-center justify-center rounded border ',
              mode === 'light'
                ? 'border border-dark/50'
                : 'border border-gray-300/50'
            )}
          >
            <h4>{item}</h4>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
