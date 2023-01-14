import Layout from '@/components/page/app/Layout';
import { useRouter } from 'next/router';

import clsx from 'clsx';

import {
  GeneralInfo,
  ChartGroup,
  ListOfBanks,
} from '@/components/page/app/Overview';
import { useAppPageContext } from '@/context/AppPageContext';

export default function OverviewPage() {
  const { openSidebar } = useAppPageContext();
  return (
    <Layout>
      <section
        className={clsx(
          'md:px-3 pt-8',
          'flex h-full flex-col gap-4',
          openSidebar ? 'w-full md:w-[88.2%]' : 'w-full md:w-[95.8%]',
          'overflow-y-scroll'
        )}
      >
        <div className='my-1 flex flex-col gap-2 md:flex-row'>
          <GeneralInfo className='w-full md:w-1/3' />
          <ChartGroup className='h-full w-full md:w-2/3' />
        </div>
        <ListOfBanks />
      </section>
    </Layout>
  );
}
