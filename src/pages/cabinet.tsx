import React from 'react';
import clsx from 'clsx';
import Image from 'next/image';
import { ThemeContext } from '@/context/ThemeProvider';
import Button from '@/components/buttons/Button';
import { FaMoon, FaSun } from 'react-icons/fa';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Loading from '@/components/Loading';
import { UserContext, useUser } from '@/services/user';
import { LoginFormContext } from '@/context/LoginFormProvider';

export default function CabinetPage() {
  const {setOpenLoginForm} = React.useContext(LoginFormContext)
  const router = useRouter();
  const { user, isLoading } = useUser();

  if(isLoading){
    return <Loading/>
  }

  if(!user){
    setOpenLoginForm(true)
    router.push('/')
    return <Loading/>
  }

  return <Cabinet/>

}


const Cabinet = () => {
  const router = useRouter();
  const { mode, setMode } = React.useContext(ThemeContext);
  const {handleLogout} = React.useContext(UserContext)
  return (
    <div
      className={clsx(
        'h-screen w-screen',
        'overflow-hidden',
        mode === 'dark' ? 'bg-dark text-gray-100' : 'bg-gray-200 text-gray-800'
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
              variant={mode === 'dark' ? 'light' : 'dark'}
              onClick={handleLogout}
            >
              Logout
            </Button>
            <Button
              className='py-2'
              variant={mode === 'dark' ? 'light' : 'dark'}
              onClick={() => {
                setMode(mode === 'light' ? 'dark' : 'light');
              }}
            >
              {mode === 'light' ? <FaMoon /> : <FaSun />}
            </Button>
          </div>
        </header>
        <main className='flex h-5/6 w-full flex-col gap-3 md:flex-row'>
          <section
            className={clsx(
              'rounded-md border  py-7 md:h-full md:w-1/4 lg:px-7',
              'flex items-center justify-around  md:flex-col md:justify-start',
              mode === 'light' ? 'border-dark/50' : 'border-gray-500/50',
              'drop-shadow'
            )}
          >
            <div className='flex flex-col items-center justify-center'>
              <figure className='mb-3 h-16 w-16 rounded-full ring-4 ring-primary-300 ' />
              <h4 className='mb-5'>John Doe</h4>
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

          <section
            className={clsx(
              'h-full overflow-hidden rounded border md:w-4/5',
              mode === 'light' ? 'border-dark/50' : 'border-gray-500/50',
              'relative'
            )}
          >
            <div
              className={clsx(
                'flex items-center justify-between px-7 py-4',
                mode === 'light' ? 'bg-gray-300' : 'bg-gray-900'
              )}
            >
              <h4 className=''>Connected Banks</h4>
              <div className='inline-flex gap-2'>
                {/* <Button variant='light' className='w-32 py-1 px-8 text-sm whitespace-nowrap'>Open App</Button> */}
                {/* <Button variant='green' className='w-32 py-1 px-8 text-sm'>Add new</Button> */}
                {/* <PlaidLink /> */}
              </div>
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
        </main>
      </div>
    </div>
  );
};
