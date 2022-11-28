import React from 'react';
import { AppProps } from 'next/app';
import { Toaster } from 'react-hot-toast';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import PlaidTokenProvider from '@/context/PlaidTokenProvider';
import { UserProvider } from '@/services/user';
import ThemeProvider from '@/context/ThemeProvider';
import LoginFormProvider from '@/context/LoginFormProvider';

import '@/styles/globals.css';

function MyApp({ Component, pageProps }: AppProps) {
  const queryClient = new QueryClient();

  return (
    <>
      <Toaster />
      <QueryClientProvider client={queryClient}>
        <UserProvider>
          <PlaidTokenProvider>
            <ThemeProvider>
              <LoginFormProvider>
                <Component {...pageProps} />
              </LoginFormProvider>
            </ThemeProvider>
          </PlaidTokenProvider>
        </UserProvider>
      </QueryClientProvider>
    </>
  );
}

export default MyApp;
