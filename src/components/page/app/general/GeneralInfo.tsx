import clsx from 'clsx';

import {
  getSortedBankData,
  getTotalBalance,
  getTotalCredit,
} from '@/lib/dataFormatingMethods';
import { shortSumFormatter } from '@/lib/sharedUtils';

import DoughnutChart from '@/components/charts/Doughnut';
import LineChart from '@/components/charts/LineChart';
import { ChartDataFormat } from '@/components/charts/types';

import { BanksData } from '@/constant/demo-data/demoData';
import { useTheme } from '@/context/ThemeProvider';

export default function GeneralInfo({
  className,
  banksData,
}: {
  className: string;
  banksData: BanksData;
}) {
  const { mode } = useTheme();
  return (
    <main
      className={clsx(
        'h-full ',
        'flex-col items-center justify-between',
        'rounded border ',
        'bg-gray-600/10',
        mode === 'light' ? 'border-gray-600/50' : 'border-gray-300/20',
        'overflow-hidden',
        className
      )}
    >
      <AccountInfo banksData={banksData} />
      <AccountOverview banksData={banksData} />
      <ConnectedBanksPieChart banksData={banksData} />
    </main>
  );
}

function AccountInfo({ banksData }: { banksData: BanksData }) {
  const { mode } = useTheme();
  const banks = banksData.connectedBanksDict;
  const totalDebt = shortSumFormatter.format(getTotalCredit(banks));
  const totalBalance = shortSumFormatter.format(getTotalBalance(banks));
  return (
    <section
      className={clsx(
        'px-3 py-2',
        'inline-flex w-full flex-none justify-between',
        'border-b',
        mode === 'light' ? 'bg-gray-400/50' : 'bg-gray-500/20',
        mode === 'light' ? 'border-gray-600/50' : 'border-gray-300/20'
      )}
    >
      <div className='w-full truncate whitespace-nowrap'>
        <p className='whitespace-nowrap pl-1 text-sm font-medium uppercase opacity-70'>
          Account
        </p>
        <strong className='w-full truncate text-xl'>John Doe</strong>
      </div>

      <div className='flex w-full flex-nowrap '>
        <div className='flex w-1/2 flex-col items-end'>
          <p className='whitespace-nowrap pl-1 text-sm font-medium uppercase opacity-70'>
            Total Balance
          </p>
          <h2 className='text-center text-2xl'>{`$ ${totalBalance}`}</h2>
        </div>
        <div className='flex w-1/2 flex-col items-end'>
          <p className='whitespace-nowrap pl-1 text-sm font-medium uppercase opacity-70'>
            Total Debt
          </p>
          <h2 className='text-center text-2xl'>{`$ ${totalDebt}`}</h2>
        </div>
      </div>
    </section>
  );
}

function AccountOverview({ banksData }: { banksData: BanksData }) {
  const { mode } = useTheme();
  const connectedBanks = Object.keys(banksData.connectedBanksDict);
  return (
    <section
      className={clsx(
        'flex flex-none  flex-col px-3 py-1',
        mode === 'light' ? 'text-gray-700' : 'text-gray-400',
        'border-b',
        mode === 'light' ? 'border-gray-600/50' : 'border-gray-300/20'
      )}
    >
      <div className='flex-col'>
        <InfoLine title='Connected banks' data={connectedBanks.length} />
        <InfoLine title='Saving accounts' data='7' />
        <InfoLine title='Credit accounts' data='4' />
        <InfoLine title='Checking accounts' data='7' />
      </div>
      <div className=' flex-col'>
        <InfoLine title='Most money at' data='Navy Federal' />
        <InfoLine title='Biggest debt at' data='Trust Bank' />
      </div>
    </section>
  );
}

function ConnectedBanksPieChart({ banksData }: { banksData: BanksData }) {
  const { mode } = useTheme();

  const sortedDataset = getSortedBankData(banksData.connectedBanksDict);
  const doughnutChartDataset: ChartDataFormat = {
    label: 'Balance',
    labels: sortedDataset.sortedBankNames,
    datasets: [sortedDataset.sortedTotals],
  };
  const lineChartDataset: ChartDataFormat = {
    label: 'Total Dynamic',
    labels: banksData.monthlyBalanceDynamic.months.slice(0, 6),
    datasets: [banksData.monthlyBalanceDynamic.balances.slice(0, 6)],
  };
  return (
    <section className='h-[50vh] grow md:h-2/3'>
      <div
        className={clsx(
          'h-2/5',
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
          showScales={true}
        />
      </div>
      <div className='h-3/5 py-0 px-3'>
        <DoughnutChart
          incomingData={doughnutChartDataset}
          width='100%'
          height='100%'
          styleOptions='APP'
        />
      </div>
    </section>
  );
}

function InfoLine({
  title,
  data,
  className,
}: {
  title: string;
  data: number | string;
  className?: string;
}) {
  return (
    <div className={clsx('flex w-full justify-between', className)}>
      <p className='translate-y-1 text-sm font-medium  opacity-70'>{title}</p>
      <p className='text-md pl-6 text-center font-medium '>{data}</p>
    </div>
  );
}
