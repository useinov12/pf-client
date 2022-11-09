import React from 'react';
import clsx from 'clsx';
import gsap from 'gsap';
import Card from './Card';
import LineChart from '../../charts/LineChart';
import useInterval from '@/hooks/useInterval';
import '@/lib/swapText';

const AccountsCard = () => {
  const accountType = React.useRef<HTMLDivElement>(null);

  const timeline = React.useRef(gsap.timeline());

  const accounts = ['Checking', 'Saving', 'Credit'];
  const [counter, setCounter] = React.useState(0);

  useInterval(() => {
    setCounter((prev) => (prev === 2 ? 0 : prev + 1));
  }, 3000);

  React.useEffect(() => {
    gsap.ticker.lagSmoothing(false);
    timeline.current.swapText(accountType.current, {
      text: accounts[counter],
      duration: 0.4,
    });
  }, [counter]);

  return (
    <Card
      className='h-full w-full'
    >
      <div className='flex h-full w-full flex-col items-start p-2 '>
       <h6 className='mb-1 text-lg pl-2 font-semibold drop-shadow-md'>
          Accounts
        </h6>

        <div className='w-full flex flex-col md:flex-row  gap-2'>
          <ul className='sm:my-1 flex gap-x-2 flex-wrap sm:flex-nowrap'>
            {accounts.map((account, i) => (
              <li className='group flex cursor-pointer flex-col items-center' key={account+i}>
                <span
                  className={clsx(
                      'text-sm drop-shadow-md transition-all duration-200',
                      'my-1 rounded-md border-2 border-gray-300 px-2 py-1 whitespace-nowrap',
                      accounts[counter] === account
                        ? 'ring-4 ring-sky-500'
                        : 'ring-4 ring-transparent'
                  )}
                >
                  Acc #{i + 1}
                </span>
              </li>
            ))}
          </ul>
          <div className='my-2 flex items-center justify-between gap-5'>
            <div className='ml-2 flex flex-wrap items-baseline gap-2'>
              <h6 className=' text-sm font-semibold drop-shadow-md'>
                Account type:
              </h6>
              <h2
                className='font-serif text-xl font-normal uppercase sm:text-lg'
                ref={accountType}
              />
            </div>
        </div>
        </div>

        <div className='h-full w-full'>
          <LineChart
            width='100%'
            height='100%'
            externalData={data[counter]}
            delay={0}
          />
        </div>
      </div>
    </Card>
  );
};

export default AccountsCard;

const data = [
  [1200, 3900, 7400, 4800, 4100, 900, 8700, 3200],
  [4200, 1700, 1400, 1800, 1100, 3900, 4700, 9200],
  [7200, 300, 4400, 8800, 8100, 9900, 1700, 4200],
];
