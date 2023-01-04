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
      <SectionRight className='shrink lg:w-2/5' />
      <SectionLeft className=' w-full ' />
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
        'h-4/6 w-1/2 lg:h-5/6',
        'lg:w-1/3',
        'left-0',
        'rounded-tr-3xl rounded-br-3xl',
        mode === 'light' ? 'bg-gray-400/90' : 'bg-gray-900/50'
      )}
    />
  );
};

const SectionLeft = ({ className }: { className: string }) => {
  return (
    <section
      className={clsx('relative', 'flex items-start justify-center', className)}
    >
      <Polkadot className={clsx('absolute top-0 -right-5', 'h-80 w-2/3')} />
      <DemoCard
        className={clsx(
          'translate-x-10 sm:translate-x-0',
          'h-full w-full',
          'md:h-[32rem] md:w-[36rem]',
          'translate-y-5 lg:-translate-x-5'
        )}
      />
    </section>
  );
};

const SectionRight = ({ className }: { className: string }) => {
  return (
    <section
      className={clsx(
        'flex flex-col items-center justify-center px-6',
        className
      )}
    >
      <div className='my-4 flex flex-col items-center justify-center gap-2 lg:my-0 lg:flex-row lg:items-start'>
        <BsCashCoin className='h-16 w-16' />
        <div className='flex flex-col items-center lg:items-start'>
          <h2 className='cursor-default text-center text-2xl tracking-tight drop-shadow lg:text-left'>
            PersonalFinance
          </h2>
          <h3 className='cursor-default text-center text-xl font-normal  drop-shadow lg:text-left'>
            will help you organize your bank data
          </h3>
        </div>
      </div>
      <ul className='my-6 flex flex-col'>
        {[
          'Unlimited banks connection',
          'Cross-bank data analytics',
          'Configurable data aggregation',
          'Useful charts and tools',
        ].map((perk, i) => (
          <li key={i} className='inline-flex items-center gap-3'>
            <AiFillCheckSquare className='h-7 w-7' />
            <h6 className='text-lg'>{perk}</h6>
          </li>
        ))}
      </ul>
    </section>
  );
};
