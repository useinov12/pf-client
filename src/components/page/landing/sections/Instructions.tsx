import React, { ReactNode } from 'react';
import clsx from 'clsx';
import { VscAccount } from 'react-icons/vsc';
import Image from 'next/image';
import Button from '../../../buttons/Button';
import ButtonLink from '../../../links/ButtonLink';
import { AiOutlineLineChart } from 'react-icons/ai';
import Ping from '../../../shared/Ping';
import { useTheme } from '@/context/ThemeProvider';
import Polkadot from '../../../shared/Polkadot';

export default function InstructionsSection() {
  return (
    <section>
      <Header />
      <MainSection />
    </section>
  );
}

const Header = () => {
  const { mode } = useTheme();
  return (
    <header
      className={clsx(
        'relative',
        `h-full min-h-[50vh] w-screen `,
        'border-b-2  ',
        mode === 'light' ? 'border-white' : 'border-gray-200',
        'drop-shadow-2xl'
      )}
    >
      <div
        className='absolute bottom-0 z-0 h-2/5 w-full bg-blue-400/70'
        style={{ clipPath: `polygon(0 100%, 100% 100%, 0% 0%)` }}
      />
      <div
        className='absolute bottom-0 z-0 h-1/2 w-full bg-blue-600/80'
        style={{ clipPath: `polygon(100% 0%, 0% 100%, 100% 100%)` }}
      />
      <div
        className={clsx(
          'absloute bottom-0 left-0 z-30 h-[40vh]  w-full',
          'bg-gradient-to-b',
          mode === 'dark'
            ? 'from-transparent via-transparent/50 to-transparent/80'
            : 'from-transparent via-transparent/10 to-transparent/30'
        )}
      />

      <div className='absolute inset-0 flex flex-col items-center justify-center gap-5'>
        <h1
          className={clsx(
            'text-4xl  md:text-5xl lg:text-6xl',
            'font-extrabold uppercase tracking-tight',
            'drop-shadow-lg',
            mode === 'light' ? 'text-gray-800' : 'text-gray-50',
            'text-center opacity-100'
          )}
        >
          Financial tool for your Goals
        </h1>
        <div
          className={clsx(
            'absolute bottom-14 h-[3rem] w-60',
            'translate-y-20 rounded-lg',
            'bg-gray-200 text-gray-900',
            'flex items-center justify-center shadow-inner drop-shadow',
            'font-mono text-xl uppercase ring ring-white',
            'opacity-100'
          )}
        >
          Start in 3 steps
        </div>
      </div>
    </header>
  );
};

const MainSection = () => {
  const { mode } = useTheme();
  return (
    <section
      className={clsx(
        'mx-auto my-28 ',
        'px-3 sm:max-w-screen-sm',
        'md:max-w-screen-md ',
        'lg:max-w-screen-lg',
        'xl:max-w-screen-xl',
        'w-full rounded-lg lg:h-60',
        'flex items-center justify-center gap-2'
      )}
    >
      <InstructionCard>
        <div
          className={clsx(
            'flex flex-col',
            'items-center justify-center',
            'mt-5'
          )}
        >
          <VscAccount className='mb-4 text-6xl  ' />
          <h3 className='whitespace-nowrap text-2xl tracking-tight'>Sign Up</h3>
        </div>

        <div className='my-4 flex flex-col items-center justify-center px-5'>
          <p className='text-center text-xl  tracking-tight drop-shadow'>
            We use special Plaid Key to display your data in our app.
          </p>
        </div>
      </InstructionCard>

      <InstructionCard>
        <div className='flex flex-col items-center justify-center py-2'>
          <Image
            src={'/images/plaid.png'}
            width={100}
            height={100}
            className={clsx(
              'rounded-2xl',
              mode === 'light' ? '' : 'bg-gray-200'
            )}
          />
          <h3 className='mt-2 whitespace-nowrap text-2xl tracking-tight'>
            Connect
          </h3>
        </div>

        <div className='my-4 flex flex-col items-center justify-center px-5'>
          <p className='text-center text-xl tracking-tight drop-shadow'>
            In your cabinet connect banks by clicking
          </p>
          <Button className='my-2 py-1'>Add bank</Button>
        </div>
      </InstructionCard>

      <InstructionCard>
        <div
          className={clsx(
            'flex flex-col items-center justify-center',
            'mt-2 py-2'
          )}
        >
          <AiOutlineLineChart className='mb-4 text-6xl  ' />
          <h3 className='whitespace-nowrap text-2xl tracking-tight'>Analyze</h3>
        </div>

        <div className='my-4 flex flex-col items-center justify-center px-5'>
          <p className='text-center text-xl  tracking-tight drop-shadow'>
            Open the PersonalFinance app and use it!
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
    </section>
  );
};

const InstructionCard = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  const { mode } = useTheme();
  return (
    <div
      className={clsx(
        'rounded',
        'relative overflow-hidden',
        'w-full border py-2 md:h-80 md:px-2',
        mode === 'light' ? 'border-dark/50' : 'border-gray-400/50',
        mode === 'light' ? 'bg-gray-400/50' : 'bg-gray-700/50',
        className
      )}
    >
      <Polkadot className='absolute top-0 left-0 z-0 -translate-x-52' />
      <div
        className={clsx(
          'z-10 h-full w-full',
          'flex flex-col items-center justify-start rounded'
        )}
      >
        {children}
      </div>
    </div>
  );
};
