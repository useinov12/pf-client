import { useRef, useEffect, useState } from 'react';
import { Chart as ChartJS, ChartData } from 'chart.js';
import { Chart } from 'react-chartjs-2';
import { ChartProps } from './types';
import 'chart.js/auto';
import { getChartDataStructure } from '@/lib/chartHelpers';
import { useTheme } from '@/context/ThemeProvider';

interface LineChartProps extends ChartProps {
  width: string;
  height: string;
}

export default function LineChart({
  width,
  height,
  delay,
  incomingData,
  styleOptions: chartStyles,
  title,
}: LineChartProps) {
  const chartRef = useRef<ChartJS>(null);
  const [chartData, setChartData] = useState<ChartData<'line'>>({
    datasets: [],
  });

  const { mode } = useTheme();

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

  const options = chartStyles === 'APP' ? optionsApp : optionsLanding;
  options.plugins.title.text = title;


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

/* Chart JS options for Line chart*/
const optionsCommon = {
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
      // color: '#C0C0C0',
    },
  },
  scales: {
    y: {
      display: false,
      grid: {
        color: 'transparent',
      },
      autoSkip: true,
      ticks: {
        // color: '#C0C0C0',
        // Include a dollar sign in the ticks
        callback: (value: string | number, index: number, ticks: any) =>
          formatFinancialNumber(value, index, ticks),
      },
    },
    x: {
      display: true,
      grid: {
        color: 'transparent',
      },
      autoSkip: true,
      ticks: {
        // color: '#C0C0C0',
      },
    },
  },
};

const optionsApp = {
  ...optionsCommon,
  elements: {
    line: {
      tension: 0.2,
      borderWidth: 5,
      fill: 'start',
    },
    point: {
      radius: 0,
      itRadius: 1,
    },
  },
};

const optionsLanding = {
  ...optionsCommon,
  elements: {
    line: {
      tension: 0.2,
      borderWidth: 2,
      fill: 'start',
    },
    point: {
      radius: 0,
      itRadius: 1,
    },
  },
};

// Include a dollar sign in the ticks
function formatFinancialNumber(
  value: string | number,
  index: number,
  ticks: any
) {
  const formatter = Intl.NumberFormat('en', {
    notation: 'compact',
    compactDisplay: 'short',
  });
  return index % 2 === 0 ? '$' + formatter.format(Number(value)) : '';
}
