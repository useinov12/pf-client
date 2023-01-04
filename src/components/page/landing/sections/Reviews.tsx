import { ReactNode } from 'react';
import clsx from 'clsx';
import Image from 'next/image';
import { useTheme } from '@/context/ThemeProvider';
import { FaQuoteRight } from 'react-icons/fa';
import { SiCircle } from 'react-icons/si';
import Polkadot from '../../../shared/Polkadot';

export default function ReviewsSection() {
  return (
    <Container className='flex flex-col items-center justify-end gap-6'>
      <Header />
      <ReviewList />
    </Container>
  );
}

interface SectionWrapperProps {
  className?: string;
  children?: ReactNode;
}

const Container = ({ children, className }: SectionWrapperProps) => {
  return (
    <section
      className={clsx(
        'mx-auto mt-20 px-3 md:mt-0',
        'sm:max-w-screen-sm ',
        'md:max-w-screen-lg ',
        'lg:max-w-screen-xl',
        className
      )}
    >
      {children}
    </section>
  );
};

const Header = () => {
  return (
    <div className='flex w-full flex-col items-center gap-3 lg:flex-row'>
      <SiCircle className=' h-16 w-16 rounded-full' />
      <div className=''>
        <div className='mb-10 flex w-full flex-col  items-center lg:mb-3 lg:items-start '>
          <h2 className='cursor-default text-center text-2xl tracking-tight drop-shadow lg:text-left'>
            App that you looking for
          </h2>
          <h3 className='cursor-default text-center text-lg font-normal drop-shadow lg:text-left'>
            It was never this easy to look into your own financial state
          </h3>
        </div>
      </div>
    </div>
  );
};

const ReviewList = () => {
  return (
    <div className='flex h-max w-full items-center justify-center sm:items-start'>
      <ul className='grid gap-2 md:grid-cols-2  lg:grid-cols-3'>
        {reviews.map((review, i) => (
          <Review review={review} key={review.name} />
        ))}
      </ul>
    </div>
  );
};

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
        'h-36 w-full border  px-2 ',
        mode === 'light' ? 'border-dark/50' : 'border-gray-400/50',
        mode === 'light' ? 'bg-gray-400/50' : 'bg-gray-700/50'
      )}
    >
      <Polkadot className='absolute top-0 z-0 -translate-x-52' />
      <FaQuoteRight className='absolute top-2 right-6 text-2xl opacity-70' />

      <div className='flex h-full w-full gap-4'>
        <div className='my-2 w-2/5'>
          <Image src={review.image} width={120} height={110} />
        </div>

        <div className='relative flex w-3/5 flex-col items-center justify-start pt-10'>
          <span className='text-md font-semibold tracking-tight'>
            {review.review}
          </span>
          <h6 className='absolute bottom-1 right-2 text-right font-serif text-xl'>
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
    review: 'Intuitive to use and beautiful design.',
    image: '/images/portraits/2.png',
  },
  {
    name: 'Noah',
    review: 'The app is realy helpful!',
    image: '/images/portraits/3.png',
  },
  {
    name: 'Emma',
    review: 'Definitely going to use it!',
    image: '/images/portraits/4.png',
  },
  {
    name: 'Olivia',
    review: 'Great idea and nice implementation!',
    image: '/images/portraits/5.png',
  },
];
