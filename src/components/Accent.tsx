import clsx from 'clsx';
import * as React from 'react';

const Accent: React.FC<{
  children: any;
  className?: string;
  green?: boolean | undefined;
  orange?: boolean | undefined;
  red?: boolean | undefined;
}> = ({ children, className, green, orange, red }) => {
  const color = green
    ? 'from-green-400 via-green-600 to-green-500 '
    : orange
    ? 'from-orange-400 via-orange-600 to-orange-500 '
    : red
    ? 'from-red-400 via-red-600 to-red-500 '
    : 'from-primary-700 via-primary-600 to-primary-400 ';

  return (
    <span
      className={clsx(
        `bg-gradient-to-tr bg-clip-text 
        font-bold 
        text-transparent`,
        color,
        className
      )}
    >
      {children}
    </span>
  );
};

export default Accent;
