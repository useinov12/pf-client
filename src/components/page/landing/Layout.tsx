import clsx from 'clsx';
import { ThemeContext } from '@/context/ThemeProvider';
import { useEffect, useState, useContext, ReactNode } from 'react';
import Link from 'next/link';
import Button from '@/components/buttons/Button';
import { LoginFormContext } from '@/context/LoginFormProvider';
import { useAuth } from '@/services/auth/queries';
import ThemeButton from '../../shared/ThemeSwitch';
import UnderlineLink from '@/components/links/UnderlineLink';
import LayoutCommon from '@/components/shared/LayoutCommon';

export default function Layout({ children }: { children: ReactNode }) {
  const [isLoaded, setIsLoaded] = useState(false);

  /* little delay before start page fade-in */
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <LayoutCommon isLoaded={isLoaded}>
      <Navbar />
      <main className='relative' data-fade='2'>
        {children}
      </main>
      <Footer />
    </LayoutCommon>
  );
}

const Navbar = () => {
  const { data: user } = useAuth();

  return (
    <div
      className={clsx(
        'mx-auto px-8 sm:max-w-screen-sm',
        'md:max-w-screen-xl ',
        'lg:max-w-screen-2xl',
        'h-full w-full'
      )}
    >
      <nav className='py-3' data-fade='1'>
        <ul className='flex items-center justify-between'>
          <div/>
          <ul className='inline-flex items-center gap-2'>
            <li>{user ? <CabinetLink /> : <LoginButton />}</li>
            <li>
              <ThemeButton />
            </li>
          </ul>
        </ul>
      </nav>
    </div>
  );
};

const CabinetLink = () => {
  return (
    <Link href='/cabinet'>
      <Button variant='transparent' className='text-md py-1'>
        Cabinet
      </Button>
    </Link>
  );
};

const LoginButton = () => {
  const { handleOpenLoginForm } = useContext(LoginFormContext);
  return (
    <Button
      className='py-1'
      variant='transparent'
      onClick={handleOpenLoginForm}
    >
      Sign In
    </Button>
  );
};

const Footer = () => {
  const {
    // color,
    mode,
  } = useContext(ThemeContext);
  return (
    <footer
      className={clsx(
        mode === 'dark' ? 'text-white' : 'text-black',
        'bottom-2 z-50',
        'border-t py-2 ',
        'w-screen',
        mode === 'dark' ? 'border-gray-50' : 'border-dark'
      )}
    >
      <article
        className={clsx(
          'lg-px-4 mx-auto max-w-screen-md lg:max-w-screen-xl',
          'flex flex-col items-start justify-center sm:flex-row',
          'sm:justify-between'
        )}
      >
        {/* <section className='my-5 flex flex-col gap-y-10'>
            <h2 className='text-2xl text-center sm:text-start'>Get in touch</h2>
            <form className='flex flex-col mb-8 items-center sm:items-start'>
              <input type='email' placeholder='me@email.com' className='rounded my-1 px-1 py-1 text-sm w-44 text-dark'/>
              <textarea placeholder='Your message' className='rounded my-1 px-1 py-1 text-sm w-56 text-dark'/>
            </form>
          </section> */}

        <section className='my-5 flex flex-col'>
          <h2 className='text-center text-2xl sm:text-start'>
            PersonalFinance
          </h2>
          <h3 className=' my-2 text-center text-2xl sm:text-start'>Contacts</h3>
          <ul className=' text-center text-xl sm:text-start'>
            <li className='text-md my-2'>
              <p>email: xxxxx@company.com</p>
            </li>
            <li className='text-md my-2'>
              <p>phone: +1 xxx-xxx-xxxx</p>
            </li>
            <li className='text-md my-2'>
              <p>address: xxxxx Street, xxxxx City, XXXX</p>
            </li>
          </ul>
        </section>
      </article>

      <section className='text-center'>
        © {new Date().getFullYear()} {''}
        <UnderlineLink href='/' className='pl-1'>
          PersonalFinance
        </UnderlineLink>
      </section>
    </footer>
  );
};
