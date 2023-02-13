import clsx from 'clsx';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import GeneralInfo from '@/components/page/app/general/GeneralInfo';
import Summary from '@/components/page/app/general/Summary';
import Layout from '@/components/page/app/Layout';
import Loading from '@/components/shared/Loading';

import { demoData, InitialData } from '@/constant/demo-data/demoData';
import { useAuth } from '@/services/auth/queries';

//  TODO: review & refactor page rendering logic
//  TODO: usePathValidation() refactor
//  TODO: add login popup
//  TODO: add login popup
//! TODO: resolve conditional data loading: real/demo

export default function OverviewPage() {
  const { pageIsValidated } = usePageProtection();

  const { data: user, isSuccess } = useAuth();

  if (!pageIsValidated) return <Loading />;

  const isLoggedIn = isSuccess && user;

  return isLoggedIn ? <OverviewPrivate /> : <OverviewPublic />;
}

function OverviewPrivate() {
  // ! add temporary demoData for missing real api parts
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
        className={clsx(
          'flex',
          'px-2 md:px-6',
          'flex-col lg:flex-row',
          'h-[90vh] w-full gap-4',
          'overflow-hidden'
        )}
      >
        {/* <h1>{version}</h1> */}
        <GeneralInfo
          banksData={data}
          className='h-full w-full  lg:h-[90vh] lg:w-1/3'
        />
        <Summary
          banksData={data}
          className='h-full w-full lg:h-[90vh] lg:w-2/3'
        />
      </section>
    </Layout>
  );
}

/**
 * Used to create delay for page transitions
 * and to render PRIVATE/PUBLIC version of the page.
 */
function usePageProtection() {
  const router = useRouter();
  const [pageIsValidated, setPageIsValidated] = useState(false);

  /**
   * Using URL parameters to conditionally render Private/Public version of the page.
   * if URL is missing `/?location=<"demo"|"private">`
   * use shallow routing to add default `/?location=demo` to the path
   *
   * Next JS shallow routing docs: https://nextjs.org/docs/routing/shallow-routing
   */
  function validateUrlParams() {
    const locationParam = router.query['location'];
    if (locationParam !== 'private') {
      router.push(`${router.pathname}/?location=demo`, undefined, {
        shallow: true,
      });
    }
  }

  /**
   * Check when path generated, to access URL params
   * https://nextjs.org/docs/api-reference/next/router#router-object
   */
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (router.isReady) {
      timer = setTimeout(() => {
        setPageIsValidated(true);
        validateUrlParams();
        // ! popup
      }, 3000);
    }
    return () => clearTimeout(timer);
  }, [router.isReady]);

  return { pageIsValidated };
}
