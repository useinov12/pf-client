import React, {
  MutableRefObject,
  ReactNode,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import clsx from 'clsx';
import ArrowLink from '@/components/links/ArrowLink';
import Logo from '@/components/shared/Logo';
import Button from '@/components/buttons/Button';
import { useTheme } from '@/context/ThemeProvider';
import Polkadot from '../../../shared/Polkadot';
import { useAuth } from '@/services/auth/queries';
import { useLoginForm } from '@/context/LoginFormProvider';
import { gsap } from '@/lib/gsap';
import { BsCartX } from 'react-icons/bs';

export default function MainHeroSection() {
  /* to postpone the animation sequence until component is mounted */
  const [isMounted, setIsMouted] = useState(false);

  /* animation timeline */
  const masterTimeline = useRef(gsap.timeline());

  /* timer for isMounted state*/
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsMouted(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Container
      className='mb-20 flex flex-col gap-6 overflow-hidden py-5 lg:flex-row'
      isMounted={isMounted}
      timeline={masterTimeline}
    >
      <HeroText className='mt-20 h-full flex-none lg:w-1/2' />
      <HeroDemo
        className='shrink'
        timeline={masterTimeline}
        isMounted={isMounted}
      />
    </Container>
  );
}

interface SectionWrapperProps {
  className?: string;
  children?: ReactNode;
  timeline: MutableRefObject<gsap.core.Timeline>;
  isMounted: boolean;
}

const Container = ({
  children,
  className,
  timeline,
  isMounted,
}: SectionWrapperProps) => {
  return (
    <div className='relative h-full w-screen overflow-hidden'>
      <BgSurface timeline={timeline} isMounted={isMounted} />
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
  isMounted,
  timeline,
}: {
  isMounted: boolean;
  timeline: MutableRefObject<gsap.core.Timeline>;
}) => {
  const { mode } = useTheme();

  const BgSurfaceRef = useRef<HTMLDivElement | null>(null);

  /* animate background surface */
  useEffect(() => {
    if (isMounted) {
      const ctx = gsap.context(() => {
        timeline.current.fromTo(
          BgSurfaceRef.current,
          {
            x: 100,
            y: 20,
            opacity: 0,
          },
          {
            x: 0,
            y: 0,
            opacity: 1,
            duration: 1.2,
            ease: 'ease.in',
          },
          0.6
        );
      }, BgSurfaceRef);
      return () => ctx.revert();
    }
  }, [isMounted]);

  return (
    <div
      ref={BgSurfaceRef}
      className={clsx(
        'opacity-0' /* opacity handeled by gsap animation */,
        'absolute',
        'mt-[24rem] lg:mt-0',
        'h-[70vh] md:h-[90vh]',
        'w-1/2 lg:w-1/3',
        'right-0',
        'rounded-tl-3xl rounded-bl-3xl',
        mode === 'light' ? 'bg-gray-400/90' : 'bg-gray-900/50'
      )}
    />
  );
};

const HeroDemo = ({
  className,
  timeline,
  isMounted,
}: {
  className?: string;
  timeline: MutableRefObject<gsap.core.Timeline>;
  isMounted: boolean;
}) => {
  const animationScope = useRef<HTMLDivElement | null>(null);
  const PolkadotRef = useRef<HTMLDivElement | null>(null);
  const DemoRef = useRef<HTMLDivElement | null>(null);

  /* animate Polkadot and DemoCard */
  useEffect(() => {
    if (isMounted) {
      const ctx = gsap.context(() => {
        timeline.current.fromTo(
          PolkadotRef.current,
          { opacity: 0, y: 20 },
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            ease: 'ease.in',
          },
          0.4
        );
        timeline.current.fromTo(
          DemoRef.current,
          { opacity: 0, x: 100, y: 20 },
          {
            x: 60,
            y: 0,
            opacity: 1,
            duration: 1.3,
            ease: 'ease.in',
          },
          1.3
        );
      }, animationScope);

      return () => ctx.revert();
    }
  }, [isMounted]);

  return (
    <section
      className={clsx(
        'relative',
        'flex items-center justify-center',
        className
      )}
      ref={animationScope}
    >
      {/* wrapper div for Polkadot to hook animation with */}
      <div
        className='absolute top-16 -left-10 h-full w-full opacity-0'
        ref={PolkadotRef}
      >
        <Polkadot className={clsx('h-80 w-2/3')} />
      </div>
      <div
        ref={DemoRef}
        className={clsx(
          'opacity-0',
          'mt-28',
          'h-[30rem] w-[30rem]',
          'translate-x-20 sm:translate-x-0',
          'md:h-[40rem] md:w-[40rem]',
          'bg-gray-300',
          'rounded-2xl drop-shadow-lg'
        )}
      />
    </section>
  );
};

const HeroText = ({ className }: { className?: string }) => {
  const { data: user } = useAuth();
  const { handleOpenLoginForm } = useLoginForm();
  return (
    <section
      className={clsx(
        'flex items-center justify-center pl-3 pr-5 md:pl-12',
        className
      )}
    >
      <div className='flex w-fit flex-col  gap-2'>
        <div className='flex flex-col items-start'>
          <div className='w-1/6 flex-none'>
            <Logo width={100} height={85} />
          </div>
          <h3 className='shrink text-2xl tracking-wide md:text-3xl'>
            PersonalFinance
          </h3>
        </div>

        {user ? (
          <div className='inline-flex items-center gap-4 px-1'>
            <h2 className='text-xl'>
              Welcome,{' '}
              <span className='bg-gradient-to-r  from-primary-500 to-primary-600 bg-clip-text text-transparent'>
                {user.firstName}
              </span>
            </h2>
            <ArrowLink
              href='/cabinet'
              className='text-md bg-gradient-to-r from-primary-400 to-primary-600'
            >
              Go to cabinet
            </ArrowLink>
          </div>
        ) : (
          <div className='flex items-center gap-6'>
            <p className='cursor-default rounded-md bg-primary-400/80 py-[2px] px-2 text-[.8rem] uppercase'>
              Have an account?
            </p>
            <button
              onClick={handleOpenLoginForm}
              className='bg-transparent py-0 px-2'
            >
              <ArrowLink href='#' disabled>
                Sign In
              </ArrowLink>
            </button>
          </div>
        )}
        <h1
          className={clsx(
            'text-3xl font-extrabold',
            'sm:text-2xl md:text-3xl lg:text-4xl',
            'tracking-tight',
            'cursor-default',
            'drop-shadow-xl',
            'transition-all delay-75 duration-150'
          )}
        >
          Take control over your money
        </h1>
        <h5
          className={clsx(
            'pl-1 ',
            'font-normal tracking-tight drop-shadow-xl',
            'transition-all delay-75 duration-150'
          )}
        >
          A financial app that lets you gather, analyze your banks data
          <br />
          Securely conect your financial accounts in couple minutes
        </h5>

        {!user && (
          <Button
            className={clsx(
              'ml-1',
              'text-md w-min whitespace-nowrap rounded-md border-4 border-transparent px-6',
              'ring-4 ring-transparent hover:ring-primary-500'
            )}
          >
            Sign up
          </Button>
        )}
      </div>
    </section>
  );
};
