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
  title,
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

  /* Set Bar Chart options: Vertical, Stacked */
  let options = vertical ? optionsVertical : optionsHorizontal;
  options.plugins.title.text = title;
  useEffect(() => {
    stacked
      ? () => {
          options.scales.x.stacked = true;
          options.scales.y.stacked = true;
        }
      : () => {
          options.scales.x.stacked = false;
          options.scales.y.stacked = false;
        };
  }, []);

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

/* type declaration because typescript Chart js type error */
type AlitnType = 'start' | 'end' | 'center' | undefined;
const alignTitle: AlitnType = 'start';

/* Chart JS oprtions for Bar Chart*/
const optionsCommon = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'top' as const,
      display: false,
    },
    title: {
      display: true,
      text: 'Title',
      align: alignTitle,
      // color: '#C0C0C0',
    },
  },
  scales: {
    x: {
      stacked: false,
      grid: {
        color: 'transparent',
      },
      autoSkip: true,
      ticks: {
        // color: '#C0C0C0',
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
    y: {
      stacked: false,
      grid: {
        color: 'transparent',
      },
      ticks: {
        // color: '#C0C0C0',
      },
    },
  },
};

const optionsVertical = {
  ...optionsCommon,
  indexAxis: 'y' as const,
};

const optionsHorizontal = {
  ...optionsCommon,
  indexAxis: 'x' as const,
};
