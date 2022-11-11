import React from 'react';
import clsx from 'clsx';
import BlockOfCards from '../cards/BlockOfCards';
import Accent from '../../Accent';
import { RiBankFill } from 'react-icons/ri';
import ArrowLink from '@/components/links/ArrowLink';
import ButtonLink from '@/components/links/ButtonLink';
import Path from '../Path';

/* #region  MAIN HERO SECTION */
const MainHeroSection = () => {
  return (
    <article
      className={clsx(
        'mx-auto mt-5 flex',
        //mobile-tablet
        'flex-col',
        //desktop
        'justify-between lg:flex-row',
        'px-3 sm:max-w-screen-sm',
        'md:max-w-screen-md ',
        // 'lg:max-w-screen-lg',
        'lg:max-w-screen-xl',
        // 'xl:max-w-screen-xl', 
        'mb-10 md:mb-0'
      )}
    >
      <section
        className={clsx(
          'flex w-full flex-col',
          'items-center justify-center',
          //desktop
          'lg:block lg:w-1/2',
          'lg:min-h-[75vh]',
        )}
      >
        <div>
          <h1
            className={clsx(
              'text-center lg:text-left',
              'text-4xl font-extrabold',
              'sm:text-4xl md:text-5xl',
              'uppercase tracking-tighter',
              'mb-16 cursor-default drop-shadow',
              'lg:mb-20 pr-4'
            )}
          >
            Take <Accent>control</Accent>
            <br />
            over your money
          </h1>
        </div>

        <div className='md:hidden'>
          <h2 className='cursor-default text-center font-mono text-2xl drop-shadow lg:text-left'>
            PersonalFinance
          </h2>
          <h3 className=' cursor-default text-center text-lg font-normal drop-shadow lg:text-left'>
            will help you organize your bank data
          </h3>
        </div>

        <div className='hidden md:flex flex-col items-center lg:block '>

          <div className='relative mb-1 flex md:flex-col md:items-center lg:flex-row lg:items-start gap-3'>
            <RiBankFill className='text-6xl' />
            <div className='mt-1 flex flex-col'>
              <h2 className='cursor-default text-center font-mono  text-2xl  drop-shadow lg:text-left'>
                PersonalFinance
              </h2>
              <h3 className='cursor-default text-center text-lg font-normal drop-shadow lg:text-left'>
                will help you organize your bank data
              </h3>
              <ArrowLink
                as={ButtonLink}
                href='/'
                className={clsx(
                  'lg:absolute -bottom-10 py-1 px-1',
                  'rounded text-center lg:text-start',
                  'text-lg'
                )}
              >
                Take a look at Demo version
              </ArrowLink>
            </div>
          </div>
          <div className='hidden lg:block mt-3'>
            <Path height={600}/>
          </div>
        </div>
        
      </section>

      <section
        className={clsx(
          'w-fulls',
          'my-12',
          'lg:mt-0',
          //desktop
          'lg:p-0',
          'lg:min-h-[60vh]',
          'lg:max-h-[65vh]',
          'lg:w-1/2',
        )}
      >
        <BlockOfCards />
      </section>
    </article>
  );
};
/* #endregion */

export default MainHeroSection;

