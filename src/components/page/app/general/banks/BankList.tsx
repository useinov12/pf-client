import clsx from 'clsx';
import { useState } from 'react';
import { RiBankFill } from 'react-icons/ri';

import { getTotalBalanceByBank } from '@/lib/dataFormatingMethods';

import Card from '@/components/page/app/Card';
import { Carousel, CarouselItem } from '@/components/shared/Carousel';

import { useTheme } from '@/context/ThemeProvider';
import { useBankPageContext } from '@/pages/app/banks';
import { Bank, ConnectedBanksDict } from '@/services/types';

export default function ListOfBanks({
  connectedBanksDict,
}: {
  connectedBanksDict: ConnectedBanksDict;
}) {
  const banks = Object.keys(connectedBanksDict);

  return (
    <Card className='px-0 '>
      <div className='flex items-center justify-between'>
        <strong>Connected banks</strong>
      </div>
      <Carousel
        maxNumberOfChildrensInFrame={7}
        widthClass='w-full'
        heightClass='h-28'
      >
        {banks.map((bank) => (
          <li key={`bank-${bank}`} className='mx-1 list-none'>
            <CarouselItem>
              <BankCard
                className=' w-48'
                bank={connectedBanksDict[bank]}
                connectedBanksDict={connectedBanksDict}
              />
            </CarouselItem>
          </li>
        ))}
      </Carousel>
    </Card>
  );
}

function BankCard({
  bank,
  className,
  connectedBanksDict,
}: {
  bank: Bank;
  className: string;
  connectedBanksDict: ConnectedBanksDict;
}) {
  const { mode } = useTheme();
  const { setSelectedBank, selectedBank } = useBankPageContext();

  const [cardHover, setCardHover] = useState(false);
  const bankName = bank[0].bank_name;
  const bankTotal = getTotalBalanceByBank({
    bank: bankName,
    data: connectedBanksDict,
  });

  return (
    <button
      onClick={() => setSelectedBank(bankName)}
      onMouseEnter={() => setCardHover(true)}
      onMouseLeave={() => setCardHover(false)}
      className={clsx(
        'h-28',
        'cursor-pointer',
        'rounded',
        'overflow-hidden border',
        'flex flex-col items-center ',
        mode === 'light' ? 'border-dark/20' : 'border-gray-400/50',
        mode === 'light' ? 'bg-gray-300/50' : 'bg-gray-700/20',
        selectedBank === bankName
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
          selectedBank === bankName
            ? 'bg-blue-600/50'
            : cardHover && 'bg-blue-600/50',
          selectedBank === bankName
            ? '-translate-y-7'
            : cardHover
            ? '-translate-y-7'
            : 'translate-y-6'
        )}
      >
        <RiBankFill
          className={clsx(
            'h-10 w-10',
            selectedBank === bankName
              ? 'scale-0'
              : cardHover
              ? 'scale-0'
              : 'scale-100',
            'transition-all duration-200 ease-in'
          )}
        />
        <h6 className={clsx('text-lg font-semibold drop-shadow-md')}>
          {bankName}
        </h6>
      </header>

      <div
        className={clsx(
          'transition-all duration-200 ease-in',
          selectedBank === bankName
            ? '-translate-y-4 scale-y-100'
            : cardHover
            ? '-translate-y-4 scale-y-100'
            : 'translate-y-12 scale-y-0'
        )}
      >
        <h6 className='px-3 text-sm drop-shadow-md'>
          Connected accounts {`${bank.length}`}
        </h6>
        <div className='inline-flex w-full items-end justify-between px-3'>
          <p className='text-sm drop-shadow-md'>Total</p>
          <h3 className='text-xl font-normal drop-shadow-md'>$ {bankTotal}</h3>
        </div>
      </div>
    </button>
  );
}
