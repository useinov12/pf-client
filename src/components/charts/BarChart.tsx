import { useEffect, useRef, useState } from 'react';
import { Chart } from 'react-chartjs-2';
import { Chart as ChartJS, ChartData } from 'chart.js';
import { getChartDataStructure, dollarTicks } from '@/lib/chartHelpers';
import { ChartProps, StyleOptions } from './types';

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

    if (!chart || !incomingData) return;
   

    const chartData = getChartDataStructure({
      incomingData,
      chartStyles,
      chart,
    });

    setChartData(chartData);
  }, [incomingData]);

  /* Set Bar Chart options: Vertical, Stacked, chartStyles, title */
  const options = getBarChartOptions({ title, vertical, stacked, chartStyles });

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
}: {
  title: string | undefined;
  vertical: boolean | undefined;
  stacked: boolean | undefined;
  chartStyles: StyleOptions;
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
      },
    },
    indexAxis: vertical ? ('y' as const) : ('x' as const),
    scales: {
      y: {
        display: chartStyles === 'APP' ? true : false,
        stacked: stacked,
        grid: {
          color: 'transparent',
        },
        autoSkip: true,
        ticks: vertical ? {} : dollarTicks,
      },
      x: {
        display: true,
        stacked: stacked,
        grid: {
          color: 'transparent',
        },
        ticks: vertical ? dollarTicks : {},
      },
    },
  };
}
