import clsx from 'clsx';
import { useTheme } from '@/context/ThemeProvider';
import { MutableRefObject, useEffect, useRef } from 'react';
import { Card, DemoCardProps } from './DemoCard';
import { demoDataCollection, Transaction } from './demoData';
import { CgArrowsExchange } from 'react-icons/cg';

export default function Transactions({
  currentBank,
  counter,
  prevCounter,
  masterTimeline,
}: DemoCardProps) {
  const transactionsTypeRef = useRef<HTMLHeadingElement[] | null[]>(
    new Array(4)
  );
  const transactionsAmountRef = useRef<HTMLHeadingElement[] | null[]>(
    new Array(4)
  );
  const transactionsTotalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    currentBank.transactions.map((item, i) => {
      /*  animate list of transactions types */
      masterTimeline.current.fromTo(
        transactionsTypeRef.current[i],
        { opacity: 0 },
        { opacity: 1, duration: 0.2, stagger: 0.3 }
      );

      /*  animate list of transactions sums */
      masterTimeline.current.fromTo(
        transactionsAmountRef.current[i],
        { opacity: 0 },
        { opacity: 1, duration: 0.2, stagger: 0.3 }
      );
    });

    /* animate transactions total */
    const previousTransTotal =
      counter === 0 ? countTransTotal(2) : countTransTotal(counter - 1);
    masterTimeline.current.fromTo(
      transactionsTotalRef.current,
      { textContent: prevCounter === -1 ? 0 : previousTransTotal },
      {
        textContent: countTransTotal(counter),
        duration: 0.3,
        ease: 'ease.in',
        snap: { textContent: 1 },
        delay: 0.2,
      }
    );
  }, [currentBank]);

  return (
    <Card className='block w-full'>
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
      <div className='flex flex-col items-start justify-start gap-3 py-1 pr-4'>
        <ul className='flex w-5/6 flex-col gap-1'>
          {currentBank.transactions.map((trans, i) => (
            <TransactionItem
              transactionsAmountRef={transactionsAmountRef}
              transactionsTypeRef={transactionsTypeRef}
              transactionData={trans}
              key={`${trans.amount}`}
              idx={i}
            />
          ))}
        </ul>

        <div className='inline-flex w-full items-center justify-between px-7 pl-4'>
          <h4 className='text-center text-sm drop-shadow-md'>Total:</h4>
          <div className='flex items-center justify-start'>
            <h6 className='font-mono text-xl font-normal drop-shadow-md'>$</h6>
            <h6
              className='font-mono text-xl font-normal drop-shadow-md'
              ref={transactionsTotalRef}
            />
          </div>
        </div>
      </div>
    </Card>
  );
}

const TransactionItem = ({
  transactionsAmountRef,
  transactionsTypeRef,
  transactionData,
  idx,
}: {
  transactionsAmountRef: MutableRefObject<any[]>;
  transactionData: Transaction;
  transactionsTypeRef: MutableRefObject<any[]>;
  idx: number;
}) => {
  const { mode } = useTheme();
  return (
    <li
      className={clsx(
        'flex w-60 items-center justify-between',
        'rounded-tr rounded-br px-2',
        'border-t border-r border-b',
        mode === 'light' ? 'border-dark/50' : 'border-gray-400/50',
        mode === 'light' ? 'bg-gray-400/50' : 'bg-gray-700/50'
      )}
    >
      <h6
        className={clsx(
          'opacity-0', // opacity at 0 -> handaled by gsap
          'text-md font-normaldrop-shadow-md '
        )}
        ref={(el) => (transactionsTypeRef.current[idx] = el)}
      >
        {transactionData.type}
      </h6>

      <div className={clsx('flex w-20 items-center justify-between rounded')}>
        <h6 className='ml-3 font-mono font-normal drop-shadow-md'>$</h6>
        <h6
          className={clsx(
            'opacity-0 ', // opacity at 0 -> handaled by gsap
            'text-left font-mono font-normal drop-shadow-md'
          )}
          ref={(el) => (transactionsAmountRef.current[idx] = el)}
        >
          {transactionData.amount}
        </h6>
      </div>
    </li>
  );
};

function countTransTotal(index: number) {
  return demoDataCollection[index].transactions
    .map((n) => n.amount)
    .reduce((a: number, b: number) => a + b);
}
