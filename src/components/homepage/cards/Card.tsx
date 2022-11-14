import React from 'react';
import clsx from 'clsx';

const Card = ({
  children,
  className,
  inner,
}: {
  children: JSX.Element;
  className: string;
  inner?: boolean;
}) => {
  return (
    <div
      className={clsx(
        'drop-shadow-xl',
        'bg-gray-200 text-dark border border-gray-300',
        ' drop-shadow rounded-lg',
        inner && 'drop-shadow-none',
        className
      )}
    >
      <div
        className={clsx(
          'h-full w-full rounded-xl'
        )}
      >
        {children}
      </div>
    </div>
  );
};

export default Card;
