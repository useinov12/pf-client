import React from 'react';
import clsx from 'clsx';
import AccountsCard from '../cards/AccountsCard';
import BanksCard from '../cards/BanksCard';
import StatisticsCard from '../cards/StatisticsCard';
import { FaChartPie } from 'react-icons/fa';
import Path from '../Path';
import { ThemeContext } from '@/context/ThemeProvider';

const ShowCaseSection = () => {
  const { mode } = React.useContext(ThemeContext);
  return (
    <article
      className={clsx(
        'mx-auto',
        'px-3 sm:max-w-screen-sm',
        'md:max-w-screen-md ',
        'lg:max-w-screen-lg',
        'xl:max-w-screen-xl',
        'mt-20 lg:mt-0'
      )}
    >
      <div className='flex w-full flex-col gap-3 lg:flex-row'>
        <div className='flex flex-col items-center justify-center lg:items-start'>
          <FaChartPie className='my-2 h-16 w-16' />
          <Path height={400} className='hidden lg:block' />
        </div>

        <div className='w-full'>
          <div className='w-full'>
            <div className='flex w-full flex-col items-center lg:items-start'>
              <h2 className='cursor-default text-center font-mono text-2xl tracking-tight drop-shadow lg:text-left'>
                All banks in one place
              </h2>
              <h3 className='cursor-default text-center text-lg font-normal drop-shadow lg:text-left'>
                Track, analyze and improve
              </h3>
            </div>
          </div>

          <div className='mb-10 h-full w-full md:mb-0'>
            <ul
              className={clsx(
                'mt-5 h-full w-full rounded-lg lg:h-56 ',
                'flex flex-wrap items-center justify-center gap-1 sm:flex-nowrap lg:flex-nowrap'
              )}
            >
              {cards.map((card, i) => (
                <li
                  key={card.title}
                  className={clsx(
                    'flex-col items-center rounded',
                    'h-40 w-full  border p-2 sm:w-1/3 md:h-56 md:w-1/3 lg:w-full',
                    mode === 'light' ? 'border-dark/50' : 'border-gray-400/50',
                    mode === 'light' ? 'bg-gray-400/50' : 'bg-gray-700/50'
                  )}
                >
                  <h4>{card.title}</h4>
                  <h5>{card.text}</h5>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {sections.map((section, i) => (
        <React.Fragment key={i}>
          <section
            className={clsx(
              'flex flex-col items-start',
              'mb-48 mt-40 lg:my-2 lg:flex-row lg:justify-between',
              'rounded-lg border p-3 ',
              mode === 'light' ? 'border-dark/50' : 'border-gray-400/50',
              mode === 'light' ? 'bg-gray-400/50' : 'bg-gray-700/50'
            )}
          >
            <div className='flex flex-col items-start pr-2 lg:w-1/3'>
              <h1 className='mb-1 text-left font-mono text-3xl font-extralight tracking-tighter'>
                {section.title}
              </h1>
              <h3 className='mb-3 text-left text-xl font-bold'>
                {section.secondTitle}
              </h3>
              <p className='font-bolder mb-5 text-left text-xl tracking-wide '>
                {section.text}
              </p>
            </div>

            <div className='flex w-full justify-center lg:w-1/2'>
              {section.card}
            </div>
          </section>

          <Path height={300} className='hidden rotate-180 lg:block' />
        </React.Fragment>
      ))}
    </article>
  );
};

export default ShowCaseSection;

const sections = [
  {
    card: <BanksCard />,
    title: 'Clear your vision', 
    secondTitle: 'Get your accounts organazied',
    text: 'Build the mental map of your accounts dynamic. Get comfortable knowing your day-to-day spendings and incomes.',
  },
  {
    card: <AccountsCard />,
    title: 'Fill the gaps',
    secondTitle: 'Get your accounts organazied',
    text: '  Gather all your banks in one place. Use charts and tables to see what is happening with your accounts.',
  },
  {
    card: <StatisticsCard />,
    title: 'Observe',
    secondTitle: 'See the pattern?',
    text: 'Recognize your bad financial habbits is the first step to eliminate them. Notice good trends and use them as your foundation.',
  },
];

const cards = [
  {
    title: 'Banks',
    text: 'Your banks in one click',
  },
  {
    title: 'Accounts',
    text: 'All types of accounts',
  },
  {
    title: 'Transactions',
    text: 'List of all transactions',
  },
];
