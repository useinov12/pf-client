import React from 'react';
import clsx from 'clsx';
import Image from 'next/image';
import { ThemeContext } from '@/context/ThemeProvider';
import Button from '@/components/buttons/Button';
import { FaMoon, FaSun } from 'react-icons/fa';
import Link from 'next/link';
import { UserContext } from '@/context/UserProvider';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';

export default function CabinetPage() {
  const { mode, setMode } = React.useContext(ThemeContext);
  const { user, setUser } = React.useContext(UserContext);
  const router = useRouter()

  async function handleLogout() {
    Cookies.remove('token');
    setUser(null);
  }

  React.useEffect(()=>{
    if(!user){
      router.push('/')
    }
  }, [user])

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
          'mx-auto sm:max-w-screen-sm px-3',
          'md:max-w-screen-md ',
          'lg:max-w-screen-xl',
          'h-full w-full'
        )}
      >
        <header className='flex items-center justify-between py-3'>
          <Link href='/'>
            <Image src={'/images/logo.png'} width={70} height={64} className='cursor-pointer' />
          </Link>

          <div className='flex gap-2 items-center'>
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
        <main className='flex flex-col md:flex-row w-full h-5/6 gap-3'>

          <section className={clsx(
            'md:w-1/4 md:h-full  lg:px-7 py-7 border rounded-md',
            'flex justify-around md:flex-col  md:justify-start items-center',
            mode === 'light' ? 'border-dark/50' : 'border-gray-500/50',
            'drop-shadow'
          )}>
              <div className='flex flex-col justify-center items-center'>
                <figure className='mb-3 w-16 h-16 rounded-full ring-4 ring-primary-300 '/>
                <h4 className='mb-5'>John Doe</h4>
              </div>
              <div>
                <Button className={clsx(
                  'flex justify-center items-center py-1  my-1 text-sm',
                  'w-36'
                )}>Change Name</Button>
                <Button variant='red' className={clsx(
                  'flex justify-center items-center py-1  my-1 text-sm',
                  'w-36'
                )}>Delete account</Button>
              </div>
          </section>


          <section className={clsx(
            'md:w-4/5 h-full border rounded overflow-hidden',
            mode === 'light' ? 'border-dark/50' : 'border-gray-500/50',
            'relative'
          )}>
            <div className={clsx(
              'flex items-center justify-between px-7 py-4',
              mode === 'light' ? 'bg-gray-300' : 'bg-gray-900',
            )}>
              <h4 className=''>Connected Banks</h4>
              <div className='inline-flex gap-2'>
                <Button variant='light' className='w-32 py-1 px-8 text-sm whitespace-nowrap'>Open App</Button>
                <Button variant='green' className='w-32 py-1 px-8 text-sm'>Add new</Button>
              </div>
            </div>
            <ul className='scroll-y overflow-y-scroll h-full'>
              {['A', 'B', 'C', 'D','A','A', 'B', 'C', 'D','A','A', 'B', 'C', 'D','A',].map((bank, i) =>
                <li key={'cabinet-bank'+i} className={clsx(
                  'flex justify-between items-center px-7 py-3',
                  'border-b border-gray-500/50 mb-4'
                )}>
                  <h5 className='font-semibold'> Bank #{bank}</h5>
                  <Button isDarkBg={mode === 'dark' && true} variant='red-outline' className='w-32 px-8 py-1 text-sm'>Remove</Button>
                </li>
              )}
            </ul>
          </section>
        </main>
      </div>
    </div>
  );
}
