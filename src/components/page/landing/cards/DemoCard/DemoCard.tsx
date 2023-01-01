import {
  MutableRefObject,
  ReactNode,
  useEffect,
  useRef,
  useState,
} from 'react';
import gsap from 'gsap';
import clsx from 'clsx';

import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { useTheme } from '@/context/ThemeProvider';

import '@/lib/swapText';

import Banks from './Banks';
import Accounts from './Accounts';
import Transactions from './Transactions';
import Charts from './Charts';

import { DemoData, demoDataCollection } from './demoData';

gsap.registerPlugin(ScrollTrigger);

export default function DemoCard({ className }: { className?: string }) {
  const { mode } = useTheme();

  const [counter, setCounter] = useState(0);
  const prevCountRef = useRef(counter);

  /* gsap animation timeline */
  const masterTimeline = useRef(gsap.timeline());

  /* Timer */
  useEffect(() => {
    const delay = 9400;
    const timer = setInterval(() => {
      prevCountRef.current = counter; //save prev counter value
      setCounter((prev) => (prev === 2 ? 0 : prev + 1));
    }, delay);
    return () => clearInterval(timer);
  }, [counter]);

  return (
    <div
      className={clsx(
        'my-4 h-auto w-full lg:my-0',
        'rounded-xl  p-3 ',
        ' ring-white drop-shadow-lg ',
        'transition-all duration-300',
        'border',
        mode === 'light' ? 'border-dark/20' : 'border-gray-400/50',
        mode === 'light' ? 'bg-gray-100' : 'bg-gray-900',
        className
      )}
    >
      <header>
        <div className='my-3 ml-2 inline-flex items-center gap-2'>
          <div className='h-3 w-3 rounded-full bg-red-500/90 drop-shadow ' />
          <div className='h-3 w-3 rounded-full bg-yellow-400/90 drop-shadow ' />
          <div className='h-3 w-3 rounded-full bg-green-400/90 drop-shadow ' />
        </div>
      </header>

      <section className='flex  gap-3 md:flex-row'>
        <div className='flex flex-col gap-y-3 md:w-1/2'>
          <Banks
            currentBank={demoDataCollection[counter]}
            counter={counter}
            prevCounter={prevCountRef.current}
            masterTimeline={masterTimeline}
          />
          <Accounts
            currentBank={demoDataCollection[counter]}
            counter={counter}
            prevCounter={prevCountRef.current}
            masterTimeline={masterTimeline}
          />
        </div>

        <div className='flex flex-col gap-y-3 md:w-1/2'>
          <Transactions
            currentBank={demoDataCollection[counter]}
            counter={counter}
            prevCounter={prevCountRef.current}
            masterTimeline={masterTimeline}
          />
          <Charts
            currentBank={demoDataCollection[counter]}
            counter={counter}
            prevCounter={prevCountRef.current}
            masterTimeline={masterTimeline}
          />
        </div>
      </section>
    </div>
  );
}

type SectionProps = { className?: string; children?: ReactNode };

export const Card = ({ className, children }: SectionProps) => {
  const { mode } = useTheme();
  return (
    <div
      className={clsx(
        'overflow-hidden rounded',
        'border',
        mode === 'light' ? 'border-dark/20' : 'border-gray-400/50',
        mode === 'light' ? 'bg-gray-300/50' : 'bg-gray-700/50',
        className
      )}
    >
      {children}
    </div>
  );
};

export interface DemoCardProps {
  currentBank: DemoData;
  counter: number;
  prevCounter: number;
  masterTimeline: MutableRefObject<gsap.core.Timeline>;
}
