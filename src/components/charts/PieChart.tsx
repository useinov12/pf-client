import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

import type { ChartData, ChartArea, ScriptableContext } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart: React.FC<{
  radius: string;
  isFakeData?: boolean;
}> = ({ radius, isFakeData }) => {
  return (
    <Pie
      data={fakeDataset}
      // width={width}
      // height={height}
      options={{
        responsive: true,
        maintainAspectRatio: true,
        radius: radius,
      }}
    />
  );
};

export default PieChart;

export const fakeDataset = {
  labels: ['Grocery', 'Shopping', 'Subsciptions', 'Travel'],
  datasets: [
    {
      // label: '# of Votes',
      data: [7, 19, 3, 5],
      backgroundColor: [
        'rgba(70, 70, 70, .2)',
        'rgba(70, 70, 70, .2)',
        'rgba(70, 70, 70, .2)',
        'rgba(70, 70, 70, .2)',
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(12, 206, 86, 1)',
      ],
      borderWidth: 4,
    },
  ],
};

function createGradient({ context }: { context: ScriptableContext<'pie'> }) {
  const ctx = context.chart.ctx;
  const gradient = ctx.createLinearGradient(0, 0, 0, 200);
  gradient.addColorStop(0, 'rgba(54, 162, 235, 1)');
  gradient.addColorStop(1, 'rgba(255, 206, 86, 1)');
  return gradient;
}
