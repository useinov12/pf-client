import React from 'react';
import clsx from 'clsx';
import Card from '../cards/Card';
import Image from 'next/image';
import Button from '../../buttons/Button';

const ReviewsSection = () => {
  return (
    <>
      <article
        className='h-full w-screen bg-gradient-to-bl
              from-sky-400 to-blue-500 text-gray-800'
      >
        <section className='mx-auto max-w-screen-xl py-4'>
          <h1 className='mb-10 text-center text-5xl'>Reviews</h1>
          <ul className='flex flex-wrap items-baseline justify-center gap-5 md:justify-around'>
            {reviews.map(({ name, review, image }) => (
              <li
                className='flex flex-col items-center justify-center'
                key={name}
              >
                <Image src={image} width={120} height={110} />
                <h6 className='my-2 text-3xl font-bold'>{name}</h6>
                <p className='h-36 w-44 text-center text-lg font-semibold'>
                  {review}
                </p>
              </li>
            ))}
          </ul>
        </section>
      </article>
      <article className='mx-auto flex max-w-screen-xl justify-center'>
        <Card
          className={clsx(
            'my-28',
            'h-[24rem] w-5/6 lg:w-full',
            'mx-4 lg:mx-0',
            'overflow-hidden',
            'shadow-2xl',
            'ring-2 ring-white'
          )}
        >
          <div
            className='group relative h-full w-full
                md:bg-gradient-to-bl md:from-sky-400 md:to-blue-500'
          >
            <div
              className={clsx(
                'md:absolute md:h-1/2',
                'top-4 left-4 z-40 rounded-md bg-sky-500 px-2 py-1 shadow-lg',
                'md:bg-transparent md:shadow-none',
                'md:top-3 md:left-6 md:p-0'
              )}
            >
              <h1 className='text-4xl text-white drop-shadow lg:text-dark'>
                PersonalFinance
              </h1>
              <p className='text-2xl font-bold tracking-tight text-gray-50 drop-shadow'>
                Try and get sence of <br />
                financial clarity today.
              </p>
            </div>
            <div
              className={clsx(
                'flex h-full w-3/4 flex-col px-6 py-3',
                `bg-[url('../../public/images/banner.png')] bg-cover`,
                'float-right',
                'rounded-tl-[10rem]',
                'flex justify-end',
                'group-hover:blur-sm',
                'transition-all duration-100'
              )}
            ></div>
            <div className='absolute bottom-3 right-3 inline-flex h-1/2 items-center gap-5 self-end sm:right-5'>
              <Button className='px-6 py-1 text-2xl'>Try Demo</Button>
              <Button className='px-6 py-1 text-2xl'>Sign Up</Button>
            </div>
          </div>
        </Card>
      </article>
    </>
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
