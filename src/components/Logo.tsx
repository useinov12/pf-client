import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const Logo = ({ width, height }: { width?: number; height?: number }) => {
  return (
    <Link href='/'>
      <Image
        src={'/images/logo.png'}
        width={width ? width : 70}
        height={height ? height : 62}
        className='cursor-pointer'
      />
    </Link>
  );
};

export default Logo;
