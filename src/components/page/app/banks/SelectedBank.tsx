import clsx from 'clsx';
import { useEffect, useState } from 'react';

import { getTotalBalanceByBank } from '@/lib/dataFormatingMethods';

import BarChart from '@/components/charts/BarChart';
import { months } from '@/components/charts/defaults';
import DoughnutChart from '@/components/charts/Doughnut';
import LineChart from '@/components/charts/LineChart';
import { ChartDataFormat } from '@/components/charts/types';

import { BanksData } from '@/constant/demoData';
import { useTheme } from '@/context/ThemeProvider';
import { useBankPageContext } from '@/pages/app/banks';
import { Account, Bank } from '@/services/types';

export default function BankSection({ banksData }: { banksData: BanksData }) {
  return (
    <section className='my-0 flex h-full flex-col gap-x-6 lg:flex-row'>
      <AccountsSection banksData={banksData} />
      <StatisticSection />
    </section>
  );
}

export function AccountsSection({ banksData }: { banksData: BanksData }) {
  const { bankData } = useBankPageContext();
  const { mode } = useTheme();

  const lineChartDataset: ChartDataFormat = {
    label: 'Total Dynamic',
    labels: banksData.monthlyBalanceDynamic.months,
    datasets: [banksData.monthlyBalanceDynamic.balances],
  };

  const { selectedBank } = useBankPageContext();
  const bankTotal =
    selectedBank &&
    getTotalBalanceByBank({
      bank: selectedBank,
      data: banksData.connectedBanksDict,
    });

  return (
    <div
      className={clsx(
        'h-full w-2/5',
        'flex  flex-col justify-start',
        'rounded border',
        mode === 'light' ? 'border-gray-600/50' : 'border-gray-300/20'
      )}
    >
      <section
        className={clsx(
          'px-3 py-2',
          'inline-flex w-full flex-none justify-between',
          'border-b',
          mode === 'light' ? 'bg-gray-400/50' : 'bg-gray-500/20',
          mode === 'light' ? 'border-gray-600/50' : 'border-gray-300/20'
        )}
      >
        <div className='w-full whitespace-nowrap '>
          <p className='whitespace-nowrap text-sm font-medium opacity-70'>
            Selected bank
          </p>
          <strong className='text-xl'>
            {selectedBank ? selectedBank : ''}
          </strong>
        </div>
        <div className='flex w-full flex-nowrap '>
          <div className='flex w-1/2 flex-col items-end'>
            <p className='whitespace-nowrap text-sm font-medium opacity-70'>
              Total Balance
            </p>
            <h2 className='text-center text-xl'>{`$ ${
              bankTotal ? bankTotal : 0
            }`}</h2>
          </div>
          <div className='flex w-1/2 flex-col items-end'>
            <p className='whitespace-nowrap text-sm font-medium opacity-70'>
              Total Debt
            </p>
            <h2 className='text-center text-xl'>{`$ ${0}`}</h2>
          </div>
        </div>
      </section>

      <section className='h-full'>
        <div
          className={clsx(
            'h-1/2 w-full',
            'border-b',
            mode === 'light' ? 'border-gray-600/50' : 'border-gray-300/20'
          )}
        >
          <LineChart
            incomingData={lineChartDataset}
            width='100%'
            height='100%'
            styleOptions='APP'
            title=''
            showScales
          />
        </div>
        <AccountsTable bankData={bankData} />
      </section>
    </div>
  );
}

function AccountsTable({ bankData }: { bankData: Bank | null }) {
  const { mode } = useTheme();
  return (
    <section
      className={clsx(
        'h-1/2',
        'flex flex-col justify-between',
        'overflow-x-hidden '
      )}
    >
      <table className='h-full w-full table-auto'>
        <thead
          className={clsx(
            'rounded',
            'sticky top-0 text-lg',
            'border-b',
            mode === 'light' ? 'bg-gray-400/50' : 'bg-gray-500/20',
            mode === 'light' ? 'border-gray-600/50' : 'border-gray-300/20'
          )}
        >
          <tr>
            <td className='p-4'>
              <strong>Accounts</strong>
            </td>
            <td className='p-4'>
              <strong>Type</strong>
            </td>
            <td className='p-4'>
              <strong>Balance</strong>
            </td>
          </tr>
        </thead>
        <tbody className='h-full overflow-y-auto'>
          {bankData ? (
            bankData.map((account, i) => (
              <AccountRow account={account} key={`acc-row-${i}`} />
            ))
          ) : (
            <AccountsSkeleton />
          )}
        </tbody>
      </table>
    </section>
  );
}

