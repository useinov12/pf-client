import { useEffect, useState } from 'react';

import { getTotalBalanceByBank } from '@/lib/dataFormatingMethods';

import BarChart from '@/components/charts/BarChart';
import { months } from '@/components/charts/defaults';
import DoughnutChart from '@/components/charts/Doughnut';
import { ChartDataFormat } from '@/components/charts/types';
import Card from '@/components/page/app/Card';

import { useBankPageContext } from '@/pages/app/banks';
import { Account, ConnectedBanksDict } from '@/services/types';

export default function BankSection({
  connectedBanksDict,
}: {
  connectedBanksDict: ConnectedBanksDict;
}) {
  const { selectedBank } = useBankPageContext();
  const bankTotal =
    selectedBank &&
    getTotalBalanceByBank({
      bank: selectedBank,
      data: connectedBanksDict,
    });

  return (
    <div>
      <div className='mb-6 flex items-center justify-start gap-10 px-2'>
        <h4 className='text-2xl'>
          {selectedBank ? selectedBank : 'Select bank'}
        </h4>
        <h5 className='text-2xl'>$ {selectedBank ? bankTotal : 'xxxxx'}</h5>
      </div>
      <section className='my-0 flex h-full flex-col gap-x-4 lg:flex-row'>
        <AccountsSection connectedBanksDict={connectedBanksDict} />
        <StatisticSection />
      </section>
    </div>
  );
}

export function AccountsSection({
  connectedBanksDict,
}: {
  connectedBanksDict: ConnectedBanksDict;
}) {
  const { bankData } = useBankPageContext();
  const [chartData, setChartData] = useState<ChartDataFormat>({
    label: '',
    labels: [],
    datasets: [[]],
  });
  const [bankTotal, setBankTotal] = useState(0);

  useEffect(() => {
    if (bankData) {
      const bankName = bankData[0].bank_name;
      const total = getTotalBalanceByBank({
        bank: bankName!,
        data: connectedBanksDict,
      });
      const accountsTitles = bankData.map((acc) => acc.name);
      const accountTotals = bankData.map((acc) => acc.balance);

      const testDataset2: ChartDataFormat = {
        label: 'Balance',
        labels: accountsTitles,
        datasets: [accountTotals],
      };

      setChartData(testDataset2);
      setBankTotal(total);
    }
  }, [bankData]);

  return (
    <Card
      withBorder
      title='Accounts'
      className='flex h-fit w-full flex-col justify-start'
    >
      <div className='flex h-40 flex-col justify-between'>
        <div className=' overflow-x-hidden overflow-y-scroll'>
          <table className='w-full table-auto   border-separate border-spacing-y-1'>
            <thead>
              <tr>
                <td>
                  <strong className='text-sm'>Name</strong>
                </td>
                <td>
                  <strong className='text-sm'>Type</strong>
                </td>
                <td>
                  <strong className='text-sm'>Balance</strong>
                </td>
              </tr>
            </thead>
            <tbody>
              {bankData ? (
                bankData.map((account, i) => (
                  <AccountRow account={account} key={`acc-row-${i}`} />
                ))
              ) : (
                <AccountsSkeleton />
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className='h-56 w-full'>
        <DoughnutChart
          incomingData={chartData}
          width='100%'
          height='100%'
          styleOptions='APP'
          title='Accounts share'
        />
      </div>
    </Card>
  );
}

function AccountRow({ account }: { account: Account }) {
  const accountName =
    account.name.length > 30 ? `${account.name.slice(0, 29)}...` : account.name;

  return (
    <tr>
      <td>
        <p className='text-sm'>{capitalize(accountName.toLowerCase())}</p>
      </td>
      <td>
        <p className='font-mono text-sm tracking-tighter'>{account.subtype}</p>
      </td>
      <td>
        <p className='text-sm'>
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
        <AccountRowSkeleton key={`acc-skeleton-${i}`} />
      ))}
    </>
  );
}

function AccountRowSkeleton() {
  return (
    <tr className='bg-gray-300/20'>
      <td>
        <p className='invisible text-sm'>data</p>
      </td>
      <td>
        <p className='text-sm'></p>
      </td>
      <td>
        <p className='text-sm'></p>
      </td>
    </tr>
  );
}

export function StatisticSection() {
  const dataset = [1200, 1700, 1400, 1800, 2100, 1900, 1700, 2200];
  const dataset2 = [300, 700, 400, 100, 100, 900, 700, 200];
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

  return (
    <Card withBorder title='Statistics' className='h-fit w-full'>
      <div className='h-48 w-5/6'>
        <BarChart
          width='100%'
          height='100%'
          title='Bank balance dynamic'
          incomingData={chartData}
          styleOptions='APP'
        />
      </div>
      <div className='h-48 w-5/6'>
        <BarChart
          width='100%'
          height='100%'
          title='Income/Expense by months'
          incomingData={chartData2}
          styleOptions='APP'
        />
      </div>
    </Card>
  );
}

function capitalize(word: string) {
  return word[0].toUpperCase() + word.slice(1).toLowerCase();
}
