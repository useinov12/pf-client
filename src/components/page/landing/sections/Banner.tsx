import React from 'react';
import clsx from 'clsx';
import Button from '@/components/buttons/Button';
import Link from 'next/link';
import { LoginFormContext } from '@/context/LoginFormProvider';
import StyledBgSection from '../shared/StyledBgSection';

export default function Banner() {
  const { setOpenLoginForm } = React.useContext(LoginFormContext);
  return (
    <StyledBgSection left className='flex w-screen items-center justify-center'>
      <div
        className={clsx(
          'z-10',
          'bg-blue-500',
          'drop-shadow-lg',
          'lg:rounded-3xl',
          'h-[25rem] w-full lg:w-5/6',
          'relative overflow-hidden'
        )}
      >
        <div
          className='absolute bottom-0 z-0 h-1/3 w-full bg-blue-400/50'
          style={{ clipPath: `polygon(0 100%, 100% 100%, 0% 0%)` }}
        />
        <div
          className='absolute bottom-0 z-0 h-2/3 w-full bg-blue-700/50'
          style={{ clipPath: `polygon(100% 0%, 0% 100%, 100% 100%)` }}
        />

        <section className='flex h-full w-full flex-col items-center justify-center gap-5 tracking-tight'>
          <h1 className='text-center text-4xl  text-gray-50 drop-shadow'>
            Try and get sence of financial clarity today
          </h1>
          <p className='text-center text-lg tracking-tight text-gray-100 drop-shadow md:text-xl'>
            Expirience complete control when managing finance with peace in your
            mind
          </p>
          <div className='z-10 my-4 flex gap-8'>
            <Link href='/finance'>
              <Button variant='light' className='rounded-lg px-12 py-2 text-lg'>
                Try Demo
              </Button>
            </Link>
            <Button
              variant='light'
              onClick={() => setOpenLoginForm(true)}
              className='rounded-lg px-16 py-2 text-lg'
            >
              Sign Up
            </Button>
          </div>
        </section>
      </div>
    </StyledBgSection>
  );
}
