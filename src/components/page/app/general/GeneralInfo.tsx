import clsx from 'clsx';
import { useTheme } from '@/context/ThemeProvider';
import {
  getTotalCredit,
  getTotalBalance,
  getSortedBankData,
} from '@/lib/dataFormatingMethods';
import Card from '../Card';
import DoughnutChart from '@/components/charts/Doughnut';
import { ChartDataFormat } from '@/components/charts/types';
import { BanksData } from '@/constant/demoData';

import { shortSumFormatter } from '@/lib/sharedUtils';

export default function GeneralInfo({
  className,
  banksData,
}: {
  className: string;
  banksData: BanksData;
}) {
  return (
    <Card
      className={clsx(
        'py-1 px-0',
        'flex flex-col justify-start gap-4 ',
        className
      )}
      title='General Info'
      // withBorder
    >
      {/* <AccountSummary banksData={banksData} /> */}
      <AccountDetails banksData={banksData} />
    </Card>
  );
}

function AccountSummary({ banksData }: { banksData: BanksData }) {
  const { mode } = useTheme();
  const banks = banksData.connectedBanksDict;
  const totalDebt = shortSumFormatter.format(getTotalCredit(banks));
  const totalBalance = shortSumFormatter.format(getTotalBalance(banks));
  return (
    <main
      className={clsx(
        'inline-flex justify-between px-2',
        'rounded border px-7 py-1',
        mode === 'light' ? 'bg-gray-400/50' : 'bg-gray-500/20',
        mode === 'light' ? 'border-gray-600/50' : 'border-gray-300/20'
      )}
    >
      <div className='whitespace-nowrap'>
        <p className='pl-1 text-sm font-semibold opacity-70'>Account</p>
        <strong className='text-xl '>John Doe</strong>
      </div>

      <div className='flex w-1/2 flex-col items-end '>
        <p className='text-sm font-semibold opacity-70'>Total Balance</p>
        <h2 className='text-center text-xl'>{`$ ${totalBalance}`}</h2>
      </div>
      <div className='flex w-1/2 flex-col items-end '>
        <p className='text-sm font-semibold opacity-70'>Total Debt</p>
        <h2 className='text-center text-xl'>{`$ ${totalDebt}`}</h2>
      </div>
    </main>
  );
}

function AccountDetails({ banksData }: { banksData: BanksData }) {
  const { mode } = useTheme();
  const connectedBanks = Object.keys(banksData.connectedBanksDict);
  const banks = banksData.connectedBanksDict;
  const totalDebt = shortSumFormatter.format(getTotalCredit(banks));
  const totalBalance = shortSumFormatter.format(getTotalBalance(banks));

  const sortedDataset = getSortedBankData(banksData.connectedBanksDict);
  const doughnutChartDataset: ChartDataFormat = {
    label: 'Balance',
    labels: sortedDataset.sortedBankNames,
    datasets: [sortedDataset.sortedTotals],
  };
  return (
    <main
      className={clsx(
        'h-full',
        'flex-col items-center justify-between',
        'rounded border px-7 py-4',
        'bg-gray-600/10',
        mode === 'light' ? 'border-gray-600/50' : 'border-gray-300/20',
        mode === 'light' ? 'text-gray-700' : 'text-gray-400'
      )}
    >
      <section className={clsx('w-full', 'inline-flex justify-between')}>
        <div className='whitespace-nowrap'>
          <p className='pl-1 text-sm font-semibold opacity-70'>Account</p>
          <strong className='text-xl '>John Doe</strong>
        </div>

        <div className='flex w-1/2 flex-col items-end '>
          <p className='text-sm font-semibold opacity-70'>Total Balance</p>
          <h2 className='text-center text-xl'>{`$ ${totalBalance}`}</h2>
        </div>
        <div className='flex w-1/2 flex-col items-end '>
          <p className='text-sm font-semibold opacity-70'>Total Debt</p>
          <h2 className='text-center text-xl'>{`$ ${totalDebt}`}</h2>
        </div>
      </section>

      <section className={clsx('flex flex-col', '  py-2')}>
        <div className='flex-col gap-2'>
          <InfoLine title='Connected banks' data={connectedBanks.length} />
          <InfoLine title='Saving accounts' data={'7'} />
          <InfoLine title='Credit accounts' data={'4'} />
          <InfoLine title='Checking accounts' data={'7'} />
        </div>
        <div className='mt-2 flex-col gap-2'>
          <InfoLine title='Most money at' data={'Navy Federal'} />
          <InfoLine title='Biggest debt at' data={'Trust Bank'} />
        </div>
      </section>
      <section className='h-1/2 '>
        <DoughnutChart
          incomingData={doughnutChartDataset}
          width='100%'
          height='100%'
          styleOptions='APP'
        />
      </section>
    </main>
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
      <p className='text-md translate-y-1 font-semibold  opacity-70'>{title}</p>
      <strong className='pl-6 text-center text-xl'>{data}</strong>
    </div>
  );
}