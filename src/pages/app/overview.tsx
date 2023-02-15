import clsx from 'clsx';
import Image from 'next/image';

import usePageProtection from '@/hooks/usePageProtection';

import GeneralInfo from '@/components/page/app/general/GeneralInfo';
import Summary from '@/components/page/app/general/Summary';
import Layout from '@/components/page/app/Layout';
import { Spinner } from '@/components/shared/Loading';

import { demoData, InitialData } from '@/constant/demo-data/demoData';
import { useAuth } from '@/services/auth/queries';

export default function OverviewPage() {
  const { pageIsValidated } = usePageProtection();

  const { data: user, isSuccess } = useAuth();

  if (!pageIsValidated) return <PageLoading />;

  const isLoggedIn = isSuccess && user;

  return isLoggedIn ? <OverviewPrivate /> : <OverviewPublic />;
  // return <OverviewSkeleton />;
}

function OverviewPrivate() {
  //  add temporary demoData for missing real api parts
  // const data = useConnectedBanks()
  return <Overview data={demoData} />;
}
function OverviewPublic() {
  // const data = useDemoBanks()
  return <Overview data={demoData} />;
}

function Overview({ data }: { data: InitialData }) {
  return (
    <Layout>
      <section
        data-fade='1'
        className={clsx(
          'flex',
          'px-2 md:px-6',
          'flex-col lg:flex-row',
          'h-[87vh] w-full gap-4',
          'overflow-hidden'
        )}
      >
        <GeneralInfo
          banksData={data}
          className='h-full w-full  lg:h-[89vh] lg:w-1/3'
        />
        <Summary
          banksData={data}
          className='h-full w-full lg:h-[89vh] lg:w-2/3'
        />
      </section>
    </Layout>
  );
}

export function PageLoading() {
  return (
    <Layout>
      <div className=' h-full w-full  lg:h-[87vh]' data-fade='1'>
        <div className='flex h-full w-full flex-col items-center justify-center gap-5'>
          <Image src='/images/logo.png' width={70} height={66} alt='logo' />
          <Spinner />
        </div>
      </div>
    </Layout>
  );
}
