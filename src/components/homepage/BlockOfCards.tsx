import React from 'react';
import gsap from 'gsap'
import clsx from 'clsx';
import Card from './Card';
import PieChart from '../charts/PieChart';
import LineChart from '../charts/LineChart';

// function numberWithCommas(x:any) {
//   return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
// }

const BlockOfCards = () => {
  const [chartData, setChartData] = React.useState(data[0]);
  const [counter, setCounter] = React.useState(0);

  function countTotal(index:number){
    return data[index].accounts
    .map((acc) => acc.sum)
    .reduce((a: number, b: number) => a + b)
  }

  React.useEffect(() => {
    const timer = setInterval(() => {
      setCounter((prev) => (prev >= 2 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  React.useEffect(() => {
    setChartData(data[counter]);
  }, [counter]);


  React.useEffect(()=>{
    const previousTotal = counter === 0 ? countTotal(2) : countTotal(counter-1);
    const timeline = gsap.timeline();
    timeline.from('#total', {
      textContent: previousTotal,
      duration: .7,
      ease: "ease.in",
      snap: { textContent: 100, },
      delay:.3
    });
  },[chartData])


  return (
    <div
      className='grid-rows-12 float-right flex h-full
          w-full flex-col 
          gap-x-5 gap-y-2 text-dark sm:grid lg:w-5/6'
    >
      <Card className='col-span-4'>
        <div className='flex justify-between py-1 px-2'>
          <div className='flex w-1/2 flex-col justify-start'>
            <h4 className=' font-serif'>Connected Banks:</h4>
            <ul className='flex flex-wrap'>
              {data.map(({ bank }) => (
                <li
                  key={bank}
                  className={clsx(
                    'transition-all duration-150',
                    'my-1 mr-2 rounded-md border border-gray-300 px-2 py-1',
                    bank === chartData.bank ? 'border-2 border-primary-500' : ''
                  )}
                >
                  <h6 className='font-serif'>{bank}</h6>
                </li>
              ))}
            </ul>
          </div>
          <div className='flex w-1/2 flex-col justify-start'>
            <h4 className='font-serifs'>Current Bank:</h4>
            <h3 className='font-serif text-lg uppercase '>Bank of America</h3>
            <div className='mt-2 flex gap-5 items-center justify-center'>
              <h2 className='font-mono text-4xl'>$</h2>
              <h2 className=' font-serif uppercase text-4xl' id={'total'} >
                { chartData.accounts
                  .map((acc) => acc.sum)
                  .reduce((a: number, b: number) => a + b)
                }
              </h2>
            </div>
          </div>
        </div>
      </Card>

      <Card className='col-span-2 row-span-3 row-start-3'>
        <div className='flex flex-col items-center justify-start px-2 text-center'>
          <h3 className='py-2 font-serif  text-lg uppercase'>Transactions</h3>
          <div className='mb-1 h-[2px] w-5/6 self-center rounded bg-gray-300' />

          <ul className='flex w-5/6 flex-col '>
            {chartData.transactions.map((number, i) => (
              <li className='mb-1 flex justify-between' key={i}>
                <h6 className='text-md font-serif font-semibold'>#{i + 1}</h6>
                <h6 className='w-24 text-left font-serif font-semibold'>
                  $ {number.toFixed(2)}
                </h6>
              </li>
            ))}
          </ul>
          <div className='mb-1 h-[2px] w-5/6 self-center rounded bg-gray-300' />

          <li className='my-2 mb-1 flex w-5/6 justify-between'>
            <h6 className='font-serif text-lg font-semibold'>TOTAL</h6>
            <h6 className='font-mono text-xl font-semibold'>
              ${chartData.transactions.reduce((a: number, b: number) => a + b)}
            </h6>
          </li>
        </div>
      </Card>

      <Card className='col-span-2 col-start-3 row-span-2'>
        <div className='flex flex-col items-center px-2 py-1'>
          <h4 className='py-1 font-serif text-lg uppercase'>Summary</h4>
          <div className='mb-1 h-[2px] w-5/6 self-center rounded bg-gray-300' />
          <ul className='flex w-5/6 flex-col items-start'>
            {chartData.accounts.map(({ type, sum }) => (
              <li className='flex w-full items-center justify-between'>
                <h6 className=' font-serif text-lg font-semibold'>{type}</h6>
                <h6 className='font-serif text-lg uppercase'>${sum}</h6>
              </li>
            ))}
          </ul>
        </div>
      </Card>

      <Card className='col-span-2 row-span-3'>
        <div className='flex flex-col items-center'>
          <h4 className='py-2 font-serif text-lg uppercase'>Charts</h4>
          <div className='mb-2 h-[2px] w-5/6 self-center rounded bg-gray-300' />

          <div className='flex h-full w-full flex-col items-center justify-center '>
            <div className='h-28 w-5/6'>
              <LineChart width={'100%'} height={'100%'} />
            </div>

            <div className='flex w-[90%] justify-between'>
              <ul className='flex flex-col justify-center'>
                {chartData.accounts.map(({ type, sum }, i) => (
                  <li className='' key={i}>
                    <h6 className='font-serif text-sm font-semibold'>
                      {type}:{' '}
                      {(
                        (sum * 100) /
                        chartData.accounts
                          .map(({ sum }) => sum)
                          .reduce((a, b) => Math.abs(a) + Math.abs(b))
                      ).toFixed(2)}
                      %
                    </h6>
                  </li>
                ))}
              </ul>
              <div className='h-36 w-1/2'>
                <PieChart
                  radius='50'
                  data={chartData.accounts.map(({ sum }) => sum)}
                  labels={chartData.accounts.map(({ type }) => type)}
                />
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default BlockOfCards;

const data = [
  {
    bank: 'Bank of America',
    transactions: [-23, -17, -85, 400, -120, -30, 730],
    accounts: [
      { type: 'Checking', sum: 4200 },
      { type: 'Saving', sum: 9700 },
      { type: 'Credit', sum: -1700 },
    ],
  },
  {
    bank: 'Capital One',
    transactions: [-23, -17, -85, 400, -120, -30, 730],
    accounts: [
      { type: 'Credit', sum: -2200 },
      { type: 'Saving', sum: 5000 },
      { type: 'Checking', sum: 500 },
    ],
  },
  {
    bank: 'American Express',
    transactions: [-1200, -5000, 2970, 3000, 7200, 300, 4730],
    accounts: [
      { type: 'Saving', sum: 12000 },
      { type: 'Checking', sum: 2700 },
      { type: 'Checking #2', sum: 700 },
    ],
  },
];
