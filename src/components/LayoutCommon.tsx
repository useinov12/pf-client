import React from 'react';
import clsx from 'clsx';
import { useTheme } from '@/context/ThemeProvider';

interface LayoutCommonProps {
  isLoaded?: boolean;                       /* trigger fade-in animation */
  children: JSX.Element | JSX.Element[];
  className?: string;                       /* only for wrapper div */
  withWrapper?: boolean | undefined;
}

export default function LayoutCommon({
  withWrapper,
  className,
  isLoaded,
  children,
}: LayoutCommonProps) {
  const { mode } = useTheme();
  return (
    <div
      className={clsx(
        mode === 'dark' ? 'text-gray-100' : 'text-gray-800',
        mode === 'dark'
          ? 'bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gray-700 via-gray-900 to-black '
          : 'bg-[conic-gradient(at_top,_var(--tw-gradient-stops))] from-gray-700 via-gray-100 to-gray-700 ',
        isLoaded && 'fade-in-start'
      )}
    >
      {/* controls page responsivnes  */}
      {withWrapper ? (
        <div
          className={clsx(
            'mx-auto px-4 sm:max-w-screen-sm',
            'md:max-w-screen-lg ',
            'lg:max-w-screen-xl',
            className
          )}
        >
          {children}
        </div>
      ) : (
        /* delegate responsivne styling to children components */
        <>{children}</>
      )}
    </div>
  );
}
