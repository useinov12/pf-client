import clsx from 'clsx';
import { useTheme } from '@/context/ThemeProvider';
import { useState } from 'react';
import {
  getListOfAllAccounts,
  getTotalCredit,
  getTotalBalance,
  getSortedBankData,
} from '@/lib/dataFunctions';
import Card from './Card';
import BarChart from '@/components/charts/BarChart';
import LineChart from '@/components/charts/LineChart';
import DoughnutChart from '@/components/charts/Doughnut';
import { ChartDataFormat } from '@/components/charts/types';
import { Carousel, CarouselItem } from '@/components/shared/Carousel';
import { Bank, ConnectedBanksDict } from '@/services/types';
import { BiCarousel } from 'react-icons/bi';
import { CgMenuGridR } from 'react-icons/cg';
import { BsPiggyBankFill } from 'react-icons/bs';
import { BanksData } from '@/constant/demoData';

export function GeneralInfo({
  className,
  banksData,
}: {
  className: string;
  banksData: BanksData;
}) {
  const banks = banksData.connectedBanksDict;
  const connectedBanks = Object.keys(banksData.connectedBanksDict);

  const sortedDataset = getSortedBankData(banksData.connectedBanksDict);
  const doughnutChartDataset: ChartDataFormat = {
    label: 'Balance',
    labels: sortedDataset.sortedBankNames,
    datasets: [sortedDataset.sortedTotals],
  };

  return (
    <Card
      className={clsx('flex flex-col justify-start py-[5px]', className)}
      title='General Info'
      withBorder
    >
      <section className='h-2/5'>
        <div className='w-full pt-3'>
          <p className='pl-1 text-sm opacity-70'>Account</p>
          <strong className='text-2xl'>John Doe</strong>
        </div>

        <table className='text-md w-full table-auto tracking-tight lg:table-fixed'>
          <tbody>
            <tr>
              <td>
                <p>Connected banks </p>
              </td>
              <td>
                <p>{connectedBanks.length}</p>
              </td>
            </tr>
            <tr>
              <td>
                <p>Connected accounts</p>
              </td>
              <td>
                <p>
                  {getListOfAllAccounts(banksData.connectedBanksDict).length}
                </p>
              </td>
            </tr>
            <tr>
              <td>
                <p>Most money at</p>
              </td>
              <td>
                <p>Navy Federal</p>
              </td>
            </tr>
            <tr>
              <td>
                <p>Biggest debt at</p>
              </td>
              <td>
                <p>Trust Bank</p>
              </td>
            </tr>
          </tbody>
        </table>
      </section>

      <section className='h-3/5'>
        <div className='flex h-1/5 items-center gap-2'>
          <div className='w-full py-1'>
            <p className='text-sm opacity-70'>Total Debt</p>
            <strong className='text-2xl'> $ -{getTotalCredit(banks)}</strong>
          </div>
          <div className='w-full py-1'>
            <p className='text-sm opacity-70'>Total Balance</p>
            <strong className='text-2xl'> ${getTotalBalance(banks)}</strong>
          </div>
        </div>
        <div className='h-4/5 w-full'>
          <DoughnutChart
            incomingData={doughnutChartDataset}
            width='100%'
            height='100%'
            styleOptions='APP'
            title='Money size per bank'
          />
        </div>
      </section>
    </Card>
  );
}

export function ChartGroup({
  className,
  banksData,
}: {
  className: string;
  banksData: BanksData;
}) {
  const sortedDataset = getSortedBankData(banksData.connectedBanksDict);

  const barChartDataset: ChartDataFormat = {
    label: 'Balance',
    labels: sortedDataset.sortedBankNames,
    datasets: [sortedDataset.sortedTotals],
  };

  const lineChartDataset: ChartDataFormat = {
    label: 'Total Dynamic',
    labels: banksData.monthlyBalanceDynamic.months,
    datasets: [banksData.monthlyBalanceDynamic.balances],
  };

  return (
    <Card
      className={clsx(
        'flex h-[60vh] flex-col-reverse gap-3 px-0 py-4 md:h-[60vh]',
        className
      )}
      title='Summary'
      withBorder
    >
      <section className='h-1/2 w-full'>
        <div className='my-2 h-full'>
          <LineChart
            incomingData={lineChartDataset}
            width='100%'
            height='100%'
            styleOptions={'APP'}
            title={'Total balance dynamic'}
          />
        </div>
      </section>

      <section className='h-1/2 w-full'>
        <div className='my-2 h-full'>
          <BarChart
            incomingData={barChartDataset}
            width='100%'
            height='100%'
            styleOptions={'APP'}
            vertical
            title={'Banks balances'}
          />
        </div>
      </section>
    </Card>
  );
}

