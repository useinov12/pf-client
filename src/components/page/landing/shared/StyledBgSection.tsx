import clsx from 'clsx';
import { ReactNode } from 'react';
import { useTheme } from '@/context/ThemeProvider';
import Polkadot from './Polkadot';

interface StyledBgSection {
  className?: string;
  children?: ReactNode;
  left?: boolean | undefined;
  right?: boolean | undefined;
}

export default function StyledBgSection({
  className,
  children,
  right,
  left,
}: StyledBgSection) {
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
      <Polkadot
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
}
