import React from 'react';
import UnderlineLink from '@/components/links/UnderlineLink';
import { ThemeContext } from '@/context/ThemeProvider';
import clsx from 'clsx';

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
        'py-2 border-t border-primary-100',
        'w-screen'
      )}
    >
      <article className='max-w-screen-xl mx-auto flex justify-between w-full'>
        <section className='my-5'>
          <h2 >Get in touch</h2>
          <form className='flex flex-col mb-8'>
            <input type='email' placeholder='me@email.com' className='rounded my-1 px-1 py-1 text-sm w-44 text-dark'/>
            <textarea placeholder='Your message' className='rounded my-1 px-1 py-1 text-sm w-56 text-dark'/>
          </form>
          <h6 className='justify-self-end'>Got any feedback?</h6>
        </section>

        <section className='my-5'>
          <h2>PersonalFinance</h2>
          <h3 className=' my-2 mb-5'>Contacts</h3>
          <ul className='my-5'>
            <li className='my-2 text-md'>
              <p>Email: xxxxx@company.com</p>
            </li>
            <li className='my-2 text-md'>
              <p>Phone: +1 xxx-xxx-xxxx</p>
            </li>
            <li className='my-2 text-md'>
              <p>Address: xxxxx Street, xxxxx City, XX, 0000</p>
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

export default Footer;

