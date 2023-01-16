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
  delay,
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

    if (!chart || !incomingData) {
      return;
    }

    const formatedChartData = getChartDataStructure({
      incomingData,
      chartStyles,
      chart,
    });

    if (delay) {
      const timer = setTimeout(() => {
        setChartData(formatedChartData);
      }, delay);
      return () => clearTimeout(timer);
    } else setChartData(formatedChartData);
  }, [incomingData]);

  options.plugins.title.text = title;

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

const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false,
    },
    title: {
      display: true,
      text: 'Title',
      align: alignTitle,
      color: '#C0C0C0',
    },
  },
  scales: {
    r: {
      grid: {
        color: 'rgba(63, 81, 181, .4)',
      },
      ticks:{
        color: 'gray',
        backdropColor: 'transparent',
        z:100
      }
      
    },
  },
};
