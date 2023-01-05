import { ReactNode } from 'react';
import clsx from 'clsx';
import Button from '@/components/buttons/Button';
import Link from 'next/link';
import { useLoginForm } from '@/context/LoginFormProvider';
import { useTheme } from '@/context/ThemeProvider';
import Polkadot from '@/components/shared/Polkadot';

export default function BannerSection() {
  return (
    <Container className='flex w-screen items-center justify-center overflow-hidden'>
      <Polkadot className='absolute top-2 left-1/2 h-1/2 w-1/2' />
      <Banner />
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
        'w-1/2 lg:h-[30rem]',
        'lg:w-1/3',
        'left-0',
        'rounded-tr-3xl rounded-br-3xl',
        mode === 'light' ? 'bg-gray-400/90' : 'bg-gray-900/50'
      )}
    />
  );
};

const Banner = () => {
  const { setOpenLoginForm } = useLoginForm();
  return (
    <div
      className={clsx(
        'z-10 my-14',
        'bg-blue-500',
        'drop-shadow-lg',
        'lg:rounded-3xl',
        'h-[25rem] w-full lg:w-5/6',
        'relative overflow-hidden'
      )}
    >
      <div
        className='absolute bottom-0 z-0 h-1/3 w-full bg-blue-400/50'
        style={{ clipPath: `polygon(0 100%, 100% 100%, 0% 0%)` }}
      />
      <div
        className='absolute bottom-0 z-0 h-2/3 w-full bg-blue-700/50'
        style={{ clipPath: `polygon(100% 0%, 0% 100%, 100% 100%)` }}
      />

      <section className='flex h-full w-full flex-col items-center justify-center gap-5 tracking-tight'>
        <h1 className='text-center text-4xl  text-gray-50 drop-shadow'>
          Try and get sence of financial clarity today
        </h1>
        <p className='text-center text-lg tracking-tight text-gray-100 drop-shadow md:text-xl'>
          Expirience complete control when managing finance with peace in your
          mind
        </p>
        <div className='z-10 my-4 flex gap-8'>
          <Link href='/finance'>
            <Button variant='light' className='rounded-lg px-12 py-2 text-lg whitespace-nowrap drop-shadow-lg'>
              Try Demo
            </Button>
          </Link>
          <Button
            variant='light'
            onClick={() => setOpenLoginForm(true)}
            className='rounded-lg px-12 py-2 text-lg whitespace-nowrap drop-shadow-lg'
          >
            Sign Up
          </Button>
        </div>
      </section>
    </div>
  );
};
