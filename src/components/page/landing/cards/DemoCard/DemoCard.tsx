import {
  MutableRefObject,
  ReactNode,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import gsap from 'gsap';
import clsx from 'clsx';
import PieChart from '../../../../charts/PieChart';
import LineChart from '../../../../charts/LineChart';
import BarChart from '../../../../charts/BarChart';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { ThemeContext, useTheme } from '@/context/ThemeProvider';
import { IncomingData } from '@/components/charts/types';
import { months } from '@/components/charts/defaults';
import '@/lib/swapText';

import { MdSwitchAccount } from 'react-icons/md';
import { FaRegChartBar } from 'react-icons/fa';
import { CgArrowsExchange } from 'react-icons/cg';

import Banks from './Banks';

gsap.registerPlugin(ScrollTrigger);

export default function DemoCard({ className }: { className?: string }) {
  const { mode } = useContext(ThemeContext);
  const [currentBank, setCurrentBank] = useState<DemoData>(demoDataCollection[0]);
  const [counter, setCounter] = useState(0);

  const prevCountRef = useRef(counter);

  const firstTimeline = useRef(gsap.timeline());

  /* #region  Animated elements refs */

  const pauseRef = useRef<HTMLDivElement>(null);

  const transactionsRef = useRef(new Array(7));
  const transactionsTotalRef = useRef<HTMLDivElement>(null);

  const summaryAccTypeRef = useRef(new Array(3));
  const summaryAccSumRef = useRef(new Array(3));
  /* #endregion */

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

  /* #region  Animation Sequence */
  useEffect(() => {
    gsap.ticker.lagSmoothing(false);
    if (counter !== -1) {
      /* #region  BANK NAME  */

      /* #endregion */

      /* #region  SUMMARY CARD */
      const wrapCurrentAccTypes = gsap.utils.wrap(
        currentBank.accounts.map((el) => el.type)
      );

      const accountTypes = currentBank.accounts.map((el) => el.type);

      // animate account types
      // firstTimeline.current.swapText(summaryAccTypeRef.current, {
      //   text: wrapCurrentAccTypes,
      //   delay: 0.5,
      //   duration: 0.3,
      // });

      const previousAccSums =
        counter === 0 ? demoDataCollection[2].accounts : demoDataCollection[counter - 1].accounts;
      const wrapPreviousAccSums = gsap.utils.wrap(
        previousAccSums.map((el) => el.sum)
      );
      const wrapCurrentAccSums = gsap.utils.wrap(
        currentBank.accounts.map((el) => el.sum)
      );

      //animate account sums
      firstTimeline.current.fromTo(
        summaryAccSumRef.current,
        { textContent: wrapPreviousAccSums, opacity: 0 },
        {
          textContent: wrapCurrentAccSums,
          opacity: 1,
          snap: { textContent: 1 },
          stagger: 0.2,
          duration: 0.2,
          delay: 0.2,
        }
      );
      /* #endregion */

      /* #region  TRANSACTONS LIST */
      const previousTransactions =
        counter === 0 ? demoDataCollection[2].transactions : demoDataCollection[counter - 1].transactions;
      const wrapPrevious = gsap.utils.wrap(previousTransactions);
      const wrapCurrent = gsap.utils.wrap(currentBank.transactions);

      firstTimeline.current.fromTo(
        transactionsRef.current,
        { textContent: prevCountRef.current === -1 ? 0 : wrapPrevious },
        {
          textContent: wrapCurrent,
          snap: { textContent: 1 },
          stagger: 0.3,
          duration: 0.2,
        }
      );
      /* #endregion */

      /* #region  TRANSACTIONS TOTAL */
      const previousTransTotal =
        counter === 0 ? countTransTotal(2) : countTransTotal(counter - 1);
      firstTimeline.current.fromTo(
        transactionsTotalRef.current,
        { textContent: prevCountRef.current === -1 ? 0 : previousTransTotal },
        {
          textContent: countTransTotal(counter),
          duration: 0.1,
          ease: 'ease.in',
          snap: { textContent: 1 },
          delay: 0.2,
        }
      );
      /* #endregion */
    }
  }, [currentBank]);
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
      ref={pauseRef}
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
          <SummaryCard
            chartData={currentBank}
            summaryAccTypeRef={summaryAccSumRef}
            summaryAccSumRef={summaryAccSumRef}
          />
        </div>

        <div className='flex flex-col gap-y-3 md:w-1/2'>
          <TransactionsCard
            chartData={currentBank}
            transactionsRef={transactionsRef}
            transactionsTotalRef={transactionsTotalRef}
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
const SummaryCard = ({
  chartData,
  summaryAccTypeRef,
  summaryAccSumRef,
}: {
  chartData: DemoData;
  summaryAccTypeRef: MutableRefObject<any[]>;
  summaryAccSumRef: MutableRefObject<any[]>;
}) => {
  const { mode } = useTheme();

  const accountSums = chartData.accounts.map(({ sum }) => sum);
  const accountTypes = chartData.accounts.map(({ type }) => type);

  const data: IncomingData = {
    labels: accountTypes,
    label: '',
    data: [accountSums],
  };

  return (
    <Card className='col-span-4 col-start-1 row-span-2 row-start-3 hidden md:block '>
      <header
        className={clsx(
          'bg-gray-600/50',
          'mb-2 w-full px-4 py-1',
          'inline-flex items-center gap-1'
        )}
      >
        <MdSwitchAccount className='h-6 w-6' />
        <h6 className='text-sm font-semibold drop-shadow-md'>Accounts</h6>
      </header>

      <div className='flex flex-col items-start gap-2 py-1'>
        <ul className='inline-flex w-80 gap-1 px-2'>
          {accountTypes.map((type, i) => (
            <li
              key={type}
              className={clsx(
                'drop-shadow-md transition-all duration-200',
                'rounded-md border px-3 py-1 ',
                mode === 'light' ? 'border-dark/50 ' : 'border-gray-400/50 ',
                'bg-gray-600/30'
              )}
            >
              <h6
                className='whitespace-nowrap text-sm drop-shadow-md '
                ref={(el) => (summaryAccTypeRef.current[i] = el)}
              />
            </li>
          ))}
        </ul>

        <div className='flex w-full items-center justify-between pr-4'>
          <ul className='flex w-1/3 flex-col items-start gap-1 self-start sm:w-4/6'>
            {chartData.accounts.map(({ type, sum }, i) => (
              <SummaryData
                key={`summary-${i}`}
                chartData={chartData}
                summaryAccTypeRef={summaryAccTypeRef}
                summaryAccSumRef={summaryAccSumRef}
                i={i}
              />
            ))}
          </ul>

          <div className='flex w-2/3 justify-end'>
            <div className='h-full w-5/6'>
              <PieChart incomingData={data} delay={1600} />
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

const SummaryData = ({
  chartData,
  summaryAccTypeRef,
  summaryAccSumRef,
  i,
}: {
  chartData: DemoData;
  summaryAccTypeRef: MutableRefObject<any[]>;
  summaryAccSumRef: MutableRefObject<any[]>;
  i: number;
}) => {
  const { mode } = useTheme();
  return (
    <li
      className={clsx(
        'flex w-full items-center justify-between',
        'rounded-tr rounded-br px-2',
        'border-t border-r border-b',
        mode === 'light' ? 'border-dark/50' : 'border-gray-400/50',
        mode === 'light' ? 'bg-gray-400/50' : 'bg-gray-700/50'
      )}
    >
      <div className='inline-flex items-center gap-2'>
        <span
          className={clsx(
            'h-3 w-3  rounded-full',
            i === 0 ? 'bg-stone-300' : i === 1 ? 'bg-stone-500' : 'bg-stone-700'
          )}
        />
      </div>
      <div className='flex w-24 items-center justify-between'>
        <h6 className='ml-3 font-mono font-normal'>$</h6>
        <h6
          className='text-md font-mono font-normal uppercase'
          ref={(el) => (summaryAccSumRef.current[i] = el)}
        />
      </div>
    </li>
  );
};

/* #endregion */

/* #region  CHART CARD */
const ChartCard = ({ chartData }: { chartData: DemoData }) => {
  const dataset = chartData.dynamic;
  const labels = months
    .filter((month, i) => i < dataset.length)
    .map((month) => month.slice(0, 3));

  const data: IncomingData = {
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
const TransactionsCard = ({
  chartData,
  transactionsRef,
  transactionsTotalRef,
}: {
  chartData: DemoData;
  transactionsRef: MutableRefObject<any[]>;
  transactionsTotalRef: MutableRefObject<any>;
}) => {
  return (
    <Card className='col-span-2 col-start-3 row-span-3 row-start-5 hidden w-full md:block'>
      <header
        className={clsx(
          'bg-gray-600/50',
          'mb-2 w-full px-4 py-1',
          'inline-flex items-center gap-1'
        )}
      >
        <CgArrowsExchange className='h-6 w-6' />
        <h6 className='text-sm font-semibold drop-shadow-md'>Transactions</h6>
      </header>
      <div className='flex flex-col items-start justify-start gap-3 px-4 py-1'>
        <ul className='flex w-5/6 flex-col gap-1'>
          {chartData.transactions.map((amount, i) => (
            <TransactionItem
              transactionsRef={transactionsRef}
              amount={amount}
              key={`${amount}`}
              i={i}
            />
          ))}
        </ul>

        <li className='my-2 mb-1 flex w-5/6 items-center justify-between px-1'>
          <h4 className='text-center text-sm drop-shadow-md'>Total:</h4>
          <div className='flex items-center justify-start'>
            <h6 className='font-mono text-xl font-normal drop-shadow-md'>$</h6>
            <h6
              className='font-mono text-xl font-normal drop-shadow-md'
              ref={transactionsTotalRef}
            >
              {chartData.bank === 'XXXX XXX XXXX' ? '0000' : ''}
            </h6>
          </div>
        </li>
      </div>
    </Card>
  );
};

const TransactionItem = ({
  transactionsRef,
  amount,
  i,
}: {
  transactionsRef: MutableRefObject<any[]>;
  amount: number;
  i: number;
}) => {
  const { mode } = useTheme();
  return (
    <li
      className={clsx(
        'flex w-full items-center justify-between',
        'rounded border px-2',
        mode === 'light' ? 'border-dark/50' : 'border-gray-400/50',
        mode === 'light' ? 'bg-gray-400/50' : 'bg-gray-700/50'
      )}
    >
      <h6 className='text-md font-serif font-normal drop-shadow-md'>
        #{i + 1}
      </h6>
      <div className={clsx('flex w-20 items-center justify-between rounded')}>
        <h6 className='ml-3 font-mono font-normal drop-shadow-md'>$</h6>
        <h6
          className=' transactions text-left font-mono font-normal drop-shadow-md'
          ref={(el) => (transactionsRef.current[i] = el)}
        >
          {amount}
        </h6>
      </div>
    </li>
  );
};

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

function countTransTotal(index: number) {
  return demoDataCollection[index].transactions
    .map((n) => n)
    .reduce((a: number, b: number) => a + b);
}
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
