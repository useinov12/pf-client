import * as React from 'react';
import Header from './Header';
import Footer from './Footer';
import clsx from 'clsx';
import LoginFormProvider from '@/context/LoginFormProvider';
import { ThemeContext } from '@/context/ThemeProvider';


export default function Layout({ children }: { children: React.ReactNode }) {
  const { color, mode } = React.useContext(ThemeContext);
  const [isLoaded, setIsLoaded ] = React.useState(false) 


  React.useEffect(()=>{
    const timer = setTimeout(()=>{
      setIsLoaded(true)
    })
  },[])

  return (
    <LoginFormProvider>
      <div
        className={clsx(
          'w-screen',
          'overflow-x-hidden',
          mode === 'dark' ? 'text-gray-100' : 'text-gray-800',
          mode === 'dark' 
          ? 'bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gray-700 via-gray-900 to-black ' 
          : 'bg-[conic-gradient(at_top,_var(--tw-gradient-stops))] from-gray-700 via-gray-100 to-gray-700 ',
          color,
          isLoaded && 'fade-in-start'
        )}
      >
        <div data-fade='1'>
          <Header />
        </div>
        <div
          className='relative h-full w-full'
          data-fade='2'
        >
          {children}
        </div>
        <Footer />
      </div>
    </LoginFormProvider>
  );
}
