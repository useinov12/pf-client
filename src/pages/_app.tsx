import { AppProps } from 'next/app';
import ThemeProvider from '@/context/ThemeProvider';
import UserProvider from '@/context/UserProvider';
import LoginFormProvider from '@/context/LoginFormProvider';

import '@/styles/globals.css';
// !STARTERCONF This is for demo purposes, remove @/styles/colors.css import immediately
import '@/styles/colors.css';

/**
 * !STARTERCONF info
 * ? `Layout` component is called in every page using `np` snippets. If you have consistent layout across all page, you can add it here too
 */

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider>
      <UserProvider>
        <LoginFormProvider>
          <Component {...pageProps} />
        </LoginFormProvider>
      </UserProvider>
    </ThemeProvider>
  );
}

export default MyApp;
