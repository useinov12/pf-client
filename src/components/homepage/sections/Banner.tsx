import React from 'react';
import clsx from 'clsx';
import Card from '../cards/Card';
import Button from '@/components/buttons/Button';

const Banner = () => {
  return (
    <article className={clsx(
        'mx-auto flexjustify-center',
        'sm:max-w-screen-sm px-3',
        'md:max-w-screen-md ',
        'lg:max-w-screen-lg',
        'xl:max-w-screen-xl'
    )}>
      <Card
        className={clsx(
          'my-28',
          'h-[24rem] w-5/6 lg:w-full',
          'mx-4 lg:mx-0',
          'overflow-hidden',
          'shadow-2xl',
          'ring-2 ring-white'
        )}
      >
        <div
          className='group relative h-full w-full
            md:bg-gradient-to-bl md:from-sky-400 md:to-blue-500'
        >
          <div
            className={clsx(
              'md:absolute md:h-1/2',
              'top-4 left-4 z-40 rounded-md bg-sky-500 px-2 py-1 shadow-lg',
              'md:bg-transparent md:shadow-none',
              'md:top-3 md:left-6 md:p-0'
            )}
          >
            <h1 className='text-4xl text-white drop-shadow lg:text-dark'>
              PersonalFinance
            </h1>
            <p className='text-2xl font-bold tracking-tight text-gray-50 drop-shadow'>
              Try and get sence of <br />
              financial clarity today.
            </p>
          </div>
          <div
            className={clsx(
              'flex h-full w-3/4 flex-col px-6 py-3',
              `bg-[url('../../public/images/banner.png')] bg-cover`,
              'float-right',
              'rounded-tl-[10rem]',
              'flex justify-end',
              'group-hover:blur-sm',
              'transition-all duration-100'
            )}
          ></div>
          <div className='absolute bottom-3 right-3 inline-flex h-1/2 items-center gap-5 self-end sm:right-5'>
            <Button className='px-6 py-1 text-2xl'>Try Demo</Button>
            <Button className='px-6 py-1 text-2xl'>Sign Up</Button>
          </div>
        </div>
      </Card>
    </article>
  );
};

export default Banner;
