import { useTheme } from '@/context/ThemeProvider';
import clsx from 'clsx';
import { MutableRefObject, useEffect, useRef } from 'react';
import { DemoData, demoDataCollection, Card } from './DemoCard';
import { BsPiggyBankFill } from 'react-icons/bs';
import gsap from 'gsap';

interface BanksCardProps {
  currentBank: DemoData;
  prevCounter: number;
  counter: number;
  masterTimeline: MutableRefObject<gsap.core.Timeline>;
}

export default function Banks({
  currentBank,
  counter,
  prevCounter,
  masterTimeline,
}: BanksCardProps) {
  const bankNameRef = useRef<HTMLDivElement>(null);
  const bankTotalRef = useRef<HTMLDivElement>(null);

  const dataWithSkeleton = [
    demoDataCollection[0],
    demoDataCollection[1],
    null,
    demoDataCollection[2],
    null,
  ];

  useEffect(() => {
    gsap.ticker.lagSmoothing(false);

    /* Bank Name */
    masterTimeline.current.swapText(bankNameRef.current, {
      text: currentBank.bank,
      delay: 0.5,
      duration: 0.3,
    });

    /* Bank Total */
    if (counter) {
      const previousTotal =
        counter === 0 ? countTotal(2) : countTotal(counter - 1);
      masterTimeline.current.fromTo(
        bankTotalRef.current,
        { textContent: prevCounter === -1 ? 0 : previousTotal },
        {
          textContent: countTotal(counter),
          duration: 0.7,
          ease: 'ease.in',
          snap: { textContent: 100 },
          delay: 0.2,
        }
      );
    }
  }, [currentBank]);

  return (
    <Card className='col-span-4 col-start-1 w-full overflow-hidden'>
      <header
        className={clsx(
          'bg-gray-600/50',
          'mb-2 w-full px-4 py-1',
          'inline-flex items-center gap-1'
        )}
      >
        <BsPiggyBankFill className='h-6 w-6' />
        <h6 className='text-sm font-semibold drop-shadow-md'>
          Connected Banks
        </h6>
      </header>

      <section className='flex flex-col justify-between py-1 px-4 '>
        <div className='mb-3 flex flex-col items-start justify-start gap-2'>
          <ul className='flex w-[28rem] flex-wrap gap-[6px]'>
            {dataWithSkeleton.map((data, i) => (
              <BankChip
                key={data ? data.bank : i}
                bank={data ? data.bank : null}
                bankData={currentBank}
              />
            ))}
          </ul>
        </div>

        <div
          className='flex flex-col items-center 
            justify-center rounded  '
        >
          <div className='flex w-5/6 items-baseline justify-between px-3'>
            <h4 className='text-center text-sm drop-shadow-md'>Balance:</h4>
            <div className='mt-2 flex items-center justify-start gap-5'>
              <h2 className='font-mono text-3xl font-normal drop-shadow-md'>
                $
              </h2>
              <h2
                className=' font-mono text-2xl font-light uppercase drop-shadow-md'
                ref={bankTotalRef}
              />
            </div>
          </div>
          <div className='mb-1 h-[2px] w-5/6 self-center rounded bg-gray-400 ' />
          <h3
            className='whitespace-nowrap font-serif text-xl 
                font-normal uppercase drop-shadow-md'
            ref={bankNameRef}
          >
            xxxxxxx
          </h3>
        </div>
      </section>
    </Card>
  );
}

const BankChip = ({
  bank,
  bankData,
}: {
  bank: string | null;
  bankData: DemoData;
}) => {
  const { mode } = useTheme();
  return (
    <li
      className={clsx(
        'drop-shadow-md transition-all duration-200',
        'rounded-md border px-3 py-1 ',
        mode === 'light' ? 'border-dark/50 ' : 'border-gray-400/50 ',

        bank === bankData.bank
          ? 'border-transparent bg-sky-500 text-white ring-4 ring-sky-600'
          : 'bg-gray-600/30 ring-4 ring-transparent'
      )}
    >
      {bank ? (
        <h6 className='whitespace-nowrap text-sm font-semibold drop-shadow-md'>
          {bank}
        </h6>
      ) : (
        <h6 className='cursor-default text-sm opacity-0'>skeleton-skeleton</h6>
      )}
    </li>
  );
};

function countTotal(index: number) {
  return demoDataCollection[index].accounts
    .map((acc) => acc.sum)
    .reduce((a: number, b: number) => a + b);
}
