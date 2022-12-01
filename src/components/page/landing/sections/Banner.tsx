import React from 'react';
import clsx from 'clsx';
import Button from '@/components/buttons/Button';
import Link from 'next/link';
import { LoginFormContext } from '@/context/LoginFormProvider';

const Banner = () => {
  const { setOpenLoginForm } = React.useContext(LoginFormContext);
  return (
    <article
      className={clsx(
        'mx-auto flex justify-start',
        'w-full overflow-hidden',
        `h-[25rem] bg-[url('../../public/images/banner.png')] bg-contain`,
        'md:max-w-screen-md',
        'md:rounded-xl md:ring-4 md:ring-primary-800',
        'lg:max-w-screen-xl lg:w-5/6',
        'relative md:my-10'
      )}
    >
      <div
        className={clsx(
          'w-full self-start',
          'px-5 md:h-full md:w-max md:justify-self-start',
          'z-40 bg-sky-800 px-2 py-1 shadow-lg',
          'flex-col justify-between md:flex',
          'md:py-5'
        )}
      >
        <div className=''>
          <h1 className='text-4xl  drop-shadow'>PersonalFinance</h1>
          <p className='text-2xl font-bold tracking-tight text-gray-50 drop-shadow'>
            Try and get sence of <br />
            financial clarity today.
          </p>
        </div>

        <div className='my-4 flex gap-1'>
          <Link href='/finance'>
            <Button variant='light' className='px-6 py-1 text-xl'>
              Try Demo
            </Button>
          </Link>
          <Button
            variant='light'
            onClick={() => setOpenLoginForm(true)}
            className='px-6 py-1 text-xl'
          >
            Sign Up
          </Button>
        </div>
      </div>
    </article>
  );
};

export default Banner;
