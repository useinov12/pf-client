import React from 'react';
import clsx from 'clsx';
import { BsArrowDown } from 'react-icons/bs';
import Image from 'next/image';

const ExpirienceSection = () => {
  return (
    <article className={clsx(
      'mx-auto',
      'sm:max-w-screen-sm px-3',
      'md:max-w-screen-md ',
      'lg:max-w-screen-lg',
      'xl:max-w-screen-xl'
    )}>
      <header className='mb-20 flex justify-center gap-5 sm:mb-36'>
        <h1
          className='text-3xl font-extrabold uppercase
              tracking-tight sm:text-4xl md:text-5xl lg:text-6xl'
        >
          Smooth expirience
        </h1>
      </header>

      <section className='mb-32 flex flex-col justify-around sm:flex-row'>
        <div className='flex flex-col items-center sm:translate-y-40'>
          <Image src={'/images/easy-to-setup.png'} width={150} height={147} />
          <h3 className='text-center font-mono font-medium tracking-tighter'>
            Easy to set up
          </h3>
          <p className='mb-5 text-center text-lg font-light'>
            We made the app intuitive
          </p>
        </div>

        <div className='flex flex-col items-center'>
          <Image
            src={'/images/safety-with-plaid.png'}
            width={150}
            height={147}
          />
          <h3 className='mb-2 text-center font-mono font-medium tracking-tight'>
            Safety with Plaid
          </h3>
          <p className='mb-5 text-center text-lg font-light'>
            Plaid is the best <br />
            bank-data provider on the market
          </p>
        </div>

        <div className='flex flex-col items-center sm:translate-y-40'>
          <Image src={'/images/fast-data-loads.png'} width={150} height={147} />
          <h3 className='mb-2 text-center font-mono font-medium tracking-tight'>
            Fast Data loadss
          </h3>
          <p className='mb-5 text-center text-lg font-light'>
            Upload fresh transactions <br />
            data on login
          </p>
        </div>
      </section>

      <a className='group mb-28 flex cursor-pointer flex-col items-center sm:mb-56' href='#instruction'>
        <h1
          className={clsx(
            'mb-8 text-center',
            'transition-colors duration-150',
            'group-hover:text-primary-500 '
          )}
        >
          How it Works?
        </h1>
        <BsArrowDown
          className={clsx(
            'animate-bounce text-center text-5xl',
            'transition-colors duration-150',
            'group-hover:text-primary-500'
          )}
        />
      </a>
    </article>
  );
};

export default ExpirienceSection;
