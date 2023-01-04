import React, { ReactNode } from 'react';
import clsx from 'clsx';
import ArrowLink from '@/components/links/ArrowLink';
import Logo from '@/components/shared/Logo';
import Button from '@/components/buttons/Button';
import { useTheme } from '@/context/ThemeProvider';
import Polkadot from '../../../shared/Polkadot';
import { useAuth } from '@/services/auth/queries';
import ButtonLink from '@/components/links/ButtonLink';
import { useLoginForm } from '@/context/LoginFormProvider';

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
        'mt-[22rem] lg:mt-0',
        'h-[90vh] w-1/2',
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
  const { data: user } = useAuth();
  const { handleOpenLoginForm } = useLoginForm();
  return (
    <section
      className={clsx(
        'flex items-center justify-center pl-3 pr-5 md:pl-12',
        className
      )}
    >
      <div className='flex w-fit flex-col  gap-2'>
        <div className='flex flex-col items-start'>
          <div className='w-1/6 flex-none'>
            <Logo width={100} height={85} />
          </div>
          <h3 className='shrink text-2xl tracking-wide md:text-3xl'>
            PersonalFinance
          </h3>
        </div>

        {user ? (
          <div className='inline-flex items-center gap-4 px-1'>
            <h2 className='text-xl'>
              Welcome,{' '}
              <span className='bg-gradient-to-r  from-primary-500 to-primary-600 bg-clip-text text-transparent'>
                {user.firstName}
              </span>
            </h2>
            <ArrowLink
              href='/cabinet'
              className='text-md bg-gradient-to-r from-primary-400 to-primary-600'
            >
              Go to cabinet
            </ArrowLink>
          </div>
        ) : (
          <div className='flex items-center gap-6'>
            <p className='cursor-default rounded-md bg-primary-400/80 py-[2px] px-2 text-[.8rem] uppercase'>
              Have an account?
            </p>
            <button
              onClick={handleOpenLoginForm}
              className='bg-transparent py-0 px-2'
            >
              <ArrowLink href='#' disabled>
                Sign In
              </ArrowLink>
            </button>
          </div>
        )}
        <h1
          className={clsx(
            'text-3xl font-extrabold',
            'sm:text-2xl md:text-3xl lg:text-4xl',
            'tracking-tight',
            'cursor-default',
            'drop-shadow-xl',
            'transition-all delay-75 duration-150'
          )}
        >
          Take control over your money
        </h1>
        <h5
          className={clsx(
            'pl-1 ',
            'font-normal tracking-tight drop-shadow-xl',
            'transition-all delay-75 duration-150'
          )}
        >
          A financial app that lets you gather, analyze your banks data
          <br />
          Securely conect your financial accounts in couple minutes
        </h5>

        {!user && (
          <Button
            className={clsx(
              'ml-1',
              'text-md w-min whitespace-nowrap rounded-md border-4 border-transparent px-6',
              'ring-4 ring-transparent hover:ring-primary-500'
            )}
          >
            Sign up
          </Button>
        )}
      </div>
    </section>
  );
};
