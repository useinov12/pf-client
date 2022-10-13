import React from 'react';
import clsx from 'clsx';

const DataLine: React.FC<{ text: string; data: string[] }> = ({
  text,
  data,
}) => {
  return (
    <div
      className={clsx(
        'group flex w-full items-center justify-between ',
        'border-gray-400 px-5 py-1  hover:bg-gray-300',
        'cursor-pointer'
      )}
    >
      <h3
        className={clsx(
          'cursor-default font-semibold uppercase',
          'sm:text-md text-sm md:text-lg lg:text-xl'
        )}
      >
        {' '}
        {text}{' '}
      </h3>
      <ul className={clsx('inline-flex items-center gap-1')}>
        {data.map((element) => {
          return (
            <li
              key={element}
              className={clsx(
                'rounded px-2 font-mono font-semibold',
                'cursor-default group-hover:bg-white',
                'text-sm  md:text-lg',
                'cursor-pointer',
                'hover:shadow-sm'
              )}
            >
              {element}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default DataLine;
