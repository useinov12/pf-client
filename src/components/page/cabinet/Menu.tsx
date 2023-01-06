import { useContext } from 'react';
import clsx from 'clsx';
import { useTheme } from '@/context/ThemeProvider';

export function MenuSection({
  className,
  children,
}: {
  className?: string;
  children: JSX.Element | JSX.Element[];
}) {
  const { mode } = useTheme();

  return (
    <div
      className={clsx(
        'border-b' /*  mobile styles  */,
        'sm:rounded-md  sm:border' /* desktop & tablet stryles */,
        mode === 'light' ? 'border-gray-100/50' : 'border-gray-300/20',
        mode === 'light' ? 'bg-dark/10' : 'bg-gray-300/10',
        'overflow-hidden drop-shadow',
        className
      )}
    >
      {children}
    </div>
  );
}

export function MenuHeader({
  className,
  children,
}: {
  className?: string;
  children: JSX.Element | JSX.Element[];
}) {
  const { mode } = useTheme();
  return (
    <header
      className={clsx(
        'w-full',
        'sticky top-0 z-40',
        'flex items-center justify-between px-4 py-4',
        mode === 'light' ? 'bg-gray-400' : 'bg-gray-900',
        className
      )}
    >
      {children}
    </header>
  );
}
