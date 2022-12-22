import clsx from 'clsx';
import Layout from '@/components/page/app/Layout';
// import { useAppPageContext } from '@/context/AppPageContext';
import { useTheme } from '@/context/ThemeProvider';
import React, {
  ReactNode,
  useRef,
  RefObject,
  forwardRef,
  ForwardedRef,
  createRef,
  useEffect,
  ReactElement,
  useState,
} from 'react';
import {
  BsFillArrowLeftCircleFill,
  BsFillArrowRightCircleFill,
} from 'react-icons/bs';

import { data } from '@/components/page/cabinet/sections/sampleData';

export default function OverviewPage() {
  const banks = Object.keys(data);

  return (
    <Layout className='flex flex-col justify-between'>
      <div className='flex justify-between'>
        <InfoSection />
        <ChartGroup />
      </div>
      <Carousel>
        {banks.map((bank, i) => (
          <li key={bank}>
            <CarouselItem width='256'>
              <BankCard />
            </CarouselItem>
          </li>
        ))}
      </Carousel>
    </Layout>
  );
}

const ChartGroup = () => {
  return (
    <div className=' h-64 bg-red-500'>
      {/* ...charts */}
      <div className='inline-flex items-center gap-4'>
        <strong>Credit: $ xxxx</strong>
        <strong>Balance: $ xxxx</strong>
        <strong>Total: $ xxxx</strong>
      </div>
    </div>
  );
};

/**
 * https://medium.com/tinyso/how-to-create-the-responsive-and-swipeable-carousel-slider-component-in-react-99f433364aa0
 *  */
const Carousel = ({ children }: { children: ReactElement[] }) => {
  const [activeIndex, setActiveIOndex] = useState(0);
  const amountOfChildrens = React.Children.count(children);

  function updateIndex(newIndex: number) {
    if (newIndex < 0) {
      newIndex = 0;
    } else if (newIndex >= Math.floor(amountOfChildrens / 2)) {
      newIndex = Math.floor(amountOfChildrens / 2);
    }
    setActiveIOndex(newIndex);
  }

  return (
    <div className='group relative w-full overflow-x-hidden'>
      <button
        className=' absolute top-20 left-3 z-40 opacity-0 group-hover:opacity-100'
        onClick={() => {
          updateIndex(activeIndex - 1);
        }}
      >
        <BsFillArrowLeftCircleFill className='text-3xl' />
      </button>
      <div
        style={{ transform: `translateX(-${activeIndex * 12}%)` }}
        className={clsx(
          'z-40',
          'inline-flex gap-2',
          'whitespace-nowrap',
          'transition-transform duration-500'
        )}
      >
        {React.Children.map(children, (child, index) => {
          return React.cloneElement(child, { width: '100%' });
        })}
      </div>
      <button
        className='absolute top-20 right-3 opacity-0 group-hover:opacity-100'
        onClick={() => {
          updateIndex(activeIndex + 1);
        }}
      >
        <BsFillArrowRightCircleFill className='text-3xl' />
      </button>
    </div>
  );
};

const CarouselItem = ({
  children,
  width,
}: {
  children: ReactElement;
  width: string;
}) => {
  return (
    <div style={{ width: width }} className='inline-block'>
      {children}
    </div>
  );
};

const BankCard = () => {
  return (
    <Card className='h-48 w-64 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-transparent via-gray-900/50 to-black'>
      <h1>Bank Name</h1>
      <p>Bank Data</p>
    </Card>
  );
};

const InfoSection = () => {
  return (
    <Card className='w-80'>
      <table className='w-full table-auto'>
        <thead>
          <tr>
            <th>Info</th>
            <th>Data</th>
          </tr>
        </thead>
        <tbody>
          {stats.map((data, i) => (
            <tr key={data.title}>
              <td>{data.title}</td>
              <td># {data.data}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Card>
  );
};

interface CardProps {
  className: string;
  children: ReactNode;
}

const Card = forwardRef(
  (
    { className, children }: CardProps,
    ref: ForwardedRef<HTMLDivElement | null>
  ) => {
    const { mode } = useTheme();
    return (
      <div
        ref={ref}
        className={clsx(
          'rounded border',
          mode === 'light' ? 'border-dark/50' : 'border-gray-300/50',
          'p-2',
          className
        )}
      >
        {children}
      </div>
    );
  }
);

const stats = [
  {
    title: 'Connected banks',
    data: 'x',
  },
  {
    title: 'Connected accounts',
    data: 'x',
  },
  {
    title: 'Saving accounts',
    data: 'x',
  },
  {
    title: 'Credit accounts',
    data: 'x',
  },
  {
    title: 'Connected accounts',
    data: 'x',
  },
  {
    title: 'Checking accounts',
    data: 'x',
  },
];
