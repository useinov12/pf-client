import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { faker } from '@faker-js/faker';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

import type { ChartData, ChartArea, ScriptableContext } from 'chart.js';

const StackedBar: React.FC<{
  width: string;
  height: string;
  isFakeData?: boolean;
}> = ({ width, height, isFakeData }) => {
  return (
    <Bar
      data={fakeDataset}
      // width={width}
      // height={height}
      options={options}
    />
  );
};

export default StackedBar;

export const options = {
  plugins: {
    // title: {
    //   display: true,
    //   text: 'Chart.js Bar Chart - Stacked',
    // },
  },
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    xAxis: {
      display: false,
    },
    yAxis: {
      display: false,
    },
    x: {
      stacked: true,
      grid: {
        color: 'transparent',
      },
      ticks: {
        color: '#374151',
      },
    },
    y: {
      stacked: true,
      grid: {
        color: 'transparent',
        beginAtZero: true,
      },
      ticks: {
        color: '#374151',
        beginAtZero: true,
      },
    },
  },
};

const labels = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];
const fakeDataset = {
  labels,
  datasets: [
    {
      label: 'Checking Account',
      data: labels.map(() => faker.datatype.number({ min: 5000, max: 12000 })),
      backgroundColor: ({ chart: { ctx } }: ScriptableContext<'bar'>) => {
        // const ctx = chart.ctx;
        const gradient = ctx.createLinearGradient(0, 0, 0, 200);
        gradient.addColorStop(0, '#fde047');
        gradient.addColorStop(1, '#f97316');
        return gradient;
      },
    },
    {
      label: 'Saving Account',
      data: labels.map(() => faker.datatype.number({ min: 0, max: 5000 })),
      backgroundColor: ({ chart: { ctx } }: ScriptableContext<'bar'>) => {
        const gradient = ctx.createLinearGradient(0, 0, 0, 200);
        gradient.addColorStop(0, '#bae6fd');
        gradient.addColorStop(1, '#2563eb');
        return gradient;
      },
    },
    {
      label: 'Credit Account',
      data: labels.map(() => faker.datatype.number({ min: 1000, max: 3000 })),
      backgroundColor: ({ chart: { ctx } }: ScriptableContext<'bar'>) => {
        const gradient = ctx.createLinearGradient(0, 0, 0, 200);
        gradient.addColorStop(0, '#a78bfa');
        gradient.addColorStop(1, '#c026d3');
        return gradient;
      },
    },
  ],
};
