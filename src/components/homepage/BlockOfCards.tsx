import React from 'react';
import gsap from 'gsap';
import clsx from 'clsx';
import Card from './Card';
import PieChart from '../charts/PieChart';
import LineChart from '../charts/LineChart';
import BarChart from '../charts/BarChart';

const BlockOfCards = () => {
  const [chartData, setChartData] = React.useState(skeletonData);
  const [counter, setCounter] = React.useState(-1);

  const prevCountRef = React.useRef(counter);

  const firstTimeline = React.useRef(gsap.timeline());
  const secondTimeline = React.useRef(gsap.timeline());

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
    const delay = counter === -1 ? 3000 : 5400;

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

      firstTimeline.current.to(pauseRef.current, { delay: 0.7 });
      secondTimeline.current.to(pauseRef.current, { delay: 0.7 });

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
          stagger: 0.2,
          duration: 0.2,
          delay: 0.2,
        }
      );
      /* #endregion */

      /* #region  Transactions Total */
      const previousTransTotal =
        counter === 0 ? countTransTotal(2) : countTransTotal(counter - 1);
      firstTimeline.current.fromTo(
        transactionsTotalRef.current,
        { textContent: previousTransTotal },
        {
          textContent: countTransTotal(counter),
          duration: 0.1,
          ease: 'ease.in',
          snap: { textContent: 1 },
          delay: 0.2,
        }
      );
      /* #endregion */

      firstTimeline.current.to(pauseRef.current, { delay: 1 });

      /* #region  Summary Card */
      const wrapCurrentAccTypes = gsap.utils.wrap(
        chartData.accounts.map((el) => el.type)
      );

      //animate account types
      secondTimeline.current.fromTo(
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
      secondTimeline.current.fromTo(
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
    }
  }, [chartData]);
  /* #endregion */

  return (
    <div
      className='float-right flex  flex-col text-dark 
      sm:grid sm:grid-rows-12 
      gap-x-5 gap-y-2 p-3 w-max lg:w-full 
      transition-all duration-300
      rounded-xl drop-shadow shadow-inner 
      ring-4 ring-white bg-gray-100'
      ref={pauseRef}
    >
      <div className='inline-flex items-center gap-2 mb-2 ml-2'>
        <div className='h-3 w-3 bg-red-500/90 rounded-full drop-shadow '/>
        <div className='h-3 w-3 bg-yellow-500/90 rounded-full drop-shadow '/>
        <div className='h-3 w-3 bg-green-500/90 rounded-full drop-shadow '/>
      </div>
      {/* ============ BANKS CARD ============ */}
      <Card className='col-span-4 col-start-1'>
        <div className='flex justify-between py-1 px-4'>
          <div className='flex flex-col justify-start w-1/2'>
            <h6 className='drop-shadow-md font-semibold mb-1 text-sm'>Connected Banks:</h6>
            <ul className='flex flex-wrap'>
              {data.map(({ bank }) => (
                <li
                  key={bank}
                  className={clsx(
                    'drop-shadow-md transition-all duration-200',
                    'my-1 mr-2 rounded-md border-2 border-gray-300 px-2 py-1 ring-4 ring-transparent',
                    bank === chartData.bank ? 'ring-4 ring-sky-500' : ''
                  )}
                >
                  <h6 className='font-serif drop-shadow-md'>{bank}</h6>
                </li>
              ))}
            </ul>
          </div>

          
          <div
            className='flex w-1/2 flex-col items-center justify-center rounded' 
          >
            <h3
              className='font-serif text-lg uppercase drop-shadow-md font-normal'
              ref={bankNameRef}
            >
              xxxxxxx
            </h3>
            <div className='mb-1 h-[2px] w-5/6 self-center rounded bg-gray-300 ' />
            <div className='flex items-baseline gap-3 justify-start  w-5/6'>

              <h4 className='text-center text-sm drop-shadow-md'>Balance:</h4>

              <div className='mt-2 flex items-center justify-start gap-5'>
                <h2 className='font-mono text-4xl drop-shadow-md font-normal'>$</h2>
                <h2
                  className=' font-mono text-3xl uppercase drop-shadow-md font-light'
                  ref={bankTotalRef}
                >
                  {chartData.bank === 'XXXX XXX XXXX' ? '0' : ''}
                </h2>
              </div>
            </div>
          </div>
        </div>
      </Card>

        {/* ============ SUMMARY CARD ============ */}
      <Card className='col-span-4 col-start-1 row-span-2 row-start-3'>
        <div className='flex flex-col items-center px-4 py-1'>
        <h3 className='py-2 font-serif  text-lg uppercase drop-shadow-md font-normal'>
            Summary
        </h3>

          <div className='flex justify-between  w-full items-center'>

          <div className='w-2/6 flex justify-center'>
          <div className='w-1/2 h-full text-center'>
              <PieChart
                radius='30'
                externalData={chartData.accounts.map(({ sum }) => sum)}
                labels={chartData.accounts.map(({ type }) => type)}
                delay={2200}
              />
          </div>
          </div>
            <ul className='flex flex-col items-start self-start w-4/6'>
              
              {chartData.accounts.map(({ type, sum }, i) => (
                <li
                  className='my-[2px] flex w-full items-center justify-between 
                  px-2 drop-shadow-sm border-b border-gray-400'
                  key={`summary-${i}`}
                >
                  <div className='inline-flex items-center gap-2'>
                    <span className={clsx(
                      'h-2 w-2  rounded-full',
                      i === 0 ? 'bg-stone-300' : i=== 1? 'bg-stone-500' : 'bg-stone-700'
                    )}/>
                    <h6
                      className='font-serif text-lg font-semibold opacity-0'
                      ref={(el) => (summaryAccTypeRef.current[i] = el)}
                    >
                      {chartData.bank === 'XXXX XXX XXXX' ? 'XXXXXX' : ''}
                    </h6>
                  </div>
                  <div className='flex w-20 items-center justify-start'>
                    <h6 className='font-serif font-semibold'>$</h6>
                    <h6
                      className='font-serif text-lg font-semibold uppercase'
                      ref={(el) => (summaryAccSumRef.current[i] = el)}
                    />
                  </div>
                </li>
              ))}

            </ul>
          </div>

        </div>
      </Card>

      {/* ============ TRANSACTIONS CARD ============ */}
      <Card className='col-span-2 col-start-3 row-span-3 row-start-5 w-full' >
        <div className='flex flex-col items-center justify-start px-2 text-center'>
          <h3 className='py-2 font-serif  text-lg uppercase drop-shadow-md font-normal'>
            Transactions
          </h3>

          <ul className='flex w-5/6 flex-col '>
            {chartData.transactions.map((number, i) => (
              <li
                className='mb-1 flex items-center justify-between
                border-b border-gray-400'
                key={i}
              >
                <h6 className='text-md font-serif font-semibold drop-shadow-md'>
                  #{i + 1}
                </h6>
                <div className={clsx('flex w-20 items-center rounded')}>
                  <h6 className='font-serif font-semibold drop-shadow-md'>$</h6>
                  <h6
                    className=' transactions text-left font-serif font-semibold drop-shadow-md'
                    ref={(el) => (transactionsRef.current[i] = el)}
                  >
                    {number}
                  </h6>
                </div>
              </li>
            ))}
          </ul>

          <li className='my-2 mb-1 flex w-5/6 justify-between'>
            <h6 className='font-serif text-lg font-semibold drop-shadow-md'>
              TOTAL
            </h6>
            <div className='flex items-center justify-start'>
              <h6 className='font-mono text-xl font-semibold drop-shadow-md'>
                $
              </h6>
              <h6
                className='font-mono text-xl font-semibold drop-shadow-md'
                ref={transactionsTotalRef}
              >
                {chartData.bank === 'XXXX XXX XXXX' ? '0000' : ''}
              </h6>
            </div>
          </li>
        </div>
      </Card>


      {/* ============ CHARTS CARD ============ */}
      <Card className='col-span-2 row-span-3 col-start-1 w-full'>
        <div className='flex flex-col items-center'>
          <h4 className='py-2 font-serif text-lg font-normal uppercase'>Charts</h4>

          <div className='flex h-full w-full flex-col items-center justify-center '>
            <div className='h-28 w-5/6'>
              <LineChart
                width={'100%'}
                height={'100%'}
                externalData={chartData.dynamic}
                delay={2100}
              />
            </div>
            <div className='h-28 w-5/6'>
              <BarChart
                width={'100%'}
                height={'100%'}
                externalData={chartData.dynamic}
                delay={2300}
              />
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};
export default BlockOfCards;

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
      { type: 'Checking', sum: 500 },
    ],
    dynamic: [1000, 1200, 1400, 1800, 1400, 1600, 1700, 1900],
  },
  {
    bank: 'American Express',
    transactions: [-120, -500, 297, 300, 720, 30, 730],
    accounts: [
      { type: 'Saving', sum: 12000 },
      { type: 'Checking-1', sum: 2700 },
      { type: 'Checking-2', sum: 700 },
    ],
    dynamic: [2200, 1700, 1400, 1800, 1500, 1200, 1100, 1300],
  },
];
/* #endregion */
