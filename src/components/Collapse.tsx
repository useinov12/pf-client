import React from 'react'
import clsx from 'clsx';

interface CollapseProps {
    isCollapsed: boolean;
    children: JSX.Element | JSX.Element[];
    className?:string;
  }
  function Collapse({ isCollapsed, children, className }: CollapseProps) {
    return (
      <div className={clsx(className,  isCollapsed ? 'h-full' : 'h-0')}>
        {children}
      </div>
    );
  }

export default Collapse