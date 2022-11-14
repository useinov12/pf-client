import React from 'react';
import clsx from 'clsx';
import { VscAccount } from 'react-icons/vsc';
import Image from 'next/image';
import Button from '../../buttons/Button';
import ButtonLink from '../../links/ButtonLink';
import { AiOutlineLineChart } from 'react-icons/ai';
import Ping from '../../Ping';
import { ThemeContext } from '@/context/ThemeProvider';

const InstructionsSection = () => {
  const { mode } = React.useContext(ThemeContext);
  return (
    <article>
      <header
        className={clsx(
          'relative',
          `h-full min-h-[40vh] w-screen `,
          `bg-opacity-80 bg-[url('/images/hexagon.png')] bg-cover`,
          `bg-contain`,
          'border-b-2  ',
          mode === 'light' ? 'border-white' : 'border-gray-200',
          'drop-shadow'
        )}
      >
        <div
          className={clsx(
            'absloute bottom-0 left-0 z-30 h-[40vh]  w-full',
            'bg-gradient-to-b',
            mode === 'dark'
              ? 'from-transparent via-transparent/50 to-transparent/80'
              : 'from-transparent via-transparent/10 to-transparent/30'
          )}
        />

        <div className='absolute inset-0 flex flex-col items-center justify-center gap-5 '>
          <Heading />
          <StartInThreeSteps />
        </div>
      </header>
      <article
        className={clsx(
          'mx-auto mt-40 mb-28 flex flex-col',
          'items-center gap-10 md:gap-0 md:gap-x-5',
          'px-3 sm:max-w-screen-sm',
          'md:max-w-screen-md ',
          'lg:max-w-screen-lg',
          'xl:max-w-screen-xl'
        )}
      >
        <InstructionCard>
          <div
            className={clsx(
              'flex flex-col items-center justify-center py-2 md:border-r md:px-10 md:max-w-[10rem]',
              mode === 'light' ? '' : 'bg-gray-200',
              mode === 'light' ? 'border-dark/50' : 'border-gray-400/50'
            )}
          >
            <VscAccount className='mb-4 text-6xl  text-dark ' />
            <h3 className='whitespace-nowrap tracking-tight text-dark text-2xl'>
              Sign Up
            </h3>
          </div>

          <div className='my-4 flex flex-col items-start justify-center px-5'>
            <p className='mb-2 w-full text-center text-xl font-light tracking-wide md:w-4/6 md:text-left'>
              We use special Plaid Key to display your data in our app.
            </p>
          </div>
        </InstructionCard>

        <InstructionCard>
          <div
            className={clsx(
              'flex flex-col items-center justify-center py-2 md:border-r md:px-9 md:max-w-[10rem]',
              mode === 'light' ? '' : 'bg-gray-200',
              mode === 'light' ? 'border-dark/50' : 'border-gray-400/50'
            )}
          >
            <Image src={'/images/plaid.png'} width={100} height={100} />
            <h3 className='whitespace-nowrap tracking-tight text-dark text-2xl'>
              Connect
            </h3>
          </div>

          <div className='my-4 flex flex-col items-center justify-center px-5 md:items-start'>
            <p className='mb-2 w-full text-center text-xl font-light tracking-wide md:w-4/6 md:text-left'>
              In your cabinet connect banks by clicking
            </p>
            <Button className='my-2 py-1'>Add bank</Button>
          </div>
        </InstructionCard>

        <InstructionCard>
          <div
            className={clsx(
              'flex flex-col items-center justify-center py-2 md:border-r md:px-9 md:max-w-[10rem]',
              mode === 'light' ? '' : 'bg-gray-200',
              mode === 'light' ? 'border-dark/50' : 'border-gray-400/50'
            )}
          >
            <AiOutlineLineChart className='mb-4 text-6xl  text-dark' />
            <h3 className='whitespace-nowrap tracking-tight text-dark text-2xl'>
              Analyze
            </h3>
          </div>

          <div className='my-4 flex flex-col items-center justify-center px-5 md:items-start'>
            <p className='mb-2 w-full text-center text-xl font-light tracking-wide md:w-4/6 md:text-left'>
              Open the PersonalFinance app and start using it!
            </p>
            <ButtonLink
              variant={mode === 'dark' ? 'light' : 'dark'}
              href='#'
              className={clsx(
                'relative my-2 py-1',
                'text-md tracking-wide ',
                'flex items-center justify-around'
              )}
            >
              <span>Check Demo</span>
              <span className='absolute -top-1 -right-1'>
                <Ping />
              </span>
            </ButtonLink>
          </div>
        </InstructionCard>
      </article>
    </article>
  );
};

export default InstructionsSection;

const Heading = () => {
  const { mode } = React.useContext(ThemeContext);
  return (
    <h1
      className={clsx(
        'text-3xl  md:text-4xl lg:text-6xl',
        'font-extrabold uppercase tracking-tight',
        'drop-shadow-lg',
        mode === 'light' ? 'text-gray-900' : 'text-white',
        'opacity-100'
      )}
    >
      Financial tool for your Goals
    </h1>
  );
};

const StartInThreeSteps = () => {
  return (
    <div
      className={clsx(
        'absolute bottom-14 h-[3rem] w-60',
        'translate-y-20 rounded-lg',
        'bg-gray-100 text-gray-900',
        'flex items-center justify-center shadow-inner drop-shadow',
        'font-mono text-xl uppercase ring ring-white',
        'opacity-100'
      )}
    >
      Start in 3 steps
    </div>
  );
};

const InstructionCard = ({ children }: { children: JSX.Element[] }) => {
  const { mode } = React.useContext(ThemeContext);
  return (
    <section
      className={clsx(
        'mb-5 flex h-full w-full flex-col  rounded-xl border md:h-48 md:flex-row lg:w-4/6',
        'overflow-hidden',
        mode === 'light' ? 'border-dark/50' : 'border-gray-300/50',
        mode === 'light' ? 'bg-gray-400/50' : 'bg-gray-700/50'
      )}
    >
      {children}
    </section>
  );
};
