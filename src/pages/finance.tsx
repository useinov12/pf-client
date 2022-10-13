import React from 'react';
import LineChart from '@/components/charts/LineChart';
import BarChart from '@/components/charts/BarChart';
import clsx from 'clsx';
import DataLine from '@/components/app-components/DataLine';

import {
  AiOutlineLineChart,
  AiFillBank,
  AiFillCreditCard,
  AiFillPieChart,
  AiFillCalendar,
  AiOutlineInfoCircle,
  AiFillFlag,
} from 'react-icons/ai';
import Button from '@/components/buttons/Button';
import StackedBar from '@/components/charts/StackedBar';

const SideMenu = () => {
  return (
    <>
      <div
        className={clsx(
          'hidden',
          'lg:flex',
          'lg:col-span-2',
          'row-span-1 flex justify-center py-4'
        )}
      >
        <h2 className='hidden text-xl md:block lg:text-lg'>PersonalFinance</h2>
        <h2 className='text-xl md:hidden'>PF</h2>
      </div>

      <section
        className={clsx(
          'hidden',
          'lg:flex',
          'row-span-5 row-start-2 hidden flex-col',
          'justify-between px-2',
          'lg:col-span-2'
        )}
      >
        <ul>
          {menu.map(({ Icon, text, path }) => (
            <li className='my-2 rounded px-2 py-1 hover:bg-gray-400' key={text}>
              <a className='flex items-center' href={path}>
                  <span className='mx-1  mr-2 text-2xl'>{Icon}</span>
                  <span className='hidden text-lg sm:block'>{text}</span>
              </a>
            </li>
          ))}
        </ul>

        <div>
          <button className={clsx('mb-1 flex w-full items-center', 'group')}>
            <AiOutlineInfoCircle className='mx-1 mr-2 text-xl' />
            <h5
              className={clsx(
                'hidden text-lg sm:block',
                'border-b-2 border-transparent',
                'group-hover:border-b-gray-500'
              )}
            >
              Need Help?
            </h5>
          </button>
          <button className={clsx('mb-1 flex w-full items-center', 'group')}>
            <AiFillFlag className='mx-1  mr-2 text-xl' />
            <h5
              className={clsx(
                'hidden text-lg sm:block',
                'border-b-2 border-transparent',
                'group-hover:border-b-gray-500'
              )}
            >
              Give a Feedback
            </h5>
          </button>
        </div>
      </section>
    </>
  );
};

