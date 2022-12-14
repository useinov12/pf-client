import { useContext } from 'react';
import clsx from 'clsx';
import { ThemeContext } from '@/context/ThemeProvider';

const MenuSection = ({
  className,
  children,
}: {
  className?: string;
  children: JSX.Element | JSX.Element[];
}) => {
  const { mode } = useContext(ThemeContext);

  return (
    <div
      className={clsx(
        'rounded-md border',
        mode === 'light' ? 'border-gray-100/50' : 'border-gray-300/20',
        mode === 'light' ? 'bg-dark/10' : 'bg-gray-300/10',
        'overflow-hidden drop-shadow',
        className
      )}
    >
      {children}
    </div>
  );
};

export default MenuSection;
