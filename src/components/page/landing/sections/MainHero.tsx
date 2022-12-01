import React from 'react';
import clsx from 'clsx';
import BlockOfCards from '../cards/BlockOfCards';
import Accent from '../../../Accent';
import { RiBankFill } from 'react-icons/ri';
import { BsArrowDownShort } from 'react-icons/bs';
import { AiFillCheckSquare } from 'react-icons/ai';
import ArrowLink from '@/components/links/ArrowLink';
import ButtonLink from '@/components/links/ButtonLink';
import Path from '../Path';
import { ThemeContext } from '@/context/ThemeProvider';
import ManualLinkTest from '@/components/ManualLinkTest';
import AppCard from '../cards/AppCard';

/* #region  MAIN HERO SECTION */
const MainHeroSection = () => {
  const { mode } = React.useContext(ThemeContext);
  const [isLoaded, setIsLoaded] = React.useState(false);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <article className='h-full w-full snap-start'>
      <div
        className={clsx(
          'mx-auto',
          //desktop
          'justify-between lg:flex-row',
          'px-3 sm:max-w-screen-sm',
          'md:max-w-screen-md ',
          'lg:max-w-screen-xl',
          isLoaded && 'fade-in-start'
        )}
      >
        <section
          className={clsx(
            'flex w-full flex-col',
            'h-screen items-center justify-center'
          )}
          data-fade='1'
        >
          <div
            className={clsx(
              'w-full text-center',
              mode === 'dark' ? 'text-white' : 'text-gray-900'
            )}
          >
            <h1
              className={clsx(
                'text-4xl font-extrabold',
                'sm:text-4xl md:text-5xl',
                'uppercase tracking-tight',
                'cursor-default',
                'pr-4 drop-shadow-xl',
                'mb-3 transition-all delay-75 duration-150'
              )}
            >
              Take control over your money
            </h1>
            <h3
              className={clsx(
                'font-normal drop-shadow-xl',
                'transition-all delay-75 duration-150 '
              )}
            >
              A financial app that lets you gather, analyze all your banks data.
            </h3>
            <h3
              className={clsx(
                'font-normal drop-shadow-xl',
                'transition-all delay-75 duration-150 px-5'
              )}
            >
              Securely conect your financial accounts in seconds.
            </h3>
            
          </div>
          {/* <AppCard/> */}

        </section>

        <section
          className='flex flex-col items-center justify-end'
          id='showcase-start'
        >
          <div className='flex w-full flex-col gap-3  lg:flex-row'>
            <div className='flex flex-col items-center justify-center  lg:items-start'>
              <RiBankFill className='mb-2 h-16 w-16' />
              <Path height={700} className='hidden rotate-180 lg:block' />
            </div>
            <div className='w-full'>
              <div className='mb-6 flex w-full flex-col  items-center lg:mb-0 lg:items-start'>
                <h2 className='cursor-default text-center text-2xl tracking-tight drop-shadow lg:text-left'>
                  PersonalFinance
                </h2>
                <h3 className='lg:text-lefts cursor-default text-center text-xl font-normal drop-shadow'>
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

              <div className='my-4 flex h-auto w-full flex-col gap-5 py-3 lg:flex-row'>
                <BlockOfCards />
                <section className='flex flex-col items-center py-4'>
                  <ul className='flex flex-col'>
                    {[
                      'Unlimited number of bank connections',
                      'Cross-bank data analyze',
                      'Configurable aggregation of data',
                      'Custom charts and tools',
                    ].map((perk, i) => (
                      <li key={i} className='inline-flex items-center gap-3'>
                        <AiFillCheckSquare className='h-9 w-9' />
                        <h3>{perk}</h3>
                      </li>
                    ))}
                  </ul>
                </section>
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