const FinanceAppPage = () => {
  return (
    <main
      className={clsx(
        'min-h-screen text-gray-700 md:px-10 md:py-3',
        'bg-gray-300',

        //mobile
        'flex flex-col gap-2',
        'px-4',
        //tablet
        'md:px-2',
        'md:grid',
        'md:grid-cols-6 ',
        'md:grid-rows-6',
        'md:first-line:gap-2',
        //desktop
        'lg:grid-cols-12',
        // 'lg:px-0',
        'lg:h-screen '
      )}
    >
      {/* =============SIDE MENU ================ */}
      <SideMenu />
      {/* =============SIDE MENU END ================ */}

      {/* ============= MAIN SECTION  ================ */}
      <div
        className={clsx(
          'row-span-1 flex items-end justify-between py-4',
          'md:col-span-6',
          'lg:col-span-10',
          'lg:col-start-3'
        )}
      >
        <h2>Overview</h2>
        {/* <DropDownMenu/> */}
      </div>

      <section
        className={clsx(
          'row-span-2  flex flex-col ',
          'justify-between rounded-md bg-white shadow-md',
          'md:col-span-3',
          'lg:col-span-5',
          'transition-all duration-100',
          'hover:shadow-lg',
          'scale-100 hover:scale-[1.005]',
          'hover:shadow-gray-700/60'
        )}
      >
        <div
          className={clsx(
            'flex w-full items-center justify-between',
            'border-b border-gray-300 py-4'
          )}
        >
          <DataLine text={'Current Total Balance:'} data={['$17 500']} />
        </div>
        <div className='mt-6 h-full w-full px-2'>
          <LineChart width={'100%'} height={'100%'} isFakeData />
        </div>
      </section>

      <section
        className={clsx(
          'row-span-1 rounded-md border bg-white',
          'px-5 py-1  shadow-md',
          'md:col-span-3',
          'lg:col-span-5',
          'transition-all duration-100',
          'hover:shadow-lg',
          'scale-100 hover:scale-[1.005]',
          'hover:shadow-gray-700/60'
        )}
      >
        <div>
          <button className='rounded px-3 py-1 hover:bg-gray-300 '>
            <h5 className='text-md font-semibold uppercase tracking-wide'>
              Overview
            </h5>
          </button>
          <button className='rounded px-3 py-1 hover:bg-gray-300 '>
            <h5 className='text-md font-semibold uppercase tracking-wide'>
              Monthly
            </h5>
          </button>
        </div>
        <h5>Some content...</h5>
      </section>

      <section
        className={clsx(
          'row-span-2 flex flex-col ',
          'justify-between rounded-md bg-white shadow-md',
          'md:col-span-3',
          'lg:col-span-5',
          'transition-all duration-100',
          'hover:shadow-lg',
          'scale-100 hover:scale-[1.005]',
          'hover:shadow-gray-700/60'
        )}
      >
        <div
          className={clsx(
            'flex w-full items-center justify-between ',
            'border-b border-gray-300 px-5 pt-3 pb-4'
          )}
        >
          <h5 className='text-md font-semibold uppercase'>Income dynamic</h5>
        </div>
        <div className='h-full'>
          <BarChart width={'100%'} height={'100%'} />
        </div>
      </section>

      <section
        className={clsx(
          'row-span-3',
          'rounded-md  bg-white shadow-md',
          'md:col-span-3',
          'lg:col-span-5',
          'flex flex-col',
          'transition-all duration-100',
          'hover:shadow-lg',
          'scale-100 hover:scale-[1.005]',
          'hover:shadow-gray-700/60'
        )}
      >
        <div
          className={clsx(
            'mb-3 flex w-full  items-center justify-between',
            'border-b border-gray-300 px-5 pt-5 pb-3'
          )}
        >
          <h3
            className={clsx(
              'cursor-default  font-semibold uppercase',
              'sm:text-md text-sm md:text-lg lg:text-xl'
            )}
          >
            Accounts dynamic
          </h3>

          {/* horizontal scroller for each acc type */}
        </div>

        <DataLine text={'Checking Accounts'} data={['$12 000']} />
        <DataLine text={'Savings Accounts'} data={['$5 000']} />
        <DataLine text={'Credit Accounts'} data={['$1 200']} />
        <div className='h-full p-2'>
          <StackedBar width={'100%'} height={'100%'} />
        </div>
      </section>

      <section
        className={clsx(
          'row-span-2  flex flex-col ',
          'justify-between rounded-md bg-white shadow-md',
          'md:col-span-3',
          'lg:col-span-5',
          'flex flex-col',
          'transition-all duration-100',
          'hover:shadow-lg',
          'scale-100 hover:scale-[1.005]',
          'hover:shadow-gray-700/60'
        )}
      >
        <div
          className={clsx(
            'flex w-full items-center justify-between ',
            'border-b border-gray-300 px-5 pt-3 pb-4'
          )}
        >
          <h5 className='text-md font-semibold  uppercase'>
            {' '}
            Expense dynamic{' '}
          </h5>
        </div>
        <div className='h-full'>
          <BarChart width={'100%'} height={'100%'} />
        </div>
      </section>
      {/* ============= MAIN SECTION  ================ */}
    </main>
  );
};

export default FinanceAppPage;

const menu = [
  {
    Icon: <AiOutlineLineChart />,
    text: 'Overview',
    path: '/finance',
  },
  {
    Icon: <AiFillBank />,
    text: 'Banks',
    path: '/',
  },
  {
    Icon: <AiFillPieChart />,
    text: 'Statistics',
    path: '/',
  },
  {
    Icon: <AiFillCreditCard />,
    text: 'Transactions',
    path: '/',
  },
];

const range = ['1 day', '1 week', '1 month', '3 months', '6 months'];

const DropDownMenu = () => {
  const [period, setPeriod] = React.useState(range[0]);

  return (
    <div className='group relative inline-block  shadow-md'>
      <button
        className={clsx(
          'inline-flex  w-44 items-center justify-between',
          'rounded-md bg-white py-2 px-2 font-semibold text-gray-700'
        )}
      >
        <div className=' flex items-center'>
          <AiFillCalendar className='mr-2 text-2xl' />
          <span className='text-md mr-1'>{period}</span>
        </div>
        <svg className='h-4 w-4 fill-current' viewBox='0 0 20 20'>
          <path d='M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z' />
        </svg>
      </button>

      <ul
        className={clsx(
          'absolute hidden  w-full rounded-md',
          'bg-gray-700 py-1 text-gray-50 group-hover:block'
        )}
      >
        {range.map((option) => (
          <li key={option}>
            <button
              onClick={() => setPeriod(option)}
              className='whitespace-no-wrap block w-full py-1 px-5 hover:bg-gray-400'
            >
              {option}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};
