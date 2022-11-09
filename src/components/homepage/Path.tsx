import React from 'react'
import clsx from 'clsx';

const Path = ({height, className}:{height:number, className?:string}) => {
    return (
      <svg
        width='11'
        height={height}
        viewBox={`0 0 11 ${height}`}
        fill='none'
        className={clsx(
          'lg:ml-7 mb-1 drop-shadow',
          className
        )}
      >
        <rect width='11' height={height} rx='4' fill='url(#paint0_linear_8_14)' />
        <defs>
          <linearGradient
            id='paint0_linear_8_14'
            x1='2'
            y1='0'
            x2='2'
            y2={height}
            gradientUnits='userSpaceOnUse'
          >
            <stop stop-color='#00B2FF' />
            <stop offset='0.689583' stopColor='#2F7BEC' />
            <stop offset='1' stopColor='#1159C7' />
          </linearGradient>
        </defs>
      </svg>
    );
  };

export default Path