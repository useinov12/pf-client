import React from 'react';
import Image from 'next/image';

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
