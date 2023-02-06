import clsx from 'clsx';
import { Dispatch, SetStateAction } from 'react';

import { BanksData } from '@/constant/demoData';
import { useTheme } from '@/context/ThemeProvider';
import { Bank } from '@/services/types';

export default function BankList({
  banksData,
  openBankId,
  setSelectedBank,
  setOpenBankId,
}: {
  banksData: BanksData;
  openBankId: number;
  setSelectedBank: Dispatch<SetStateAction<Bank | undefined>>;
  setOpenBankId: Dispatch<SetStateAction<number>>;
}) {
  const banksDict = banksData.connectedBanksDict;
  const { mode } = useTheme();

  return (
    <section className=''>
      <ul className={clsx('h-full w-full list-none', 'flex flex-wrap gap-1')}>
        <li>
          <button
            onClick={() => {
              setOpenBankId(-1);
              setSelectedBank(undefined);
            }}
            className={clsx(
              'border',
              'rounded px-3',
              'whitespace-nowrap',
              'font-semibold',
              mode === 'light' ? 'bg-gray-400/50' : 'bg-gray-500/20',
              mode === 'light' ? 'border-gray-600/50' : 'border-gray-300/20',
              openBankId === -1 &&
                'border-blue-600 text-blue-600 ring-2 ring-blue-600',
              'hover:border-blue-600',
              ' hover:text-blue-600 '
            )}
          >
            All banks
          </button>
        </li>
        {Object.keys(banksDict).map((bank, i) => (
          <li key={bank}>
            <button
              onClick={() => {
                setOpenBankId((p) => (p === i ? -1 : i));
                setSelectedBank((p) =>
                  p === banksDict[bank] ? undefined : banksDict[bank]
                );
              }}
              className={clsx(
                'border',
                'rounded px-3',
                'whitespace-nowrap',
                mode === 'light' ? 'bg-gray-400/50' : 'bg-gray-500/20',
                mode === 'light' ? 'border-gray-600/50' : 'border-gray-300/20',
                i === openBankId &&
                  'border-blue-600 text-blue-600 ring-2 ring-blue-600',
                'hover:border-blue-600',
                ' hover:text-blue-600 '
              )}
            >
              {bank}
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}
