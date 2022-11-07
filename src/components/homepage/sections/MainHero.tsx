import React from 'react';
import clsx from 'clsx';
import BlockOfCards from '../cards/BlockOfCards';
import Accent from '../../Accent';

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
        'sm:max-w-screen-sm px-3',
        'md:max-w-screen-md ',
        'lg:max-w-screen-lg',
        'xl:max-w-screen-xl'
      )}
    >
      <section
        className={clsx(
          'flex w-full flex-col',
          'items-center justify-center',
          //desktop
          'lg:block lg:w-1/2',
          'lg:min-h-[75vh]'
        )}
      >
        <div>
          <h1
            className={clsx(
              'text-center lg:text-left',
              'text-4xl font-extrabold',
              'sm:text-4xl md:text-5xl',
              'uppercase tracking-tighter',
              'mb-16 cursor-default drop-shadow'
            )}
          >
            Take <Accent>control</Accent>
            <br />
            over your money
          </h1>
          <h2 className='cursor-default text-center font-mono  text-4xl  drop-shadow lg:text-left'>
            PersonalFinance
          </h2>
          <h3 className='cursor-default text-center text-2xl font-normal drop-shadow lg:text-left'>
            will help you organize your bank data
          </h3>
        </div>
      </section>

      <section
        className={clsx(
          'w-full ',
          'mt-10 p-5',
          //desktop
          'lg:p-0',
          'lg:min-h-[60vh]',
          'lg:max-h-[65vh]',
          'lg:mt-0 lg:w-1/2'
        )}
      >
        <BlockOfCards />
      </section>
    </article>
  );
};
/* #endregion */

export default MainHeroSection;
