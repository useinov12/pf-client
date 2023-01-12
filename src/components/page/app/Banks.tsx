import clsx from 'clsx';
import { Carousel, CarouselItem } from '@/components/shared/Carousel';
import { useTheme } from '@/context/ThemeProvider';
import { useBankPageContext } from '@/pages/app/banks';
import { sampleData } from '../cabinet/sections/sampleData';
import Card from './Card';

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
      {/* <Button>open</Button> */}
    </div>
  );
}

export function AccountsSection() {
  const { bankData } = useBankPageContext();

  return (
    <Card withBorder title={'Accounts'} className='w-full'>
      <ul>
        {bankData &&
          bankData.map((account, i) => (
            <li>
              <p>{account.name}</p>
            </li>
          ))}
      </ul>
    </Card>
  );
}

export function StatisticSection() {
  const { bankData } = useBankPageContext();
  return (
    <Card withBorder title={'Statistics'} className='w-full'>
      <h1>content</h1>
    </Card>
  );
}
