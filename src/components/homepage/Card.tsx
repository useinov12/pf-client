import React from 'react'
import clsx from 'clsx';

const Card = ({ children, className }: { children: JSX.Element; className: string }) => {
    return (
      <div
        className={clsx(
          'rounded-lg ',
          'border-2 border-gray-50',
          'bg-gray-50',
          'shadow-lg',
          'text-dark',
          className
        )}
      >
          <div className={clsx(
              'w-full h-full shadow-inner rounded-lg',
          )}>
              {children}
          </div>
      </div>
    );
  };

export default Card