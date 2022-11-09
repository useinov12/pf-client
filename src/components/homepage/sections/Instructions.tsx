import React from 'react';
import clsx from 'clsx';
import { VscAccount } from 'react-icons/vsc';
import Image from 'next/image';
import Button from '../../buttons/Button';
import ButtonLink from '../../links/ButtonLink';
import { AiOutlineLineChart } from 'react-icons/ai';
import Ping from '../../Ping';
import { ThemeContext } from '@/context/ThemeProvider';

const InstructionsSection = () => {
  const { mode } = React.useContext(ThemeContext)
  return (
    <>
      <header>
        <section
          className={clsx(
            `h-full w-screen text-gray-800`,
            'bg-gradient-to-bl from-sky-400 to-blue-500'
          )}
          id={'instruction'}
        >
          <div className='relative flex flex-col items-center gap-5'>
            <h1 className='my-20 text-center text-3xl font-extrabold uppercase tracking-tight md:text-4xl lg:text-5xl'>
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

            <div
              className={clsx(
                'absolute bottom-14',
                'h-[3rem] w-60',
                'rounded-lg',
                'translate-y-20',
                'bg-gray-100',
                'shadow-md',
                'flex items-center justify-center drop-shadow shadow-inner',
                'font-mono text-xl uppercase ring ring-white'
              )}
            >
              Start in 3 steps
            </div>
          </div>
        </section>
      </header>

      <article
        className={clsx(
          'mx-auto mt-40 mb-28 flex flex-col',
          'gap-10 md:gap-x-5 items-center md:gap-0',
          'sm:max-w-screen-sm px-3',
          'md:max-w-screen-md ',
          'lg:max-w-screen-lg',
          'xl:max-w-screen-xl'
        )}
      >
        <InstructionCard>
          <div className={clsx(
            'py-2 md:px-10 flex flex-col justify-center items-center md:border-r ',
            mode === 'light' ? '' : 'bg-gray-200',
            mode === 'light' ? 'border-dark/50' : 'border-gray-400/50',
          )}>
            <VscAccount className='mb-4 text-6xl  text-dark ' />
            <h3 className='tracking-tight whitespace-nowrap text-dark '>Sign Up</h3>
          </div>

          <div className='px-5 flex flex-col justify-center items-start '>
            <p className='font-light mb-2 text-xl tracking-wide w-full text-center md:text-left md:w-4/6'>
              We use special Plaid Key to display your data in our app.
            </p>
          </div>
        </InstructionCard>

        <InstructionCard>
          <div className={clsx(
            'py-2 md:px-9 flex flex-col justify-center items-center md:border-r',
            mode === 'light' ? '' : 'bg-gray-200',
            mode === 'light' ? 'border-dark/50' : 'border-gray-400/50',
          )}>
            <Image src={'/images/plaid.png'} width={110} height={110} />
            <h3 className='tracking-tight whitespace-nowrap text-dark'>Connect</h3>
          </div>

          <div className='px-5 flex flex-col justify-center items-center md:items-start '>
            <p className='font-light mb-2 text-xl tracking-wide w-full text-center md:text-left md:w-4/6'>
              In your cabinet connect  banks by clicking
            </p>
            <Button className='py-1 my-2'>Add bank</Button>
          </div>
        </InstructionCard>

        <InstructionCard>
          <div className={clsx(
            'py-2 md:px-9 flex flex-col justify-center items-center md:border-r',
            mode === 'light' ? '' : 'bg-gray-200',
            mode === 'light' ? 'border-dark/50' : 'border-gray-400/50',
          )}>
            <AiOutlineLineChart className='mb-4 text-6xl  text-dark ' />
            <h3 className='tracking-tight whitespace-nowrap text-dark'>Connect</h3>
          </div>

          <div className='px-5 flex flex-col justify-center items-center md:items-start '>
            <p className='font-light mb-2 text-xl tracking-wide w-full text-center md:text-left md:w-4/6'>
              Open the PersonalFinance app and start using it!
            </p>
            <ButtonLink
              variant={mode === 'dark' ? 'light' : 'dark'}
              href='#'
              className={clsx(
                'relative py-1 my-2',
                'text-md tracking-wide ',
                'flex items-center justify-around'
              )}
            >
              <span>Check Demo</span>
              <span className='absolute -top-1 -right-1'>
                <Ping />
              </span>
            </ButtonLink>
          </div>
        </InstructionCard>
      </article>
    </>
  );
};

export default InstructionsSection;




const InstructionCard = ({children}:{children:JSX.Element[]}) => {
  const { mode } = React.useContext(ThemeContext)
  return (
    <section className={clsx(
      'mb-5 h-full w-full lg:w-5/6 md:h-48  border rounded flex flex-col md:flex-row',
      'overflow-hidden', 
      mode === 'light' ? 'border-dark/50' : 'border-gray-400/50',
      mode === 'light' ? 'bg-gray-400/50' : 'bg-gray-700/50'
    )}>
      {children}
    </section>
  )
}