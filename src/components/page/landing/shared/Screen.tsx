import clsx from 'clsx';
import { ReactNode } from 'react';

interface SectionWrapperProps {
  children: ReactNode;
  className?: string;
}

export default function Screen({ children, className }: SectionWrapperProps) {
  return (
    <section
      className={clsx(
        'h-full min-h-screen w-screen',
        'overflow-hidden',
        className
      )}
    >
      {children}
    </section>
  );
}
