import React from 'react';
import clsx from 'clsx'; 
import Accent from '../Accent';
import PieChart from '../charts/PieChart';

const ExpensesCard: React.FC = () => {
  return (
    <>
      {/* <div
        className={clsx(
          'py-4 h-full w-full',
          'flex items-center justify-center',
          'relative overflow-hidden'
        )}
      >
        <div className='h-3/5 w-3/5'>
          <div className=' h-full rounded-xl border border-gray-400/40 p-3'>
            <h2 className='font-italic'> Dec 2022</h2>
            <div className='my-1 h-[1px] w-full bg-gray-400/40' />
            <h4 className='font-normal'>Monthly expenses</h4>
            <h4>
              cutted by <Accent className='font-mono'>12%</Accent>
            </h4>
            <div className='my-1 h-[1px] w-full bg-gray-400/40' />

            <h4 className='font-normal'>Biggest expense in</h4>
            <h4>
              <Accent className='font-mono'>Travel</Accent>
            </h4>

            <h4 className='font-normal'>Most often spendings</h4>
            <div className='flex justify-around'>
              <h4>
                <Accent>Shopping</Accent>
              </h4>
              <h4>
                <Accent red>Groceries</Accent>
              </h4>
              <h4>
                <Accent green>Gas</Accent>
              </h4>
            </div>
          </div>
        </div>
        <div className=' h-full w-3/5'>
          <PieChart radius={'100%'} />
        </div>
      </div> */}
    </>
  );
};
export default ExpensesCard;
