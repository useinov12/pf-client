import React from 'react'
import clsx from 'clsx';
import { ThemeContext } from '@/context/ThemeProvider';
import { FaMoon, FaSun } from 'react-icons/fa';

const ThemeButton = () => {
    const { mode, setMode } = React.useContext(ThemeContext);
    return (
      <button
        className={clsx(
          'py-2 px-3 text-2xl',
          'hover:opacity-80'
        )}
        onClick={() => {
          setMode(mode === 'light' ? 'dark' : 'light');
        }}
      >
        {mode === 'light' ? <FaMoon /> : <FaSun />}
      </button>
    );
  };
export default ThemeButton