import clsx from 'clsx';

import GeneralInfo from '@/components/page/app/general/GeneralInfo';
import Summary from '@/components/page/app/general/Summary';
import Layout from '@/components/page/app/Layout';

import { demoData } from '@/constant/demoData';

export default function OverviewPage() {
  /* 
    const bankData = session ? data : demoData 
  */

  return (
    <Layout>
      <section
        className={clsx(
          'overflow-y-scroll',
          'flex h-full flex-col gap-4',
          'h-full w-full'
        )}
      >
        <div
          className={clsx(
            'px-2 md:px-6',
            'flex',
            'flex-col lg:flex-row',
            'h-full w-full  gap-6 '
          )}
        >
          <GeneralInfo
            banksData={demoData}
            className='h-full w-full lg:w-1/3'
          />
          <Summary banksData={demoData} className='h-full w-full lg:w-2/3' />
        </div>
      </section>
    </Layout>
  );
}