function AccountRow({ account }: { account: Account }) {
  const { mode } = useTheme();
  const accountName =
    account.name.length > 30 ? `${account.name.slice(0, 29)}...` : account.name;

  return (
    <tr
      className={clsx(
        'bg-gray-500/20 ',
        mode === 'light' ? 'border-gray-600/50' : 'border-gray-300/20',
        'bg-gray-600/10',
        'hover:bg-gray-400/20',
        mode === 'light' ? 'text-gray-700' : 'text-gray-400'
      )}
    >
      <td className='px-4'>
        <p className=''>{capitalize(accountName.toLowerCase())}</p>
      </td>
      <td className='px-4'>
        <p className='font-mono  tracking-tighter'>{account.subtype}</p>
      </td>
      <td className='px-4'>
        <p className=''>
          {account.subtype === 'credit card'
            ? `$ -${account.balance}`
            : `$ ${account.balance}`}
        </p>
      </td>
    </tr>
  );
}

function AccountsSkeleton() {
  const array = [0, 0, 0, 0];
  return (
    <>
      {array.map((acc, i) => (
        <tr className='bg-gray-500/10' key={i}>
          <td>
            <p />
          </td>
          <td>
            <p />
          </td>
          <td>
            <p />
          </td>
        </tr>
      ))}
    </>
  );
}

const dataset = [1200, 1700, 1400, 1800, 2100, 1900, 1700, 2200];
const dataset2 = [300, 700, 400, 100, 100, 900, 700, 200];

export function StatisticSection() {
  const { bankData } = useBankPageContext();
  const { mode } = useTheme();

  const labels = months
    .filter((_, i) => i < dataset.length)
    .map((month) => month.slice(0, 3));

  const chartData: ChartDataFormat = {
    labels: labels,
    label: 'Account dynamic',
    datasets: [dataset],
  };
  const chartData2: ChartDataFormat = {
    labels: labels,
    label: 'Account dynamic',
    datasets: [dataset, dataset2],
  };

  const [dougnnutData, setDoughnutData] = useState<ChartDataFormat>({
    label: '',
    labels: [],
    datasets: [[]],
  });

  useEffect(() => {
    if (bankData) {
      const accountsTitles = bankData.map((acc) => acc.name);
      const accountTotals = bankData.map((acc) => acc.balance);

      const testDataset2: ChartDataFormat = {
        label: 'Balance',
        labels: accountsTitles,
        datasets: [accountTotals],
      };

      setDoughnutData(testDataset2);
    }
  }, [bankData]);

  return (
    <div
      className={clsx(
        'h-full w-3/5',
        'flex  flex-col justify-start',
        'rounded border',
        mode === 'light' ? 'border-gray-600/50' : 'border-gray-300/20'
      )}
    >
      <header
        className={clsx(
          'flex ',
          'items-center justify-between gap-10',
          'py-4 pl-4 pr-20',
          'border-b',
          mode === 'light' ? 'bg-gray-400/50' : 'bg-gray-500/20',
          mode === 'light' ? 'border-gray-600/50' : 'border-gray-300/20'
        )}
      >
        <h3>Statistics</h3>
      </header>
      <section className='h-full'>
        <div
          className={clsx(
            'h-1/3 w-full',
            'border-b px-4 py-2',
            mode === 'light' ? 'border-gray-600/50' : 'border-gray-300/20'
          )}
        >
          <DoughnutChart
            incomingData={dougnnutData}
            width='100%'
            height='100%'
            styleOptions='APP'
            title='Accounts share'
          />
        </div>

        <div
          className={clsx(
            'h-1/3 w-5/6',
            'border-b px-4',
            mode === 'light' ? 'border-gray-600/50' : 'border-gray-300/20'
          )}
        >
          <BarChart
            width='100%'
            height='100%'
            title='Bank balance dynamic'
            incomingData={chartData}
            styleOptions='APP'
          />
        </div>
        <div className='h-1/3 w-5/6 px-4'>
          <BarChart
            width='100%'
            height='100%'
            title='Income/Expense by months'
            incomingData={chartData2}
            styleOptions='APP'
          />
        </div>
      </section>
    </div>
  );
}

function capitalize(word: string) {
  return word[0].toUpperCase() + word.slice(1).toLowerCase();
}
