import clsx from 'clsx';
import { useState } from 'react';

import BankList from '@/components/page/app/general/Summary/BankList';
import Details from '@/components/page/app/general/Summary/Details';

import { BanksData } from '@/constant/demo-data/demoData';
import { Bank } from '@/services/types';

export default function Summary({
  className,
  banksData,
}: {
  className: string;
  banksData: BanksData;
}) {
  const [openBankId, setOpenBankId] = useState(-1);
  const [selectedBank, setSelectedBank] = useState<Bank | undefined>(undefined);

  return (
    <main
      className={clsx('flex flex-col justify-start gap-2 p-0 py-1', className)}
    >
      <BankList
        banksData={banksData}
        openBankId={openBankId}
        setSelectedBank={setSelectedBank}
        setOpenBankId={setOpenBankId}
      />
      <Details banksData={banksData} selectedBank={selectedBank} />
    </main>
  );
}
