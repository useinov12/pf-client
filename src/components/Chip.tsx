import React from 'react';
import { ThemeContext } from '@/context/ThemeProvider';
import clsx from 'clsx';


const Chip = ({text, className}:{text:string, className?:string}) => {
  const { mode } = React.useContext(ThemeContext);

  const chipStyle = mode === 'dark' ? 
  'bg-gray-100 rounded-md text-gray-800'
  : 'bg-zinc-800 rounded-md text-gray-50';

  return (
    <div className={clsx(
      'font-semibold p-1',
      'transition duration-150 ease-out hover:ease-in',
      'hover:bg-gradient-to-tr from-primary-700 via-primary-600 to-primary-400 hover:border-transparent',
      'hover:text-white cursor-pointer inline-block',
      chipStyle,
      className
    )}>
      {text}
    </div>
  )
}

export default Chip;