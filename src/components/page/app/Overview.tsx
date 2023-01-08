import clsx from 'clsx';
import { useTheme } from '@/context/ThemeProvider';
import { ReactNode } from 'react';
import { sampleData } from '../cabinet/sections/sampleData';
import { ChartDataFormat } from '@/components/charts/types';
import { months } from '@/components/charts/defaults';
import LineChart from '@/components/charts/LineChart';
import { Carousel, CarouselItem } from '@/components/shared/Carousel';

export function GeneralInfo() {
  const connectedBanks = Object.keys(sampleData);
  const connectedAccounts = connectedBanks.map((bank, i) => sampleData[bank]);

  const connectedAccountsQuantity = connectedBanks
    .map((bank) => sampleData[bank].length)
    .reduce((a, b) => a + b);

  return (
    <Card className=' flex w-1/3 flex-col justify-between' title='General Info'>
      <Card className='w-full py-1'>
        <p className='text-sm'>Account</p>
        <h4> Ruslan Useinov</h4>
      </Card>
      <table className='w-full table-fixed'>
        <tbody>
          <tr>
            <td>
              <strong>Connected banks </strong>
            </td>
            <td>
              <strong>{connectedBanks.length}</strong>
            </td>
          </tr>
          <tr>
            <td>
              <strong>Connected accounts</strong>
            </td>
            <td>
              <strong>{connectedAccountsQuantity}</strong>
            </td>
          </tr>
        </tbody>
      </table>

      <div className='flex items-center gap-2'>
        <Card className='w-full py-1'>
          <p className='text-sm'>Credit</p>
          <h3> $2000</h3>
        </Card>
        <Card className='w-full py-1'>
          <p className='text-sm'>Balance</p>
          <h3> $10000</h3>
        </Card>
        <Card className='w-full py-1'>
          <p className='text-sm'>Total</p>
          <h3> $8000</h3>
        </Card>
      </div>
    </Card>
  );
}

export function ChartGroup() {
  const dataset = [
    1200, 1700, 1400, 1800, 2100, 1900, 1700, 2200, 2400, 1800, 2100,
  ];
  const labels = months
    .filter((_, i) => i < dataset.length)
    .map((month) => month.slice(0, 3));

  const testDataset: ChartDataFormat = {
    label: 'Total Dynamic',
    labels: labels,
    datasets: [dataset],
  };

  return (
    <Card className='h-72 w-[60%]'>
      <LineChart
        incomingData={testDataset}
        width='100%'
        height='100%'
        styleOptions={'APP'}
      />
    </Card>
  );
}

export function ListOfBanks() {
  const banks = Object.keys(sampleData);
  return (
    <Carousel>
      {banks.map((bank, i) => (
        <li key={bank}>
          <CarouselItem width='256'>
            <BankCard bank={bank} />
          </CarouselItem>
        </li>
      ))}
    </Carousel>
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
            'absolute -top-3 left-2 px-1',
            mode === 'light' ? 'bg-gray-300' : 'bg-gray-900'
          )}
        >
          {title}
        </strong>
      )}
      {children}
    </div>
  );
}

function BankCard({ bank }: { bank: string }) {
  const { mode } = useTheme();

  const bankData = sampleData[bank];

  const bankTotal = bankData
    .map((acc) =>
      acc.subtype === 'credit card' ? acc.balance * -1 : acc.balance
    )
    .reduce((a, b) => a + b);

  return (
    <Card
      className={clsx(
        'relative h-48 w-64',
        mode === 'light' ? 'border-dark/20' : 'border-gray-400/50',
        mode === 'light' ? 'bg-gray-300/50' : 'bg-gray-700/50'
      )}
      withBorder
    >
      <h4 className='drop-shadow-md'>{bank}</h4>
      <h6 className='my-2 text-sm font-semibold drop-shadow-md'>
        Connected accounts
      </h6>
      <ConnectedAccountsChips bank={bank} />
      <div
        className={clsx(
          'absolute bottom-0 left-0',
          'w-full py-1 px-3',
          'flex flex-col items-end'
        )}
      >
        <p className=' drop-shadow-md '>Total</p>
        <h3 className='text-3xl drop-shadow-md'>$ {bankTotal}</h3>
      </div>
    </Card>
  );
}

function ConnectedAccountsChips({ bank }: { bank: string }) {
  const { mode } = useTheme();
  const bankData = sampleData[bank];
  return (
    <ul className='flex flex-wrap items-center gap-1'>
      {bankData.map((account) => (
        <li
          className={clsx(
            'w-min text-sm',
            'drop-shadow-md',
            'rounded-md px-2 py-[2px] ',
            mode === 'light' ? 'border-dark/30 ' : 'border-gray-400/50 ',
            'border bg-gray-500/30'
          )}
        >
          <p>{account.subtype}</p>
        </li>
      ))}
    </ul>
  );
}
