import {
  MutableRefObject,
  ReactNode,
  useEffect,
  useRef,
  useState,
} from 'react';
import gsap from 'gsap';
import clsx from 'clsx';
import LineChart from '../../../../charts/LineChart';
import BarChart from '../../../../charts/BarChart';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { useTheme } from '@/context/ThemeProvider';
import { ChartDataFormat } from '@/components/charts/types';
import { months } from '@/components/charts/defaults';

import { FaRegChartBar } from 'react-icons/fa';
import { CgArrowsExchange } from 'react-icons/cg';
import '@/lib/swapText';

import Banks from './Banks';
import Accounts from './Accounts';
import Transactions from './Transactions';

gsap.registerPlugin(ScrollTrigger);

export interface DemoCardProps {
  currentBank: DemoData;
  counter: number;
  prevCounter: number;
  masterTimeline: MutableRefObject<gsap.core.Timeline>;
}

export default function DemoCard({ className }: { className?: string }) {
  const { mode } = useTheme();
  const [currentBank, setCurrentBank] = useState<DemoData>(
    demoDataCollection[0]
  );
  const [counter, setCounter] = useState(0);

  const prevCountRef = useRef(counter);

  const firstTimeline = useRef(gsap.timeline());

  /* #region  Timer */
  /** Update counter every x seconds */
  useEffect(() => {
    //if initial load - delay animation for 1.5 sec
    const delay = counter === -1 ? 1500 : 7400;

    const timer = setInterval(() => {
      prevCountRef.current = counter; //save prev counter value
      setCounter((prev) => (prev >= 2 ? 0 : prev + 1));
    }, delay);
    return () => clearInterval(timer);
  }, [counter]);

  /**
   * On counter update, iterate Data
   * if counter === -1 -> it is initial render, do not update state
   */
  useEffect(() => {
    if (counter !== -1) {
      setCurrentBank(demoDataCollection[counter]);
    }
  }, [counter]);
  /* #endregion */

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
            currentBank={currentBank}
            counter={counter}
            prevCounter={prevCountRef.current}
            masterTimeline={firstTimeline}
          />
          <Accounts
            currentBank={currentBank}
            counter={counter}
            prevCounter={prevCountRef.current}
            masterTimeline={firstTimeline}
          />
        </div>

        <div className='flex flex-col gap-y-3 md:w-1/2'>
          <Transactions
            currentBank={currentBank}
            counter={counter}
            prevCounter={prevCountRef.current}
            masterTimeline={firstTimeline}
          />
          <ChartCard chartData={currentBank} />
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

/* #region  SUMMARY CARD */

/* #endregion */

/* #region  CHART CARD */
const ChartCard = ({ chartData }: { chartData: DemoData }) => {
  const dataset = chartData.dynamic;
  const labels = months
    .filter((month, i) => i < dataset.length)
    .map((month) => month.slice(0, 3));

  const data: ChartDataFormat = {
    labels: labels,
    label: 'Account dynamic',
    data: [dataset],
  };

  return (
    <Card className='col-span-4 col-start-1 row-span-3 md:col-span-2'>
      <header
        className={clsx(
          'bg-gray-600/50',
          'mb-2 w-full px-4 py-1',
          'inline-flex items-center gap-1'
        )}
      >
        <FaRegChartBar className='h-6 w-6' />
        <h6 className='text-sm font-semibold drop-shadow-md'>Charts</h6>
      </header>
      <div className='flex flex-col items-start'>
        <div className='flex h-full w-full flex-col items-center justify-center '>
          <div className='h-20 w-5/6'>
            <LineChart
              width={'100%'}
              height={'100%'}
              incomingData={data}
              delay={3200}
            />
          </div>
          <div className='h-20 w-5/6'>
            <BarChart
              width={'100%'}
              height={'100%'}
              incomingData={data}
              delay={3500}
            />
          </div>
        </div>
      </div>
    </Card>
  );
};

/* #endregion */

/* #region  TRANSACTIONS CARD */

/* #endregion */

/* #region  Gsap swap text effect */
gsap.registerEffect({
  name: 'swapText',
  effect: (targets: any, config: any) => {
    const tl = gsap.timeline({ delay: config.delay });
    tl.to(targets, { opacity: 0, duration: config.duration / 2 });
    tl.add(() => (targets[0].innerText = config.text));
    tl.to(targets, { opacity: 1, duration: config.duration });
    return tl;
  },
  defaults: { duration: 0.5 },
  extendTimeline: true,
});
/* #endregion */

/* #region  Helper functions */

/* #endregion */

/* #region  Data */

export interface DemoData {
  bank: string;
  transactions: number[];
  accounts: {
    type: string;
    sum: number;
  }[];
  dynamic: number[];
}

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
/* #endregion */
