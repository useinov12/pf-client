import clsx from 'clsx';
import { ReactNode } from 'react';
import DemoCard from '../cards/DemoCard/DemoCard';
import { BsCashCoin } from 'react-icons/bs';
import { AiFillCheckSquare } from 'react-icons/ai';
import Polkadot from '../../../shared/Polkadot';
import { useTheme } from '@/context/ThemeProvider';

export default function Demo() {
  return (
    <Container
      className={clsx(
        'min-h-screen',
        'flex flex-col gap-6',
        'lg:flex-row-reverse',
        'overflow-hidden py-5'
      )}
    >
      <SectionText className='shrink lg:w-1/2' />
      <SectionCard className='w-full' />
    </Container>
  );
}

interface SectionWrapperProps {
  className?: string;
  children?: ReactNode;
}

const Container = ({ children, className }: SectionWrapperProps) => {
  return (
    <div className='relative h-full w-full' id='DemoCardTrigger'>
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
        'h-4/6 w-1/2 lg:h-5/6',
        'lg:w-1/3',
        'left-0 top-0',
        'rounded-tr-3xl rounded-br-3xl',
        mode === 'light' ? 'bg-gray-400/90' : 'bg-gray-900/50'
      )}
    />
  );
};

const SectionCard = ({ className }: { className: string }) => {
  return (
    <section
      className={clsx('relative', 'flex items-start justify-center', className)}
    >
      {/* wrapper div for Polkadot to hook animation with */}
      <Polkadot className='absolute -top-1 -right-4  h-80 w-full' />
      <DemoCard
        className={clsx(
          'translate-x-10 sm:translate-x-0',
          'h-full w-full',
          'md:h-[32rem] md:w-[36rem]',
          'translate-y-5 lg:-translate-x-0'
        )}
      />
    </section>
  );
};

const SectionText = ({ className }: { className: string }) => {
  return (
    <section
      className={clsx(
        'flex flex-col items-center md:items-start  justify-start px-6 md:pt-36',
        className
      )}
    >
      <header className='my-2 flex flex-col items-center md:flex-row  md:items-start justify-center gap-2'>
        <BsCashCoin className='mt-2 h-12 w-12' />
        <div className='flex flex-col items-center md:items-start'>
          <h2 className='cursor-default text-center text-2xl tracking-tight drop-shadow'>
            PersonalFinance
          </h2>
          <p className='text-md cursor-default text-center font-normal tracking-tight  drop-shadow'>
            will help you organize your bank data
          </p>
        </div>
      </header>

      <ul className='my-2 flex flex-col'>
        {[
          'Unlimited banks connection',
          'Cross-bank data analytics',
          'Configurable data aggregation',
          'Useful charts and tools',
        ].map((perk, i) => (
          <li key={i} className='inline-flex items-center gap-3'>
            <AiFillCheckSquare className='h-7 w-7' />
            <p className='text-md tracking-tight'>{perk}</p>
          </li>
        ))}
      </ul>
    </section>
  );
};
