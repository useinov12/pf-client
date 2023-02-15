import clsx from 'clsx';
import { Children, ReactNode, useEffect, useState } from 'react';
import { HiOutlineChevronLeft, HiOutlineChevronRight } from 'react-icons/hi';

export function Carousel({
  children,
  maxNumberOfChildrensInFrame,
  widthClass,
  heightClass,
  className,
}: {
  children: ReactNode;
  maxNumberOfChildrensInFrame: number;
  widthClass: string;
  heightClass: string;
  className?: string;
}) {
  const numberOfChildren = Children.count(children);
  const moveDistance = 100 / numberOfChildren;
  const [index, setIndex] = useState(0);

  /* reset slider if children changed */
  useEffect(() => {
    setIndex(0);
  }, [children]);

  return (
    <div
      className={clsx(
        'group relative flex h-full w-full justify-between',
        className,
        widthClass,
        heightClass
      )}
    >
      <button
        className={clsx(
          'transition-colors duration-100',
          'lg:invisible lg:group-hover:visible',
          'h-full px-5',
          'absolute top-0 left-0 z-10',
          'flex-none text-2xl',
          'bg-gray-600/50 lg:bg-gray-600/10',
          'group-hover:bg-gray-400',
          numberOfChildren > maxNumberOfChildrensInFrame && index > 0
            ? 'pointer-events-auto opacity-100'
            : 'pointer-events-none opacity-0'
        )}
        onClick={() => setIndex((p) => p - 1)}
      >
        <HiOutlineChevronLeft className='group-hover:text-gray-800' />
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
          'transition-colors duration-100',
          'lg:invisible lg:group-hover:visible',
          'h-full px-5',
          'absolute top-0 right-0',
          'flex-none text-2xl',
          'bg-gray-600/50 lg:bg-gray-600/10',
          'group-hover:bg-gray-400',
          index === numberOfChildren - maxNumberOfChildrensInFrame
            ? 'pointer-events-none opacity-0'
            : 'pointer-events-auto opacity-100'
        )}
        onClick={() => setIndex((p) => p + 1)}
      >
        <HiOutlineChevronRight className='group-hover:text-gray-800' />
      </button>
    </div>
  );
}

export function CarouselItem({ children }: { children: ReactNode }) {
  return <section className={clsx('h-full w-fit')}>{children}</section>;
}
