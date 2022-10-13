import * as React from 'react';
import clsx from 'clsx';
import UnstyledLink from '@/components/links/UnstyledLink';
import Accent from './Accent';

const SvgComponent: React.FC<{ color: string }> = ({ color }) => {
  return (
    <svg
      viewBox='74.26 77.635 55.132 54'
      className={clsx(
        'mt-1',
        color,
        ' hidden h-[35px] w-[35px] sm:block md:h-[45px] md:w-[45px]'
      )}
    >
      <path d='M82.504 78.535c-.4.5-.2 1.2.3 1.5.5.4 1.2.2 1.5-.3.4-.5.2-1.2-.3-1.5-.5-.4-1.2-.2-1.5.3zM123.004 79.035c-1.6 2 .3 5.6 2.9 5.6s4.5-3.6 2.9-5.6c-.6-.8-1.9-1.4-2.9-1.4s-2.3.6-2.9 1.4zM93.904 81.135c-15.5 4.8-22.3 25.8-12.5 38.1l2.3 2.9 3-2.8 3-2.9-2.1-3.6c-2.8-4.7-2.8-11.7.1-16.3 2.1-3.5 8.6-7.9 11.6-7.9 1.2 0 1.6-1 1.6-4.5 0-5-.2-5.1-7-3zM102.904 84.035c0 3.6.4 4.6 1.7 4.6.9 0 3.5 1.1 5.8 2.5 4 2.3 6.8 6.4 7.7 11 .2 1.6 1.2 2.1 4.6 2.3 4 .3 4.2.2 4.2-2.5 0-3.6-2.9-9.9-6.4-14-2.8-3.3-9-6.7-14.3-7.8l-3.3-.7v4.6zM74.904 86.635c0 .5.5 1 1 1 .6 0 1-.5 1-1 0-.6-.4-1-1-1-.5 0-1 .4-1 1z' />
      <path d='M94.904 91.535c-1.9 1-4.6 3.3-5.8 5.2-2 2.8-2.3 4.4-2 9.2.4 4.9.9 6.2 3.8 9.2 6.5 6.7 15.5 6.7 22 0 2.9-3 3.4-4.3 3.8-9.2.3-4.8 0-6.4-2-9.2-2.8-4.2-8.1-7.1-12.8-7.1-1.9 0-5.1.8-7 1.9zm12.9 3.6c4.2 2.1 6.6 7.8 5.2 12.5-1.7 5.7-5.3 8.5-11.1 8.5s-9.4-2.8-11.1-8.5c-2.9-9.5 7.8-17.3 17-12.5z' />
      <path d='M94.804 97.535c-5.7 5.8-2.9 15.9 5 17.6 9.8 2.1 16.3-10.4 9.2-17.6-2.3-2.3-3.8-2.9-7.1-2.9s-4.8.6-7.1 2.9zm11.1 3.3c0 .5-.7.8-1.5.8-2.1 0-1.9 1.3.5 2.8 1.1.7 2 2.2 2 3.3 0 1.2-.8 2.3-2 2.6-1.1.3-2 .9-2 1.3 0 .5-1.4.2-3-.7-3.2-1.6-3.1-3.8.1-2.8 2.5.8 2.5-1.1-.1-2.5-2.7-1.4-2.6-5.4.2-7.2 1.9-1.3 2.4-1.3 4 .1 1 .8 1.8 1.9 1.8 2.3zM118.304 107.335c-2.3 7.4-6.9 12.4-12.6 13.8-2.5.6-2.8 1.2-2.8 4.6 0 3.6.2 3.9 2.8 3.9 9.2-.1 21.2-12.7 21.2-22.4 0-2.4-7.9-2.3-8.6.1zM87.604 120.435c-2.6 2.7-2.7 2.9-.9 4.5 2.4 2.2 8.6 4.7 11.7 4.7 2.3 0 2.5-.4 2.5-4 0-2.6-.5-4-1.3-4-.7 0-3-.9-5.2-2l-4-2c-.1 0-1.3 1.3-2.8 2.8zM75.004 123.935c-1.7 2.1-.3 4.9 2.3 4.5 1.5-.2 2.1-1 2.1-2.8 0-2.8-2.6-3.8-4.4-1.7zM122.904 128.635c0 .5.5 1 1 1 .6 0 1-.5 1-1 0-.6-.4-1-1-1-.5 0-1 .4-1 1zM83.904 130.635c0 .5.5 1 1 1 .6 0 1-.5 1-1 0-.6-.4-1-1-1-.5 0-1 .4-1 1z' />
    </svg>
  );
};

const Logo: React.FC<{
  withText?: boolean | undefined;
  withSVG?: boolean | undefined;
  mode?: 'light' | 'dark';
  className?: string;
}> = ({ withText, mode, withSVG, className }) => {
  const svgColor = mode === 'dark' ? 'fill-gray-300' : 'fill-gray-900';
  const textColor = mode === 'dark' ? 'text-gray-300' : 'text-gray-800';

  return (
    <UnstyledLink href='/'>
      <div className='flex justify-start align-baseline '>
        {withSVG && <SvgComponent color={svgColor} />}
        <Accent
          className={clsx(
            'mt-2 p-0 sm:mt-3',
            'text-2xl',
            'sm:text-2xl',
            'md:text-3xl',
            'lg:text-4xl',
            className
          )}
        >
          PersonalFinance
        </Accent>
      </div>
      {withText && (
        <h2
          className={clsx(
            'pl-1 font-mono lowercase',
            'text-sm',
            'sm:text-2xl',
            'md:text-3xl',
            'lg:text-2xl',
            textColor
          )}
        >
          Track your cash flow
        </h2>
      )}
    </UnstyledLink>
  );
};

export default Logo;
