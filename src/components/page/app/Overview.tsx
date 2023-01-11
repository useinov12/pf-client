import clsx from 'clsx';
import { useTheme } from '@/context/ThemeProvider';
import { ReactNode, useEffect, useState } from 'react';
import {
  sampleData,
  getListOfAllAccounts,
  getTotalCredit,
  getTotalBalance,
  getListOfBanksTotals,
} from '../cabinet/sections/sampleData';
import { ChartDataFormat } from '@/components/charts/types';
import { months } from '@/components/charts/defaults';
import LineChart from '@/components/charts/LineChart';
import { Carousel, CarouselItem } from '@/components/shared/Carousel';
import { BiCarousel } from 'react-icons/bi';
import { CgMenuGridR } from 'react-icons/cg';
import { BsPiggyBankFill } from 'react-icons/bs';
import BarChart from '@/components/charts/BarChart';
import PolarAreaChart from '@/components/charts/PolarAreaChart';
import { useAppPageContext } from '@/context/AppPageContext';
import DoughnutChart from '@/components/charts/Doughnut';

export function GeneralInfo({ className }: { className: string }) {
  const connectedBanks = Object.keys(sampleData);
  const connectedAccountsQuantity = getListOfAllAccounts(sampleData).length;
  const creditTotal = getTotalCredit(sampleData);
  const balanceTotal = getTotalBalance(sampleData);

  const monhtlyTotalBalance = [
    1200, 1700, 1400, 1800, 2100, 1900, 1700, 2200, 2400, 1800, 2100,
  ];

  const labels = months
    .filter((_, i) => i < monhtlyTotalBalance.length)
    .map((month) => month.slice(0, 3));

  const testDataset1: ChartDataFormat = {
    label: 'Total Dynamic',
    labels: labels,
    datasets: [monhtlyTotalBalance],
  };

  return (
    <Card
      className={clsx('flex flex-col justify-start py-3', className)}
      title='General Info'
      withBorder
    >
      <div className='flex h-12'>
        <div className='w-1/3 py-1'>
          <p className='text-sm'>Account</p>
          <strong className='m-0 p-0'>John Doe</strong>
        </div>
      </div>

      <table className='w-full table-auto lg:table-fixed'>
        <tbody>
          <tr>
            <td>
              <p className='text-sm'>Connected banks </p>
            </td>
            <td>
              <p className='text-sm'>{connectedBanks.length}</p>
            </td>
          </tr>
          <tr>
            <td>
              <p className='text-sm'>Connected accounts</p>
            </td>
            <td>
              <p className='text-sm'>{connectedAccountsQuantity}</p>
            </td>
          </tr>
          <tr>
            <td>
              <p className='text-sm'>Most money at</p>
            </td>
            <td>
              <p className='text-sm'>Navy Federal</p>
            </td>
          </tr>
          <tr>
            <td>
              <p className='text-sm'>Biggest debt at</p>
            </td>
            <td>
              <p className='text-sm'>Trust Bank</p>
            </td>
          </tr>
        </tbody>
      </table>

      <div className='h-1/3 w-5/6'>
        <LineChart
          incomingData={testDataset1}
          width='100%'
          height='100%'
          styleOptions={'APP'}
          title={'Total balance dynamic'}
        />
      </div>

      <div className='my-2 flex items-center gap-2'>
        <div className='w-full py-1'>
          <p className='text-sm'>Credit</p>
          <strong className='text-xl'> $ -{creditTotal}</strong>
        </div>
        <div className='w-full py-1'>
          <p className='text-sm'>Balance</p>
          <strong className='text-xl'> ${balanceTotal}</strong>
        </div>
      </div>
    </Card>
  );
}

