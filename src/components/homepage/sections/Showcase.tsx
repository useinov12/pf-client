import React from 'react';
import clsx from 'clsx';
import AccountsCard from '../cards/AccountsCard';
import BanksCard from '../cards/BanksCard';
import StatisticsCard from '../cards/StatisticsCard';

const ShowCaseSection = () => {
  return (
    <article
      className={clsx(
        'mx-auto mt-10 p-5',
        'sm:max-w-screen-sm px-3',
        'md:max-w-screen-md ',
        'lg:max-w-screen-lg',
        'xl:max-w-screen-xl'
      )}
    >
      <header className='mb-20 flex justify-center gap-2 md:my-52 md:gap-8 '>
        {['track', 'analyze', 'improve'].map((heading) => (
          <h1
            key={heading}
            className={clsx(
              'uppercase tracking-tight drop-shadow-lg',
              'text-3xl sm:text-4xl md:text-5xl lg:text-6xl'
            )}
          >
            {heading}
          </h1>
        ))}
      </header>

      <section
        className={clsx(
          'mb-28 flex flex-col items-center md:mb-72',
          'md:flex-row md:justify-between'
        )}
      >
        <div className='lg:w-1/2 pr-2'>
          <h1 className='mb-1 text-center font-mono text-3xl font-extralight tracking-tighter md:text-left'>
            Clear your vision
          </h1>
          <h3 className='mb-3 text-center text-xl font-bold md:text-left'>
            What is happening with your finance?
          </h3>
          <p className='font-bolder mb-5 text-center text-xl tracking-wide md:text-left'>
            Gather all your banks in one place.
            <br />
            Use charts and tables to see what is happening with your accounts.
          </p>
        </div>

        <div className='flex justify-end lg:w-1/2'>
          <AccountsCard />
        </div>
      </section>

      <section
        className={clsx(
          'mb-28 flex flex-col-reverse items-center md:mb-72',
          'md:flex-row md:justify-between'
        )}
      >
        <div className='flex justify-start lg:w-1/2'>
          <BanksCard />
        </div>

        <div className='lg:w-1/2 flex justify-center pl-2'>
          <div className='flex flex-col items-center md:items-end'>
            <h1 className='mb-1 text-center font-mono text-3xl font-extralight tracking-tighter md:text-right'>
              Fill the gaps
            </h1>
            <h3 className='mb-3 text-center text-xl font-bold md:text-right'>
              Get your accounts organazied
            </h3>
            <p className='font-bolder text-center text-xl tracking-wide md:text-right'>
              Build the mental map of your accounts dynamic.
            </p>
            <p className='font-bolder mb-5 text-center text-xl tracking-wide md:text-right'>
              Get comfortable knowing your day-to-day <br />
              spendings and incomes.
            </p>
          </div>
        </div>
      </section>

      <section
        className={clsx(
          'mb-28 flex flex-col items-center md:mb-72',
          'md:flex-row md:justify-between'
        )}
      >
        <div className='flex justify-center lg:w-1/2'>
          <div className='pr-2'>
            <h1 className='mb-1 text-center font-mono text-3xl font-extralight tracking-tighter md:text-left'>
              Observe
            </h1>
            <h3 className='mb-3 text-center text-xl font-bold md:text-left'>
              See the pattern?
            </h3>
            <p className='font-bolder mb-5 text-center text-xl tracking-wide md:text-left'>
              Recognize your bad financial habbits is{' '}
              <br className='sm:hidden' />
              the first step to eliminate them.
            </p>
            <p className='font-bolder mb-5 text-center text-xl tracking-wide md:text-left'>
              Notice good trends and use them as your foundation.
            </p>
          </div>
        </div>

        <div className='flex justify-end lg:w-1/2'>
          <StatisticsCard />
        </div>
      </section>
    </article>
  );
};

export default ShowCaseSection;
