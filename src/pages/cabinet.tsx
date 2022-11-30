import React from 'react';
import clsx from 'clsx';
import { ThemeContext } from '@/context/ThemeProvider';
import Button from '@/components/buttons/Button';
import LaunchLink from '@/components/plaid/LaunchLink';
import { PlaidLinkProvider, usePlaid } from '@/services/plaid';
import ThemeButton from '@/components/homepage/ThemeButton';
import { useUser } from '@/services/user';
import Logo from '@/components/Logo';

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

  const [isLoaded, setIsLoaded] = React.useState(false);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  // handleLogout
  // const { linkToken, generateLinkToken } = usePlaid();

  return (
    <div
      className={clsx(
        'h-screen w-screen',
        'overflow-hidden',
        mode === 'dark' ? 'text-gray-100' : 'text-gray-800',
        mode === 'dark'
          ? 'bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gray-700 via-gray-900 to-black '
          : 'bg-[conic-gradient(at_top,_var(--tw-gradient-stops))] from-gray-700 via-gray-100 to-gray-700 '
      )}
    >
      <div
        className={clsx(
          'mx-auto px-3 sm:max-w-screen-sm',
          'md:max-w-screen-lg ',
          'lg:max-w-screen-xl',
          'h-full w-full',
          isLoaded && 'fade-in-start'
        )}
      >
        <Navbar />
        <main
          className='flex h-5/6 w-full flex-col gap-3 md:flex-row'
          data-fade='2'
        >
          <UserSection />
          <SettingsSection />
        </main>
      </div>
    </div>
  );
};

const Navbar = () => {
  return (
    <nav
      className='flex items-center justify-between py-3'
      data-fade='1'
    >
      <Logo />
      <div className='flex items-center gap-2'>
        <Button className='text-md py-1' variant='theme-dependent'>
          Logout
        </Button>
        <ThemeButton />
      </div>
    </nav>
  );
};

const UserSection = () => {
  const { mode } = React.useContext(ThemeContext);
  const { user } = useUser();

  return (
    <MenuSection className='md:w-2/6 lg:w-1/5 '>
      <header
        className={clsx(
          'w-full',
          'flex items-center justify-between px-7 py-4',
          mode === 'light' ? 'bg-gray-300/70' : 'bg-gray-900/70'
        )}
      >
        <h4 className=''>Account</h4>
      </header>

      <section
        className={clsx(
          'px-7',
          'flex items-center justify-around',
          'md:flex-col md:justify-start md:items-start'
        )}
      >
        <div className='my-3 flex flex-col items-start justify-start'>
          <h1
            className={clsx(
              'my-3 flex h-12 w-14',
              'items-center justify-center rounded-xl',
              'text-5xl ring-4 ring-primary-500',
              'drop-shadow'
            )}
          >
            {user && `${user.firstName[0]}`}
          </h1>
          <h4 className=''>{user && `${user.firstName} ${user.lastName}`}</h4>
          <p className='mb-5'>{user && `${user.username}`}</p>
        </div>
        <div>
          <Button
            className={clsx(
              'flex items-center justify-center',
              'my-1 w-36 py-1',
              'text-sm'
            )}
          >
            Change Name
          </Button>
          <Button
            variant='red'
            className={clsx(
              'flex items-center justify-center',
              'my-1 w-36 py-1 ',
              'text-sm'
            )}
          >
            Delete account
          </Button>
        </div>
      </section>
    </MenuSection>
  );
};

const SettingsSection = () => {
  const { mode, setMode } = React.useContext(ThemeContext);

  const { linkToken, generateLinkToken } = usePlaid();
  return (
    <MenuSection className='relative md:w-4/6 lg:w-4/5 h-full'>
      <header
        className={clsx(
          'flex items-center justify-between px-7 py-4',
          mode === 'light' ? 'bg-gray-300/70' : 'bg-gray-900/70'
        )}
      >
        <h4 className=''>Connected Banks</h4>
        <Button
          variant='green'
          className='w-24 whitespace-nowrap py-1 text-sm'
          onClick={generateLinkToken}
        >
          Add bank
        </Button>
        {linkToken && <LaunchLink token={linkToken} />}
      </header>

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
            <div className='flex gap-2'>
              <Button
                isDarkBg={mode === 'dark' && true}
                variant='light'
                className='flex w-24 items-center justify-center whitespace-nowrap py-1 text-sm'
              >
                Configure
              </Button>
              <Button
                isDarkBg={mode === 'dark' && true}
                variant='red'
                className='flex w-24 items-center justify-center py-1 text-sm'
              >
                Remove
              </Button>
            </div>
          </li>
        ))}
      </ul>
    </MenuSection>
  );
};

const MenuSection = ({
  className,
  children,
}: {
  className?: string;
  children: JSX.Element | JSX.Element[];
}) => {
  const { mode } = React.useContext(ThemeContext);

  return (
    <div
      className={clsx(
        'rounded-md border md:h-full',
        mode === 'light' ? 'border-gray-100/50' : 'border-gray-300/20',
        mode === 'light' ? 'bg-dark/10' : 'bg-gray-300/10',
        'overflow-hidden drop-shadow',
        className
      )}
    >
      {children}
    </div>
  );
};
