import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import { useLoginForm } from '@/context/LoginFormProvider';
import { useAuth } from '@/services/auth/queries';

/**
 * Used to
 * 1. Create delay for page transitions
 * 2. Render `PRIVATE` or `PUBLIC` version of the page\
 *  using URL params:
 * `/?location=demo` or `/?location=private`
 */
export default function usePageProtection() {
  const router = useRouter();
  const [pageIsValidated, setPageIsValidated] = useState(false);

  const { handleOpenLoginForm } = useLoginForm();

  const { data: user, isSuccess } = useAuth();
  const isLoggedIn = isSuccess && user;

  /**
   * Using URL parameters to conditionally render Private/Public version of the page.
   * if URL is missing `/?location=<demo | private>` - use shallow routing to add default
   * `/?location=demo` to the path
   *
   * Next JS shallow routing docs: https://nextjs.org/docs/routing/shallow-routing
   */
  function validateUrlParams() {
    const locationParam = router.query['location'];

    if (isLoggedIn) {
      router.push(`${router.pathname}/?location=private`, undefined, {
        shallow: true,
      });
      return;
    }

    router.push(`${router.pathname}/?location=demo`, undefined, {
      shallow: true,
    });
    if (locationParam === 'private') handleOpenLoginForm();
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
      }, 500);
    }
    return () => clearTimeout(timer);
  }, [router.isReady]);

  return { pageIsValidated };
}
