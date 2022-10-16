import React, { Children, ReactNode } from 'react';
import clsx from 'clsx';
import StepCard from './StepCard';
import { StaticImageData } from 'next/image';

const StepSection: React.FC<{
  icon?: JSX.Element;
  text1: string;
  text2: string;
  imageSrc?: StaticImageData;
  className?: string;
  children:ReactNode
}> = ({ icon, text1, text2, imageSrc, className, children }) => {
  return (
    <div
      className={clsx(
        'm-4 py-2',
        'flex',
        'max-w-screen-lg',
        'flex-col',
        'group',
        'items-center justify-between w-full',
        'md:flex-row',
        'my-6',
      )}
    >
      <StepCard
        text1={text1}
        text2={text2}
        imageSrc={imageSrc ?? imageSrc}
        icon={icon ?? icon}
        className={clsx()}
      />
      <div
        className={clsx(
          'h-48 w-4/5 ',
          'md:h-48 md:w-3/5 ',
          'p-2 text-xl',
          'flex flex-col',
          'justify-start',
          'items-center',
          'md:items-start',
          'max-w-[50%]'
        )}
      >
        <>
        {children}
        </>
      </div>
    </div>
  );
};

export default StepSection;
