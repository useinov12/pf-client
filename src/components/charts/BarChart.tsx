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
  vertical?: boolean | undefined;
}

export default function BarChart({
  width,
  height,
  delay,
  incomingData,
  stacked,
  vertical,
  styleOptions: chartStyles,
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

    const chartData = getChartDataStructure({
      incomingData,
      chartStyles,
      chart,
    });

    if (delay) {
      const timer = setTimeout(() => {
        setChartData(chartData);
      }, delay);
      return () => clearTimeout(timer);
    } else setChartData(chartData);
  }, [incomingData]);

  const options = stacked
    ? optionsStacked
    : vertical
    ? optionsVerticalRegular
    : optionsRegular;

  return (
    <Chart
      type='bar'
      ref={chartRef}
      data={chartData}
      width={width}
      height={height}
      options={options}
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
      display: true,
      grid: {
        color: 'transparent',
      },
      autoSkip: true,
      ticks: {
        // Include a dollar sign in the ticks
        callback: (value: string | number, index: number, ticks: any) => {
          const formatter = Intl.NumberFormat('en', {
            notation: 'compact',
            compactDisplay: 'short',
          });
          return index % 2 === 0 ? '$' + formatter.format(Number(value)) : '';
        },
      },
    },
    yAxis: {
      display: true,
      grid: {
        color: 'transparent',
      },
    },
  },
};

const optionsVerticalRegular = { ...optionsRegular, indexAxis: 'y' as const };

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
