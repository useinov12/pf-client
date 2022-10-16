import React from 'react'
import Image, { StaticImageData } from 'next/image';
import clsx from 'clsx';


const StepCard: React.FC<{
    icon?: JSX.Element;
    text1: string;
    text2: string;
    imageSrc?: StaticImageData;
    className?: string;
  }> = ({ icon, text1, text2, imageSrc, className }) => {
    return (
      <div
        className={clsx(
          'h-44 w-52',
          'md:h-48 md:w-80',
          'py-3 px-2 my-2',
          'flex flex-col items-center',
          'justify-center rounded-3xl shadow-xl',
          'bg-white',
          'cursor-pointer',
          // 'group',
          'scale-100 group-hover:scale-[1.02] group-active:scale-[0.97] motion-safe:transform-gpu',
          'duration-25 transition',
          'motion-reduce:hover:scale-100',
          'ring-2 ring-primary-500',
          'group-hover:ring-4',
          'text-gray-800',
          className
        )}
      >
        {icon && (
          <div
            className={clsx(
              'mb-2 text-6xl',
              'scale-100 ease-in group-hover:scale-[1.1]  first-line:group-hover:-translate-y-2',
              'transition duration-[550]',
              'motion-reduce:hover:rotate-180'
            )}
          >
            {icon}
          </div>
        )}
        {imageSrc && (
          <Image
            src={imageSrc}
            width={110}
            height={110}
            className={clsx(
              'scale-100 ease-in group-hover:scale-[1.1]  first-line:group-hover:-translate-y-2',
              'transition duration-[550]',
              'motion-reduce:hover:rotate-180'
            )}
          />
        )}
        <h3 className={clsx()}>{text1}</h3>
        <h3 className={clsx()}>{text2}</h3>
      </div>
    );
  };

export default StepCard