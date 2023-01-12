import { Carousel, CarouselItem } from '@/components/shared/Carousel';
import { useTheme } from '@/context/ThemeProvider';
import clsx from 'clsx';
import { Dispatch } from 'react';
import { sampleData } from '../cabinet/sections/sampleData';
import Card from './Card';

export function AccountsSection() {
  return (
    <Card withBorder title={'Accounts'} className='w-full'>
      <h2>content</h2>
    </Card>
  );
}

export function StatisticSection() {
  return (
    <Card withBorder title={'Statistics'} className='w-full'>
      <h2>content</h2>
    </Card>
  );
}

export function ListOfBanks({setCurrentBank}:{setCurrentBank:Dispatch<any>}) {
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
  return (
    <div
      className={clsx(
        'h-28 p-3',
        'flex flex-col items-start',
        'rounded',
        'overflow-hidden border',
        className,
        mode === 'light' ? 'border-dark/20' : 'border-gray-400/50',
        mode === 'light' ? 'bg-gray-300/50' : 'bg-gray-700/50'
      )}
    >
      <strong className=''>{bank}</strong>
    </div>
  );
}
