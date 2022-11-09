import React from 'react';
import clsx from 'clsx';
import { ThemeContext } from '@/context/ThemeProvider';
import Layout from './../components/finance/layout';
import LineChart from '@/components/charts/LineChart';
import PieChart from '@/components/charts/PieChart';
import MultipleLineChart from '@/components/charts/MultipleLinesChart';

export default function FinanceApp() {
  const { mode } = React.useContext(ThemeContext);
  return (
    <Layout>
      <main className='flex h-full w-full gap-2'>

        <section
          className={clsx(
            'h-full w-1/3 overflow-hidden rounded border',
            mode === 'light' ? 'border-dark/50' : 'border-gray-300/50'
          )}
        >
          <OverviewSection />
        </section>

        <section
          className={clsx(
            'h-full w-1/3 rounded border',
            mode === 'light' ? 'border-dark/50' : 'border-gray-300/50'
          )}
        ></section>
        <section
          className={clsx(
            'h-full w-1/3 rounded border',
            mode === 'light' ? 'border-dark/50' : 'border-gray-300/50'
          )}
        ></section>
      </main>
    </Layout>
  );
}

const OverviewSection = () => {
  const { mode, setMode } = React.useContext(ThemeContext);
  return (
    <section>
      <h4
        className={clsx(
          'text-md w-full px-4 text-right font-semibold py-2 border-b',
          mode === 'light' ? 'bg-gray-300' : 'bg-gray-900',
          mode === 'light' ? ' border-gray-500/50' : 'border-gray-300/50'
        )}
      >
        Accounts
      </h4>
      <div
        className={clsx(
          'flex h-48 border-b ',
          mode === 'light' ? ' border-gray-500/50' : 'border-gray-300/50'
        )}
      >
        <div className='w-2/5'>
          <ul
            className={clsx(
              'flex w-full flex-col items-center',
              'h-full overflow-y-scroll border-r',
              mode === 'light' ? ' border-gray-500/50' : 'border-gray-300/50'
            )}
          >
            {[1, 2, 3, 4, 5, 6, 7, 8].map((acc, i) => (
              <li
                key={acc}
                className={clsx(
                  'flex w-full justify-between border-b  px-1 py-1 text-sm',
                  'cursor-pointer hover:bg-gray-900',
                  mode === 'light'
                    ? 'border-gray-500/50 hover:bg-gray-400/50'
                    : 'border-gray-300/50 hover:bg-gray-900'
                )}
              >
                <h6 className='text-sm'>account #{acc}</h6>
                <h6 className='text-sm'>$xxxx</h6>
              </li>
            ))}
          </ul>
        </div>
        <div className='w-3/5 '>
          <LineChart
            width={'100%'}
            height={'100%'}
            externalData={[5, 7, 9, 6, 8, 12, 10, 9, 11, 13]}
          />
        </div>
      </div>

      <div className='mt-2 flex h-24 w-full justify-around'>
        <div className=' h-28 w-1/4'>
          <PieChart radius='30' externalData={[5, 10, 4, 10, 7]} />
        </div>
        <div className='w-1/2 self-start'>
          <MultipleLineChart
            width={'100%'}
            height={'100%'}
            externalData={[
              { label: 'Dataset 1', data: [5, 7, 9, 6, 8, 6] },
              { label: 'Dataset 2', data: [4, 6, 8, 11, 4, 7] },
            ]}
            labels={'qwerty'.split('')}
          />
        </div>
      </div>
      <div className='flex justify-end gap-10 px-8'>
        <h5>Total</h5>
        <h5>$xxxxx</h5>
      </div>
    </section>
  );
};
