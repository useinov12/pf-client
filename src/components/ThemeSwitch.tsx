import React from 'react';
import clsx from 'clsx';
import { useTheme } from '@/context/ThemeProvider';
import { FaMoon, FaSun } from 'react-icons/fa';

const ThemeSwitch = () => {
  const { mode, setMode } = useTheme();
  return (
    <button
      className='py-2 px-3 text-2xl hover:opacity-80'
      onClick={() => {
        setMode(mode === 'light' ? 'dark' : 'light');
      }}
    >
      {mode === 'light' ? <FaMoon /> : <FaSun />}
    </button>
  );
};
export default ThemeSwitch;