export function ListOfBanks({
  connectedBanksDict,
}: {
  connectedBanksDict: ConnectedBanksDict;
}) {
  const banks = Object.keys(connectedBanksDict);

  const [toggleLayout, setToggleLayout] = useState(true);
  return (
    <Card
      className='h-3/5 w-full px-0'
      title={
        <BanksViewToggle
          toggleLayout={toggleLayout}
          setToggleLayout={setToggleLayout}
        />
      }
      withBorder
    >
      {toggleLayout ? (
        <Carousel>
          {banks.map((bank, i) => (
            <li key={bank}>
              <CarouselItem>
                <BankCard bank={connectedBanksDict[bank]} className='w-56' />
              </CarouselItem>
            </li>
          ))}
        </Carousel>
      ) : (
        <div className=''>
          <ul className='grid grid-cols-1 gap-2 px-2 sm:grid-cols-2 lg:grid-cols-5'>
            {banks.map((bank, i) => (
              <li key={bank}>
                <BankCard bank={connectedBanksDict[bank]} className='w-full' />
              </li>
            ))}
          </ul>
        </div>
      )}
    </Card>
  );
}

function BanksViewToggle({
  setToggleLayout,
  toggleLayout,
}: {
  toggleLayout: boolean;
  setToggleLayout: (bool: boolean) => void;
}) {
  return (
    <div className='inline-flex -translate-y-1 items-center gap-4'>
      <strong className='text-md px-2'>Connected Banks</strong>
      <div className='inline-flex items-center gap-2'>
        <button
          onClick={() => setToggleLayout(true)}
          className={clsx(
            'scale-100 rounded-md p-1 text-2xl hover:scale-[1.1] hover:bg-gray-400/40',
            toggleLayout && 'bg-gray-400/40'
          )}
        >
          <BiCarousel />
        </button>
        <button
          onClick={() => setToggleLayout(false)}
          className={clsx(
            'scale-100 rounded-md p-1 text-2xl hover:scale-[1.1] hover:bg-gray-400/40',
            !toggleLayout && 'bg-gray-400/40'
          )}
        >
          <CgMenuGridR />
        </button>
      </div>
    </div>
  );
}

function BankCard({ bank, className }: { bank: Bank; className: string }) {
  const { mode } = useTheme();

  const BankName = bank[0].bank_name;
  const bankTotal = bank
    .map((acc) =>
      acc.subtype === 'credit card' ? acc.balance * -1 : acc.balance
    )
    .reduce((a, b) => a + b);

  return (
    <div
      className={clsx(
        'rounded',
        'h-36 w-full',
        'flex flex-col items-start',
        'overflow-hidden border',
        className,
        mode === 'light' ? 'border-dark/20' : 'border-gray-400/20',
        mode === 'light' ? 'bg-gray-300/50' : 'bg-gray-700/20'
      )}
    >
      <header
        className={clsx(
          'bg-blue-700/30',
          'w-full px-3 py-1',
          'inline-flex items-center gap-1'
        )}
      >
        <BsPiggyBankFill className='h-6 w-6' />
        <h6 className='text-md font-semibold drop-shadow-md'>{BankName}</h6>
      </header>
      <section className='inline-flex h-full w-full items-center  justify-end gap-2 px-3'>
        <p className='text-md opacity-70 drop-shadow-md'>Connected accounts</p>
        <h4 className='text-lg  drop-shadow-md'>3</h4>
      </section>
      <section className='flex h-full w-full flex-col items-end justify-center px-3'>
        <p className='text-md opacity-70 drop-shadow-md'>Total balance</p>
        <h4 className='text-3xl  drop-shadow-md'>$ {bankTotal}</h4>
      </section>
    </div>
  );
}

function ConnectedAccountsChips({ bank }: { bank: Bank }) {
  const { mode } = useTheme();

  return (
    <ul
      className='scrollbar-hide flex w-full items-center  
      gap-1 overflow-y-hidden overflow-x-scroll py-1 pl-3'
    >
      {bank.map((account, i) => (
        <li
          key={`bankAcc-${i}`}
          className={clsx(
            'w-min text-sm',
            'drop-shadow-md',
            'rounded-md px-2 py-[1px] ',
            mode === 'light' ? 'border-dark/30 ' : 'border-gray-400/50 ',
            'border bg-gray-500/30',
            'whitespace-nowrap'
          )}
        >
          <p>{account.subtype}</p>
        </li>
      ))}
    </ul>
  );
}
