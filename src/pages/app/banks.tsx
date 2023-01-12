import clsx from 'clsx';
import Layout from '@/components/page/app/Layout';
import { useAppPageContext } from '@/context/AppPageContext';
import {
  AccountsSection,
  StatisticSection,
  ListOfBanks,
} from '@/components/page/app/Banks';
import { useState } from 'react';

export default function BanksPage() {
  const { openSidebar } = useAppPageContext();
  const [currentBank, setCurrentBank] = useState(null);

  return (
    <Layout>
      <section
        className={clsx(
          'pt-8 md:px-3',
          'flex h-full flex-col gap-4 ',
          openSidebar ? 'w-full md:w-[88.2%]' : 'w-full md:w-[95.8%]',
          'overflow-y-scroll'
        )}
      >
        <ListOfBanks setCurrentBank={setCurrentBank}/>
        <div className='my-1 flex flex-col gap-2 md:flex-row'>
          <AccountsSection />
          <StatisticSection />
        </div>
      </section>
    </Layout>
  );
}
