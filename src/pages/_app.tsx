import { NextPage } from 'next';
import { AppProps } from 'next/app';
import React, { createContext, ReactNode } from 'react';
import { Toaster } from 'react-hot-toast';
import { QueryClient, QueryClientProvider } from 'react-query';

// import { AuthGuard } from '@/services/auth/AuthGuard';
import { demoData, InitialData } from '@/constant/demo-data/demoData';
// import { AppPageProvider } from '@/context/AppPageContext';
// import { LoginFormProvider } from '@/context/LoginFormProvider';
import ThemeProvider from '@/context/ThemeProvider';

const queryClient = new QueryClient();

export type NextApplicationPage<P = any, IP = P> = NextPage<P, IP> & {
  requireAuth?: boolean;
};

import '@/styles/globals.css';

import { LoginFormProvider } from '@/context/LoginFormProvider';
import { useAuth } from '@/services/auth/queries';

export default function MyApp(props: AppProps) {
  const {
    Component,
    pageProps,
  }: { Component: NextApplicationPage; pageProps: any } = props as AppProps;

  return (
    <>
      <Toaster />
      <ThemeProvider>
        <QueryClientProvider client={queryClient}>
          {/* {Component.requireAuth ? (
            <AuthGuard>
              <Component {...pageProps} />
            </AuthGuard>
          ) : (
            <LoginFormProvider>
              <AppPageProvider>
                <Component {...pageProps} />
              </AppPageProvider>
            </LoginFormProvider>
          )} */}
          <LoginFormProvider>
            {/* <AppRoot> */}
            <Component {...pageProps} />
            {/* </AppRoot> */}
          </LoginFormProvider>
        </QueryClientProvider>
      </ThemeProvider>
    </>
  );
}

function AppRoot(props: { children: ReactNode }) {
  const { data: user, isSuccess } = useAuth();
  const isLoggedIn = isSuccess && user;

  return (
    <>
      {isLoggedIn ? <PrivateVersion {...props} /> : <DemoVersion {...props} />}
    </>
  );
}

function PrivateVersion({ children }: { children: ReactNode }) {
  // ! connect total monthly balance change api call
  // ! connect total monthly balance change BY_ACC_TYPE api call
  // const { data, isLoading, isSuccess, isError } = useConnectedBanks();

  // if (isLoading) return <Loading />;

  // if (isError) return <h1>Error</h1>;

  return (
    <DataContext.Provider value={{ data: demoData /* switch to query data */ }}>
      {children}
    </DataContext.Provider>
  );
}
function DemoVersion({ children }: { children: ReactNode }) {
  return (
    <DataContext.Provider value={{ data: demoData }}>
      {children}
    </DataContext.Provider>
  );
}

const DataContext = createContext<{ data: InitialData }>({
  data: demoData,
});