export function ChartGroup({ className }: { className: string }) {
  // const labels = months
  //   .filter((_, i) => i < monhtlyTotalBalance.length)
  //   .map((month) => month.slice(0, 3));

  // const testDataset1: ChartDataFormat = {
  //   label: 'Total Dynamic',
  //   labels: labels,
  //   datasets: [monhtlyTotalBalance],
  // };

  const listOfBankBalances = getListOfBanksTotals(sampleData);
  const testDataset2: ChartDataFormat = {
    label: 'Balance',
    labels: Object.keys(sampleData),
    datasets: [listOfBankBalances.sort((a, b) => a - b)],
  };

  const { openSidebar } = useAppPageContext();

  useEffect(() => {}, [openSidebar]);

  /* polar area:
    include only positive balances

    vertical bar:
    fix data
    add totals
  
  */

  return (
    <Card
      className={clsx(
        'flex h-[50vh] flex-col-reverse px-0 py-3 md:h-[23rem] lg:flex-row',
        className
      )}
      title='Total summary'
      withBorder
    >
      <section className='h-1/2 w-full lg:h-full lg:w-1/2'>
        <div className='hidden lg:block lg:h-full'>
          <DoughnutChart
            incomingData={testDataset2}
            width='100%'
            height='100%'
            styleOptions='APP'
            title='Money size per bank'
          />
        </div>

        {/* <div className='my-2 flex items-center justify-center gap-2 '>
          <div className='w-1/2 py-1'>
            <p className='text-sm'>Credit</p>
            <strong className='text-xl'> $ -{1000}</strong>
          </div>
          <div className='w-1/2 py-1'>
            <p className='text-sm'>Balance</p>
            <strong className='text-xl'> ${10000}</strong>
          </div>
        </div> */}
      </section>

      <section className='h-2/3 w-full lg:h-full lg:w-1/2'>
        <BarChart
          incomingData={testDataset2}
          width='100%'
          height='100%'
          styleOptions={'APP'}
          vertical
          title={'Banks balances'}
        />
      </section>
    </Card>
  );
}

export function ListOfBanks() {
  const banks = Object.keys(sampleData);

  const [toggleLayout, setToggleLayout] = useState(false);
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
      {/* <BanksViewToggle
        toggleLayout={toggleLayout}
        setToggleLayout={setToggleLayout}
      /> */}
      {toggleLayout ? (
        <Carousel>
          {banks.map((bank, i) => (
            <li key={bank}>
              <CarouselItem width='256'>
                <BankCard bank={bank} className='w-64' />
              </CarouselItem>
            </li>
          ))}
        </Carousel>
      ) : (
        <div className=''>
          <ul className='grid grid-cols-1 gap-2 px-2 sm:grid-cols-2 lg:grid-cols-5'>
            {banks.map((bank, i) => (
              <li key={bank}>
                <BankCard bank={bank} className='w-full' />
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
    <div className='inline-flex items-center gap-4 -translate-y-1'>
      <strong className='px-2 text-md'>Connected Banks</strong>
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

function BankCard({ bank, className }: { bank: string; className: string }) {
  const { mode } = useTheme();

  const bankData = sampleData[bank];

  const bankTotal = bankData
    .map((acc) =>
      acc.subtype === 'credit card' ? acc.balance * -1 : acc.balance
    )
    .reduce((a, b) => a + b);

  return (
    <div
      className={clsx(
        'h-36',
        'flex flex-col items-start',
        'rounded',
        'overflow-hidden border',
        className,
        mode === 'light' ? 'border-dark/20' : 'border-gray-400/50',
        mode === 'light' ? 'bg-gray-300/50' : 'bg-gray-700/50'
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
        <h6 className='text-sm font-semibold drop-shadow-md'>{bank}</h6>
      </header>
      <h6 className='px-3 py-1 text-sm font-semibold drop-shadow-md'>
        Connected accounts
      </h6>
      <ConnectedAccountsChips bank={bank} />
      <div className='flex w-full flex-col items-end px-3'>
        <p className='text-sm drop-shadow-md'>Total</p>
        <h3 className='text-2xl font-normal drop-shadow-md'>$ {bankTotal}</h3>
      </div>
    </div>
  );
}

function ConnectedAccountsChips({ bank }: { bank: string }) {
  const { mode } = useTheme();
  const bankData = sampleData[bank];
  return (
    <ul className='scrollbar-hide flex w-full items-center  gap-1 overflow-y-hidden overflow-x-scroll py-1 pl-3'>
      {bankData.map((account, i) => (
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

interface CardProps {
  className: string;
  children: ReactNode;
  withBorder?: boolean | undefined;
  title?: string | JSX.Element;
}

function Card({ title, className, children, withBorder }: CardProps) {
  const { mode } = useTheme();

  return (
    <div
      className={clsx(
        'relative px-2 py-5',
        // 'rounded',
        withBorder && 'md:border-t',
        mode === 'light' ? 'border-dark/50' : 'border-gray-300/50',
        className
      )}
    >
      {title && (
        <strong
          className={clsx(
            'absolute -top-3 left-1 px-1',
            'rounded-lg bg-transparent',
            mode === 'light' ? 'bg-gray-200' : 'bg-gray-900'
          )}
        >
          {title}
        </strong>
      )}
      {children}
    </div>
  );
}
