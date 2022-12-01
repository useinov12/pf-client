import React from 'react'
import Button from '../../buttons/Button';
import { ThemeContext } from '@/context/ThemeProvider';
import { FaMoon, FaSun } from 'react-icons/fa';

const ThemeButton = () => {
    const { mode, setMode } = React.useContext(ThemeContext);
    return (
      <Button
        className='py-2'
        variant={mode === 'dark' ? 'light' : 'dark'}
        onClick={() => {
          setMode(mode === 'light' ? 'dark' : 'light');
        }}
      >
        {mode === 'light' ? <FaMoon /> : <FaSun />}
      </Button>
    );
  };
export default ThemeButton