import React from 'react';
import { Chart } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineController,
  LineElement,
  Tooltip,
  Legend,
  Filler,
  ArcElement,
  PieController
} from 'chart.js';
ChartJS.register(
  CategoryScale,
  LinearScale,
  LineController,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  Filler,
  ArcElement,
  PieController
);

import type { ChartData, ScriptableContext } from 'chart.js';

const PieChart: React.FC<{
  radius: string;
  isFakeData?: boolean;
  externalData?: number[];
  labels?: string[];
  delay?: number;
}> = ({ radius, isFakeData, externalData, labels, delay }) => {
  const chartRef = React.useRef<ChartJS>(null);
  const [chartData, setChartData] = React.useState<ChartData<'pie'>>({
    datasets: [],
  });


  const data = {
    labels: labels ? labels : ['Data#1'],
    datasets: [
      {
        data: externalData ? externalData : [1000],
      },
    ],
  };

  React.useEffect(() => {
    const chart = chartRef.current;

    if (!chart) {
      return;
    }

    const chartData = {
      ...data,
      datasets: data.datasets.map((dataset) => ({
        ...dataset,
        backgroundColor: [
          'rgba(214, 211, 209, 0.7)',
          'rgba(120, 113, 108, 0.7)',
          'rgba(68, 64, 60, 0.7)',
          'rgba(83, 82, 82, 0.7)',
        ],
        borderColor: [
          'rgba(214, 211, 209, 1)',
          'rgba(120, 113, 108, 1)',
          'rgba(68, 64, 60, 1)',
          'rgba(83, 82, 82, 1)',
        ],
        borderWidth: 3,
      })),
    };
    

    if (delay) {
      const timer = setTimeout(() => {
        setChartData(chartData);
      }, delay);
      return () => clearTimeout(timer);
    } else setChartData(chartData);
  }, [externalData]);


  return (
    // <div className='bg-green-500 w-full h-full'>
        <Chart
          type='pie'
          ref={chartRef}
          data={chartData}
          options={options}
          // height={'100%'}
          // width={'100%'}
          // className='absolute'
        />
    // </div>
  );
};

export default PieChart;

function createGradient({ context }: { context: ScriptableContext<'pie'> }) {
  const ctx = context.chart.ctx;
  const gradient = ctx.createLinearGradient(0, 0, 0, 200);
  gradient.addColorStop(0, 'rgba(54, 162, 235, 1)');
  gradient.addColorStop(1, 'rgba(255, 206, 86, 1)');
  return gradient;
}

const options = {
  responsive: true,
  maintainAspectRatio: true,
  // radius: radius,
  plugins: {
    legend: {
      display: false,
    },
  },
};