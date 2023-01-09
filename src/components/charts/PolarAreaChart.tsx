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

  return (
    <Chart
      ref={chartRef}
      type='polarArea'
      data={chartData}
      options={options}
      //   options={chartStyles === 'APP' ? optionsApp : optionsLanding}
      width={width}
      height={height}
    />
  );
}

const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false,
    },
  },
  scales:{
    r:{
      grid:{
        color:'rgba(63, 81, 181, .4)'
      }
    }
  }
};
