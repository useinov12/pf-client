import clsx from 'clsx';
import { useTheme } from '@/context/ThemeProvider';
import { useState } from 'react';
import Card from './Card';
import { Carousel, CarouselItem } from '@/components/shared/Carousel';
import { Bank, ConnectedBanksDict } from '@/services/types';
import { BiCarousel } from 'react-icons/bi';
import { CgMenuGridR } from 'react-icons/cg';
import { BsPiggyBankFill } from 'react-icons/bs';
import { BanksData } from '@/constant/demoData';

export function BankList({
  className,
  banksData,
}: {
  className: string;
  banksData: BanksData;
}) {
  const { mode } = useTheme();
  const banks = Object.keys(banksData.connectedBanksDict);
  return (
    <Card className={clsx('w-full px-0', className)} title='Banks' withBorder>
      <ul className='flex flex-col gap-1'>
        {banks.map((bank) => (
          <li
            key={`connected-${bank}`}
            className={clsx(
              'px-2 py-1',
              'rounded',
              'w-full border',
              mode === 'light' ? 'border-gray-600/50' : 'border-gray-300/20',
              mode === 'light' ? 'bg-gray-400/50' : 'bg-gray-400/20'
            )}
          >
            <div className='inline-flex items-center gap-2'>
              {/* <BsPiggyBankFill className='h-6 w-6' /> */}
              <p className='text-md font-semibold'>{bank}</p>
            </div>
          </li>
        ))}
      </ul>
    </Card>
  );
}

/* Bank list carousel */
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
        mode === 'light' ? 'bg-gray-400' : 'bg-gray-700'
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
