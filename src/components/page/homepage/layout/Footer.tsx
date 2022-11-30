import React from 'react';
import clsx from 'clsx';
import UnderlineLink from '@/components/links/UnderlineLink';
import { ThemeContext } from '@/context/ThemeProvider';

const Footer = () => {
  const {
    // color,
    mode,
  } = React.useContext(ThemeContext);
  return (
    <footer
      className={clsx(
        mode === 'dark' ? 'text-white' : 'text-black',
        'bottom-2 z-50',
        'py-2 border-t ',
        'w-screen',
        mode === 'dark' ? 'border-gray-50' : 'border-dark'
      )}
    >
        <article className={clsx(
          'max-w-screen-md lg:max-w-screen-xl lg-px-4 mx-auto',
          'flex flex-col sm:flex-row justify-center items-start',
          'sm:justify-between'
        )}>
          {/* <section className='my-5 flex flex-col gap-y-10'>
            <h2 className='text-2xl text-center sm:text-start'>Get in touch</h2>
            <form className='flex flex-col mb-8 items-center sm:items-start'>
              <input type='email' placeholder='me@email.com' className='rounded my-1 px-1 py-1 text-sm w-44 text-dark'/>
              <textarea placeholder='Your message' className='rounded my-1 px-1 py-1 text-sm w-56 text-dark'/>
            </form>
          </section> */}

          <section className='my-5 flex flex-col'>
            <h2 className='text-2xl text-center sm:text-start'>PersonalFinance</h2>
            <h3 className=' my-2 text-2xl text-center sm:text-start'>Contacts</h3>
            <ul className=' text-xl text-center sm:text-start'>
              <li className='my-2 text-md'>
                <p>email: xxxxx@company.com</p>
              </li>
              <li className='my-2 text-md'>
                <p>phone: +1 xxx-xxx-xxxx</p>
              </li>
              <li className='my-2 text-md'>
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
  )
};

export default Footer;

