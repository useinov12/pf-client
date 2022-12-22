import React from 'react';
import clsx from 'clsx';
import { useAuth } from '@/services/user/AuthProvider';
import Link from 'next/link';
import { Tooltip, TooltipContent, TooltipTrigger } from './Tooltip';
import { useTheme } from '@/context/ThemeProvider';

export const Avatar = () => {
  //   const { user } = useAuth();
  //   const firstName = user?.firstName
  const { mode } = useTheme();

  return (
    <Tooltip>
      <TooltipTrigger>
        <Link href='/cabinet'>
          <h1
            className={clsx(
              'text-3xl',
              'h-8 w-9',
              'md:text-3xl',
              'rounded text-center',
              'ring-4 ring-primary-600',
              'drop-shadow',
              'cursor-pointer',
              'flex items-center justify-center'
            )}
          >
            {/* {`${firstName[0]}`} */}
            {`U`}
          </h1>
        </Link>
      </TooltipTrigger>
      <TooltipContent
        className={clsx(
          'mt-1 rounded p-1',
          ' text-sm text-white',
          'bg-gray-600 '
        )}
      >
        <p>Go to cabinet</p>
      </TooltipContent>
    </Tooltip>
  );
};

export default Avatar;
