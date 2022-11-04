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
        'drop-shadow',
        'bg-gray-50 text-dark',
        ' shadow-inner drop-shadow',
        inner ?  'rounded-lg border-2  border-gray-50 ring-transparent ' 
        : 'rounded-xl ring-4 ring-white',
        className
      )}
    >
      <div
        className={clsx(
          'h-full w-full rounded-xl shadow-inner',
          inner ?? 'rounded-lg'
        )}
      >
        {children}
      </div>
    </div>
  );
};

export default Card;
