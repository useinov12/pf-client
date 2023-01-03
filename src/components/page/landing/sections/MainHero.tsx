import React, { ReactNode } from 'react';
import clsx from 'clsx';
import ArrowLink from '@/components/links/ArrowLink';
import Logo from '@/components/shared/Logo';
import Button from '@/components/buttons/Button';
import StyledBgSection from '../shared/StyledBgSection';
import Screen from '../shared/Screen';

export default function MainHeroSection() {
  return (
    <Screen className='flex flex-col gap-6  lg:flex-row'>
      <HeroText className='h-full lg:w-1/2' />
      <HeroDemo className=' lg:w-1/2 ' />
    </Screen>
  );
}

type SectionProps = { className?: string; children?: ReactNode };

const HeroDemo = ({ className, children }: SectionProps) => {
  return (
    <StyledBgSection
      className='flex items-center justify-center lg:block'
      right
    >
      <div
        className={clsx(
          'translate-x-20 sm:translate-x-0',
          'mt-12 lg:mt-0',
          'h-[35rem] w-[35rem]',
          'lg:translate-x-20 lg:translate-y-20',
          ' bg-gray-200',
          'rounded-2xl drop-shadow-lg'
        )}
      ></div>
    </StyledBgSection>
  );
};

const HeroText = ({ className }: SectionProps) => {
  return (
    <section
      className={clsx(
        'mx-5 mt-5 ',
        'lg:mt-20 lg:ml-16',
        'flex items-center justify-center',
        className
      )}
    >
      <div className='flex w-fit flex-col  gap-6'>
        <div className='flex items-center gap-4'>
          <Logo width={120} height={103} />
          <h2 className=' mt-7 shrink text-2xl tracking-wide md:text-4xl'>
            PersonalFinance
          </h2>
        </div>

        <div className='flex items-center gap-6'>
          <p className='cursor-default rounded-md bg-primary-400/80 py-[2px] px-2 text-[.8rem] uppercase'>
            Have an account?
          </p>
          <ArrowLink href='#'>sign in</ArrowLink>
        </div>
        <h1
          className={clsx(
            'text-3xl font-extrabold',
            'sm:text-3xl md:text-4xl lg:text-5xl',
            'tracking-tight',
            'cursor-default',
            'drop-shadow-xl',
            'transition-all delay-75 duration-150'
          )}
        >
          Take control over your money
        </h1>
        <h3
          className={clsx(
            'pl-1 md:text-xl',
            'font-normal tracking-tight drop-shadow-xl',
            'transition-all delay-75 duration-150'
          )}
        >
          A financial app that lets you gather, analyze your banks data.
          <br />
          Securely conect your financial accounts in couple minutes.
        </h3>

        <Button
          className={clsx(
            'ml-1',
            'text-md w-min whitespace-nowrap rounded-md border-4 border-transparent px-6',
            'ring-4 ring-transparent hover:ring-primary-500'
          )}
        >
          Sign up
        </Button>
      </div>
    </section>
  );
};
