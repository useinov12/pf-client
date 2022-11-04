import React from 'react';
import clsx from 'clsx';
import { Toaster } from 'react-hot-toast';
import ButtonLink from '@/components/links/ButtonLink';
import Accent from '@/components/Accent';
import Layout from '@/components/layout/Layout';

import Button from '@/components/buttons/Button';
import BarChart from '@/components/charts/BarChart';
import Image from 'next/image';
import { SiCircle } from "react-icons/si";
import { BsArrowDown, BsArrowUpShort, BsArrowDownShort, BsCurrencyDollar } from 'react-icons/bs';
import { VscAccount } from 'react-icons/vsc';
import { AiOutlineLineChart } from 'react-icons/ai';
import Card from '@/components/homepage/Card';
import BlockOfCards from '@/components/homepage/BlockOfCards';
import AccountsCard from '@/components/homepage/AccountsCard';
import BanksCard from '@/components/homepage/BanksCard';

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
                    'text-4xl font-extrabold',
                    'sm:text-4xl md:text-5xl  xl:text-6xl',
                    'uppercase tracking-tighter',
                    'drop-shadow cursor-default mb-16'
                )}
              >
                Take{' '}
                  <Accent>control</Accent>
                <br />
                over your money
              </h1>
              <h2 className='font-mono text-center lg:text-left  text-4xl  drop-shadow cursor-default'>
                {appName}
                </h2>
              <h3 className='font-normal text-center lg:text-left text-2xl drop-shadow cursor-default'>
                will help you organize your bank data
              </h3>
            </div>
          </section>

          <section className={clsx(
            'w-full ',
            'p-5 mt-10',
            //desktop
            'lg:p-0',
            'lg:min-h-[60vh]',
            'lg:max-h-[65vh]',
            'lg:w-1/2 lg:mt-0',
          )}>
              <BlockOfCards/>
          </section>
        </article>
        
        <article className={clsx(
            'mx-auto mt-10 p-5',
            'max-w-screen-md',
            'lg:max-w-screen-xl lg:p-0',
        )}>

          <section className={clsx(
            'mb-20 lg:mb-[25rem]',
            'flex flex-col items-center justify-end',
            'md:flex-row md:justify-between md:items-end',
            )}>
            <div className='md:w-1/2 flex justify-start'>
              <Card className={clsx(
                'h-[10rem] w-[20rem]',
                'sm:h-[10rem] sm:w-[28rem]',
                'md:h-[15rem] md:w-[32rem]',
                'group overflow-hidden',
                'transition-all duration-150'
              )}>
                <div className='text-dark relative h-full w-full p-1'>
                    <div className={clsx(
                        'absolute top-4 left-4 z-30 rounded-md cursor-default',
                        'px-2 py-1 shadow-lg bg-gradient-to-bl from-sky-400 to-blue-400 ',
                        'shadow-lg'
                    )}>
                        <h3 className='font-mono tracking-tight'>{appName}</h3>
                    </div>
                    <div className={clsx(
                        `bg-contain bg-[url('../../public/images/sketch.png')]`,
                        'w-3/4 h-full float-right rounded-tl-[10rem] rounded-tr-xl rounded-br-xl ',
                        'group-hover:blur-md rounded-xls'
                    )}>
                    </div>
                    <div className='absolute bottom-6 right-6'>
                      <Button variant='dark' className='py-[2px] px-7 uppercase  text-xl shadow-lg relative'>
                        Demo
                        <span className='absolute -top-1 -right-1'>
                          <Ping/>
                        </span> 
                      </Button>
                    </div>
                </div>
              </Card>
            </div>

            <div className={clsx(
                'flex justify-end items-end',
                'lg:w-1/2 my-8 lg:my-1', 
                'lg:justify-center',
                )}>

                <div className={clsx(
                    'pt-2 lg:pl-5',
                    'flex flex-col items-center md:items-end',
                    'md:translate-y-20'
                )}>
                    <SiCircle className='h-16 w-16 rounded-full mb-2'/>
                    <p className='text-xl text-center sm:text-right font-bold'>Financial app that you looking for</p>
                    <p className='text-xl text-center sm:text-right font-light tracking-tighter'>
                      It was never this easy to 
                      look into your own financial state
                    </p>
                </div>
            </div>
          </section>

          <header className='mb-20 md:my-52 flex justify-center gap-2 md:gap-8 '>
            {['track', 'analyze', 'improve'].map( heading => 
              <h1 key={heading} className={clsx(
                  'uppercase tracking-tight drop-shadow-lg', 
                  'text-3xl sm:text-4xl md:text-5xl lg:text-6xl'
              )}>
                  {heading}
              </h1>
            )}
          </header>

            <section className={clsx(
                'mb-28 md:mb-72 flex flex-col items-center',
                'md:flex-row md:justify-between'
            )}>
                <div className='lg:w-1/2'>
                    <h1 className='text-3xl font-mono tracking-tighter font-extralight mb-1 text-center md:text-left'>
                        Clear your vision
                    </h1>
                    <h3 className='mb-3 text-xl font-bold text-center md:text-left'>
                        What is happening with your finance?
                    </h3>
                    <p className='text-xl font-bolder tracking-wide text-center md:text-left mb-5'>
                        Gather all your banks in one place.<br/>
                        Use charts and tables to see what is happening with your accounts.
                    </p>
                </div>

                <div className='lg:w-1/2 flex justify-end'>
                  <AccountsCard/>
                </div>

            </section>

          <section className={clsx(
                'mb-28 md:mb-72 flex flex-col-reverse items-center',
                'md:flex-row md:justify-between'
            )}>
            <div className='lg:w-1/2 flex justify-start'>
              <BanksCard/>
            </div>

            <div className={clsx(
                'lg:w-1/2', 
                'flex justify-center'
            )}>
              <div className='flex flex-col items-center md:items-end'>
                <h1 className='text-3xl font-mono tracking-tighter font-extralight mb-1 text-center md:text-right'>Fill the gaps</h1>
                <h3 className='mb-3 text-xl font-bold text-center md:text-right'>Get your accounts organazied</h3>
                <p className='text-xl font-bolder tracking-wide text-center md:text-right'>
                    Build the mental map of your accounts dynamic.
                </p>
                <p className='text-xl font-bolder tracking-wide text-center md:text-right mb-5'>
                    Get comfortable knowing your day-to-day <br/>
                    spendings and incomes.
                </p>
              </div>
            </div>
          </section>


          <section className={clsx(
                'mb-28 md:mb-72 flex flex-col items-center',
                'md:flex-row md:justify-between'
            )}>
            <div className='lg:w-1/2 flex justify-center'>
              <div className=''>
                <h1 className='text-3xl font-mono tracking-tighter font-extralight mb-1 text-center md:text-left'>Observe</h1>
                <h3 className='mb-3 text-xl font-bold text-center md:text-left'>
                    See the pattern?
                </h3>
                <p className='text-xl font-bolder tracking-wide text-center md:text-left mb-5'>
                    Recognize your bad financial habbits is <br className='sm:hidden'/>
                    the first step to eliminate them.
                </p>
                <p className='text-xl font-bolder tracking-wide text-center md:text-left mb-5'>
                    Notice good trends and use them as your foundation.
                </p>
              </div>
            </div>

            <div className='lg:w-1/2 flex justify-end'>
                <Card className={clsx(
                    'h-[35rem] w-[20rem]',
                    'sm:h-[27rem] sm:w-[25rem]',
                    'lg:h-[35rem] lg:w-[32rem]',
                )}>
                    <div className='w-full h-full p-2'>
                        <header className='flex justify-evenly items-center my-2'>
                            <h2 className='text-2xl'>Statistics by week day</h2>
                            <div className='flex gap-2 items-center'>
                                <h2 className='text-2xl'>Friday</h2>
                                <div className='flex flex-col items-center justify-center'>
                                    <Button variant='light' className='py-1 px-2 m-0'>
                                        <BsArrowUpShort className='text-xl'/>
                                    </Button>
                                    <Button variant='light' className='py-1 px-2  m-0'>
                                        <BsArrowDownShort className='text-xl'/>
                                    </Button>
                                </div>
                            </div>
                        </header>
                        <ul className='flex flex-col w-full mb-2'>
                            {[
                                ['06/12', '-76'],
                                ['06/19', '-160'],
                                ['06/26', '-142'],
                                ['07/02', '-212'],
                                ['07/09', '-89'],
                            ].map(data => 
                                <li 
                                    className='flex justify-between px-10 
                                    border border-gray-500/20
                                    bg-gray-400/30 rounded py-1 my-1
                                    shadow-sm hover:shadow-inner cursor-default'
                                    key={data[0]}
                                >
                                    <h4 className='font-mono font-semibold'>{data[0]}</h4>
                                    <h4 className='font-mono font-semibold flex items-center justify-between w-16'>
                                        <BsCurrencyDollar className='font-semibold'/>  
                                        <span >{data[1]}</span>
                                    </h4>
                                </li>
                            )}
                        </ul>
                        <div className='w-full px-10 flex justify-between items-baseline mb-3'>
                            <h5 className='font-mono font-bold'>Average `Friday` total: </h5>
                            <h5 className='font-mono font-semibold text-xl'>$-150</h5>
                        </div>
                        <div className='w-full h-1/3'>
                            <BarChart width='100%' height='80%' />
                        </div>
                    </div>

                </Card>
            </div>
          </section>



        </article>
        
        <article className='max-w-screen-xl mx-auto '>
        {/* <article className='bg-dark text-white py-10'> */}
          <header className='mb-20 sm:mb-36 flex justify-center gap-5'>
            <h1 
                className='font-extrabold uppercase tracking-tight
                text-3xl sm:text-4xl md:text-5xl lg:text-6xl'
            >
              Smooth expirience
            </h1>
          </header>

          <section className='mb-32 flex flex-col sm:flex-row justify-around'>
            <div className='flex sm:translate-y-40 flex-col items-center'>
              {/* <Card className='w-44 h-44 mb-10'>
                <div className='w-full h-full flex justify-center items-center'> */}
                  <Image src={'/images/easy-to-setup.png'}  width={150} height={147} />
                {/* </div>
              </Card> */}
              <h3 className='font-mono text-center font-medium tracking-tighter'>
                Easy to set up
              </h3>
              <p className='mb-5 font-light text-center text-lg'>We made the app intuitive</p>
            </div>

            <div className='flex flex-col items-center'>
                <Image src={'/images/safety-with-plaid.png'}  width={150} height={147}/>
              <h3 className='mb-2 text-center font-mono font-medium tracking-tight'>
                Safety with Plaid
              </h3>
              <p className='mb-5 text-center font-light text-lg'>
                Plaid is the best <br />
                bank-data provider on the market
              </p>
            </div>

            <div className='flex sm:translate-y-40 flex-col items-center'>
                <Image src={'/images/fast-data-loads.png'}  width={150} height={147}/>
              <h3 className='mb-2 text-center font-mono font-medium tracking-tight'>
                Fast Data loadss
              </h3>
              <p className='mb-5 text-center font-light text-lg'>
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
                'group-hover:text-primary-500 '
              )}
            >
              How it Works?
            </h1>
            <BsArrowDown
              className={clsx(
                'animate-bounce text-center text-5xl',
                'transition-colors duration-150',
                'group-hover:text-primary-500'
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
            <header className='flex flex-col items-center gap-5 relative'>
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
            </header>
          </section>
        </article>

        {/* <article 
            className='h-screen md:mt-0 flex flex-col gap-10 
            md:gap-0 md:flex-row md:justify-around md:items-center pb-28 bg-dark text-white'
        > */}
        <article 
            className='mt-40  max-w-screen-xl mx-auto flex flex-col gap-10 
            md:gap-0 md:flex-row md:justify-around mb-28 '
        >
            <section className='flex flex-col items-center'>
                <Card className='w-[16rem] h-[13rem] mb-5'>
                    <div className='w-full h-full flex flex-col items-center justify-center'>
                        <VscAccount className='text-6xl mb-4'/>
                        <h3 className='tracking-tight'>Sign Up</h3>
                        <h3>{appName}</h3>
                    </div>
                </Card>
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
                <Card className='w-[16rem] h-[13rem] mb-5'>
                    <div className='w-full h-full flex flex-col items-center justify-center'>
                        <Image src={'/images/plaid.png'} width={110} height={110}/>
                        <h3 className='tracking-tight'>Connect</h3>
                        <h3>Plaid</h3>
                    </div>
                </Card>
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
                <Card className='w-[16rem] h-[13rem] mb-5'>
                    <div className='w-full h-full flex flex-col items-center justify-center'>
                        <AiOutlineLineChart className='text-6xl mb-4'/>
                        <h3 className='tracking-tight'>Sign Up</h3>
                        <h3>{appName}</h3>
                    </div>
                </Card>
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

        <article 
            className='h-full w-screen text-gray-800
            bg-gradient-to-bl from-sky-400 to-blue-500'
        >

        <section className='max-w-screen-xl mx-auto py-4'>
                <h1 className='text-center mb-10 text-5xl'>Reviews</h1>
                <ul className='flex flex-wrap items-baseline justify-center gap-5 md:justify-around'>
                    { reviews.map( ({name, review, image}) =>
                        <li className='flex flex-col justify-center items-center' key={name}> 
                            <Image src={image} width={120} height={110}/>
                            <h6 className='font-bold text-3xl my-2'>{name}</h6>
                            <p className='font-semibold text-lg w-44 h-36 text-center'>{review}</p>
                        </li>
                    )}
                </ul>
            </section>
        </article>
        <article className='max-w-screen-xl mx-auto flex justify-center'>
            <Card className={clsx(
                'my-28',
                'w-5/6 lg:w-full h-[24rem]',
                'mx-4 lg:mx-0',
                'overflow-hidden',
                // 'shadow-primary-400 ',
                'shadow-2xl',
                'ring-2 ring-white'
            )}>
                <div 
                    className='w-full h-full relative group
                    md:bg-gradient-to-bl md:from-sky-400 md:to-blue-500'
                >
                    <div className={clsx(
                        'md:h-1/2 md:absolute',
                        'bg-sky-500 top-4 left-4 z-40 rounded-md px-2 py-1 shadow-lg',
                        'md:bg-transparent md:shadow-none',
                        'md:top-3 md:left-6 md:p-0',
                    )}>
                        <h1 className='text-4xl drop-shadow text-white lg:text-dark'>{appName}</h1>
                        <p className='font-bold text-2xl tracking-tight text-gray-50 drop-shadow'>
                            Try and get sence of <br/> 
                            financial clarity today.
                        </p>
                    </div>
                    <div className={clsx(
                        'w-3/4 h-full flex flex-col px-6 py-3',
                        `bg-cover bg-[url('../../public/images/banner.png')]`,
                        'float-right',
                        'rounded-tl-[10rem]',
                        'flex justify-end',
                        'group-hover:blur-sm',
                        'transition-all duration-100'
                    )}>
                    </div>
                    <div className='absolute bottom-3 right-3 sm:right-5 h-1/2 inline-flex gap-5 items-center self-end'>
                        <Button className='text-2xl px-6 py-1'>Try Demo</Button>
                        <Button className='text-2xl px-6 py-1'>Sign Up</Button>
                    </div>
                </div>
            </Card>
        </article>
      </main>
    </Layout>
  );
}




const Ping = () => {
    return(
        <span className="flex h-3 w-3 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"/>
            <span className="inline-flex rounded-full h-3 w-3 bg-green-500"/>
        </span>
    )
}


const reviews = [
    
    {
        name:'Sophia',
        review:'It is easy to use. I like it a lot!',
        image:'/images/portraits/1.png'
    },
    {
        name:'James',
        review:'Intuitive interface and beautiful design.',
        image:'/images/portraits/2.png'
    },
    {
        name:'Noah',
        review:'The app is fast and realy informative!',
        image:'/images/portraits/3.png'
    },
    {
        name:'Emma',
        review:'I love the product! Definitely going to use it!',
        image:'/images/portraits/4.png'
    },
    {
        name:'Olivia',
        review:'Realy great idea and nice implementation!',
        image:'/images/portraits/5.png'
    },

]