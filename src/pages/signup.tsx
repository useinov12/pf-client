import React, { useContext } from 'react';
import clsx from 'clsx';
import { ThemeContext } from '@/context/ThemeProvider';
import { SignInForm } from '@/components/signin/Form';

export default function SignUpPage() {
  const { mode } = useContext(ThemeContext);

  return (
    <div
      className={clsx(
        'h-screen w-screen',
        'transition-all delay-75 duration-150',
        mode === 'light'
          ? 'bg-gradient-to-bl from-gray-200 via-gray-400 to-white'
          : 'bg-gradient-to-bl from-gray-700 via-gray-900 to-black ',
        'flex flex-col items-center justify-center'
      )}
    >
      <SignInForm />
    </div>
  );
}
