import * as React from 'react';
import { ImSpinner2 } from 'react-icons/im';

import clsxm from '@/lib/clsxm';

enum ButtonVariant {
  'primary',
  'outline',
  'ghost',
  'light',
  'dark',
  'red',
  'green',
  'red-outline',
  'green-outline'
}

type ButtonProps = {
  /** Show loading spinner and disable button */
  isLoading?: boolean;
  /** Button background color variant */
  isDarkBg?: boolean;
  /** Button appearance variant */
  variant?: keyof typeof ButtonVariant;
} & React.ComponentPropsWithRef<'button'>;

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      className,
      disabled: buttonDisabled,
      isLoading,
      variant = 'primary',
      isDarkBg = false,
      ...rest
    },
    ref
  ) => {
    const disabled = isLoading || buttonDisabled;

    return (
      <button
        ref={ref}
        type='button'
        disabled={disabled}
        className={clsxm(
          'inline-flex items-center rounded px-4 py-2 font-medium',
          'focus:outline-none focus-visible:ring focus-visible:ring-primary-500',
          'shadow-sm',
          'transition-colors duration-75',
          //#region  //*=========== Variants ===========
          [
            variant === 'primary' && [
              'bg-primary-500 text-white',
              'border border-primary-600',
              'hover:bg-primary-600 hover:text-white',
              'active:bg-primary-500',
              'disabled:bg-primary-400 disabled:hover:bg-primary-400',
            ],
            variant === 'outline' && [
              'text-primary-500',
              'border border-primary-500',
              'hover:bg-primary-50 active:bg-primary-100 disabled:bg-primary-100',
              isDarkBg &&
                'hover:bg-gray-900 active:bg-gray-800 disabled:bg-gray-800',
            ],
            variant === 'ghost' && [
              'text-primary-500',
              'shadow-none',
              'hover:bg-gray-800 active:bg-primary-100 disabled:bg-primary-100',
              isDarkBg &&
                'hover:bg-gray-900 active:bg-gray-800 disabled:bg-gray-800',
            ],
            variant === 'light' && [
              'bg-white text-dark ',
              'border border-gray-300',
              'hover:bg-gray-100 hover:text-dark',
              'active:bg-white/80 disabled:bg-gray-200',
            ],
            variant === 'dark' && [
              'bg-dark text-white',
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
              'text-dark',
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
          ],
          //#endregion  //*======== Variants ===========
          'disabled:cursor-not-allowed',
          isLoading &&
            'relative text-transparent transition-none hover:text-transparent disabled:cursor-wait',
          className
        )}
        {...rest}
      >
        {isLoading && (
          <div
            className={clsxm(
              'absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2',
              {
                'text-white': ['primary', 'dark'].includes(variant),
                'text-black': ['light'].includes(variant),
                'text-primary-500': ['outline', 'ghost'].includes(variant),
              }
            )}
          >
            <ImSpinner2 className='animate-spin' />
          </div>
        )}
        {children}
      </button>
    );
  }
);

export default Button;
