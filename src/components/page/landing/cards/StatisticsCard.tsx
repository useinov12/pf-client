import React from 'react';
import clsx from 'clsx';
import gsap from 'gsap';
import Card from './Card';
import BarChart from '../../../charts/BarChart';
import useInterval from '@/hooks/useInterval';
import '@/lib/swapText';

const StatisticsCard = () => {
  const [counter, setCounter] = React.useState(0);

  const timeline = React.useRef(gsap.timeline());

  const days = ['Friday', 'Saturday', 'Sunday'];
  const currentDayRef = React.useRef<HTMLDivElement>(null);
  const averageDayRef = React.useRef<HTMLDivElement>(null);
  const datesRef = React.useRef(new Array(5));
  const amountRefs = React.useRef(new Array(5));
  const averegeRef = React.useRef<HTMLDivElement>(null);

  useInterval(() => {
    setCounter((prev) => (prev === 2 ? 0 : prev + 1));
  }, 5000);

  React.useEffect(() => {
    gsap.ticker.lagSmoothing(false);
    timeline.current.swapText(currentDayRef.current, {
      text: days[counter],
      duration: 0.4,
    });

    timeline.current.to(currentDayRef.current, { delay: 0.2 });
    data[counter].map((el, i) => {
      timeline.current
        .swapText(datesRef.current[i], {
          text: el.date,
          duration: 0.05,
          stagger: 0.1,
        })
        .swapText(amountRefs.current[i], {
          text: el.amount,
          duration: 0.05,
          stagger: 0.1,
        });
    });

    timeline.current.swapText(averageDayRef.current, {
      text: days[counter],
      duration: 0.1,
      stagger: 0.1,
    });

    const total = Array.from(data[counter], (day) => day.amount).reduce(
      (a, b) => a + b
    );
    const average = (total / data.length).toFixed(1);
    timeline.current.swapText(averegeRef.current, {
      text: average,
      duration: 0.1,
      stagger: 0.1,
    });
  }, [counter]);

  return (
    <Card
      className='h-full w-full lg:w-4/6'
    >
      <div className='flex h-full w-full flex-col items-center p-2'>
        <h6 className='mb-1 self-start pl-2 text-lg font-semibold drop-shadow-md'>
          Transactions
        </h6>
        <header className='my-2 flex w-5/6 items-center justify-between'>
          <h6 className='text-md mb-1 font-semibold drop-shadow-md'>
            Statistics by week day
          </h6>
          <div className='flex items-center gap-2'>
            <h6
              className='text-md mb-1 font-semibold drop-shadow-md'
              ref={currentDayRef}
            />
          </div>
        </header>
        <ul className='mb-2 flex w-5/6 flex-col'>
          {data[counter].map((data, i) => (
            <li
              className='my-1 flex cursor-default 
                        justify-between
                        border-b border-gray-500/20 px-10'
              key={data.date}
            >
              <h6
                className='font-mono font-normal text-mds'
                ref={(el) => (datesRef.current[i] = el)}
              />
              <div className='flex w-16 items-center justify-between'>
                <h6 className='font-mono text-mds font-normal'>$</h6>
                <h6
                  className='font-mono text-mds font-normal'
                  ref={(el) => (amountRefs.current[i] = el)}
                />
              </div>
            </li>
          ))}
        </ul>
        <div className='mb-3 flex w-full items-baseline justify-between lg:pl-10 gap-3'>
          <div className='font-semiblod flex items-baseline justify-start gap-1 font-mono text-md'>
            Average
            <h6 className='font-mono font-semibold' ref={averageDayRef} />
            total:{' '}
          </div>
          <div className='flex w-28 items-center justify-start'>
            <h5 className='font-mono text-lg font-semibold'>$</h5>
            <h5 className='font-mono text-lg font-semibold' ref={averegeRef} />
          </div>
        </div>
        <div className='h-1/4 w-full'>
          <BarChart
            width='100%'
            height='100%'
            externalData={data[counter].map((day) => Math.abs(day.amount))}
            labels={data[counter].map((day) => day.date)}
            delay={2000}
          />
        </div>
      </div>
    </Card>
  );
};

export default StatisticsCard;

const data = [
  [
    { date: '06/12', amount: -76 },
    { date: '06/19', amount: -28 },
    { date: '06/26', amount: -144 },
    { date: '07/02', amount: 45 },
    { date: '07/09', amount: -200 },
  ],
  [
    { date: '06/13', amount: -222 },
    { date: '06/20', amount: 120 },
    { date: '06/27', amount: -320 },
    { date: '07/03', amount: 918 },
    { date: '07/10', amount: -170 },
  ],
  [
    { date: '06/14', amount: -46 },
    { date: '06/21', amount: 660 },
    { date: '06/28', amount: -50 },
    { date: '07/04', amount: -212 },
    { date: '07/11', amount: -23 },
  ],
];
