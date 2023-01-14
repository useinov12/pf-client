import clsx from 'clsx';
import { useState, Children, ReactElement, cloneElement } from 'react';
import {
  BsFillArrowLeftCircleFill,
  BsFillArrowRightCircleFill,
} from 'react-icons/bs';

/**
 * https://medium.com/tinyso/how-to-create-the-responsive-and-swipeable-carousel-slider-component-in-react-99f433364aa0
 *  */
export function Carousel({ children }: { children: ReactElement[] }) {
  const [activeIndex, setActiveIOndex] = useState(0);

  function updateIndex(newIndex: number) {
    if (newIndex < 0) {
      newIndex = 0;
    } else if (newIndex >= Children.count(children)) {
      newIndex = Children.count(children) - 1;
    }
    setActiveIOndex(newIndex);
  }

  return (
    <section className='group relative w-full overflow-hidden py-2'>
      <button
        className={clsx(
          'absolute z-40',
          'group-hover:opacity-100 xl:opacity-0',
          'top-0 left-0 h-full rounded px-2',
          'group-hover:bg-dark/20',
          'group-focus:bg-dark/20',
          'scale-100 hover:scale-[1.1]',
          'transition-all duration-150 ease-in-out'
        )}
        onClick={() => {
          updateIndex(activeIndex - 1);
        }}
      >
        <BsFillArrowLeftCircleFill className='text-3xl' />
      </button>

      <ul
        style={{
          transform: `translateX(-${
            activeIndex * 1.5 * Children.count(children)
          }%)`,
        }}
        className={clsx(
          'list-none',
          'z-40',
          'inline-flex gap-2',
          'whitespace-nowrap',
          'transition-transform duration-500',
          'overflow-x-scroll'
        )}
      >
        {Children.map(children, (child, index) => {
          return cloneElement(child, { width: '100%' });
        })}
      </ul>
      <button
        className={clsx(
          'absolute z-40',
          'group-hover:opacity-100 xl:opacity-0',
          'bg-dark/20',
          'group-hover:bg-dark/20',
          'group-focus:bg-dark/20',
          'top-0 right-0 h-full rounded px-2',
          'scale-100 hover:scale-[1.1]',
          'transition-all duration-150 ease-in-out'
        )}
        onClick={() => {
          updateIndex(activeIndex + 1);
        }}
      >
        <BsFillArrowRightCircleFill className='text-3xl' />
      </button>
    </section>
  );
}

export function CarouselItem({ children }: { children: ReactElement }) {
  return <div className={clsx('inline-block', 'w-fit')}>{children}</div>;
}
