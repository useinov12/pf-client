import { NextPage } from 'next';
import { AppProps } from 'next/app';
import React, { ReactNode, useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import { QueryClient, QueryClientProvider } from 'react-query';

import '@/styles/globals.css';

import { SignInForm as SignInFormPopup } from '@/components/signin/Form';

import { AppPageProvider } from '@/context/AppPageContext';
import { LoginFormProvider } from '@/context/LoginFormProvider';
import ThemeProvider from '@/context/ThemeProvider';
import { useCashedClient } from '@/services/auth/actions';
import { useAuth } from '@/services/auth/queries';

const queryClient = new QueryClient();

export default function MyApp(props: AppProps) {
  const { Component, pageProps }: { Component: NextPage; pageProps: any } =
    props as AppProps;

  return (
    <AppPageProvider>
      <ThemeProvider>
        <QueryClientProvider client={queryClient}>
          <LoginFormProvider>
            <App>
              <Component {...pageProps} />
            </App>
          </LoginFormProvider>
        </QueryClientProvider>
      </ThemeProvider>
    </AppPageProvider>
  );
}

function App({ children }: { children: ReactNode }) {
  const { refetch } = useAuth();
  const queryClient = useCashedClient();

  useEffect(() => {
    /* check if user loggged in on page refresh */
    queryClient.invalidateQueries(['user']);
    refetch();
  }, []);

  return (
    <>
      {children}
      <Toaster />
      <SignInFormPopup withCloseBtn />
    </>
  );
}
