import clsx from 'clsx';
import { Children, ReactNode, useEffect, useState } from 'react';
import { HiOutlineChevronLeft, HiOutlineChevronRight } from 'react-icons/hi';

export function Carousel({
  children,
  maxNumberOfChildrensInFrame,
}: {
  children: ReactNode;
  maxNumberOfChildrensInFrame: number;
}) {
  const numberOfChildren = Children.count(children);
  const moveDistance = 100 / numberOfChildren;
  const [index, setIndex] = useState(0);

  /* reset slider if children changed */
  useEffect(() => {
    setIndex(0);
  }, [children]);

  return (
    <div className='group relative flex h-full w-full justify-between'>
      <button
        className={clsx(
          'h-full px-1',
          'absolute top-0 left-0 z-10',
          'transition-colors duration-100',
          'pointer-events-none opacity-0',
          'flex-none text-2xl',
          'bg-gray-600/50',
          'group-hover:bg-gray-400',
          numberOfChildren > maxNumberOfChildrensInFrame &&
            index > 0 &&
            'pointer-events-auto opacity-100'
        )}
        onClick={() => setIndex((p) => p - 1)}
      >
        <HiOutlineChevronLeft />
      </button>
      <section className={clsx('relative', 'grow ', 'overflow-hidden')}>
        <div
          className={clsx(
            'h-full',
            'absolute top-0 left-0 z-0',
            'ease transition-transform duration-200',
            'inline-flex'
          )}
          style={{ transform: `translateX(${index * -moveDistance}%)` }}
        >
          {children}
        </div>
      </section>
      <button
        className={clsx(
          'h-full px-1',
          'absolute top-0 right-0',
          'transition-colors duration-100',
          'pointer-events-none opacity-0',
          'flex-none text-2xl',
          'bg-gray-600/50',
          'group-hover:bg-gray-400',
          numberOfChildren > maxNumberOfChildrensInFrame &&
            index < numberOfChildren % maxNumberOfChildrensInFrame &&
            'pointer-events-auto opacity-100'
        )}
        onClick={() => setIndex((p) => p + 1)}
      >
        <HiOutlineChevronRight />
      </button>
    </div>
  );
}

export function CarouselItem({ children }: { children: ReactNode }) {
  return <section className={clsx('h-full w-fit')}>{children}</section>;
}
