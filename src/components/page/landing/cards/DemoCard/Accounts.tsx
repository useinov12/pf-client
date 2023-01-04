import {gsap} from '@/lib/gsap'
import clsx from 'clsx';
import { useTheme } from '@/context/ThemeProvider';
import { MutableRefObject, useEffect, useRef } from 'react';
import { Card, DemoCardProps } from './DemoCard';
import { demoDataCollection } from './demoData';
import { MdSwitchAccount } from 'react-icons/md';
import { ChartDataFormat } from '@/components/charts/types';
import PieChart from '@/components/charts/PieChart';

export default function Accounts({
  currentBank,
  counter,
  prevCounter,
  masterTimeline,
}: DemoCardProps) {

  //   const summaryAccTypeRef = useRef(new Array(3));
  const summaryAccSumRef = useRef(new Array(3));

  const accountSums = currentBank.accounts.map(({ sum }) => sum);
  const accountTypes = currentBank.accounts.map(({ type }) => type);

  const chartData: ChartDataFormat = {
    labels: accountTypes,
    label: '',
    data: [accountSums],
  };

  useEffect(() => {
    gsap.ticker.lagSmoothing(false);

    const wrapCurrentAccTypes = gsap.utils.wrap(
      currentBank.accounts.map((el) => el.type)
    );

    const previousAccSums =
      counter === 0
        ? demoDataCollection[2].accounts
        : demoDataCollection[counter - 1].accounts;
    const wrapPreviousAccSums = gsap.utils.wrap(
      previousAccSums.map((el) => el.sum)
    );
    const wrapCurrentAccSums = gsap.utils.wrap(
      currentBank.accounts.map((el) => el.sum)
    );

    //animate account sums
    masterTimeline.current.fromTo(
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
  }, [currentBank]);

  const accounts = [...accountTypes, null];

  return (
    <Card className='block'>
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
          {accounts.map((type, i) => (
            <AccountType idx={i} key={type} type={type} />
          ))}
        </ul>

        <div className='flex w-full items-center justify-between pr-4'>
          <ul className='flex w-1/3 flex-col items-start gap-1 self-start sm:w-4/6'>
            {currentBank.accounts.map(({ type, sum }, i) => (
              <Account summaryAccSumRef={summaryAccSumRef} accountIdx={i} key={`accounts-${i}`} />
            ))}
          </ul>

          <div className='flex w-2/3 justify-end'>
            <div className='h-full w-4/6'>
              <PieChart incomingData={chartData} delay={1600} />
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}

const AccountType = ({ idx, type }: { idx: number; type: string | null }) => {
  const { mode } = useTheme();
  return (
    <li
      className={clsx(
        'drop-shadow-md transition-all duration-200',
        'rounded-md border px-3 py-1 ',
        mode === 'light' ? 'border-dark/50 ' : 'border-gray-400/50 ',
        'bg-gray-600/30'
      )}
    >
      {type ? (
        <h6 className='whitespace-nowrap text-sm drop-shadow-md'>{type}</h6>
      ) : (
        <h6 className='whitespace-nowrap text-sm opacity-0'>
          skeleton-skeleton
        </h6>
      )}
    </li>
  );
};

const Account = ({
  summaryAccSumRef,
  accountIdx,
}: {
  summaryAccSumRef: MutableRefObject<any[]>;
  accountIdx: number;
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
      <div className='flex w-24 items-center justify-between'>
        <h6 className='ml-3 font-mono font-normal'>$</h6>
        <h6
          className='text-md font-mono font-normal uppercase'
          ref={(el) => (summaryAccSumRef.current[accountIdx] = el)}
        />
      </div>
    </li>
  );
};
