import { useState } from 'react';
import clsx from 'clsx';
import { Carousel, CarouselItem } from '@/components/shared/Carousel';
import { useTheme } from '@/context/ThemeProvider';
import { useBankPageContext } from '@/pages/app/banks';
import {
  sampleData,
  getTotalBalanceByBank,
} from '../cabinet/sections/sampleData';
import Card from './Card';
import { Account } from '@/services/types';
import { ChartDataFormat } from '@/components/charts/types';
import DoughnutChart from '@/components/charts/Doughnut';
import BarChart from '@/components/charts/BarChart';
import { months } from '@/components/charts/defaults';
import { BsBank2 } from 'react-icons/bs';
import { RiBankFill } from 'react-icons/ri';

export function ListOfBanks() {
  const banks = Object.keys(sampleData);

  return (
    <Card withBorder className='' title={'Connected banks'}>
      <Carousel>
        {banks.map((bank, i) => (
          <li key={bank}>
            <CarouselItem>
              <BankCard bank={bank} className='w-48' />
            </CarouselItem>
          </li>
        ))}
      </Carousel>
    </Card>
  );
}

function BankCard({ bank, className }: { bank: string; className: string }) {
  const { mode } = useTheme();
  const { setSelectedBank, selectedBank } = useBankPageContext();

  const [cardHover, setCardHover] = useState(false);
  const bankTotal = getTotalBalanceByBank({ bank: bank, data: sampleData });
  const connectedAccounts = sampleData[bank];

  return (
    <div
      onClick={() => setSelectedBank(bank)}
      onMouseEnter={() => setCardHover(true)}
      onMouseLeave={() => setCardHover(false)}
      className={clsx(
        'h-28',
        'cursor-pointer',
        'rounded',
        'overflow-hidden border',
        'flex flex-col items-center ',
        mode === 'light' ? 'border-dark/20' : 'border-gray-400/50',
        mode === 'light' ? 'bg-gray-300/50' : 'bg-gray-700/50',
        selectedBank === bank
          ? 'border-blue-600/50'
          : cardHover && 'border-blue-600/50',
        className
      )}
    >
      <header
        className={clsx(
          'w-full px-3 ',
          'transition-all duration-100 ease-in',
          'flex flex-col items-center gap-1',
          selectedBank === bank
            ? 'bg-blue-600/50'
            : cardHover && 'bg-blue-600/50',
          selectedBank === bank
            ? '-translate-y-7'
            : cardHover
            ? '-translate-y-7'
            : 'translate-y-6'
        )}
      >
        <RiBankFill
          className={clsx(
            'h-10 w-10',
            selectedBank === bank
              ? 'scale-0'
              : cardHover
              ? 'scale-0'
              : 'scale-100',
            'transition-all duration-200 ease-in'
          )}
        />
        <h6 className={clsx('text-md font-semibold drop-shadow-md')}>{bank}</h6>
      </header>

      <div
        className={clsx(
          'transition-all duration-200 ease-in',
          selectedBank === bank
            ? '-translate-y-4 scale-y-100'
            : cardHover
            ? '-translate-y-4 scale-y-100'
            : 'translate-y-12 scale-y-0'
        )}
      >
        <h6 className='px-3 text-sm drop-shadow-md'>
          Connected accounts {`${connectedAccounts.length}`}
        </h6>
        <div className='inline-flex w-full items-end justify-between px-3'>
          <p className='text-sm drop-shadow-md'>Total</p>
          <h3 className='text-xl font-normal drop-shadow-md'>$ {bankTotal}</h3>
        </div>
      </div>
    </div>
  );
}

export function AccountsSection() {
  const { bankData } = useBankPageContext();

  const bankName = bankData && bankData[0].bank_name;
  const bankTotal = bankData
    ? getTotalBalanceByBank({ bank: bankName!, data: sampleData })
    : 0;
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
      className='flex h-full w-full flex-col justify-start'
    >
      <div className='h-2/5 overflow-x-hidden overflow-y-scroll'>
        <table className=' w-full table-auto   border-separate border-spacing-y-1'>
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
        <table className='w-full table-auto  lg:table-fixed  '>
          <tbody>
            <tr>
              <td></td>
              <td>
                <h4>Total</h4>
              </td>
              <td>
                <h4>$ {bankTotal}</h4>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

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
  const { bankData } = useBankPageContext();

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
          title={'Income/Expense by months'}
          incomingData={chartData2}
          styleOptions={'APP'}
        />
      </div>
    </Card>
  );
}

function capitalize(word: string) {
  return word[0].toUpperCase() + word.slice(1).toLowerCase();
}