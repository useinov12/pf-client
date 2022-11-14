import React from 'react';
import clsx from 'clsx';
import AccountsCard from '../cards/AccountsCard';
import BanksCard from '../cards/BanksCard';
import StatisticsCard from '../cards/StatisticsCard';
import { FaChartPie } from 'react-icons/fa';
import { BsPiggyBankFill } from 'react-icons/bs';
import { MdSwitchAccount } from 'react-icons/md';
import { FaMoneyBillWave } from 'react-icons/fa';
import Path from '../Path';
import { ThemeContext } from '@/context/ThemeProvider';

const ShowcaseSection = () => {
  const { mode } = React.useContext(ThemeContext);
  
  return (
    <article
      className={clsx(
        'mx-auto',
        'px-3 sm:max-w-screen-sm',
        'md:max-w-screen-md ',
        'lg:max-w-screen-xl',
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

          <div className='my-10 h-full w-full md:my-0'>
            <ul className='grid gap-2 lg:grid-cols-3'>
              {cards.map((card, i) => (
                <li
                  key={card.title}
                  className={clsx(
                    'flex-col items-center rounded',
                    ' border p-2  md:h-60 ',
                    mode === 'light' ? 'border-dark/50' : 'border-gray-400/50',
                    mode === 'light' ? 'bg-gray-400/50' : 'bg-gray-700/50'
                  )}
                >
                  <div className='flex items-center justify-start gap-2'>
                    {card.icon}
                    <h4 className='md:text-xl'>{card.title}</h4>
                  </div>
                  <h5 className='mb-2 font-normal'>{card.secondTitle}</h5>
                  {card.content}
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
              <h2 className='mb-1 text-left  text-4xl font-extralight tracking-tighter'>
                {section.title}
              </h2>
              <h3 className='mb-3 text-left text-xl font-bold'>
                {section.secondTitle}
              </h3>
              <p className='font-bolder mb-5 text-left text-lg tracking-wide '>
                {section.text}
              </p>
            </div>

            <div className='flex w-full justify-center lg:w-1/2'>
              {section.card}
            </div>
          </section>

          <Path height={250} className='hidden rotate-180 lg:block' />
        </React.Fragment>
      ))}
    </article>
  );
};

export default ShowcaseSection;

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

const BanksContent = () => {
  const { mode } = React.useContext(ThemeContext);
  return (
    <ul className='flex flex-wrap items-center gap-2'>
      {banks.map((bank, i) => (
        <li
          key={bank}
          className={clsx(
            'rounded-md border bg-transparent px-3 py-1 ring-4 ring-transparent drop-shadow',
            mode === 'light' ? 'border-dark/50' : 'border-gray-400/50',
            i === 2 && 'bg-sky-500 text-white ring-sky-600'
          )}
        >
          <h4 className='text-sm drop-shadow'>{bank}</h4>
        </li>
      ))}
    </ul>
  );
};
const AccountsContent = () => {
  const { mode } = React.useContext(ThemeContext);
  return (
    <ul className='flex flex-wrap items-center gap-2'>
      {accounts.map((account, i) => (
        <li
          key={account}
          className={clsx(
            'rounded-md border bg-transparent px-3 py-1 ring-4 ring-transparent drop-shadow w-full',
            mode === 'light' ? 'border-dark/50' : 'border-gray-400/50',
            i === 2 && 'bg-sky-500 text-white ring-sky-600'
          )}
        >
          <h4 className='text-sm drop-shadow'>{account}</h4>
        </li>
      ))}
    </ul>
  );
};

const TransactionsContent = () => {
  const { mode } = React.useContext(ThemeContext);
  return (
    <ul className='flex flex-wrap items-center gap-2'>
      {transactions.map((transaction, i) => (
        <li
          key={transaction[0]}
          className={clsx(
            'rounded-md border bg-transparent px-3 py-1 ring-4 ring-transparent drop-shadow w-full',
            mode === 'light' ? 'border-dark/50' : 'border-gray-400/50',
            i === 1 && 'bg-sky-500 text-white ring-sky-600',
            'flex justify-between'
          )}
        >
          <h5 className='text-sm drop-shadow'>{transaction[0]}</h5>
          <h5 className='text-sm drop-shadow'>{transaction[1]}</h5>
          <h5 className='text-sm drop-shadow'>$xxxx</h5>
        </li>
      ))}
    </ul>
  );
};

const cards = [
  {
    icon: <BsPiggyBankFill className='h-12 w-12' />,
    title: 'Banks',
    secondTitle: 'Your banks in one click',
    content: <BanksContent/>,
  },
  {
    icon: <MdSwitchAccount className='h-12 w-12' />,
    title: 'Accounts',
    secondTitle: 'All types of accounts',
    content: <AccountsContent/> ,
  },
  {
    icon: <FaMoneyBillWave className='h-12 w-12' />,
    title: 'Transactions',
    secondTitle: 'List of all transactions',
    content: <TransactionsContent/>,
  },
];

const banks = [
  'Capital One',
  'Bank Of America',
  'Chase',
  'Wells Fargo',
  'Citibank',
  'PNC',
  'American Express',
];

const accounts = [
  'Checking',
  'Saving',
  'Credit',
  'Other accounts'
]

const transactions = [
  ['07/14/2022', 'PURCHASE'],
  ['05/15/2022', 'DEPOSIT'],
  ['03/12/2022', 'PURCHASE'],
  ['06/21/2022', 'LOAN'],
]
