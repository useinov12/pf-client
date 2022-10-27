import React from 'react';
import clsx from 'clsx';
import { Toaster } from 'react-hot-toast';
import { ThemeContext } from '@/context/ThemeProvider';

import ArrowLink from '@/components/links/ArrowLink';
import ButtonLink from '@/components/links/ButtonLink';
import UnstyledLink from '@/components/links/UnstyledLink';
import Accent from '@/components/Accent';
import Header from '@/components/layout/Header';
import Layout from '@/components/layout/Layout';

const Card = ({ children, className }: { children: any; className: any }) => {
  return (
    <div
      className={clsx(
        'rounded',
        'border border-red-500 text-center',
        className
      )}
    >
      {children}
    </div>
  );
};

export default function HomePage() {
  const appName = 'PersonalFinance';

  return (
    <Layout>
      <Toaster />
      <main className={clsx('max-w-screen-xl', 'mx-auto')}>
        <article
          className={clsx(
            // 'bg-blue-500/50',
            'flex justify-between',
            'mt-5'
          )}
        >
          <section
            className={
              clsx()
              // 'bg-purple-500/50'
            }
          >
            <div>
              <h1
                className={clsx(
                  'text-4xl font-extrabold tracking-tight',
                  'sm:text-6xl md:text-5xl  xl:text-7xl',
                  'mb-10'
                )}
              >
                Take{' '}
                <UnstyledLink href='#'>
                  <Accent>control</Accent>
                </UnstyledLink>{' '}
                <br />
                over your money
              </h1>
              <h2 className='font-mono'>{appName}</h2>
              <h3 className='font-normal'>
                will help you organize your bank data
              </h3>
            </div>
          </section>
          <section
            className={
              clsx()
              // 'bg-orange-500/50'
            }
          >
            <div
              className={clsx(
                // 'bg-gray-600',
                'h-[39rem] w-[40rem]',
                'grid-rows-10 grid  gap-x-5 gap-y-2'
              )}
            >
              <div
                className={clsx(
                  'col-span-4',
                  'border border-red-500 text-center',
                  'rounded'
                )}
              >
                Card 1
              </div>
              <div
                className={clsx(
                  'col-span-2',
                  'row-span-4',
                  'row-start-3',
                  'border border-red-500 text-center',
                  'rounded'
                )}
              >
                Card 2
              </div>
              <div
                className={clsx(
                  'col-span-2',
                  'col-start-3',
                  'row-span-3',
                  'border border-red-500 text-center',
                  'rounded'
                )}
              >
                Card 3
              </div>
              <div
                className={clsx(
                  'col-span-2',
                  'row-span-3',
                  'border border-red-500 text-center',
                  'rounded'
                )}
              >
                Card 4
              </div>
            </div>
          </section>
        </article>
        <article>
          <div
            className={clsx(
              'rounded',
              'h-[12rem] w-[30rem]',
              'border border-red-500 text-center',
              'mb-44'
            )}
          >
            Opinion Card
          </div>

          <header className='flex gap-5 justify-center mb-44'>
                <h1 className='text-6xl uppercase tracking-tight font-extrabold'>Track</h1>
                <h1 className='text-6xl uppercase tracking-tight font-extrabold'>Analyze</h1>
                <h1 className='text-6xl uppercase tracking-tight font-extrabold'>Influence</h1>
          </header>

          <section className={clsx('mb-44 flex justify-between')}>
            <div className={clsx('w-1/2', 'flex justify-center')}>
              <div className={clsx('')}>
                <h2>Clear vision</h2>
                <p>See what is happening with your finance</p>
              </div>
            </div>

            <div className={clsx('w-1/2', 'flex justify-end')}>
              <Card className={'h-[12rem] w-[30rem]'}>Checking</Card>
            </div>
          </section>


          <section className={clsx('mb-44 flex justify-between')}>
            <div className={clsx('w-1/2', 'flex justify-start')}>
              <Card className={'h-[12rem] w-[30rem]'}>Checking</Card>
            </div>

            <div className={clsx('w-1/2', 'flex justify-center')}>
              <div className={clsx('')}>
                <h2>Clear vision</h2>
                <p>See what is happening with your finance</p>
              </div>
            </div>
          </section>

        </article>
      </main>
    </Layout>
  );
}
