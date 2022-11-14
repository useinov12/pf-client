import React, { ReactHTML } from 'react';
import clsx from 'clsx';

interface PathProps {
  height:number;
  className?:string;
  pathRef?: React.MutableRefObject<SVGRectElement | null>
}

export default function Path({height, className, pathRef}:PathProps){
  return (
    <svg
      width='6'
      height={height}
      viewBox={`0 0 6 ${height}`}
      fill='none'
      className={clsx('mb-1 drop-shadow lg:ml-8', className)}
    >
      <rect
        width='6'
        height={height}
        rx='4'
        fill='url(#paint0_linear_8_14)'
      />
      <defs>
        <linearGradient
          id='paint0_linear_8_14'
          x1='2'
          y1='0'
          x2='2'
          y2={height}
          gradientUnits='userSpaceOnUse'
        >
          <stop stopColor='#00B2FF' />
          <stop offset='0.689583' stopColor='#2F7BEC' />
          <stop offset='1' stopColor='#1159C7' />
        </linearGradient>
      </defs>
    </svg>
  );
}
