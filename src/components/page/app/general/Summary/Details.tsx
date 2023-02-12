import { faker } from '@faker-js/faker';
import clsx from 'clsx';

import { getSortedBankData } from '@/lib/dataFormatingMethods';

import BarChart from '@/components/charts/BarChart';
import { months } from '@/components/charts/defaults';
import LineChart from '@/components/charts/LineChart';
import { ChartDataFormat } from '@/components/charts/types';

import { BanksData } from '@/constant/demoData';
import { useTheme } from '@/context/ThemeProvider';
import { Bank } from '@/services/types';

export default function Details({
  selectedBank,
  banksData,
}: {
  banksData: BanksData;
  selectedBank: Bank | undefined;
}) {
  const { mode } = useTheme();

  return (
    <section
      className={clsx(
        'h-full lg:h-4/5',
        'rounded border',
        'bg-gray-600/10',
        mode === 'light' ? 'border-gray-600/50' : 'border-gray-300/20',
        mode === 'light' ? 'text-gray-700' : 'text-gray-400'
      )}
    >
      {selectedBank ? (
        <SelectedBankAnalytics
          banksData={banksData}
          selectedBank={selectedBank}
        />
      ) : (
        <AllBanksAnalytics banksData={banksData} />
      )}
    </section>
  );
}

function AllBanksAnalytics({ banksData }: { banksData: BanksData }) {
  const sortedDataset = getSortedBankData(banksData.connectedBanksDict);
  const savingMonthlyChange = months.map((d, i) =>
    Number(faker.finance.amount(1000, 5000))
  );
  const checkingMonthlyChange = months.map((d, i) =>
    Number(faker.finance.amount(-3000, 5000))
  );
  const creditMonthlyChange = months.map((d, i) =>
    Number(faker.finance.amount(-3000, 3000))
  );
  const barChartDataset: ChartDataFormat = {
    label: 'Balance',
    labels: sortedDataset.sortedBankNames.map((name) => name.slice(0, 9)),
    datasets: [sortedDataset.sortedTotals],
  };
  const stackedBarChartData: ChartDataFormat = {
    label: 'Balance',
    labels: months.map((month) => month.slice(0, 3)),
    datasets: [savingMonthlyChange, checkingMonthlyChange, creditMonthlyChange],
    datasetsLabels: ['Saving change', 'Checking change', 'Credit Change'],
  };
  return (
    <section className='flex h-full w-full flex-col gap-1 '>
      <div className='h-3/5 w-full pl-2'>
        <BarChart
          incomingData={barChartDataset}
          width='100%'
          height='100%'
          styleOptions='APP'
          title='Banks balances'
        />
      </div>
      <div className='h-2/5 w-full pl-2'>
        <BarChart
          incomingData={stackedBarChartData}
          width='100%'
          height='100%'
          styleOptions='APP'
          title='All banks monthly change by account type'
        />
      </div>
    </section>
  );
}

function SelectedBankAnalytics({
  selectedBank,
  banksData,
}: {
  banksData: BanksData;
  selectedBank: Bank;
}) {
  const { mode } = useTheme();
  const savingMonthlyChange = months.map((d, i) =>
    Number(faker.finance.amount(1000, 5000))
  );
  const checkingMonthlyChange = months.map((d, i) =>
    Number(faker.finance.amount(-3000, 5000))
  );
  const creditMonthlyChange = months.map((d, i) =>
    Number(faker.finance.amount(-3000, 3000))
  );

  const lineChartDataset: ChartDataFormat = {
    label: 'Total Dynamic',
    labels: banksData.monthlyBalanceDynamic.months.slice(0, 6),
    datasets: [banksData.monthlyBalanceDynamic.balances.slice(0, 6)],
  };
  const stackedBarChartData: ChartDataFormat = {
    label: 'Balance',
    labels: months.map((month) => month.slice(0, 3)),
    datasets: [savingMonthlyChange, checkingMonthlyChange, creditMonthlyChange],
    datasetsLabels: ['Saving change', 'Checking change', 'Credit Change'],
  };

  return (
    <div className='flex h-screen w-full flex-col gap-1 lg:h-full lg:flex-row '>
      <section
        className={clsx(
          'h-1/2 lg:h-full',
          'w-full lg:w-1/2',
          'flex-none overflow-hidden',
          'border-b lg:border-none',
          mode === 'light' ? 'border-gray-600/50' : 'border-gray-300/20'
        )}
      >
        <div
          className={clsx(
            'relative',
            'h-full w-full  py-1  lg:border-r',
            mode === 'light' ? 'border-gray-600/50' : 'border-gray-300/20'
          )}
        >
          <strong className='pl-2 font-semibold'>Transactions</strong> <br />
          <li
            className={clsx(
              'inline-flex w-full gap-1 border-b py-1 pl-2',
              mode === 'light' ? 'border-gray-600/50' : 'border-gray-300/20'
            )}
          >
            <strong className='w-1/2 truncate  text-sm'>information</strong>
            <div className='inline-flex w-1/2 justify-between '>
              <strong className='w-1/2 text-sm'>type</strong>
              <strong className='w-1/2 text-sm'>amount</strong>
            </div>
          </li>
          <Transactions />
        </div>
      </section>
      <section className='h-1/2 grow lg:h-full'>
        <div
          className={clsx(
            ' h-1/2 w-full',
            'border-b',
            mode === 'light' ? 'border-gray-600/50' : 'border-gray-300/20'
          )}
        >
          <LineChart
            incomingData={lineChartDataset}
            width='100%'
            height='100%'
            styleOptions='APP'
            // title={`${selectedBank[0].bank_name} balance dynamic`}
            showScales={true}
          />
        </div>
        <div className='h-1/2 w-full'>
          <BarChart
            incomingData={stackedBarChartData}
            width='100%'
            height='100%'
            styleOptions='APP'
            // title={`${selectedBank[0].bank_name} monthly change by account type`}
          />
        </div>
      </section>
    </div>
  );
}

function Transactions() {
  const { mode } = useTheme();
  const arr = new Array(20).fill(0);

  const transactions = arr.map((_, i) => {
    return {
      amount: faker.finance.amount(-2000, 3000),
      type: faker.finance.transactionType(),
      desc: faker.finance.transactionDescription(),
    };
  });
  return (
    <ul
      className={clsx(
        'h-full w-full overflow-y-scroll',
        'flex flex-col ',
        'absolute top-16'
      )}
    >
      {transactions.map((trans, i) => (
        <li
          key={`trans-${i}`}
          className={clsx(
            'cursor-pointer',
            'inline-flex gap-1 border-b py-1  pl-2',
            mode === 'light' ? 'border-gray-600/50' : 'border-gray-300/20',
            'bg-gray-600/10',
            'hover:bg-gray-400/20',
            mode === 'light' ? 'text-gray-700' : 'text-gray-400'
          )}
        >
          <div className='w-1/2 text-sm'>
            {trans.desc.split(' ').splice(2).join(' ')}
          </div>
          <div className='inline-flex w-1/2 justify-between '>
            <p className='w-1/2 text-sm'>{trans.type}</p>
            <p className='w-1/2 text-sm'>$ {trans.amount}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}
