import React from 'react';
import clsx from 'clsx';
import gsap from 'gsap';
import Card from './Card';
import PieChart from '../../charts/PieChart';
import BarChart from '../../charts/BarChart';
import useInterval from '@/hooks/useInterval';
import '@/lib/swapText';

const BanksCard = () => {
  const banks = ['A', 'B', 'C', 'D'];
  const [counter, setCounter] = React.useState(0);

  useInterval(() => {
    setCounter((prev) => (prev === 3 ? 0 : prev + 1));
  }, 4000);

  return (
    <Card
      className={clsx(
        'h-[18rem] w-[20rem]',
        'sm:h-[18rem] sm:w-[25rem]',
        'lg:h-[20rem] lg:w-[32rem]'
      )}
    >
      <div className='h-full w-full p-2'>
        <ul className='my-1 flex justify-evenly'>
          {banks.map((bank, i) => (
            <li
              className='group flex cursor-pointer flex-col items-center'
              key={bank}
            >
              <span
                className={clsx(
                  'text-sm drop-shadow-md transition-all duration-200',
                  'my-1 rounded-md border-2 border-gray-300 px-4 py-1 ',
                  banks[counter] === bank
                    ? 'bg-transparent text-dark ring-2 ring-sky-500'
                    : 'bg-gray-300 text-gray-300 ring-2 ring-transparent'
                )}
              >
                $xxxx
              </span>
              <h4
                className={clsx(
                  'font-serif uppercase',
                  'text-gray-400 transition-all duration-150'
                )}
              >
                {banks[counter] === bank ? (
                  <>
                    <span className='text-dark'>bank </span>
                    <span
                      className={clsx(
                        banks[counter] === bank
                          ? 'text-sky-600 '
                          : 'text-gray-400'
                      )}
                    >
                      {banks[counter]}
                    </span>
                  </>
                ) : (
                  `bank ${'X'}`
                )}
              </h4>
            </li>
          ))}
        </ul>
        <div className='flex h-auto w-full items-end justify-around'>
          <div className='h-5/6 w-3/6 '>
            <BarChart width='100%' height='100%' externalData={data[counter]} />
          </div>
          <div className='h-auto w-2/6 self-end'>
            <PieChart radius='20' externalData={data[counter]} />
          </div>
        </div>
      </div>
    </Card>
  );
};

export default BanksCard;

const data = [
  [1200, 3900, 7400, 4800, 4100, 900, 8700, 3200],
  [4200, 1700, 1400, 1800, 1100, 3900, 4700, 9200],
  [7200, 700, 4400, 8800, 8100, 9900, 1700, 4200],
  [3700, 3200, 3900, 4700, 6200, 4900, 1200, 3900],
];
