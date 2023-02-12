import clsx from 'clsx';
import { useState } from 'react';

import BankList from '@/components/page/app/general/Summary/BankList';
import Details from '@/components/page/app/general/Summary/Details';
import Overview from '@/components/page/app/general/Summary/Overview';

import { BanksData } from '@/constant/demoData';
import { Bank } from '@/services/types';

import Card from '../Card';
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
    <Card className={clsx('flex flex-col justify-start gap-2 p-0', className)}>
      {/* <div className='flex items-center justify-between'>
        <strong>Summary</strong>

      </div> */}
      <BankList
        banksData={banksData}
        openBankId={openBankId}
        setSelectedBank={setSelectedBank}
        setOpenBankId={setOpenBankId}
      />
      <Overview banksData={banksData} selectedBank={selectedBank} />
      <Details banksData={banksData} selectedBank={selectedBank} />
    </Card>
  );
}
