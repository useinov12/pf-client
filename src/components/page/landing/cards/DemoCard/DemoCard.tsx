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

gsap.registerPlugin(ScrollTrigger);

export default function DemoCard({ className }: { className?: string }) {
  const { mode } = useTheme();

  const [counter, setCounter] = useState(0);

  const prevCountRef = useRef(counter);

  const masterTimeline = useRef(gsap.timeline());

  /** Update counter every x seconds */
  useEffect(() => {
    const delay = 7400;
    const timer = setInterval(() => {
      prevCountRef.current = counter; //save prev counter value
      setCounter((prev) => (prev >= 2 ? 0 : prev + 1));
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

      <section className='flex flex-col gap-3 md:flex-row'>
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
          <Charts currentBank={demoDataCollection[counter]} />
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

export interface DemoData {
  bank: string;
  transactions: number[];
  accounts: {
    type: string;
    sum: number;
  }[];
  dynamic: number[];
}

/* Demo data collection */
export const demoDataCollection: DemoData[] = [
  {
    bank: 'Capital One',
    transactions: [-403, -28, -159, 120],
    accounts: [
      { type: 'Credit', sum: -2200 },
      { type: 'Saving', sum: 5000 },
      { type: 'Checking', sum: 1100 },
    ],
    dynamic: [1000, 1200, 1400, 1800, 1400, 1600, 1700, 1200],
  },
  {
    bank: 'Bank of America',
    transactions: [-23, -17, -85, 50],
    accounts: [
      { type: 'Checking', sum: 4200 },
      { type: 'Saving', sum: 9700 },
      { type: 'Credit', sum: -1700 },
    ],
    dynamic: [1200, 1700, 1400, 1800, 2100, 1900, 1700, 2200],
  },
  {
    bank: 'American Express',
    transactions: [-120, -500, 297, 1700],
    accounts: [
      { type: 'Saving', sum: 12000 },
      { type: 'Checking-1', sum: 2700 },
      { type: 'Checking-2', sum: 700 },
    ],
    dynamic: [2200, 1700, 1400, 1800, 1500, 1200, 1100, 1700],
  },
];
