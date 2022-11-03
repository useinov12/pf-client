import React from 'react';
import clsx from 'clsx';


const Card = ({
  children,
  className,
  inner
}: {
  children: JSX.Element;
  className: string;
  inner?:boolean;
}) => {
  return (
    <div
      className={clsx(
        'drop-shadow',
        'text-dark bg-gray-50',
        'rounded-xl drop-shadow shadow-inner',
        'ring-4 ring-white ',
        inner && 'ring-transparent rounded-lg  border-2 border-gray-50 ',
        className
      )}
    >
      <div className={clsx(
        'h-full w-full shadow-inner rounded-xl',
        inner ?? 'rounded-lg'
      )}>
        {children}
      </div>
    </div>
  );
};

export default Card;
