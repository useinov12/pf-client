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
  // const pathRef = React.useRef<SVGRectElement | null >(null);
  return (
    <article
      className={clsx(
        'mx-auto mt-5 ',
        //desktop
        'justify-between lg:flex-row',
        'px-3 sm:max-w-screen-sm',
        'md:max-w-screen-md ',
        'lg:max-w-screen-xl',
        'mb-10 md:mb-0'
      )}
    >
      <section
        className={clsx(
          'flex w-full flex-col',
          'items-center justify-center',
          //desktop
        )}
      >
        <div className='w-full text-center my-20'>
          <h1
            className={clsx(
              'text-4xl font-extrabold',
              'sm:text-4xl md:text-5xl',
              'uppercase tracking-tighter',
              'mb-16 cursor-default drop-shadow',
              'pr-4 lg:mb-20'
            )}
          >
            Take <Accent>control</Accent>
             {' '}
            over your money
          </h1>
        </div>
      </section>

      <section className='flex flex-col items-center justify-end '>
        <div className='flex w-full flex-col gap-3  lg:flex-row'>
          <div className='flex flex-col items-center justify-center  lg:items-start'>
            <RiBankFill className='mb-2 h-16 w-16' />
            <Path height={700} className='hidden rotate-180 lg:block' />
          </div>
        <div className='w-full'>
          <div className='mb-10 flex w-full flex-col  items-center lg:mb-0 lg:items-start'>
            <h2 className='cursor-default text-center font-mono text-2xl tracking-tight drop-shadow lg:text-left'>
              PersonalFinance
            </h2>
            <h3 className='cursor-default text-center text-lg font-normal drop-shadow lg:text-left'>
              will help you organize your bank data
            </h3>
            <ArrowLink
              as={ButtonLink}
              href='/'
              className={clsx(
                'py-1 px-1',
                'rounded text-center lg:text-start',
                'text-lg'
              )}
            >
              Take a look at Demo version
            </ArrowLink>
          </div>

          <div className=' w-full h-auto my-4'>
            <BlockOfCards />
          </div>
        </div>
        </div>
      </section>

    </article>
  );
};
/* #endregion */

export default MainHeroSection;
