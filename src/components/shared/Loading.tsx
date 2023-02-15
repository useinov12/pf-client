import clsx from 'clsx';
import gsap from 'gsap';
import Image from 'next/image';
import { useLayoutEffect, useRef } from 'react';

const Loading = () => {
  const timeline = useRef(gsap.timeline());
  const loadingContainerRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    timeline.current.fromTo(
      logoRef.current,
      { opacity: 0 },
      {
        immediateRender: false,
        opacity: 1,
        ease: 'ease.in',
        duration: 2,
        delay: 0.4,
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
        'h-full w-full',
        'transition-all delay-75 duration-150',
        'bg-gradient-to-bl from-gray-700 via-gray-900 to-black ',
        'cursor-none',
        'flex flex-col items-center justify-center'
      )}
    >
      <div ref={logoRef} className='flex flex-col items-center justify-center'>
        <Image src='/images/logo.png' width={120} height={110} alt='logo' />
        <Spinner />
      </div>
    </div>
  );
};
export default Loading;

export const Spinner = () => {
  return (
    <div className='h-12 w-12 animate-spin rounded-full border-4 border-dashed border-primary-500 ' />
  );
};
