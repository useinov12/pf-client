import clsx from 'clsx';

import { Spinner } from '@/components/shared/Loading';

import { BankQuery } from '@/pages/app/cabinet';

import ConnectedBanks from './ConnectedBanks';

export default function BankMenu({ bankQuery }: { bankQuery: BankQuery }) {
  return (
    <main
      className={clsx(
        'h-full w-full ',
        'flex flex-col ',
        'justify-start gap-2 pt-6'
      )}
    >
      <div className='flex h-fit items-center justify-between'>
        <strong className='font-mono uppercase'>Connected Banks</strong>
      </div>

      <section className='h-full overflow-auto'>
        {bankQuery.isLoading ? (
          <Spinner />
        ) : (
          <ConnectedBanks banksData={bankQuery.data} />
        )}
      </section>
    </main>
  );
}
