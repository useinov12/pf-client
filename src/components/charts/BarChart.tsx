import { useEffect, useRef, useState } from 'react';
import { Chart } from 'react-chartjs-2';
import { Chart as ChartJS, ChartData } from 'chart.js';
import { getChartDataStructure } from '@/lib/chartHelpers';
import { ChartProps, StyleOptions } from './types';

import 'chart.js/auto';
import { shortSumFormatter } from '@/lib/sharedUtils';
import { useTheme } from '@/context/ThemeProvider';

interface BarChartProps extends ChartProps {
  width: string;
  height: string;
  stacked?: boolean | undefined;
  vertical?: boolean | undefined;
}

export default function BarChart({
  width,
  height,
  incomingData,
  stacked,
  vertical,
  styleOptions: chartStyles,
  title,
}: BarChartProps) {
  const { mode } = useTheme();
  const chartRef = useRef<ChartJS>(null);
  const [chartData, setChartData] = useState<ChartData<'line'>>({
    datasets: [],
  });

  useEffect(() => {
    const chart = chartRef.current;

    if (!chart || !incomingData) return;

    const chartData = getChartDataStructure({
      incomingData,
      chartStyles,
      chart,
    });

    setChartData(chartData);
  }, [incomingData]);

  /* Set Bar Chart options: Vertical, Stacked, chartStyles, title */
  const options = getBarChartOptions({
    title,
    vertical,
    stacked,
    chartStyles,
    theme: mode,
  });

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

/* Accept all conditions and return Chart JS options object for BarChart */
function getBarChartOptions({
  title,
  vertical,
  stacked,
  chartStyles,
  theme,
}: {
  title: string | undefined;
  vertical: boolean | undefined;
  stacked: boolean | undefined;
  chartStyles: StyleOptions;
  theme: 'light' | 'dark';
}) {
  return {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
        display: false,
      },
      title: {
        display: title ? true : false,
        text: title ? title : 'none',
        align: alignTitle,
        color: theme === 'dark' ? 'rgba(178, 178, 178, 1)' : '#000',
        padding: 15,
      },
    },
    indexAxis: vertical ? ('y' as const) : ('x' as const),
    scales: {
      y: {
        display: chartStyles === 'APP' ? true : false,
        stacked: stacked,
        grid: {
          color:
            theme === 'light'
              ? 'rgba(105, 105, 105, .4)'
              : 'rgba(128, 128, 128, .4)',
          drawOnChartArea: false,
          drawTicks: false,
        },
        autoSkip: true,
        ticks: vertical
          ? {
              color: theme === 'dark' ? 'rgba(178, 178, 178, 1)' : '#000',
            }
          : dollarTicks(theme),
      },
      x: {
        display: true,
        stacked: stacked,
        grid: {
          color:
            theme === 'light'
              ? 'rgba(105, 105, 105, .4)'
              : 'rgba(128, 128, 128, .4)',

          drawOnChartArea: false,
          offset: true,
        },
        ticks: vertical
          ? dollarTicks(theme)
          : {
              color: theme === 'dark' ? 'rgba(178, 178, 178, 1)' : '#000',
            },
      },
    },
  };
}

const dollarTicks = (theme: 'light' | 'dark') => {
  return {
    padding: 9,
    color: theme === 'dark' ? 'rgba(178, 178, 178, 1)' : '#000',
    callback: (value: string | number, index: number, ticks: any) => {
      return index % 2 === 0
        ? '$' + shortSumFormatter.format(Number(value))
        : '';
    },
  };
};
