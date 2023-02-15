import * as React from 'react';

import clsxm from '@/lib/clsxm';

import UnstyledLink, {
  UnstyledLinkProps,
} from '@/components/links/UnstyledLink';

import { ThemeContext } from '@/context/ThemeProvider';

enum ButtonVariant {
  'primary',
  'outline',
  'ghost',
  'green-ghost',
  'light',
  'dark',
  'red',
  'green',
  'red-outline',
  'green-outline',
  'theme-dependent',
  'transparent',
}

type ButtonLinkProps = {
  isDarkBg?: boolean;
  variant?: keyof typeof ButtonVariant;
} & UnstyledLinkProps;

const ButtonLink = React.forwardRef<HTMLAnchorElement, ButtonLinkProps>(
  (
    { children, className, variant = 'primary', isDarkBg = false, ...rest },
    ref
  ) => {
    const { mode } = React.useContext(ThemeContext);
    return (
      <UnstyledLink
        ref={ref}
        {...rest}
        className={clsxm(
          'inline-flex items-center rounded px-4 py-1 font-medium',
          'focus:outline-none focus-visible:ring focus-visible:ring-primary-500',
          'shadow-sm',
          //#region  //*=========== Variants ===========
          [
            variant === 'transparent' && [
              'bg-transparent',
              'shadow-none',

              'hover:opacity-80',
              'active:opacity-90',
              'disabled:bg-primary-400 disabled:hover:bg-primary-400',
            ],
            variant === 'primary' && [
              'bg-primary-500 text-white',
              'border border-primary-600',
              'hover:bg-primary-600 hover:text-white',
              'active:bg-primary-500',
              'disabled:bg-primary-400 disabled:hover:bg-primary-400',
            ],
            variant === 'outline' && [
              // 'text-primary-500',
              'border border-primary-500',
              'hover:bg-primary-50 active:bg-primary-100 disabled:bg-primary-100',
              isDarkBg &&
                'hover:bg-gray-900 active:bg-gray-800 disabled:bg-gray-800',
            ],
            variant === 'ghost' && [
              'shadow-none',
              'border-t border-b border-gray-500/50 md:border',
              mode === 'light'
                ? 'bg-gray-700/30 hover:bg-gray-400/60'
                : 'bg-gray-500/20 hover:bg-gray-500/40',
            ],
            variant === 'green-ghost' && [
              'text-green-500',
              'shadow-none',
              'hover:bg-green-200 active:bg-green-100 disabled:bg-green-100',
              isDarkBg &&
                'hover:bg-green-900 active:bg-green-800 disabled:bg-green-800',
            ],
            variant === 'light' && [
              'bg-white text-dark ',
              'border border-gray-300',
              'hover:bg-gray-100 hover:text-dark',
              'active:bg-white/80 disabled:bg-gray-200',
            ],
            variant === 'dark' && [
              'bg-dark/90 text-white',
              'border border-gray-600',
              'hover:bg-gray-800 active:bg-gray-700 disabled:bg-gray-700',
            ],
            variant === 'red' && [
              'bg-red-500 text-white',
              'border border-red-700',
              'hover:bg-red-700 active:bg-red-600 disabled:bg-gray-700',
            ],
            variant === 'green' && [
              'bg-green-500 text-white',
              'border border-green-700',
              'hover:bg-green-700 active:bg-green-600 disabled:bg-gray-700',
            ],
            variant === 'red-outline' && [
              // 'text-dark',
              'border border-red-700',
              'hover:bg-red-300 active:bg-red-400 disabled:bg-gray-700',
              isDarkBg &&
                'text-gray-50 hover:bg-red-500 active:bg-red-400 disabled:bg-gray-800',
            ],
            variant === 'green-outline' && [
              'text-dark',
              'border border-green-700',
              'hover:bg-green-300 active:bg-green-400 disabled:bg-gray-700',
              isDarkBg &&
                'text-gray-50 hover:bg-green-500 active:bg-green-400 disabled:bg-gray-800',
            ],
            variant === 'theme-dependent' && [
              mode === 'dark'
                ? [
                    'bg-white text-dark ',
                    'border border-gray-300',
                    'hover:bg-gray-100 hover:text-dark',
                    'active:bg-white/80 disabled:bg-gray-200',
                  ]
                : [
                    'bg-dark/90 text-white',
                    'border border-gray-600',
                    'hover:bg-gray-800 active:bg-gray-700 disabled:bg-gray-700',
                  ],
            ],
          ],
          //#endregion  //*======== Variants ===========
          'disabled:cursor-not-allowed',
          className
        )}
      >
        {children}
      </UnstyledLink>
    );
  }
);

export default ButtonLink;
