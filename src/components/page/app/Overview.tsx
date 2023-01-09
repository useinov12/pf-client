import clsx from 'clsx';
import { useTheme } from '@/context/ThemeProvider';
import { ReactNode, useState } from 'react';
import { sampleData } from '../cabinet/sections/sampleData';
import { ChartDataFormat } from '@/components/charts/types';
import { months } from '@/components/charts/defaults';
import LineChart from '@/components/charts/LineChart';
import { Carousel, CarouselItem } from '@/components/shared/Carousel';
import { BiCarousel } from 'react-icons/bi';
import { CgMenuGridR } from 'react-icons/cg';
import { BsPiggyBankFill } from 'react-icons/bs';
import BarChart from '@/components/charts/BarChart';

export function GeneralInfo({ className }: { className: string }) {
  const connectedBanks = Object.keys(sampleData);
  const connectedAccounts = connectedBanks.map((bank, i) => sampleData[bank]);

  const connectedAccountsQuantity = connectedBanks
    .map((bank) => sampleData[bank].length)
    .reduce((a, b) => a + b);

  return (
    <Card
      className={clsx('flex flex-col justify-between py-3', className)}
      title='General Info'
    >
      <div className='w-full py-4'>
        <p className='text-sm'>Account</p>
        <h4> Ruslan Useinov</h4>
      </div>

      <table className='w-full table-auto lg:table-fixed'>
        <tbody>
          <tr>
            <td>
              <strong className='md:text-md text-sm'>Connected banks </strong>
            </td>
            <td>
              <strong>{connectedBanks.length}</strong>
            </td>
          </tr>
          <tr>
            <td>
              <strong className='md:text-md text-sm'>Connected accounts</strong>
            </td>
            <td>
              <strong>{connectedAccountsQuantity}</strong>
            </td>
          </tr>
        </tbody>
      </table>

      <div className='my-2 flex items-center gap-2'>
        <div className='w-full py-1'>
          <p className='text-sm'>Credit</p>
          <h3 className='text-md md:text-xl'> $2000</h3>
        </div>
        <div className='w-full py-1'>
          <p className='text-sm'>Balance</p>
          <h3 className='text-md md:text-xl'> $10000</h3>
        </div>
        <div className='w-full py-1'>
          <p className='text-sm'>Total</p>
          <h3 className='text-md md:text-xl'> $8000</h3>
        </div>
      </div>
    </Card>
  );
}

export function ChartGroup({ className }: { className: string }) {
  const dataset1 = [
    1200, 1700, 1400, 1800, 2100, 1900, 1700, 2200, 2400, 1800, 2100,
  ];
  const dataset2 = [
    1200, 1700, -1400, 1800, 2100, -1900, 1700, 2200, -2400, 1800, -2100,
  ];
  const labels = months
    .filter((_, i) => i < dataset1.length)
    .map((month) => month.slice(0, 3));

  const testDataset1: ChartDataFormat = {
    label: 'Total Dynamic',
    labels: labels,
    datasets: [dataset1],
  };
  const testDataset2: ChartDataFormat = {
    label: 'Total Dynamic',
    labels: labels,
    datasets: [dataset2.sort((a, b) => a - b)],
  };

  return (
    <Card
      className={clsx('flex h-60 flex-col px-0 md:h-72 lg:flex-row', className)}
      title='Total summary'
    >
      <div className='h-1/2 w-full lg:h-full lg:w-1/2'>
        <LineChart
          incomingData={testDataset1}
          width='50%'
          height='100%'
          styleOptions={'APP'}
        />
      </div>
      <div className='h-1/2 w-full lg:h-full lg:w-1/2'>
        <BarChart
          incomingData={testDataset2}
          width='50%'
          height='100%'
          styleOptions={'APP'}
        />
      </div>
    </Card>
  );
}

export function ListOfBanks() {
  const banks = Object.keys(sampleData);

  const [toggleLayout, setToggleLayout] = useState(false);
  return (
    <div className='h-3/5 w-full'>
      <BanksViewToggle
        toggleLayout={toggleLayout}
        setToggleLayout={setToggleLayout}
      />
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
    </div>
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
    <div className='mb-3 inline-flex items-center gap-4'>
      <h3 className='px-2 py-2 font-normal'>Connected Banks</h3>
      <div className='inline-flex items-center gap-2'>
        <button
          onClick={() => setToggleLayout(true)}
          className={clsx(
            'scale-100 rounded-md p-1 text-3xl hover:scale-[1.1] hover:bg-gray-400/40',
            toggleLayout && 'bg-gray-400/40'
          )}
        >
          <BiCarousel />
        </button>
        <button
          onClick={() => setToggleLayout(false)}
          className={clsx(
            'scale-100 rounded-md p-1 text-3xl hover:scale-[1.1] hover:bg-gray-400/40',
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
        'h-40',
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
          'bg-gray-600/50',
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
            'rounded-md px-2 py-[2px] ',
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
  title?: string;
}

function Card({ title, className, children, withBorder }: CardProps) {
  const { mode } = useTheme();

  return (
    <div
      className={clsx(
        'relative px-2 py-3',
        'rounded ',
        withBorder && 'border',
        mode === 'light' ? 'border-dark/50' : 'border-gray-300/50',
        className
      )}
    >
      {title && (
        <strong
          className={clsx(
            'absolute -top-3 left-1 px-1',
            'bg-transparent'
            // mode === 'light' ? 'bg-gray-300' : 'bg-gray-900'
          )}
        >
          {title}
        </strong>
      )}
      {children}
    </div>
  );
}
