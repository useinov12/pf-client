import clsx from 'clsx';
import { Carousel, CarouselItem } from '@/components/shared/Carousel';
import { useTheme } from '@/context/ThemeProvider';
import { useBankPageContext } from '@/pages/app/banks';
import { sampleData } from '../cabinet/sections/sampleData';
import Card from './Card';
import { Account } from '@/services/types';
import { ChartDataFormat } from '@/components/charts/types';
import DoughnutChart from '@/components/charts/Doughnut';
import BarChart from '@/components/charts/BarChart';
import { months } from '@/components/charts/defaults';

export function ListOfBanks() {
  const banks = Object.keys(sampleData);

  return (
    <Card withBorder className='' title={'Banks'}>
      <Carousel>
        {banks.map((bank, i) => (
          <li key={bank}>
            <CarouselItem width='256'>
              <BankCard bank={bank} className='w-full' />
            </CarouselItem>
          </li>
        ))}
      </Carousel>
    </Card>
  );
}

function BankCard({ bank, className }: { bank: string; className: string }) {
  const { mode } = useTheme();
  const { setSelectedBank } = useBankPageContext();
  return (
    <div
      onClick={() => setSelectedBank(bank)}
      className={clsx(
        'h-28 p-3',
        'flex flex-col items-start',
        'rounded',
        'overflow-hidden border',
        className,
        mode === 'light' ? 'border-dark/20' : 'border-gray-400/50',
        mode === 'light' ? 'bg-gray-300/50' : 'bg-gray-700/50',
        'cursor-pointer',
        'hover:border-primary-500'
      )}
    >
      <strong className=''>{bank}</strong>
    </div>
  );
}

export function AccountsSection() {
  const { bankData } = useBankPageContext();

  const accountsTitles = bankData ? bankData.map((acc) => acc.name) : [];
  const accountTotals = bankData ? bankData.map((acc) => acc.balance) : [];

  const testDataset2: ChartDataFormat = {
    label: 'Balance',
    labels: accountsTitles,
    datasets: [accountTotals],
  };

  return (
    <Card
      withBorder
      title={'Accounts'}
      className='flex h-full w-full flex-col justify-between'
    >
      <table className='w-full table-auto  lg:table-fixed'>
        <thead>
          <tr>
            <td>
              <strong>Name</strong>
            </td>
            <td>
              <strong>Type</strong>
            </td>
            <td>
              <strong>Balance</strong>
            </td>
          </tr>
        </thead>
        <tbody>
          {bankData &&
            bankData.map((account, i) => (
              <AccountRow account={account} key={`acc-row-${i}`} />
            ))}
          <tr>
            <td></td>
            <td>
              <strong>Total</strong>
            </td>
            <td>
              <strong>$xxxx</strong>
            </td>
          </tr>
        </tbody>
      </table>

      <div className='h-56 w-full'>
        <DoughnutChart
          incomingData={testDataset2}
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
    account.name.length > 20 ? `${account.name.slice(0, 19)}...` : account.name;

  return (
    <tr>
      <td>
        <p className='text-sm'>{capitalize(accountName.toLowerCase())}</p>
      </td>
      <td>
        <p className='text-sm'>{account.subtype}</p>
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

export function StatisticSection() {
  const { bankData } = useBankPageContext();

  const dataset = [1200, 1700, 1400, 1800, 2100, 1900, 1700, 2200];
  const labels = months
    .filter((_, i) => i < dataset.length)
    .map((month) => month.slice(0, 3));

  const chartData: ChartDataFormat = {
    labels: labels,
    label: 'Account dynamic',
    datasets: [dataset],
  };

  return (
    <Card withBorder title={'Statistics'} className='h-full w-full'>
      <div className='h-1/2 w-5/6'>
        <BarChart
          width={'100%'}
          height={'100%'}
          title={'Bank balance dynamic'}
          incomingData={chartData}
          styleOptions={'APP'}
        />
      </div>
      <div className='h-1/2 w-5/6'>
        <BarChart
          width={'100%'}
          height={'100%'}
          title={'Chart '}
          incomingData={chartData}
          styleOptions={'APP'}
        />
      </div>
    </Card>
  );
}

function capitalize(word: string) {
  return word[0].toUpperCase() + word.slice(1).toLowerCase();
}
