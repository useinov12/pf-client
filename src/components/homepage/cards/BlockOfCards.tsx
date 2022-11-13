import React from 'react';
import gsap from 'gsap';
import clsx from 'clsx';
import Card from './Card';
import PieChart from '../../charts/PieChart';
import LineChart from '../../charts/LineChart';
import BarChart from '../../charts/BarChart';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import '@/lib/swapText';

gsap.registerPlugin(ScrollTrigger);

interface ChartData {
  bank: string;
  transactions: number[];
  accounts: {
    type: string;
    sum: number;
  }[];
  dynamic: number[];
}

const BlockOfCards = () => {
  const [chartData, setChartData] = React.useState<ChartData>(skeletonData);
  const [counter, setCounter] = React.useState(-1);

  const prevCountRef = React.useRef(counter);

  const firstTimeline = React.useRef(gsap.timeline());

  /* #region  Animated elements refs */
  const bankNameRef = React.useRef<HTMLDivElement>(null);
  const bankTotalRef = React.useRef<HTMLDivElement>(null);

  const pauseRef = React.useRef<HTMLDivElement>(null);

  const transactionsRef = React.useRef(new Array(7));
  const transactionsTotalRef = React.useRef<HTMLDivElement>(null);

  const summaryAccTypeRef = React.useRef(new Array(3));
  const summaryAccSumRef = React.useRef(new Array(3));
  /* #endregion */

  /* #region  Timer */
  /** Update counter every x seconds */
  React.useEffect(() => {
    gsap.ticker.lagSmoothing(false);
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
  React.useEffect(() => {
    if (counter !== -1) {
      setChartData(data[counter]);
    }
  }, [counter]);
  /* #endregion */

  /* #region  Animation Sequence */
  React.useLayoutEffect(() => {
    if (counter !== -1) {
      /* #region  Bank name */
      firstTimeline.current.swapText(bankNameRef.current, {
        text: chartData.bank,
        delay: 0.5,
        duration: 0.3,
      });
      /* #endregion */

      /* #region  Bank Total */
      const previousTotal =
        counter === 0 ? countTotal(2) : countTotal(counter - 1);
      firstTimeline.current.fromTo(
        bankTotalRef.current,
        { textContent: prevCountRef.current === -1 ? 0 : previousTotal },
        {
          textContent: countTotal(counter),
          duration: 0.7,
          ease: 'ease.in',
          snap: { textContent: 100 },
          delay: 0.2,
        }
      );
      /* #endregion */

      /* #region  SUMMARY CARD */
      const wrapCurrentAccTypes = gsap.utils.wrap(
        chartData.accounts.map((el) => el.type)
      );

      //animate account types
      firstTimeline.current.fromTo(
        summaryAccTypeRef.current,
        { textContent: wrapCurrentAccTypes, opacity: 0 },
        {
          textContent: wrapCurrentAccTypes,
          opacity: 1,
          stagger: 0.2,
          duration: 0.2,
          delay: 0.2,
        }
      );

      const previousAccSums =
        counter === 0 ? data[2].accounts : data[counter - 1].accounts;
      const wrapPreviousAccSums = gsap.utils.wrap(
        previousAccSums.map((el) => el.sum)
      );
      const wrapCurrentAccSums = gsap.utils.wrap(
        chartData.accounts.map((el) => el.sum)
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

      /* #region  Transactions List */
      const previousTransactions =
        counter === 0 ? data[2].transactions : data[counter - 1].transactions;
      const wrapPrevious = gsap.utils.wrap(previousTransactions);
      const wrapCurrent = gsap.utils.wrap(chartData.transactions);

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

      /* #region  Transactions Total */
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
  }, [chartData]);
  /* #endregion */

  return (
    <div
      className='sm:grid-rows-12 float-right flex h-auto w-full
      flex-col gap-x-5
      gap-y-2 rounded-xl bg-gray-50 p-3 text-dark 
      shadow-inner
      ring-white drop-shadow transition-all 
      duration-300 sm:grid'
      ref={pauseRef}
    >
      <div className='mb-2 ml-2 inline-flex items-center gap-2'>
        <div className='h-3 w-3 rounded-full bg-red-500/90 drop-shadow ' />
        <div className='h-3 w-3 rounded-full bg-yellow-400/90 drop-shadow ' />
        <div className='h-3 w-3 rounded-full bg-green-400/90 drop-shadow ' />
      </div>

      <BankCard
        chartData={chartData}
        bankNameRef={bankNameRef}
        bankTotalRef={bankTotalRef}
      />

      <SummaryCard
        chartData={chartData}
        summaryAccTypeRef={summaryAccSumRef}
        summaryAccSumRef={summaryAccSumRef}
      />

      <ChartCard chartData={chartData} />

      <TransactionsCard
        chartData={chartData}
        transactionsRef={transactionsRef}
        transactionsTotalRef={transactionsTotalRef}
      />
    </div>
  );
};

export default BlockOfCards;

/* #region  BANK CARD */
const BankCard = ({
  chartData,
  bankNameRef,
  bankTotalRef,
}: {
  chartData: ChartData;
  bankNameRef: React.RefObject<HTMLDivElement>;
  bankTotalRef: React.RefObject<HTMLDivElement>;
}) => {
  return (
    <Card className='col-span-4 col-start-1' inner>
      <div className='flex flex-col justify-between py-1 px-4 sm:flex-row'>
        <div className='mb-3 flex flex-col justify-start sm:mb-0 sm:w-1/2'>
          <h6 className='mb-1 text-sm font-semibold drop-shadow-md'>
            Connected Banks:
          </h6>
          <ul className='flex w-full flex-wrap'>
            {data.map(({ bank }) => (
              <li
                key={bank}
                className={clsx(
                  'drop-shadow-md transition-all duration-200',
                  'my-1 mr-2 rounded-md border-2 border-gray-300 px-2 py-1 ',
                  bank === chartData.bank
                    ? 'ring-4 ring-sky-500'
                    : 'ring-4 ring-transparent'
                )}
              >
                <h6 className='whitespace-nowrap font-serif text-sm drop-shadow-md'>
                  {bank}
                </h6>
              </li>
            ))}
          </ul>
        </div>

        <div
          className='flex flex-col items-center 
        justify-center rounded sm:w-1/2 '
        >
          <h3
            className='whitespace-nowrap font-serif text-lg 
          font-normal uppercase drop-shadow-md'
            ref={bankNameRef}
          >
            xxxxxxx
          </h3>
          <div className='mb-1 h-[2px] w-5/6 self-center rounded bg-gray-300 ' />

          <div className='flex w-5/6 items-baseline justify-start  gap-3'>
            <h4 className='text-center text-sm drop-shadow-md'>Balance:</h4>

            <div className='mt-2 flex items-center justify-start gap-5'>
              <h2 className='font-mono text-3xl font-normal drop-shadow-md'>
                $
              </h2>
              <h2
                className=' font-mono text-2xl font-light uppercase drop-shadow-md'
                ref={bankTotalRef}
              >
                {chartData.bank === 'XXXX XXX XXXX' ? '0' : ''}
              </h2>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};
/* #endregion */

/* #region  SUMMARY CARD */
const SummaryCard = ({
  chartData,
  summaryAccTypeRef,
  summaryAccSumRef,
}: {
  chartData: ChartData;
  summaryAccTypeRef: React.MutableRefObject<any[]>;
  summaryAccSumRef: React.MutableRefObject<any[]>;
}) => {
  return (
    <Card
      className='col-span-4 col-start-1 row-span-2 row-start-3 hidden md:block '
      inner
    >
      <div className='flex flex-col items-center px-4 py-1'>
        <h3 className='py-2 font-serif  text-lg font-normal uppercase drop-shadow-md'>
          Summary
        </h3>

        <div className='flex  w-full  items-center justify-between'>
          <div className='flex w-2/6 justify-center'>
            <div className='h-full w-1/2 text-center'>
              <PieChart
                radius='30'
                externalData={chartData.accounts.map(({ sum }) => sum)}
                labels={chartData.accounts.map(({ type }) => type)}
                delay={1200}
              />
            </div>
          </div>
          <ul className='flex w-5/6 flex-col items-start self-start sm:w-4/6'>
            {chartData.accounts.map(({ type, sum }, i) => (
              <li
                className='my-[2px] flex w-full items-center justify-between 
              border-b border-gray-400 px-2 drop-shadow-sm'
                key={`summary-${i}`}
              >
                <div className='inline-flex items-center gap-2'>
                  <span
                    className={clsx(
                      'h-2 w-2  rounded-full',
                      i === 0
                        ? 'bg-stone-300'
                        : i === 1
                        ? 'bg-stone-500'
                        : 'bg-stone-700'
                    )}
                  />
                  <h6
                    className='sm:text-md font-mono text-sm font-normal opacity-0 '
                    ref={(el) => (summaryAccTypeRef.current[i] = el)}
                  >
                    {chartData.bank === 'XXXX XXX XXXX' ? 'XXXXXX' : ''}
                  </h6>
                </div>
                <div className='flex w-24 items-center justify-between'>
                  <h6 className='ml-3 font-mono font-normal'>$</h6>
                  <h6
                    className='text-md font-mono font-normal uppercase'
                    ref={(el) => (summaryAccSumRef.current[i] = el)}
                  />
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Card>
  );
};

/* #endregion */

/* #region  CHART CARD */
const ChartCard = ({ chartData }: { chartData: ChartData }) => {
  return (
    <Card
      className='col-span-4 col-start-1 row-span-3 w-full md:col-span-2'
      inner
    >
      <div className='flex flex-col items-center'>
        <h4 className='py-2 font-serif text-lg font-normal uppercase'>
          Charts
        </h4>

        <div className='flex h-full w-full flex-col items-center justify-center '>
          <div className='h-28 w-5/6'>
            <LineChart
              width={'100%'}
              height={'100%'}
              externalData={chartData.dynamic}
              delay={3200}
            />
          </div>
          <div className='h-28 w-5/6'>
            <BarChart
              width={'100%'}
              height={'100%'}
              externalData={chartData.dynamic}
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
  chartData: ChartData;
  transactionsRef: React.MutableRefObject<any[]>;
  transactionsTotalRef: React.MutableRefObject<any>;
}) => {
  return (
    <Card
      className='col-span-2 col-start-3 row-span-3 row-start-5 hidden w-full md:block'
      inner
    >
      <div className='flex flex-col items-center justify-start px-2 text-center'>
        <h3 className='py-2 font-serif  text-lg font-normal uppercase drop-shadow-md'>
          Transactions
        </h3>

        <ul className='flex w-5/6 flex-col '>
          {chartData.transactions.map((number, i) => (
            <li
              className='mb-1 flex items-center justify-between
            border-b border-gray-400'
              key={i}
            >
              <h6 className='text-md font-serif font-normal drop-shadow-md'>
                #{i + 1}
              </h6>
              <div
                className={clsx(
                  'flex w-20 items-center justify-between rounded'
                )}
              >
                <h6 className='ml-3 font-mono font-normal drop-shadow-md'>$</h6>
                <h6
                  className=' transactions text-left font-mono font-normal drop-shadow-md'
                  ref={(el) => (transactionsRef.current[i] = el)}
                >
                  {number}
                </h6>
              </div>
            </li>
          ))}
        </ul>

        <li className='my-2 mb-1 flex w-5/6 justify-between'>
          <h6 className='font-serif text-lg font-normal drop-shadow-md'>
            TOTAL
          </h6>
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
function countTotal(index: number) {
  return data[index].accounts
    .map((acc) => acc.sum)
    .reduce((a: number, b: number) => a + b);
}
function countTransTotal(index: number) {
  return data[index].transactions
    .map((n) => n)
    .reduce((a: number, b: number) => a + b);
}
/* #endregion */

/* #region  Data */
const skeletonData = {
  bank: 'XXXX XXX XXXX',
  transactions: [0, 0, 0, 0, 0, 0, 0],
  accounts: [
    { type: 'XXXXXX', sum: 0 },
    { type: 'XXXXXX', sum: 0 },
    { type: 'XXXXXX', sum: 0 },
  ],
  dynamic: [1000, 1000, 1000, 1000, 1000, 1000, 1000, 1000],
};

const data = [
  {
    bank: 'Bank of America',
    transactions: [-23, -17, -85, 400, -120, -30, 512],
    accounts: [
      { type: 'Checking', sum: 4200 },
      { type: 'Saving', sum: 9700 },
      { type: 'Credit', sum: -1700 },
    ],
    dynamic: [1200, 1700, 1400, 1800, 2100, 1900, 1700, 2200],
  },
  {
    bank: 'Capital One',
    transactions: [-403, -28, -159, 90, -320, 1230, 420],
    accounts: [
      { type: 'Credit', sum: -2200 },
      { type: 'Saving', sum: 5000 },
      { type: 'Checking', sum: 1100 },
    ],
    dynamic: [1000, 1200, 1400, 1800, 1400, 1600, 1700, 1200],
  },
  {
    bank: 'American Express',
    transactions: [-120, -500, 297, 300, 720, 30, 730],
    accounts: [
      { type: 'Saving', sum: 12000 },
      { type: 'Checking-1', sum: 2700 },
      { type: 'Checking-2', sum: 700 },
    ],
    dynamic: [2200, 1700, 1400, 1800, 1500, 1200, 1100, 1700],
  },
];
/* #endregion */