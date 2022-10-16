import * as React from 'react';

import Layout from '@/components/layout/Layout';
import ArrowLink from '@/components/links/ArrowLink';
import ButtonLink from '@/components/links/ButtonLink';
import UnstyledLink from '@/components/links/UnstyledLink';
import Accent from '@/components/Accent';
import Seo from '@/components/Seo';

import BanksCard from '@/components/landing-page-components/BanksCard';
import ExpensesCard from '@/components/landing-page-components/ExpensesCard';
import StepCard from '@/components/landing-page-components/StepCard';

import { ThemeContext } from '@/context/ThemeProvider';
import { VscAccount } from 'react-icons/vsc';
import { AiOutlineLineChart } from 'react-icons/ai';

import plaidSvg from '../assets/plaid.png';
import toast, { Toaster } from 'react-hot-toast';
/**
 * SVGR Support
 * Caveat: No React Props Type.
 *
 * You can override the next-env if the type is important to you
 * @see https://stackoverflow.com/questions/68103844/how-to-override-next-js-svg-module-declaration
 */

import Chip from '@/components/Chip';
import clsx from 'clsx';
import Button from '@/components/buttons/Button';
import { IconType } from 'react-icons';
import StepSection from '@/components/landing-page-components/StepSection';

// !STARTERCONF -> Select !STARTERCONF and CMD + SHIFT + F
// Before you begin editing, follow all comments with `STARTERCONF`,
// to customize the default configuration.

