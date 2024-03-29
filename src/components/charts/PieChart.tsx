import { useEffect, useRef, useState } from 'react';
import { Chart } from 'react-chartjs-2';
import { Chart as ChartJS, ChartData } from 'chart.js';
import { ChartProps } from './types';
import { getChartDataStructure } from '@/lib/chartHelpers';

import 'chart.js/auto';

export default function PieChart({
  incomingData,
  styleOptions: chartStyles,
}: ChartProps) {
  const chartRef = useRef<ChartJS>(null);
  const [chartData, setChartData] = useState<ChartData<'pie'>>({
    datasets: [],
  });

  useEffect(() => {
    const chart = chartRef.current;

    if (!chart || !incomingData) return;

    const data = getChartDataStructure({ incomingData, chartStyles, chart });

    setChartData(data);
  }, [incomingData]);

  return <Chart type='pie' ref={chartRef} data={chartData} options={options} />;
}

/* Chart JS oprtions for Pie Chart*/
const options = {
  responsive: true,
  maintainAspectRatio: true,
  plugins: {
    legend: {
      display: false,
    },
  },
};
