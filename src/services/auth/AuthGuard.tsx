import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Loading from '@/components/shared/Loading';
import { useAuth } from './queries';
import { setRedirect } from '@/lib/lastRedirect';

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
  const { data: user, isLoading, isFetching } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if(!isLoading && !isFetching){
      if(!user){
        setRedirect(router.route);
        router.push('/signup');
      }
    }
  }, [isLoading, user, isFetching]);

  /* show loading indicator while the auth provider is still isLoading */
  if (isLoading || isFetching) {
    return <Loading />;
  }

  /* if auth initialized with a valid user show protected page  */
  if (user) {
    return <>{children}</>;
  }

  /* otherwise don't return anything, will do a redirect from useEffect */
  return null;
}
