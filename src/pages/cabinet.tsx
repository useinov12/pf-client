import React from 'react';
import clsx from 'clsx';
import Image from 'next/image';
import { ThemeContext } from '@/context/ThemeProvider';
import Button from '@/components/buttons/Button';
import Link from 'next/link';
import { useRouter } from 'next/router';
import LaunchLink from '@/components/plaid/LaunchLink';
import { PlaidLinkProvider, usePlaid } from '@/services/plaid';
import ThemeButton from '@/components/homepage/ThemeButton';

export default function CabinetPage() {
  return (
    <PlaidLinkProvider>
      <Cabinet />
    </PlaidLinkProvider>
  );
}
CabinetPage.requireAuth = true;





const Cabinet = () => {
  const { mode } = React.useContext(ThemeContext);
  // const { handleLogout } = React.useContext(UserContext);

  // const { linkToken, generateLinkToken } = usePlaid();

  return (
    <div
      className={clsx(
        'h-screen w-screen',
        'overflow-hidden',
        // mode === 'dark' ? 'bg-dark text-gray-100' : 'bg-gray-200 text-gray-800',
        mode === 'dark' ? 'text-gray-100' : 'text-gray-800',
        mode === 'dark'
          ? 'bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gray-700 via-gray-900 to-black '
          : 'bg-[conic-gradient(at_top,_var(--tw-gradient-stops))] from-gray-700 via-gray-100 to-gray-700 '
      )}
    >
      <div
        className={clsx(
          'mx-auto px-3 sm:max-w-screen-sm',
          'md:max-w-screen-md ',
          'lg:max-w-screen-xl',
          'h-full w-full'
        )}
      >
        <Navbar />
        <main className='flex h-5/6 w-full flex-col gap-3 md:flex-row'>
          <UserSection />
          <SettingsSection />
        </main>
      </div>
    </div>
  );
};

const Navbar = () => {
  const router = useRouter();
  // const { handleLogout } = React.useContext(UserContext);

  return (
    <header className='flex items-center justify-between py-3'>
      <Link href='/'>
        <Image
          src={'/images/logo.png'}
          width={70}
          height={64}
          className='cursor-pointer'
        />
      </Link>

      <div className='flex items-center gap-2'>
        <Button
          className='text-md py-1'
          variant='theme-dependent'
        >
          Logout
        </Button>
        <ThemeButton/>
      </div>
    </header>
  );
};

const UserSection = () => {
  const { mode } = React.useContext(ThemeContext);
  // const { user, handleLogout } = React.useContext(UserContext);
  // const {data, isLoading, isSuccess} = useQueryUser()

  return (
    <section
      className={clsx(
        'rounded-md border  py-7 md:h-full md:w-1/4 lg:px-7',
        'flex items-center justify-around  md:flex-col md:justify-start',
        mode === 'light' ? 'border-gray-100/50' : 'border-gray-300/20',
        mode === 'light' ? 'bg-dark/10' : 'bg-gray-300/10',
        'drop-shadow'
      )}
    >
      <div className='flex flex-col items-center justify-center'>
        <figure className='mb-3 h-16 w-16 rounded-full ring-4 ring-primary-300 ' />
        <h4 className='mb-5'>
          {/* {user && `${user.firstName} ${user.lastName}`} */}
        </h4>
      </div>
      <div>
        <Button
          className={clsx(
            'my-1 flex items-center justify-center  py-1 text-sm',
            'w-36'
          )}
        >
          Change Name
        </Button>
        <Button
          variant='red'
          className={clsx(
            'my-1 flex items-center justify-center  py-1 text-sm',
            'w-36'
          )}
        >
          Delete account
        </Button>
      </div>
    </section>
  );
};

const SettingsSection = () => {
  const { mode, setMode } = React.useContext(ThemeContext);
  // const { handleLogout } = React.useContext(UserContext);

  const { linkToken, generateLinkToken } = usePlaid();
  return (
    <section
      className={clsx(
        'h-full overflow-hidden rounded border md:w-4/5',
        mode === 'light' ? 'border-gray-100/50' : 'border-gray-300/20',
        mode === 'light' ? 'bg-dark/20' : 'bg-gray-300/10',
        'relative'
      )}
    >
      <div
        className={clsx(
          'flex items-center justify-between px-7 py-4',
          mode === 'light' ? 'bg-gray-300/70' : 'bg-gray-900/70'
        )}
      >
        <h4 className=''>Connected Bank</h4>
        <Button
          variant='green'
          className='w-32 whitespace-nowrap px-8 py-1 text-sm'
          onClick={generateLinkToken}
        >
          Add bank
        </Button>
        {linkToken && <LaunchLink token={linkToken} />}
      </div>

      <ul className='scroll-y h-full overflow-y-scroll'>
        {['A', 'B', 'C', 'D'].map((bank, i) => (
          <li
            key={'cabinet-bank' + i}
            className={clsx(
              'flex items-center justify-between px-7 py-3',
              'mb-4 border-b border-gray-500/50'
            )}
          >
            <h5 className='font-semibold'> Bank #{bank}</h5>
            <Button
              isDarkBg={mode === 'dark' && true}
              variant='red-outline'
              className='w-32 px-8 py-1 text-sm'
            >
              Remove
            </Button>
          </li>
        ))}
      </ul>
    </section>
  );
};
