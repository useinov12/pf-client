import clsx from 'clsx';
import { DemoCardProps, Card } from './DemoCard';
import { ChartDataFormat } from '@/components/charts/types';
import LineChart from '@/components/charts/LineChart';
import BarChart from '@/components/charts/BarChart';

import { months } from '@/components/charts/defaults';

import { FaRegChartBar } from 'react-icons/fa';

export default function Charts({ currentBank }: DemoCardProps) {
  const dataset = currentBank.dynamic;
  const labels = months
    .filter((_, i) => i < dataset.length)
    .map((month) => month.slice(0, 3));

  const chartData: ChartDataFormat = {
    labels: labels,
    label: 'Account dynamic',
    datasets: [dataset],
  };

  return (
    <Card className='col-span-4 col-start-1 row-span-3 md:col-span-2'>
      <header
        className={clsx(
          'bg-gray-600/50',
          'mb-2 w-full px-4 py-1',
          'inline-flex items-center gap-1'
        )}
      >
        <FaRegChartBar className='h-6 w-6' />
        <h6 className='text-sm font-semibold drop-shadow-md'>Charts</h6>
      </header>
      <div className='flex flex-col items-start'>
        <div className='flex h-full w-full flex-col items-center justify-center '>
          <div className='h-24 w-full'>
            <LineChart
              width={'100%'}
              height={'100%'}
              title={''}
              incomingData={chartData}
              styleOptions={'LANDING'}
              delay={5000}
            />
          </div>
          <div className='h-24 w-full'>
            <BarChart
              width={'100%'}
              height={'100%'}
              title={''}
              incomingData={chartData}
              styleOptions={'LANDING'}
              delay={5200}
            />
          </div>
        </div>
      </div>
    </Card>
  );
}
