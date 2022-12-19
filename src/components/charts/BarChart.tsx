import { useEffect, useRef, useState } from 'react';
import { Chart } from 'react-chartjs-2';
import { Chart as ChartJS, ChartData } from 'chart.js';
import { getChartDataStructure } from '@/lib/chartHelpers';
import { ChartProps } from './types';

import 'chart.js/auto';

interface BarChartProps extends ChartProps {
  width: string;
  height: string;
  stacked?: boolean | undefined;
}

export default function BarChart({
  width,
  height,
  delay,
  incomingData,
  stacked,
}: BarChartProps) {
  const chartRef = useRef<ChartJS>(null);
  const [chartData, setChartData] = useState<ChartData<'line'>>({
    datasets: [],
  });

  useEffect(() => {
    const chart = chartRef.current;

    if (!chart || !incomingData) {
      return;
    }

    const chartData = getChartDataStructure(incomingData);

    if (delay) {
      const timer = setTimeout(() => {
        setChartData(chartData);
      }, delay);
      return () => clearTimeout(timer);
    } else setChartData(chartData);
  }, [incomingData]);

  return (
    <Chart
      type='bar'
      ref={chartRef}
      data={chartData}
      width={width}
      height={height}
      options={stacked ? optionsStacked : optionsRegular}
    />
  );
}

/* Chart JS oprtions for Bar Chart*/
const optionsRegular = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'top' as const,
      display: false,
    },
  },
  scales: {
    xAxis: {
      display: false,
    },
    yAxis: {
      display: false,
    },
    x: {
      grid: {
        color: 'transparent',
      },
    },
  },
};

const optionsStacked = {
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    xAxis: {
      display: false,
    },
    yAxis: {
      display: false,
    },
    x: {
      stacked: true,
      grid: {
        color: 'transparent',
      },
      ticks: {
        color: '#374151',
      },
    },
    y: {
      stacked: true,
      grid: {
        color: 'transparent',
        beginAtZero: true,
      },
      ticks: {
        color: '#374151',
        beginAtZero: true,
      },
    },
  },
};
