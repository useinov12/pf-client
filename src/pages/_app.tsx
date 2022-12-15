import React from 'react';
import { NextPage } from 'next';
import { AppProps } from 'next/app';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from '@/services/user/AuthProvider';
import { AuthGuard } from '@/services/user/AuthGuard';
import ThemeProvider from '@/context/ThemeProvider';
import { QueryClient, QueryClientProvider } from 'react-query';
import {LoginFormProvider } from '@/context/LoginFormProvider';



const queryClient = new QueryClient();

export type NextApplicationPage<P = any, IP = P> = NextPage<P, IP> & {
  requireAuth?: boolean;
};

import '@/styles/globals.css';

function MyApp(props: AppProps) {
  const {
    Component,
    pageProps,
  }: { Component: NextApplicationPage; pageProps: any } = props as AppProps;

  return (
    <>
      <Toaster />
      <ThemeProvider>
        <QueryClientProvider client={queryClient}>
          <AuthProvider>
            {/* if requireAuth property is present - protect the page */}
            {Component.requireAuth ? (
              <AuthGuard>
                <Component {...pageProps} />
              </AuthGuard>
            ) : (
              // public page
              <LoginFormProvider>
                <Component {...pageProps} />
              </LoginFormProvider>
            )}
          </AuthProvider>
        </QueryClientProvider>
      </ThemeProvider>
    </>
  );
}

export default MyApp;
