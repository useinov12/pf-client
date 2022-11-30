import React from 'react';
import clsx from 'clsx';
import { SiCircle } from 'react-icons/si';
import Image from 'next/image';
import { ThemeContext } from '@/context/ThemeProvider';
import Path from '../Path';


const ReviewsSection = () => {
  const { mode } = React.useContext(ThemeContext)
  return (
    <article
      className={clsx(
        'mx-auto px-3 mt-2',
        'sm:max-w-screen-sm ',
        'md:max-w-screen-lg ',
        'lg:max-w-screen-xl',
        'snap-start'
      )}
    >
      <section
        className='flex flex-col items-center justify-end '
      >
        <div className='flex flex-col lg:flex-row w-full gap-3 '>

          <div className='flex flex-col items-center justify-center lg:items-start'>
            <SiCircle className='mb-2 h-16 w-16 rounded-full' />
            <Path height={500} className='hidden lg:block rotate-180' /> 
          </div>

          <div className=''>

            <div className='flex flex-col items-center lg:items-start  w-full mb-10 lg:mb-3 '>
              <h2 className='cursor-default text-center tracking-tight text-2xl drop-shadow lg:text-left'>
                App that you looking for
              </h2>
              <h3 className='cursor-default text-center text-lg font-normal drop-shadow lg:text-left'>
                It was never this easy to look into your own financial state
              </h3>
            </div>

            <div className='flex h-max w-full items-center sm:items-start justify-center '>
              <ul className={clsx(
                'grid gap-x-1 gap-y-1 sm:grid-cols-2 md:grid-cols-3',
              )}>
                {reviews.map((review, i) =>
                  <li 
                    key={review.name} 
                    className={clsx(
                      'rounded flex-col items-center',
                      'py-2 px-2 border  h-40  md:h-48 w-full', 
                      mode === 'light' ? 'border-dark/50' : 'border-gray-400/50',
                      mode === 'light' ? 'bg-gray-400/50' : 'bg-gray-700/50',
                    )}>
                    <div className='flex items-baseline gap-1'>
                      <Image src={review.image} width={80} height={75}/>
                      <h3 className=''>{review.name}</h3>
                    </div>
                    <div className='md:mt-5'>
                      <span className='py-2 font-normal font-serif text-lg'>&quot;{review.review}&quot;</span>
                    </div>
                  </li>
                )}
              </ul>
            </div>
          </div>

        </div>
      </section>
    </article>
  );
};

export default ReviewsSection;


const reviews = [
  {
    name: 'Sophia',
    review: 'It is easy to use. I like it a lot!',
    image: '/images/portraits/1.png',
  },
  {
    name: 'James',
    review: 'Intuitive interface and beautiful design.',
    image: '/images/portraits/2.png',
  },
  {
    name: 'Noah',
    review: 'The app is fast and realy informative!',
    image: '/images/portraits/3.png',
  },
  {
    name: 'Emma',
    review: 'I love the product! Definitely going to use it!',
    image: '/images/portraits/4.png',
  },
  {
    name: 'Olivia',
    review: 'Realy great idea and nice implementation!',
    image: '/images/portraits/5.png',
  },
];