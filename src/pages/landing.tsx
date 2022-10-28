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

import { BsArrowDown } from 'react-icons/bs';
import Button from '@/components/buttons/Button';

const Card = ({ children, className }: { children: any; className: any }) => {
  return (
    <div
      className={clsx(
        'rounded-xl',
        'border-4 border-primary-200 text-center',
        'bg-gray-300',
        className
      )}
    >
      {children}
    </div>
  );
};

const Ping = () => {
    return(
        <span className="flex h-3 w-3 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"/>
            <span className="inline-flex rounded-full h-3 w-3 bg-sky-500"/>
        </span>
    )
}

export default function HomePage() {
  const appName = 'PersonalFinance';

  return (
    <Layout>
      <Toaster />
      <main>
        <article
          className={clsx(
            'mt-5 flex mx-auto',
            //mobile-tablet
            'flex-col max-w-screen-md',
            //desktop
            'lg:flex-row justify-between',
            'lg:max-w-screen-xl',
          )}
        >
          <section className={clsx(
            'flex flex-col w-full',
            'justify-center items-center',
            //desktop
            'lg:block lg:w-1/2',
            'lg:min-h-[75vh]',
          )}>
            <div>
              <h1
                className={clsx(
                    'text-center lg:text-left',
                    'text-4xl font-extrabold tracking-tight',
                    'sm:text-5xl md:text-6xl  xl:text-7xl',
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
              <h2 className='font-mono text-center lg:text-left'>{appName}</h2>
              <h3 className='font-normal text-center lg:text-left'>
                will help you organize your bank data
              </h3>
            </div>
          </section>

          <section className={clsx(
            'w-full h-[60vh]',
            'p-5 mt-10',
            //desktop
            'lg:p-0',
            'lg:min-h-[75vh]',
            'lg:w-1/2 lg:mt-0',
          )}>
            <div
              className={clsx(
                'h-full w-full',
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
        
        <article className={clsx(
            'mx-auto mt-10 p-5',
            'max-w-screen-md',
            'lg:max-w-screen-xl lg:p-0',
        )}>

          <section className={clsx(
            'mb-20 lg:mb-52',
            'flex flex-col items-center justify-end',
            'md:flex-row md:justify-between md:items-end',
            )}>
            <div className={clsx('md:w-1/2', 'flex justify-start')}>
              <Card className={'h-[10rem] w-[20rem] sm:h-[10rem] sm:w-[28rem] md:h-[15rem] md:w-[32rem]'}>Checking</Card>
            </div>

            <div className={clsx(
                'flex justify-end items-end',
                'lg:w-1/2 my-8 lg:my-1', 
                'lg:justify-center',
                )}>

                <div className={clsx(
                    'py-2 lg:px-5',
                    'flex flex-col items-center md:items-end',
                )}>
                    <figure className='h-16 w-16 bg-gray-300 rounded-full mb-2'/>
                    <p className='text-lg text-center sm:text-right '>Get your accounts organazied</p>
                    <p className='text-lg text-center sm:text-right'>Build the mental map of your accounts dynamic</p>
                </div>
            </div>
          </section>

          <header className='mb-20 lg:mb-40 flex justify-center gap-5'>
            {['track', 'analyze', 'improve'].map( heading => 
                <h1 className={clsx(
                    'font-extrabold uppercase tracking-tight', 
                    'text-2xl md:text-5xl lg:text-6xl'
                )}>
                    {heading}
                </h1>
            )}
          </header>

            <section className={clsx(
                'mb-28 md:mb-60 flex flex-col items-center',
                'md:flex-row md:justify-between'
            )}>
                <div className='lg:w-1/2 flex justify-center'>
                <div className=''>
                    <h2 className='font-mono tracking-tight'>Clear vision</h2>
                    <p className='mb-5 font-thin'>
                    See what is happening with your finance
                    </p>
                </div>
                </div>

                <div className='lg:w-1/2 flex justify-end'>
                <Card 
                    className={
                        'h-[12rem] w-[20rem] sm:h-[12rem] sm:w-[25rem] lg:h-[12rem] lg:w-[32rem]'}
                > Checking</Card>
                </div>
            </section>



          <section className={clsx(
                'mb-28 md:mb-60 flex flex-col-reverse items-center',
                'md:flex-row md:justify-between'
            )}>
            <div className='lg:w-1/2 flex justify-start'>
              <Card className={
                'h-[15rem] w-[20rem] sm:h-[18rem] sm:w-[25rem] lg:h-[20rem] lg:w-[32rem]'
                }>Checking</Card>
            </div>

            <div className={clsx(
                'lg:w-1/2', 
                'flex justify-center'
            )}>
              <div className='flex flex-col items-center md:items-end'>
                <h2 className='font-mono tracking-tight'>Fill the gaps</h2>
                <p className='mb-2 font-thin'>Get your accounts organazied.</p>
                <p className='text-right mb-2'>
                    Build the mental map of your 
                    accounts dynamic.
                </p>
              </div>
            </div>
          </section>




          <section className={clsx(
                'mb-28 md:mb-60 flex flex-col items-center',
                'md:flex-row md:justify-between'
            )}>
            <div className='lg:w-1/2 flex justify-center'>
              <div className=''>
                <h2 className='font-mono tracking-tight'>Observe patters</h2>
                <p className='mb-5 font-thin'>
                  Recognize your bad financial habbits is <br />
                  the first step to eliminate them
                </p>
              </div>
            </div>

            <div className={clsx('lg:w-1/2 flex justify-end')}>
              <Card className={
                'h-[25rem] w-[20rem] sm:h-[27rem] sm:w-[25rem] lg:h-[35rem] lg:w-[32rem]'
                }>Checking</Card>
            </div>
          </section>





        </article>
        
        <article className={clsx('max-w-screen-xl', 'mx-auto')}>
          <header className='mb-20 sm:mb-36 flex justify-center gap-5'>
            <h1 className=' text-center text-3xl md:text-5xl lg:text-6xl font-extrabold uppercase tracking-tight'>
              Smooth expirience
            </h1>
          </header>
          <section className='mb-32 flex flex-col sm:flex-row justify-around'>
            <div className='flex sm:translate-y-40 flex-col items-center'>
              <figure className='mb-3 h-24 w-24 rounded-md border border-red-500'></figure>
              <h3 className='mb-2 font-mono text-center font-medium tracking-tight'>
                Easy to set up
              </h3>
              <p className='mb-5 font-thin text-center'>We made the the app intuitive</p>
            </div>

            <div className='flex flex-col items-center'>
              <figure className='mb-3 h-24 w-24 rounded-md border border-red-500'></figure>
              <h3 className='mb-2 text-center font-mono font-medium tracking-tight'>
                Safety with Plaid
              </h3>
              <p className='mb-5 text-center font-thin'>
                Plaid is the best <br />
                bank-data provider on the market
              </p>
            </div>

            <div className='flex sm:translate-y-40 flex-col items-center'>
              <figure className='mb-3 h-24 w-24 rounded-md border border-red-500'></figure>
              <h3 className='mb-2 text-center font-mono font-medium tracking-tight'>
                Fast Data loadss
              </h3>
              <p className='mb-5 text-center font-thin'>
                Upload fresh transactions <br />
                data on login
              </p>
            </div>
          </section>

          <a className='group mb-28 sm:mb-56 flex cursor-pointer flex-col items-center'>
            <h1
              className={clsx(
                'mb-8 text-center',
                'transition-colors duration-150',
                'group-hover:text-red-500 '
              )}
            >
              How it Works?
            </h1>
            <BsArrowDown
              className={clsx(
                'animate-bounce text-center text-5xl',
                'transition-colors duration-150',
                'group-hover:text-red-500'
              )}
            />
          </a>
        </article>
        
        <article>
          <section
            className={clsx(
              `h-full w-screen text-gray-800`,
              'bg-gradient-to-bl from-sky-400 to-blue-500',
            )}
          >
            <header className='mb-36 flex flex-col items-center gap-5 relative'>
              <h1 className='my-5 text-center text-3xl md:text-5xl lg:text-6xl font-extrabold uppercase tracking-tight'>
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
                    'font-mono text-2xl  font-extrabold tracking-tight'
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
                  'font-mono text-xl uppercase ring ring-primary-200'
                )}
              >
                Start in 3 steps
              </div>
            </header>
          </section>
        </article>


        <article className='max-w-screen-xl mx-auto flex flex-col gap-10 md:gap-0 md:flex-row md:justify-around mb-28'>
            <section className='flex flex-col items-center'>
                <Card 
                    className={
                        'w-[16rem] h-[13rem] mb-5'
                    }
                >Card 1</Card>
                <div className='flex flex-col items-center justify-center'>
                    <p className='text-center text-xl font-ligh tracking-wide mb-2 '>
                        We use special Plaid Key <br/> to display your 
                        data in <br/>
                        our app.
                    </p>
                    <p className='text-center text-xl font-light tracking-wide'>
                        Not a single piece of <br/> 
                        Your data is being stored.
                    </p>
                </div>
            </section>
            <section className='flex flex-col items-center justify-center'>
                <Card className={'w-[16rem] h-[13rem] mb-5'}>Card 1</Card>
                <div className='flex flex-col items-center justify-center'>
                    <p className='text-center text-xl font-ligh tracking-wide mb-2 '>
                        In your cabinet connect <br/>
                        banks by clicking
                    </p>
                    <Button className='py-1'>Connect Plaid</Button>
                    <p className='text-center text-xl font-light tracking-wide'>
                        If you want to read more <br/>
                        about Plaid, visit their website 
                    </p>
                </div>
            </section>
            <section className='flex flex-col items-center'>
                <Card className={'w-[16rem] h-[13rem] mb-5'}>Card 1</Card>
                <div className='flex flex-col items-center justify-center'>
                    <p className='text-center text-xl font-ligh tracking-wide mb-2 '>
                        Open the {appName} <br/>
                        app and start using it!
                    </p>
                    <ButtonLink 
                        variant='dark' 
                        href='#' 
                        className={clsx(
                            'relative py-1',
                            'tracking-wide text-xl font-light ',
                            'flex justify-around items-center',
                        )}>
                        <span>Check Demo</span>
                        <span className='absolute -top-1 -right-1'>
                            <Ping/>
                        </span> 
                    </ButtonLink>
                </div>
            </section>
        </article>

        <article className={clsx(
            `h-full w-screen text-gray-800`,
            'bg-gradient-to-bl from-sky-400 to-blue-500',
        )}>
        <section className='max-w-screen-xl mx-auto py-4'>
                <h1 className='text-center mb-10 text-3xl'>Reviews</h1>
                <ul className='flex flex-wrap justify-center gap-5 md:justify-around'>
                    <li className='flex flex-col justify-center items-center'> 
                        <figure className='w-28 h-28 rounded-full border-2 border-white bg-gray-400'/>
                        <h6>John Doe</h6>
                        <p>John's review here</p>
                    </li>
                    <li className='flex flex-col justify-center items-center'> 
                        <figure className='w-28 h-28 rounded-full border-2 border-white bg-gray-400'/>
                        <h6>John Doe</h6>
                        <p>John's review here</p>
                    </li>
                    <li className='flex flex-col justify-center items-center'> 
                        <figure className='w-28 h-28 rounded-full border-2 border-white bg-gray-400'/>
                        <h6>John Doe</h6>
                        <p>John's review here</p>
                    </li>
                    <li className='flex flex-col justify-center items-center'> 
                        <figure className='w-28 h-28 rounded-full border-2 border-white bg-gray-400'/>
                        <h6>John Doe</h6>
                        <p>John's review here</p>
                    </li>
                    <li className='flex flex-col justify-center items-center'> 
                        <figure className='w-28 h-28 rounded-full border-2 border-white bg-gray-400'/>
                        <h6>John Doe</h6>
                        <p>John's review here</p>
                    </li>
                </ul>
            </section>
        </article>
        <article className='max-w-screen-xl mx-auto flex justify-center'>
            <section className={clsx(
                'my-28',
                'w-5/6 lg:w-full h-[20rem] border-2 border-red-500',
                'rounded-xl',
                'flex flex-col',
                'px-6 py-3',
                'mx-4 lg:mx-0'
            )}>
                <div className=' h-1/2'>
                    <h1>{appName}</h1>
                    <p>Some marketing here</p>
                </div>
                <div className=' h-1/2 inline-flex gap-5 items-center justify-end '>
                    <Button>Try Demo</Button>
                    <Button>Sign Up</Button>
                </div>
            </section>
        </article>
      </main>
    </Layout>
  );
}
