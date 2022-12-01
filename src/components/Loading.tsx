import React from 'react';
import clsx from 'clsx';
import gsap from 'gsap';
import Image from 'next/image';

const Loading = () => {
  const timeline = React.useRef(gsap.timeline());
  const loadingContainerRef = React.useRef<HTMLDivElement>(null);
  const logoRef = React.useRef<HTMLDivElement>(null);

  React.useLayoutEffect(() => {
    timeline.current.fromTo(
      logoRef.current,
      {opacity:0},
      {
        immediateRender: false,
        opacity: 1,
        ease: 'ease.in',
        duration: 2,
        delay:.4
      }
    );

    return () => {
        timeline.current.kill();
      };
  }, []);

  return (
    <div
      ref={loadingContainerRef}
      className={clsx(
        'h-screen w-screen',
        'transition-all delay-75 duration-150',
        'bg-gradient-to-bl from-gray-700 via-gray-900 to-black ',
        'cursor-none',
        'flex flex-col items-center justify-center'
      )}
    >
        <div ref={logoRef}>
            <Image src={'/images/logo.png'} width={120} height={110} />
        </div>
      <div className='h-12 w-12 animate-spin rounded-full border-4 border-dashed dark:border-primary-400 my-6' />
    </div>
  );
};

export default Loading;
