import React from 'react';
import clsx from 'clsx';
import BlockOfCards from '../cards/BlockOfCards';
import Accent from '../../Accent';
import { RiBankFill } from 'react-icons/ri';
import ArrowLink from '@/components/links/ArrowLink';
import ButtonLink from '@/components/links/ButtonLink';
import Path from '../Path';
import { ThemeContext } from '@/context/ThemeProvider';

/* #region  MAIN HERO SECTION */
const MainHeroSection = () => {
  const { mode } = React.useContext(ThemeContext);
  
  return (
    <article
      className={clsx(
        'w-full h-full',
      )}
    >
      <div className={clsx(
        'mx-auto',
        //desktop
        'justify-between lg:flex-row',
        'px-3 sm:max-w-screen-sm',
        'md:max-w-screen-md ',
        'lg:max-w-screen-xl',
      )}>
        <section
          className={clsx(
            'flex w-full flex-col',
            'items-center justify-center h-[70vh]',
          )}
        >
          <div className={clsx(
            'w-full text-center',
            mode === 'dark' ? 'text-white' : 'text-gray-900',
          )}>
            <h1
              className={clsx(
                'text-4xl font-extrabold',
                'sm:text-4xl md:text-6xl',
                'uppercase tracking-tight',
                'cursor-default',
                'pr-4 drop-shadow-xl',
                'transition-all duration-150 delay-75 mb-3',
                
              )}
            >
              Take control
              {' '}
              over your money
            </h1>
            <h3 className={clsx(
              'drop-shadow-xl font-semibold',
              'transition-all duration-150 delay-75 '
            )}>
               A financial app lets you gather and analyze bank data in a helpful way.
            </h3>

          </div>
        </section>

        <section className='flex flex-col items-center justify-end'>
          <div className='flex w-full flex-col gap-3  lg:flex-row'>
            <div className='flex flex-col items-center justify-center  lg:items-start'>
              <RiBankFill className='mb-2 h-16 w-16' />
              <Path height={700} className='hidden rotate-180 lg:block' />
            </div>
          <div className='w-full'>
            <div className='mb-6 flex w-full flex-col  items-center lg:mb-0 lg:items-start'>
              <h2 className='cursor-default text-center font-mono text-2xl tracking-tight drop-shadow lg:text-left'>
                PersonalFinance
              </h2>
              <h3 className='cursor-default text-center text-xl font-normal drop-shadow lg:text-lefts'>
                will help you organize your bank data
              </h3>
              <ArrowLink
                as={ButtonLink}
                href='/'
                className={clsx(
                  'py-1 px-3',
                  'rounded text-center',
                  'text-xl lg:my-2'
                )}
              >
                Take a look at Demo version
              </ArrowLink>
            </div>

            <div 
              className=' w-full h-auto my-4 '
            >
              <BlockOfCards />
            </div>
          </div>
          </div>
        </section>
      </div>

    </article>
  );
};
/* #endregion */

export default MainHeroSection;
