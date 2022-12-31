import gsap from 'gsap';
import clsx from 'clsx';
import { useTheme } from '@/context/ThemeProvider';
import { MutableRefObject, useEffect, useRef } from 'react';
import { DemoData, demoDataCollection, Card, DemoCardProps } from './DemoCard';
import { CgArrowsExchange } from 'react-icons/cg';

interface TransactionsCardProps extends DemoCardProps {
  currentBank: DemoData;
}

export default function Transactions({
  currentBank,
  counter,
  prevCounter,
  masterTimeline,
}: TransactionsCardProps) {
  const transactionsRef = useRef(new Array(4));
  const transactionsTotalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const previousTransactions =
      counter === 0
        ? demoDataCollection[2].transactions
        : demoDataCollection[counter - 1].transactions;
    const wrapPrevious = gsap.utils.wrap(previousTransactions);
    const wrapCurrent = gsap.utils.wrap(currentBank.transactions);

    masterTimeline.current.fromTo(
      transactionsRef.current,
      { textContent: prevCounter === -1 ? 0 : wrapPrevious },
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
    masterTimeline.current.fromTo(
      transactionsTotalRef.current,
      { textContent: prevCounter === -1 ? 0 : previousTransTotal },
      {
        textContent: countTransTotal(counter),
        duration: 0.1,
        ease: 'ease.in',
        snap: { textContent: 1 },
        delay: 0.2,
      }
    );
  }, [currentBank]);

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
          {currentBank.transactions.map((amount, i) => (
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
              {currentBank.bank === 'XXXX XXX XXXX' ? '0000' : ''}
            </h6>
          </div>
        </li>
      </div>
    </Card>
  );
}

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

function countTransTotal(index: number) {
  return demoDataCollection[index].transactions
    .map((n) => n)
    .reduce((a: number, b: number) => a + b);
}
