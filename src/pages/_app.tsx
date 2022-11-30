import React from 'react';
import { NextPage } from 'next';
import { AppProps } from 'next/app';
import { Toaster } from 'react-hot-toast';
import {  UserProvider, AuthGuard } from '@/services/user';
import ThemeProvider from '@/context/ThemeProvider';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';


export type NextApplicationPage<P = any, IP = P> = NextPage<P, IP> & {
  requireAuth?: boolean;
};

import '@/styles/globals.css';

function MyApp(props: AppProps) {
  const {
    Component,
    pageProps,
  }: { Component: NextApplicationPage; pageProps: any } = props as AppProps;

  const queryClient = new QueryClient() 
  return (
    <>
      <Toaster />
      <ThemeProvider>
      {/* <QueryClientProvider client={queryClient}> */}
        <UserProvider>
          {/* if requireAuth property is present - protect the page */}
          {Component.requireAuth ? (
            <AuthGuard>
              <Component {...pageProps} />
            </AuthGuard>
          ) : (
            // public page
            <Component {...pageProps} />
          )}
        </UserProvider>
        {/* </QueryClientProvider> */}
      </ThemeProvider>
    </>
  );
}

export default MyApp;
