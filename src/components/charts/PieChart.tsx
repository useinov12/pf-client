import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Chart } from 'react-chartjs-2';

import type { ChartData, ScriptableContext } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

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

  React.useEffect(() => {
    const chart = chartRef.current;

    if (!chart) {
      return;
    }

    const data = {
      labels: labels ? labels : ['Data#1', 'Data#2', 'Data#3', 'Data#4'],
      datasets: [
        {
          data: externalData ? externalData : [7, 19, 3, 5],
          backgroundColor: [
            'rgba(255, 99, 132, .5)',
            'rgba(54, 162, 235, .5)',
            'rgba(255, 206, 86, .5)',
            'rgba(12, 206, 86, .5)',
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(12, 206, 86, 1)',
          ],
          borderWidth: 3,
        },
      ],
    };

    if (delay) {
      const timer = setTimeout(() => {
        setChartData(data);
      }, delay);
      return () => clearTimeout(timer);
    } else setChartData(data);
  }, [externalData]);

  const options = {
    responsive: true,
    maintainAspectRatio: true,
    radius: radius,
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  return <Chart type='pie' ref={chartRef} data={chartData} options={options} />;
};

export default PieChart;

function createGradient({ context }: { context: ScriptableContext<'pie'> }) {
  const ctx = context.chart.ctx;
  const gradient = ctx.createLinearGradient(0, 0, 0, 200);
  gradient.addColorStop(0, 'rgba(54, 162, 235, 1)');
  gradient.addColorStop(1, 'rgba(255, 206, 86, 1)');
  return gradient;
}