export default function HomePage() {
  const { mode } = React.useContext(ThemeContext);
  // const textColor = mode === 'dark' ? 'text-gray-300' : 'text-gray-800';
  const cardStyle =
    mode === 'dark'
      ? 'border-solid border border-primary-500 shadow-primary-500/30'
      : 'bg-white border-solid border border-gary-50';

  const [card, setCard] = React.useState<string>('Banks');

  return (
    <Layout>
      <Seo templateTitle='Home' />

      <main>
        <div
          className={clsx(
            'flex flex-col items-center',
            'md:flex-row',
            // 'py-8',
            'px-2',
            'md:px-4',
            // 'lg:px-8',
            'min-h-[90vh]',
            'md:min-h-[65vh]',
            'md:h-[65vh]'
          )}
        >
          <Toaster />
          <section
            className={clsx(
              'h-full w-full ',
              'my-2 flex flex-col-reverse items-center',
              'md:items-start md:justify-center',
              'min-w-[50%]'
            )}
          >
            <div
              className={clsx(
                'h-full w-full ',
                'my-2 flex flex-col items-center',
                'md:items-start md:justify-center'
              )}
            >
              <h1
                className={clsx(
                  'text-4xl font-extrabold tracking-tight',
                  'sm:text-6xl md:text-5xl  xl:text-6xl'
                )}
              >
                Take{' '}
                <UnstyledLink href='#'>
                  <Accent>control</Accent>
                </UnstyledLink>{' '}
              </h1>
              <h1
                className={clsx(
                  'text-4xl font-extrabold tracking-tight',
                  'sm:text-6xl md:text-5xl  xl:text-6xl'
                )}
              >
                over your money
              </h1>
              <div
                className={clsx(
                  'md:hidden',
                  'my-5 h-[2px] w-4/5 rounded',
                  mode === 'light' ? 'bg-gray-700' : 'bg-gray-300'
                )}
              />
              <p className='mt-4 text-center text-2xl md:text-left'>
                <Accent> PersonalFinance </Accent> will help you organize your
                bank data
              </p>
              <div className='mt-6'>
                <ArrowLink
                  as={ButtonLink}
                  variant={mode === 'light' ? 'dark' : 'light'}
                  className='inline-flex items-center'
                  href='#'
                >
                  How it works
                </ArrowLink>
              </div>
            </div>
          </section>

          <section
            className={clsx(
              'h-full w-full',
              'flex items-end',
              'text-gray-800',
            )}
          >
            <div
              className={clsx(
                'h-4/5 w-full rounded-tl-xl rounded-tr-xl shadow-xl',
                'border-gary-50 border border-solid bg-gray-200',
                'shadow-inner'
              )}
            >
              <div
                className={clsx(
                  'flex items-center',
                  'px-2 sm:py-2',
                  'overflow-x-scroll'
                )}
              >
                {chipsList.map((text) => {
                  return (
                    <Button
                      key={text}
                      variant={'light'}
                      className={clsx(
                        'text-md my-1 mx-2 py-2 px-3',
                        'shadow-lg',
                        'shadow-inner',
                        'rounded-md'
                      )}
                      onClick={() => setCard(text)}
                    >
                      {text}
                    </Button>
                  );
                })}
              </div>

              <div className='my-2 h-[1px] w-full bg-gray-300' />
              <div className='min-h-80 h-full w-full px-4'>
                {card === 'Banks' && <BanksCard />}
                {card === 'Expenses' && <ExpensesCard />}
              </div>
            </div>
          </section>
        </div>

        <section
          className={clsx(
            `bg-[url('../assets/blurry-gradient-haikei.svg')]`,
            `h-full w-screen text-gray-800`
          )}
        >
          <div
            className={clsx(
              'flex h-full  w-screen flex-col items-center',
              'px-2 py-2',
              'sm:px-4 sm:py-4',
              'md:px-6 md:py-6',
              'lg:px-8 lg:py-8'
            )}
          >
            <h1
              className={clsx(
                'font-extrabold tracking-tight',
                'my-6',
                'text-4xl',
                'md:text-5xl',
                'text-center'
              )}
            >
              Financial tools for your {'  '}
              <span
                className={clsx(
                  'text-white',
                  'font-mono text-4xl  font-extrabold tracking-tight md:text-5xl'
                )}
              >
                Goals
              </span>
            </h1>
            <h2
              className={clsx(
                'font-extrabold tracking-tight',
                'text-center',
                'text-2xl',
                'lg:text-3xl',
                'my-4'
              )}
            >
              We visualize data provided by {'  '}
              <span
                className={clsx(
                  'text-white',
                  'font-mono text-2xl  font-extrabold tracking-tight md:text-3xl'
                )}
              >
                Plaid API
              </span>
            </h2>
          </div>
        </section>

        <section className='h-full w-screen'>
          <div
            className={clsx(
              'flex flex-col',
              'mt-10 w-full',
              'justify-between',
              'items-center'
            )}
          >
            <StepSection
              text1={'Set Up'}
              text2={'Your Plaid Account '}
              imageSrc={plaidSvg}
            >
              <h5 className={clsx('text-md font-extralight uppercase')}>
                Plaid API
              </h5>
              <h3 className={clsx('text-center text-2xl', 'md:text-left')}>
                The safer way to connect financial accounts
              </h3>
              <p className={clsx('text-center', 'text-base md:text-left')}>
                Connect your accounts and control access to them. Easy and
                accessible experiences for users.
              </p>
              <span
                className={clsx(
                  'my-2 inline-flex items-end gap-1 md:self-start '
                )}
              >
                <p className={clsx('text-center', 'text-base md:text-left')}>
                  Read more about Plaid
                </p>
                <ArrowLink
                  as={ButtonLink}
                  variant={mode === 'light' ? 'dark' : 'light'}
                  className='inline-flex items-center self-baseline p-1 text-sm'
                  href='#'
                >
                  PLAID
                </ArrowLink>
              </span>
            </StepSection>
            <StepSection
              text1={'Sign Up'}
              text2={'PersonalFinance'}
              icon={<VscAccount />}
            >
              <h5 className={clsx('text-md font-extralight uppercase')}>
                Set up
              </h5>
              <h3 className={clsx('text-center', 'md:text-left')}>
                Create Account
              </h3>
              <h3 className={clsx('text-center', 'md:text-left')}>
                Connect your Plaid
              </h3>
              <p className={clsx('text-center', 'text-base md:text-left')}>
                We use special Plaid Key to display your data in our app. <br />
              </p>
              <p className={clsx('text-center', 'text-base md:text-left')}>
                Not a single piece of Your data is being stored.
              </p>
            </StepSection>
            <StepSection
              text1={'Analyze'}
              text2={'Your cash flow'}
              icon={<AiOutlineLineChart />}
            >
              <h5 className={clsx('text-md font-extralight')}>
                PersonalFinance
              </h5>
              <h3 className={clsx('text-center', 'md:text-left')}>
                Checkout Demo
              </h3>
              <p className={clsx('text-center', 'text-base md:text-left')}>
                Use PersonalFinance charts and tools to track the dynamic of
                your cash flow.
              </p>
              <span className={clsx('my-2 inline-flex items-end gap-1')}>
                <p className={clsx('text-center', 'text-base md:text-left')}>
                  Checkout app before signing up
                </p>
                <ArrowLink
                  as={ButtonLink}
                  variant={mode === 'light' ? 'dark' : 'light'}
                  className='inline-flex items-center p-1 text-sm'
                  href='/finance'
                >
                  Demo version
                </ArrowLink>
              </span>
            </StepSection>
          </div>
        </section>
      </main>
    </Layout>
  );
}

const chipsList = ['Banks', 'Transactions', 'Income', 'Expenses', 'Credits'];
