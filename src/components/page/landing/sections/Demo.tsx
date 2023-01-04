import clsx from 'clsx';
import {
  MutableRefObject,
  ReactNode,
  useEffect,
  useLayoutEffect,
  useRef,
} from 'react';
import DemoCard from '../cards/DemoCard/DemoCard';
import { BsCashCoin } from 'react-icons/bs';
import { AiFillCheckSquare } from 'react-icons/ai';
import Polkadot from '../../../shared/Polkadot';
import { useTheme } from '@/context/ThemeProvider';
import { gsap } from '@/lib/gsap';

export default function Demo() {
  /* animation timeline */
  const masterTimeline = useRef(gsap.timeline());

  return (
    <Container
      timeline={masterTimeline}
      className={clsx(
        'min-h-screen',
        'flex flex-col gap-6',
        'lg:flex-row-reverse',
        'overflow-hidden py-5'
      )}
    >
      <SectionText className='shrink lg:w-1/2' />
      <SectionCard className=' w-full ' timeline={masterTimeline} />
    </Container>
  );
}

interface SectionWrapperProps {
  className?: string;
  children?: ReactNode;
  timeline: MutableRefObject<gsap.core.Timeline>;
}

const Container = ({ timeline, children, className }: SectionWrapperProps) => {
  return (
    <div className='relative h-full w-full' id='DemoCardTrigger'>
      <BgSurface timeline={timeline} />
      <div
        className={clsx(
          'relative',
          'mx-auto mt-2',
          'sm:max-w-screen-sm',
          'md:max-w-screen-xl ',
          'lg:max-w-screen-2xl',
          className
        )}
      >
        {children}
      </div>
    </div>
  );
};

const BgSurface = ({
  timeline,
}: {
  timeline: MutableRefObject<gsap.core.Timeline>;
}) => {
  const { mode } = useTheme();

  const BgSurfaceRef = useRef<HTMLDivElement | null>(null);

  /* animate background surface */
  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      timeline.current.fromTo(
        BgSurfaceRef.current,
        { opacity: 0, x: -70, y: 35 },
        {
          x: 0,
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'none',
          scrollTrigger: {
            id: 'BgSurface',
            trigger: BgSurfaceRef.current,
            // markers: true,
            start: 'top 80%',
            end: 'top+=100px 65%',
            toggleActions: 'play none none reverse',
            scrub: true,
          },
        }
      );
    }, BgSurfaceRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={BgSurfaceRef}
      className={clsx(
        'opacity-0' /* opacity handeled by gsap animation */,
        'opacity-100',
        'absolute',
        'mt-[22rem] lg:mt-0',
        'h-4/6 w-1/2 lg:h-5/6',
        'lg:w-1/3',
        'left-0 top-0',
        'rounded-tr-3xl rounded-br-3xl',
        mode === 'light' ? 'bg-gray-400/90' : 'bg-gray-900/50'
      )}
    />
  );
};

const SectionCard = ({
  className,
  timeline,
}: {
  className: string;
  timeline: MutableRefObject<gsap.core.Timeline>;
}) => {
  const PolkadotRef = useRef<HTMLDivElement | null>(null);

  /* gsap context scope https://greensock.com/react/#scope */
  const animationScope = useRef<HTMLDivElement | null>(null);

  /* animate polkadot component */
  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      timeline.current.fromTo(
        PolkadotRef.current,
        { x: -100, y: 50 },
        {
          x: 50,
          y: -15,
          ease: 'none',

          scrollTrigger: {
            id: 'Polkadot',
            trigger: PolkadotRef.current,
            // markers: true,
            start: 'top+=1--px 80%',
            end: 'top+=100px 65%',
            toggleActions: 'play none none reverse',
            scrub: true,
          },
        },
        0.6
      );
    }, animationScope);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={animationScope}
      className={clsx('relative', 'flex items-start justify-center', className)}
    >
      {/* wrapper div for Polkadot to hook animation with */}
      <div ref={PolkadotRef} className='absolute -top-1 -right-4'>
        <Polkadot className='h-80 w-full' />
      </div>
      <DemoCard
        className={clsx(
          'translate-x-10 sm:translate-x-0',
          'h-full w-full',
          'md:h-[32rem] md:w-[36rem]',
          'translate-y-5 lg:-translate-x-0'
        )}
      />
    </section>
  );
};

const SectionText = ({ className }: { className: string }) => {
  return (
    <section
      className={clsx(
        'flex flex-col items-center justify-center px-6',
        className
      )}
    >
      <div className='my-4 flex flex-col items-center justify-center gap-2'>
        <BsCashCoin className='h-16 w-16' />
        <div className='flex flex-col items-center'>
          <h2 className='cursor-default text-center text-2xl tracking-tight drop-shadow'>
            PersonalFinance
          </h2>
          <h3 className='cursor-default text-center text-xl font-normal tracking-tight  drop-shadow'>
            will help you organize your bank data
          </h3>
        </div>
      </div>
      <ul className='my-6 flex flex-col'>
        {[
          'Unlimited banks connection',
          'Cross-bank data analytics',
          'Configurable data aggregation',
          'Useful charts and tools',
        ].map((perk, i) => (
          <li key={i} className='inline-flex items-center gap-3'>
            <AiFillCheckSquare className='h-7 w-7' />
            <p className='text-md tracking-tight'>{perk}</p>
          </li>
        ))}
      </ul>
    </section>
  );
};
