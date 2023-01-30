import { useRef, useEffect, useState } from 'react';
import { Chart as ChartJS, ChartData } from 'chart.js';
import { Chart } from 'react-chartjs-2';
import { ChartProps, StyleOptions } from './types';
import { getChartDataStructure } from '@/lib/chartHelpers';
import 'chart.js/auto';
import { useTheme } from '@/context/ThemeProvider';
import { shortSumFormatter } from '@/lib/sharedUtils';

interface LineChartProps extends ChartProps {
  width: string;
  height: string;
  showScales: boolean;
}

export default function LineChart({
  width,
  height,
  incomingData,
  styleOptions: chartStyles,
  title,
  showScales,
}: LineChartProps) {
  const { mode } = useTheme();
  const chartRef = useRef<ChartJS>(null);
  const [chartData, setChartData] = useState<ChartData<'line'>>({
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

  const options = getLineChartOptions({
    title,
    chartStyles,
    theme: mode,
    showScales,
  });

  return (
    <Chart
      ref={chartRef}
      type='line'
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

/* Accept all conditions and return Chart JS options object for LineChart */
function getLineChartOptions({
  title,
  chartStyles,
  theme,
  showScales,
}: {
  title: string | undefined;
  chartStyles: StyleOptions;
  theme: 'light' | 'dark';
  showScales: boolean;
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
    elements: {
      line: {
        tension: 0.2,
        borderWidth: chartStyles === 'APP' ? 5 : 2,
        fill: 'start',
      },
      point: {
        radius: chartStyles === 'APP' ? 0 : 1.5,
        itRadius: 1,
      },
    },
    scales: {
      y: {
        display: chartStyles === 'APP' ? (showScales ? true : false) : false,
        grid: {
          color:
            theme === 'light'
              ? 'rgba(105, 105, 105, .4)'
              : 'rgba(128, 128, 128, .4)',
          drawOnChartArea: false,
          drawTicks: false,
        },
        autoSkip: true,
        ticks: chartStyles === 'APP' ? dollarTicks(theme) : {},
      },
      x: {
        display: chartStyles === 'APP' ? (showScales ? true : false) : false,
        grid: {
          color:
            theme === 'light'
              ? 'rgba(105, 105, 105, .4)'
              : 'rgba(128, 128, 128, .4)',

          drawOnChartArea: false,
        },
        autoSkip: true,
        ticks: {
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
