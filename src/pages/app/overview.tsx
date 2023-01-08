import Layout from '@/components/page/app/Layout';
import { useRouter } from 'next/router';

import {
  GeneralInfo,
  ChartGroup,
  ListOfBanks,
} from '@/components/page/app/Overview';

export default function OverviewPage() {
  const router = useRouter();
  const location = router.asPath.slice(5);
  return (
    <Layout>
      <section className='flex h-full w-full flex-col gap-4'>
        <h4 className='px-2 py-3 text-2xl font-bold capitalize '>{location}</h4>
        <div className='my-2 flex gap-2'>
          <GeneralInfo />
          <ChartGroup />
        </div>
        <ListOfBanks />
      </section>
    </Layout>
  );
}
