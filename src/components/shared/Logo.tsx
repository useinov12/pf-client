import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import clsx from 'clsx';

const Logo = ({ width, height, className }: { width?: number; height?: number, className?:string }) => {
  return (
    <div className={clsx('cursor-pointer', 'flex justify-center items-center', className)}>
      <Link href='/'>
        <Image
          src={'/images/logo.png'}
          width={width ? width : 68}
          height={height ? height : 58}
          alt='logo'
        />
      </Link>
    </div>
  );
};

export default Logo;
