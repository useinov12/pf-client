import React from 'react';
import clsx from 'clsx';
import LineChart from '../charts/LineChart';
import Chip from '../Chip';
import DataLine from '../app-components/DataLine';

const BanksCard: React.FC = () => {
  return (
    <div
      className={clsx(
        'rounded-md bg-white shadow-sm',
        'w-full py-4',
        'transition-all duration-100',
        'hover:shadow-md',
        'scale-100 hover:scale-[1.005]',
        'hover:shadow-gray-700/60'
      )}
    >
      <DataLine text={'Banks'} data={banks} />

      <DataLine text={'Total acconts:'} data={['$17 500']} />

      <div
        className={clsx(
          'mb-4 h-2/5 w-full',
          'flex items-center justify-center',
          'relative overflow-hidden',
          'flex flex-col'
        )}
      >
        {/* add chart randomizer */}
        <div className='h-full w-full'>
          <LineChart width={'100%'} height={'100%'} />
        </div>
      </div>
    </div>
  );
};
const banks = ['BofA', 'Chase', 'CapitalOne'];

export default BanksCard;
