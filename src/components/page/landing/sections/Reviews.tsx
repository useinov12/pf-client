import React from 'react';
import clsx from 'clsx';
import Image from 'next/image';
import { useTheme } from '@/context/ThemeProvider';
import Path from '../Path';
import { FaQuoteLeft, FaQuoteRight } from 'react-icons/fa';
import { SiCircle } from 'react-icons/si';
import Polkadot from '../shared/Polkadot';

export default function ReviewsSection() {
  return (
    <article
      className={clsx(
        'mx-auto mt-2 px-3',
        'sm:max-w-screen-sm ',
        'md:max-w-screen-lg ',
        'lg:max-w-screen-xl',
      )}
    >
      <section className='flex flex-col items-center justify-end '>
        <div className='flex w-full flex-col gap-3 lg:flex-row '>
          <div className='flex flex-col items-center justify-center lg:items-start'>
            <SiCircle className='mb-2 h-16 w-16 rounded-full' />
            <Path height={500} className='hidden rotate-180 lg:block' />
          </div>

          <div className=''>
            <div className='mb-10 flex w-full flex-col  items-center lg:mb-3 lg:items-start '>
              <h2 className='cursor-default text-center text-2xl tracking-tight drop-shadow lg:text-left'>
                App that you looking for
              </h2>
              <h3 className='cursor-default text-center text-lg font-normal drop-shadow lg:text-left'>
                It was never this easy to look into your own financial state
              </h3>
            </div>

            <div className='flex h-max w-full items-center justify-center sm:items-start '>
              <ul
                className={clsx(
                  'grid gap-x-1 gap-y-1 sm:grid-cols-2 md:grid-cols-3'
                )}
              >
                {reviews.map((review, i) => (
                  <Review review={review} key={review.name} />
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </article>
  );
}

interface ReviewProps {
  review: {
    name: string;
    review: string;
    image: string;
  };
}

const Review = ({ review }: ReviewProps) => {
  const { mode } = useTheme();
  return (
    <li
      className={clsx(
        'relative overflow-hidden',
        'flex items-center justify-center rounded',
        'h-40 w-full border  py-2  px-2 md:h-48',
        mode === 'light' ? 'border-dark/50' : 'border-gray-400/50',
        mode === 'light' ? 'bg-gray-400/50' : 'bg-gray-700/50'
      )}
    >
      <Polkadot className='absolute top-0 z-0 -translate-x-52' />
      <FaQuoteLeft className='absolute bottom-8 left-32 text-xl' />
      <FaQuoteRight className='opacity-98 absolute top-8 right-6 text-xl' />

      <div className='flex gap-4'>
        <div className='w-1/3 '>
          <Image src={review.image} width={120} height={110} className='' />
        </div>

        <div className='w-2/3 shrink md:mt-5'>
          <span className='py-2 font-serif text-lg'>{review.review}</span>
          <h6 className='w-full px-8 text-right font-semibold'>
            {review.name}
          </h6>
        </div>
      </div>
    </li>
  );
};

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
