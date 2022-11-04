import React from 'react';
import clsx from 'clsx';
import Card from '../cards/Card';
import { VscAccount } from 'react-icons/vsc';
import Image from 'next/image';
import Button from '../../buttons/Button';
import ButtonLink from '../../links/ButtonLink';
import { AiOutlineLineChart } from 'react-icons/ai';
import Ping from '../../Ping';

const InstructionsSection = () => {
  return (
    <>
      <header>
        <section
          className={clsx(
            `h-full w-screen text-gray-800`,
            'bg-gradient-to-bl from-sky-400 to-blue-500'
          )}
        >
          <div className='relative flex flex-col items-center gap-5'>
            <h1 className='my-5 text-center text-3xl font-extrabold uppercase tracking-tight md:text-5xl lg:text-6xl'>
              Financial tool for your
              <span
                className={clsx(
                  'text-white',
                  'ml-2 font-mono font-extrabold tracking-tight '
                )}
              >
                Goals
              </span>
            </h1>
            <h2
              className={clsx(
                'font-extrabold tracking-tight',
                'text-center uppercase',
                'my-4 mb-20 text-center text-xl md:text-2xl lg:text-3xl'
              )}
            >
              We visualize data provided by {'  '}
              <span
                className={clsx(
                  'text-white',
                  'font-mono font-extrabold tracking-tight'
                )}
              >
                Plaid API
              </span>
            </h2>

            <div
              className={clsx(
                'absolute bottom-14',
                'h-[3rem] w-60',
                'rounded-lg',
                'translate-y-20',
                'bg-white',
                'shadow-md',
                'flex items-center justify-center',
                'font-mono text-xl uppercase ring ring-primary-400'
              )}
            >
              Start in 3 steps
            </div>
          </div>
        </section>
      </header>
      <article
        className='mx-auto  mt-40 mb-28 flex max-w-screen-xl flex-col 
          gap-10 md:flex-row md:justify-around md:gap-0 '
      >
        <section className='flex flex-col items-center'>
          <Card className='mb-5 h-[13rem] w-[16rem]'>
            <div className='flex h-full w-full flex-col items-center justify-center'>
              <VscAccount className='mb-4 text-6xl' />
              <h3 className='tracking-tight'>Sign Up</h3>
              <h3>PersonalFinance</h3>
            </div>
          </Card>
          <div className='flex flex-col items-center justify-center'>
            <p className='font-ligh mb-2 text-center text-xl tracking-wide '>
              We use special Plaid Key <br /> to display your data in <br />
              our app.
            </p>
            <p className='text-center text-xl font-light tracking-wide'>
              Not a single piece of <br />
              Your data is being stored.
            </p>
          </div>
        </section>
        <section className='flex flex-col items-center justify-center'>
          <Card className='mb-5 h-[13rem] w-[16rem]'>
            <div className='flex h-full w-full flex-col items-center justify-center'>
              <Image src={'/images/plaid.png'} width={110} height={110} />
              <h3 className='tracking-tight'>Connect</h3>
              <h3>Plaid</h3>
            </div>
          </Card>
          <div className='flex flex-col items-center justify-center'>
            <p className='font-ligh mb-2 text-center text-xl tracking-wide '>
              In your cabinet connect <br />
              banks by clicking
            </p>
            <Button className='py-1'>Connect Plaid</Button>
            <p className='text-center text-xl font-light tracking-wide'>
              If you want to read more <br />
              about Plaid, visit their website
            </p>
          </div>
        </section>
        <section className='flex flex-col items-center'>
          <Card className='mb-5 h-[13rem] w-[16rem]'>
            <div className='flex h-full w-full flex-col items-center justify-center'>
              <AiOutlineLineChart className='mb-4 text-6xl' />
              <h3 className='tracking-tight'>Sign Up</h3>
              <h3>PersonalFinance</h3>
            </div>
          </Card>
          <div className='flex flex-col items-center justify-center'>
            <p className='font-ligh mb-2 text-center text-xl tracking-wide '>
              Open the PersonalFinance <br />
              app and start using it!
            </p>
            <ButtonLink
              variant='dark'
              href='#'
              className={clsx(
                'relative py-1',
                'text-xl font-light tracking-wide ',
                'flex items-center justify-around'
              )}
            >
              <span>Check Demo</span>
              <span className='absolute -top-1 -right-1'>
                <Ping />
              </span>
            </ButtonLink>
          </div>
        </section>
      </article>
    </>
  );
};

export default InstructionsSection;
