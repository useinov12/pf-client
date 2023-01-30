import clsx from 'clsx';
import { ReactNode } from 'react';
import { useTheme } from '@/context/ThemeProvider';

interface CardProps {
  className: string;
  children: ReactNode;
  withBorder?: boolean | undefined;
  title?: string | JSX.Element;
}

export default function Card({ title, className, children, withBorder }: CardProps) {
  const { mode } = useTheme();

  return (
    <div
      className={clsx(
        'relative px-2 py-5',
        withBorder && 'md:border-t',
        mode === 'light' ? 'border-dark/50' : 'border-gray-300/50',
        className
      )}
    >
      {title && (
        <strong
          className={clsx(
            'absolute -top-3 left-0 px-1',
            'rounded-lg bg-transparent',
            mode === 'light' ? 'bg-gray-300' : 'bg-gray-900'
          )}
        >
          {title}
        </strong>
      )}
      {children}
    </div>
  );
}
