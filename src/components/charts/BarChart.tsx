import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  LineController,
  LineElement,
  PointElement,
  LinearScale,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { faker } from '@faker-js/faker';

import type { ChartData, ChartArea, ScriptableContext } from 'chart.js';
ChartJS.register(
  CategoryScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  LineController,
  LineElement,
  PointElement,
  LinearScale
);
const BarChart: React.FC<{
  width: string;
  height: string;
  isFakeData?: boolean;
}> = ({ width, height, isFakeData }) => {
  return (
    <Bar
      data={data}
      // width={width}
      // height={height}
      options={options}
    />
  );
};

export default BarChart;

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
export const options = {
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
      display: false,
    },
    yAxis: {
      display: false,
    },
    x: {
      grid: {
        color: 'transparent',
      },
    },
  },
};

const data = {
  labels,
  datasets: [
    {
      //   label: 'LAbEL',
      data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
      backgroundColor: (context: ScriptableContext<'bar'>) => {
        const ctx = context.chart.ctx;
        const gradient = ctx.createLinearGradient(0, 0, 0, 200);
        gradient.addColorStop(0, '#fde047');
        gradient.addColorStop(1, '#f97316');
        return gradient;
      },
    },
  ],
};
