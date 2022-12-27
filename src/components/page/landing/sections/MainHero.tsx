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
      <RightSection className=' h-full w-1/2' />
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
          'items-center justify-between',
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
    <div className={clsx('mt-20 ml-20 flex flex-col gap-6', className)}>
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

      <rect width='600' height='500' style={{ fill: 'url(#myPattern)' }} />
    </svg>
  );
};

type ReusableSectionProps = {
  className?: string;
  children?: ReactNode;
  right?: boolean | undefined;
  left?: boolean | undefined;
};

const SectionWrapper = ({
  className,
  children,
  right,
  left,
}: ReusableSectionProps) => {
  const { mode } = useTheme();
  return (
    <div
      className={clsx(
        'relative ',
        'overflow-hidden',
        'flex items-center justify-center',
        'h-full w-full',
        className
      )}
    >
      <Polkadots
        className={clsx(
          'absolute z-10 ',
          'h-4/5 w-4/6',
          'top-6',
          right && 'right-20',
          left && 'left-20 ',
          !right && !left && 'inset-44 rounded-3xl'
        )}
      />
      <div
        className={clsx(
          'absolute z-0',
          'top-0',
          'h-5/6  w-3/6 ',
          'drop-shadow-lg',
          right && 'right-0 rounded-tl-3xl rounded-bl-3xl',
          left && 'left-0 rounded-tr-3xl rounded-br-3xl',
          !right && !left && 'inset-44 rounded-3xl',
          mode === 'light' ? 'bg-gray-300/80' : 'bg-gray-400/30'
        )}
      />
      <div
        className={clsx(
          'mx-auto px-4 sm:max-w-screen-sm',
          'md:max-w-screen-lg ',
          'lg:max-w-screen-xl',
          'z-30 '
        )}
      >
        {children}
      </div>
    </div>
  );
};

export const ShowcaseSection = () => {
  return (
    <HeroWrapper>
      <SectionWrapper className='w-3/5' left>
        <BlockOfCards className='w-full' />
      </SectionWrapper>
      <section className='flex w-2/5 flex-col items-center  gap-6'>
        <div className='flex items-center  gap-2  w-full'>
          <RiBankFill className='h-20 w-20' />
          <div className='flex w-full flex-col  items-center lg:mb-0 lg:items-start'>
            <h2 className='cursor-default text-center text-2xl tracking-tight drop-shadow lg:text-left'>
              PersonalFinance
            </h2>
            <h3 className='lg:text-lefts cursor-default text-center text-xl font-normal drop-shadow'>
              will help you organize your bank data
            </h3>
          </div>
        </div>
        <ul className='flex flex-col w-full ml-6'>
          {[
            'Unlimited banks connection',
            'Cross-bank data analyze',
            'Configurable aggregation of data',
            'Custom charts and tools',
          ].map((perk, i) => (
            <li key={i} className='inline-flex items-center gap-3'>
              <AiFillCheckSquare className='h-9 w-9' />
              <strong className='text-xl'>{perk}</strong>
            </li>
          ))}
        </ul>
      </section>
    </HeroWrapper>
  );
};