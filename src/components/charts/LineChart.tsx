import { useRef, useEffect, useState } from 'react';
import { Chart as ChartJS, ChartData } from 'chart.js';
import { Chart } from 'react-chartjs-2';
import { ChartProps, StyleOptions } from './types';
import { getChartDataStructure, dollarTicks } from '@/lib/chartHelpers';
import 'chart.js/auto';

interface LineChartProps extends ChartProps {
  width: string;
  height: string;
}

export default function LineChart({
  width,
  height,
  incomingData,
  styleOptions: chartStyles,
  title,
}: LineChartProps) {
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

  const options = getLineChartOptions({ title, chartStyles });

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
}: {
  title: string | undefined;
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
        display: chartStyles === 'APP' ? true : false,
        grid: {
          color: 'transparent',
        },
        autoSkip: true,
        ticks: chartStyles === 'APP' ? dollarTicks : {},
      },
    },
  };
}
