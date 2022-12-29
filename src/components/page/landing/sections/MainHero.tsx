import React, { ReactNode } from 'react';
import clsx from 'clsx';
import BlockOfCards from '../cards/BlockOfCards';
import { RiBankFill } from 'react-icons/ri';
import { AiFillCheckSquare } from 'react-icons/ai';
import ArrowLink from '@/components/links/ArrowLink';
import { useTheme } from '@/context/ThemeProvider';
import Logo from '@/components/shared/Logo';
import Button from '@/components/buttons/Button';
import Image from 'next/image';

export default function MainHeroSection() {
  return (
    <Screen className='flex flex-col gap-6  lg:flex-row'>
      <HeroText className='h-full lg:w-1/2' />
      <HeroDemo className=' lg:w-1/2 ' />
    </Screen>
  );
}

type SectionWrapperProps = {
  children: ReactNode;
  className?: string;
};

const Screen = ({ children, className }: SectionWrapperProps) => {
  return (
    <section
      className={clsx(
        'h-full min-h-screen w-screen',
        'overflow-hidden',
        className
      )}
    >
      {children}
    </section>
  );
};

type SectionProps = { className?: string; children?: ReactNode };

const HeroDemo = ({ className, children }: SectionProps) => {
  return (
    <SectionWithBG right>
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
    </SectionWithBG>
  );
};

const HeroText = ({ className, children }: SectionProps) => {
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

type SectionWithBGProps = {
  className?: string;
  children?: ReactNode;
  left?: boolean | undefined;
  right?: boolean | undefined;
};

const SectionWithBG = ({
  className,
  children,
  right,
  left,
}: SectionWithBGProps) => {
  const { mode } = useTheme();
  return (
    <div
      className={clsx(
        'relative h-screen overflow-hidden',
        'flex items-start justify-center lg:block',
        className
      )}
    >
      <div
        className={clsx(
          'absolute',
          right && 'right-0',
          left && 'left-0',
          mode === 'light' ? 'bg-gray-400/50' : 'bg-gray-900/30',
          'h-[43rem] w-1/2 lg:w-[20rem]',
          right && 'rounded-tl-2xl rounded-bl-2xl',
          left && 'rounded-tr-2xl rounded-br-2xl',
          'drop-shadow-lg'
        )}
      />
      <Polkadots
        className={clsx(
          'absolute',
          'top-3',
          'h-80 w-2/3',
          'lg:top-5 lg:left-3',
          right && 'left-10',
          left && 'right-10'
        )}
      />
      {children}
    </div>
  );
};

export const ShowcaseSection = () => {
  return (
    <Screen className='flex flex-col gap-6  lg:flex-row-reverse'>
      <DemoText className='lg:w-2/5' />
      <SectionWithBG className='h-screen lg:w-3/5' left>
        <BlockOfCards
          className={clsx(
            'translate-x-10 sm:translate-x-0',
            'mt-12 lg:mt-0',
            'h-[28rem] w-[38rem]',
            'lg:translate-x-10 lg:translate-y-20'
          )}
        />
      </SectionWithBG>
    </Screen>
  );
};

const DemoText = ({ className }: { className: string }) => {
  return (
    <section
      className={clsx(
        'flex flex-col items-center justify-center  gap-6  lg:items-start',
        // 'bg-red-500',
        className
      )}
    >
      <div className='flex flex-col items-center justify-center gap-2  lg:flex-row'>
        <RiBankFill className='h-20 w-20' />
        <div className='flex flex-col  items-center lg:mb-0 lg:items-start'>
          <h2 className='cursor-default text-center text-2xl tracking-tight drop-shadow lg:text-left'>
            PersonalFinance
          </h2>
          <h3 className='lg:text-lefts cursor-default text-center text-xl font-normal drop-shadow'>
            will help you organize your bank data
          </h3>
        </div>
      </div>

      <ul className='flex flex-col'>
        {[
          'Unlimited banks connection',
          'Cross-bank data analytics',
          'Configurable aggregation of data',
          'Custom charts and tools',
        ].map((perk, i) => (
          <li key={i} className='ml-2 inline-flex items-center gap-3'>
            <AiFillCheckSquare className='h-9 w-9' />
            <strong className='text-xl'>{perk}</strong>
          </li>
        ))}
      </ul>
    </section>
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
          width='21'
          height='21'
          patternUnits='userSpaceOnUse'
        >
          <rect
            x='10'
            y='10'
            width='4'
            height='4'
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
