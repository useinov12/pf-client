import React from 'react';
import clsx from 'clsx';
import BlockOfCards from '../cards/BlockOfCards';
import Accent from '../../Accent';
import { RiBankFill } from 'react-icons/ri';
import { BsArrowDownShort } from 'react-icons/bs';
import { AiFillCheckSquare } from 'react-icons/ai';
import ArrowLink from '@/components/links/ArrowLink';
import ButtonLink from '@/components/links/ButtonLink';
import Path from '../Path';
import { ThemeContext } from '@/context/ThemeProvider';
import Button from '@/components/buttons/Button';

import { PlaidContext } from '@/context/PlaidTokenProvider';

/* #region  MAIN HERO SECTION */
const MainHeroSection = () => {
  const { mode } = React.useContext(ThemeContext);
  const [isLoaded, setIsLoaded] = React.useState(false);




  const {token, setToken} = React.useContext(PlaidContext)

  const [link, setLink] = React.useState<string>('');

  function handleTokenInput(e: React.ChangeEvent<HTMLInputElement>) {
    setLink(e.target.value);
  }

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    });
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
                'sm:text-4xl md:text-6xl',
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
                'font-semibold drop-shadow-xl',
                'transition-all delay-75 duration-150 '
              )}
            >
              A financial app that lets you gather and analyze bank data in a
              helpful way.
            </h3>
            <div className='m-3'>
              <input
                type='text'
                value={link}
                onChange={(e) => handleTokenInput(e)}
                className='p-1 text-dark'
              />
              <Button
                onClick={() => {
                  setToken(link);
                  console.log('LINK_TOKEN_SET', link);
                }}
              >
                set token
              </Button>
            </div>
          </div>
          <a
            className='my-20 animate-bounce cursor-pointer'
            href='#showcase-start'
          >
            <BsArrowDownShort className='h-14 w-14' />
          </a>
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
