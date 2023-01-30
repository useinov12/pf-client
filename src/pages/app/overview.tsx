import clsx from 'clsx';
import Layout from '@/components/page/app/Layout';
import { useAppPageContext } from '@/context/AppPageContext';
import { demoData } from '@/constant/demoData';
import GeneralInfo from '@/components/page/app/general/GeneralInfo';
import Summary from '@/components/page/app/general/Summary';

export default function OverviewPage() {
  const { openSidebar } = useAppPageContext();
  /* 
    const bankData = session ? data : demoData 
  */

  return (
    <Layout>
      <section
        className={clsx(
          'pt-7',
          'overflow-y-scroll',
          'flex h-full flex-col gap-4',
          'h-full w-full'
        )}
      >
        <div className='flex h-full w-full flex-col gap-6 md:flex-row md:px-6 '>
          <GeneralInfo
            banksData={demoData}
            className='h-full w-full md:w-1/3'
          />
          <Summary 
            banksData={demoData} 
            className='h-full w-full md:w-2/3' 
          />
        </div>
      </section>
    </Layout>
  );
}
