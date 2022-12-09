import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from './AuthProvider';
import Loading from '@/components/Loading';

/**
 * Component holds the logic to conditionally render:
 * - Protected page
 * - Loading state
 * - Redirection to login page
 *
 * Static protected routes reference:
 * [Article](https://dev.to/ivandotv/protecting-static-pages-in-next-js-application-1e50) |
 * [Repo](https://github.com/ivandotv/nextjs-client-signin-logic)
 *  */
export function AuthGuard({ children }: { children: JSX.Element }) {
  const { user, isLoading, isFetching, setRedirect } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading) {
      /* auth is initialized and there is no user */
      if (!user && !isFetching) {
        /* remember the page that user tried to access */
        setRedirect(router.route);
        router.push('/login');
      }
    }
  }, [isLoading, router, user, setRedirect, isFetching]);

  /* show loading indicator while the auth provider is still isLoading */
  if (isLoading) {
    return <Loading />;
  }

  /* if auth initialized with a valid user show protected page  */
  if (!isLoading && user) {
    return <>{children}</>;
  }

  /* otherwise don't return anything, will do a redirect from useEffect */
  return null;
}
