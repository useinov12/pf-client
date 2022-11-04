import React from 'react';
import clsx from 'clsx';
import DemoCard from '../cards/DemoCard';
import { SiCircle } from 'react-icons/si';

const DemoSection = () => {
  return (
    <article
      className={clsx(
        'mx-auto py-5 px-3',
        'sm:max-w-screen-sm',
        'md:max-w-screen-md ',
        'lg:max-w-screen-lg',
        'xl:max-w-screen-xl'
      )}
    >
      <section
        className={clsx(
          'mb-20 lg:mb-[25rem]',
          'flex flex-col items-center justify-end',
          'md:flex-row md:items-end md:justify-between',
        )}
      >
        <div className='flex justify-start md:w-1/2'>
          <DemoCard />
        </div>

        <div
          className={clsx(
            'flex items-end justify-end',
            'my-8 lg:my-1 lg:w-1/2',
            'lg:justify-center'
          )}
        >
          <div
            className={clsx(
              'pt-2 lg:pl-5',
              'flex flex-col items-center md:items-end',
              'md:translate-y-20'
            )}
          >
            <SiCircle className='mb-2 h-16 w-16 rounded-full' />
            <p className='text-center text-xl font-bold sm:text-right'>
              Financial app that you looking for
            </p>
            <p className='text-center text-xl font-light tracking-tighter sm:text-right'>
              It was never this easy to look into your own financial state
            </p>
          </div>
        </div>
      </section>
    </article>
  );
};

export default DemoSection;
