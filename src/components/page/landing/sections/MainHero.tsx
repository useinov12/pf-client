import React, { ReactNode } from 'react';
import clsx from 'clsx';
import ArrowLink from '@/components/links/ArrowLink';
import Logo from '@/components/shared/Logo';
import Button from '@/components/buttons/Button';
import { useTheme } from '@/context/ThemeProvider';
import Polkadot from '../../../shared/Polkadot';

export default function MainHeroSection() {
  return (
    <Container className='mb-20 flex flex-col gap-6 overflow-hidden py-5 lg:flex-row'>
      <HeroText className='mt-20 h-full flex-none lg:w-1/2' />
      <HeroDemo className='shrink' />
    </Container>
  );
}

interface SectionWrapperProps {
  className?: string;
  children?: ReactNode;
}

const Container = ({ children, className }: SectionWrapperProps) => {
  return (
    <div className='relative h-full w-full'>
      <BgSurface />
      <div
        className={clsx(
          'relative',
          'mx-auto mt-2',
          'sm:max-w-screen-sm',
          'md:max-w-screen-xl ',
          'lg:max-w-screen-2xl',
          className
        )}
      >
        {children}
      </div>
    </div>
  );
};

const BgSurface = () => {
  const { mode } = useTheme();
  return (
    <div
      className={clsx(
        'absolute',
        'mt-[24rem] lg:mt-0',
        'h-screen w-1/2',
        'lg:w-1/3',
        'right-0',
        'rounded-tl-3xl rounded-bl-3xl',
        mode === 'light' ? 'bg-gray-400/90' : 'bg-gray-900/50'
      )}
    />
  );
};

const HeroDemo = ({ className }: { className?: string }) => {
  return (
    <section
      className={clsx(
        'relative',
        'flex items-center justify-center',
        className
      )}
    >
      <Polkadot className={clsx('absolute top-16 -left-10', 'h-80 w-2/3')} />
      <div
        className={clsx(
          'mt-28',
          'h-[30rem] w-[30rem]',
          'translate-x-20 sm:translate-x-0',
          'md:h-[40rem] md:w-[40rem]',
          'bg-gray-300',
          'rounded-2xl drop-shadow-lg'
        )}
      />
    </section>
  );
};

const HeroText = ({ className }: { className?: string }) => {
  return (
    <section
      className={clsx('flex items-center justify-center px-6', className)}
    >
      <div className='flex w-fit flex-col  gap-6'>
        <div className='flex items-center gap-4'>
          <div className='w-1/5 flex-none'>
            <Logo width={120} height={103} />
          </div>
          <h2 className='shrink text-2xl tracking-wide sm:mt-5 sm:text-2xl md:text-4xl'>
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
