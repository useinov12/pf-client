import React, { ReactElement, ReactNode } from 'react';
import clsx from 'clsx';
import BlockOfCards from '../cards/BlockOfCards';
import { RiBankFill } from 'react-icons/ri';
import { AiFillCheckSquare } from 'react-icons/ai';
import ArrowLink from '@/components/links/ArrowLink';
import ButtonLink from '@/components/links/ButtonLink';
import Path from '../Path';
import { useTheme } from '@/context/ThemeProvider';
import Logo from '@/components/shared/Logo';
import Button from '@/components/buttons/Button';

export default function MainHeroSection() {
  return (
    <HeroWrapper>
      <LeftSection className=' h-full w-1/2 ' />
      <RightSection className=' h-full w-1/2 ' />
    </HeroWrapper>
  );
}

const HeroWrapper = ({ children }: { children: ReactNode }) => {
  const { mode } = useTheme();
  return (
    <article className='h-full w-full snap-start'>
      <div
        className={clsx(
          'overflow-hidden',
          'mx-auto ',
          'h-screen w-screen',
          'overflow-x-hidden',
          'flex  gap-2',
          'items-center justify-center',
          mode === 'dark' ? 'text-gray-200' : 'text-gray-800'
        )}
      >
        {children}
      </div>
    </article>
  );
};

type SectionProps = { className?: string; children?: ReactNode };

const LeftSection = ({ className, children }: SectionProps) => {
  return (
    <div 
      className={clsx(
        'mt-20 ml-20 flex flex-col gap-6', 
        className
    )}>
      <div className='flex items-center gap-4'>
        <Logo width={130} height={113} />
        <h1 className='mt-7  text-5xl tracking-wide'>PersonalFinance</h1>
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
          'pl-2 md:text-xl',
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
          'text-md w-min whitespace-nowrap rounded-md border-4 border-transparent px-6',
          'ring-4 ring-transparent hover:ring-primary-500'
        )}
      >
        Sign up
      </Button>
    </div>
  );
};

const RightSection = ({ className, children }: SectionProps) => {
  const { mode } = useTheme();
  return (
    <div className={clsx('relative ', 'overflow-hidden', className)}>
      <Polkadots className='absolute top-6 z-10 h-4/5 w-2/3 ' />
      <div
        className={clsx(
          'drop-shadow-lg',
          'absolute right-0  z-0 h-5/6  w-4/6 rounded-tl-3xl rounded-bl-3xl',
          mode === 'light' ? 'bg-gray-300/80' : 'bg-gray-400/30'
        )}
      />
    </div>
  );
};

const Polkadots = ({ className }: { className?: string }) => {
  const { mode } = useTheme();
  return (
    <svg className={clsx(className)}>
      <defs>
        <pattern
          id='myPattern'
          x='24'
          y='24'
          width='25'
          height='25'
          patternUnits='userSpaceOnUse'
        >
          <rect
            x='10'
            y='10'
            width='5'
            height='5'
            className={clsx(
              'drop-shadow',
              mode === 'light' ? 'fill-gray-500/70 ' : 'fill-gray-300 '
            )}
          />
        </pattern>
      </defs>

      <rect width='700' height='500' style={{ fill: 'url(#myPattern)' }} />
    </svg>
  );
};




export const ShowcaseSection = () => {
  return (
    <HeroWrapper>

    </HeroWrapper>
  )
}


const Showcase = () => {
  return (
    <section
      className='flex flex-col items-center justify-end'
      id='showcase-start'
    >
      <div className='flex w-full flex-col gap-3  lg:flex-row'>
        <div className='flex flex-col items-center justify-center  lg:items-start'>
          <RiBankFill className='mb-2 h-16 w-16' />
          <Path height={700} className='hidden rotate-180 lg:block' />
        </div>
        <div className='w-full'>
          <div className='mb-6 flex w-full flex-col  items-center lg:mb-0 lg:items-start'>
            <h2 className='cursor-default text-center text-2xl tracking-tight drop-shadow lg:text-left'>
              PersonalFinance
            </h2>
            <h3 className='lg:text-lefts cursor-default text-center text-xl font-normal drop-shadow'>
              will help you organize your bank data
            </h3>
            <ArrowLink
              as={ButtonLink}
              href='/'
              className={clsx(
                'py-1 px-3',
                'rounded text-center',
                'text-xl lg:my-2'
              )}
            >
              Take a look at Demo version
            </ArrowLink>
          </div>

          <div className='my-4 flex h-auto w-full flex-col gap-5 py-3 lg:flex-row'>
            <BlockOfCards />
            <section className='flex flex-col items-center py-4'>
              <ul className='flex flex-col'>
                {[
                  'Unlimited number of bank connections',
                  'Cross-bank data analyze',
                  'Configurable aggregation of data',
                  'Custom charts and tools',
                ].map((perk, i) => (
                  <li key={i} className='inline-flex items-center gap-3'>
                    <AiFillCheckSquare className='h-9 w-9' />
                    <h3>{perk}</h3>
                  </li>
                ))}
              </ul>
            </section>
          </div>
        </div>
      </div>
    </section>
  );
};
