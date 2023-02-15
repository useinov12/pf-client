import { useRef, useEffect, useState } from 'react';
import { Chart as ChartJS, ChartData } from 'chart.js';
import { Chart } from 'react-chartjs-2';
import { ChartProps } from './types';
import 'chart.js/auto';
import { getChartDataStructure } from '@/lib/chartHelpers';

interface PolarAreaChartProps extends ChartProps {
  width: string;
  height: string;
}

export default function PolarAreaChart({
  width,
  height,
  incomingData,
  styleOptions: chartStyles,
  title,
}: PolarAreaChartProps) {
  const chartRef = useRef<ChartJS>(null);
  const [chartData, setChartData] = useState<ChartData<'polarArea'>>({
    datasets: [],
  });

  useEffect(() => {
    const chart = chartRef.current;

    if (!chart || !incomingData) return;

    const data = getChartDataStructure({
      incomingData,
      chartStyles,
      chart,
    });
    setChartData(data);
  }, [incomingData]);

  const options = getPolarAreaChartOptions({ title });

  return (
    <Chart
      ref={chartRef}
      type='polarArea'
      data={chartData}
      options={options}
      width={width}
      height={height}
    />
  );
}

/* type declaration because typescript Chart js type error */
type AlitnType = 'start' | 'end' | 'center' | undefined;
const alignTitle: AlitnType = 'start';

function getPolarAreaChartOptions({ title }: { title: string | undefined }) {
  return {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: title ? true : false,
        text: title,
        align: alignTitle,
        color: '#C0C0C0',
      },
    },
    scales: {
      r: {
        grid: {
          color: 'rgba(63, 81, 181, .4)',
        },
        ticks: {
          color: 'gray',
          backdropColor: 'transparent',
          z: 100,
        },
      },
    },
  };
}
