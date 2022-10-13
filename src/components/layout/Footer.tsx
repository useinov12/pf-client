import React from 'react'
import UnderlineLink from '@/components/links/UnderlineLink';
import {ThemeContext} from '@/context/ThemeProvider'
import clsx from 'clsx';

const Footer = () => {
  const {
    // color, 
    mode
  } = React.useContext(ThemeContext)
  return (
    <footer className={clsx('bottom-2 z-50 flex justify-center', mode === 'dark' ? 'text-white' : 'text-black' )}>
        © {new Date().getFullYear()} {''}
        <UnderlineLink href='/' className='pl-1'>
            PersonalFinance
        </UnderlineLink>
    </footer>
  )
}

export default Footer


