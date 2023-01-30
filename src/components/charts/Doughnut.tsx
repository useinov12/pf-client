import { useRef, useEffect, useState } from 'react';
import { Chart as ChartJS, ChartData } from 'chart.js';
import { Chart } from 'react-chartjs-2';
import { ChartProps } from './types';
import 'chart.js/auto';
import { getChartDataStructure } from '@/lib/chartHelpers';
import { useTheme } from '@/context/ThemeProvider';

interface DoughnutChartProps extends ChartProps {
  width: string;
  height: string;
}

export default function DoughnutChart({
  width,
  height,
  incomingData,
  styleOptions: chartStyles,
  title,
}: DoughnutChartProps) {
  const { mode } = useTheme();
  const chartRef = useRef<ChartJS>(null);
  const [chartData, setChartData] = useState<ChartData<'polarArea'>>({
    datasets: [],
  });

  useEffect(() => {
    const chart = chartRef.current;

    if (!chart || !incomingData) {
      return;
    }

    const data = getChartDataStructure({
      incomingData,
      chartStyles,
      chart,
    });
    setChartData(data);
  }, [incomingData]);

  const options = getDoughnutChartOptions({ title, theme: mode });

  return (
    <Chart
      ref={chartRef}
      type='doughnut'
      data={chartData}
      options={options}
      width={width}
      height={height}
    />
  );
}

/* type declaration for typescript Chart js */
type AlitnType = 'start' | 'end' | 'center' | undefined;
const alignTitle: AlitnType = 'start';
const alignLegend: AlitnType = 'center';

/* type declaration for typescript Chart js */
type PositionType =
  | 'center'
  | 'left'
  | 'top'
  | 'right'
  | 'bottom'
  | 'chartArea'
  | undefined;
const position: PositionType = 'left';

function getDoughnutChartOptions({
  title,
  theme,
}: {
  title: string | undefined;
  theme: 'light' | 'dark';
}) {
  return {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        align: alignLegend,
        position: position,
        color: theme === 'dark' ? 'rgba(178, 178, 178, 1)' : '#000',
      },
      title: {
        display: title ? true : false,
        text: title,
        align: alignTitle,
        color: theme === 'dark' ? 'rgba(178, 178, 178, 1)' : '#000',
      },
    },
  };
}
