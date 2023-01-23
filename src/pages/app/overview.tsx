import clsx from 'clsx';
import {
  GeneralInfo,
  ChartGroup,
  ListOfBanks,
} from '@/components/page/app/Overview';
import Layout from '@/components/page/app/Layout';
import { useAppPageContext } from '@/context/AppPageContext';
import { sampleData } from '@/components/page/cabinet/sections/sampleData';

export default function OverviewPage() {
  const { openSidebar } = useAppPageContext();
  const connectedBanksDict = sampleData;
  return (
    <Layout>
      <section
        className={clsx(
          'pt-4 md:px-3',
          'overflow-y-scroll',
          'flex h-full flex-col gap-4',
          openSidebar ? 'w-full md:w-[88.2%]' : 'w-full md:w-[95.8%]',
        )}
      >
        <div className='my-1 flex flex-col gap-2 md:flex-row'>
          <GeneralInfo
            className='w-full md:w-2/5'
            connectedBanksDict={connectedBanksDict}
          />
          <ChartGroup
            className='h-full w-full md:w-3/5'
            connectedBanksDict={connectedBanksDict}
          />
        </div>
        <ListOfBanks connectedBanksDict={connectedBanksDict} />
      </section>
    </Layout>
  );
}
