import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const Logo = ({ width, height }: { width?: number; height?: number }) => {
  return (
    <Link href='/'>
      <Image
        src={'/images/logo.png'}
        width={width ? width : 68}
        height={height ? height : 58}
        className='cursor-pointer'
        alt='logo'
      />
    </Link>
  );
};

export default Logo;
