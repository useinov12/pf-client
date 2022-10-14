import React, { useRef, useEffect, useState } from 'react';
import type { ChartData, ChartArea } from 'chart.js';
import {
  Chart as ChartJS,
  registerables,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  Filler,
);

import { Chart } from 'react-chartjs-2';
import { faker } from '@faker-js/faker';

const LineChart: React.FC<{
  width: string;
  height: string;
  isFakeData?: boolean;
}> = ({ width, height, isFakeData }) => {
  const chartRef = useRef<ChartJS>(null);
  const [chartData, setChartData] = useState<ChartData<'line'>>({
    datasets: [],
  });

  useEffect(() => {
    const chart = chartRef.current;

    if (!chart) {
      return;
    }

    const chartData = {
      ...data,
      datasets: data.datasets.map((dataset) => ({
        ...dataset,
        borderColor: 'rgba(255,108,35, 1)',
        backgroundColor: createGradient(chart.ctx, chart.chartArea),
      })),
    };

    setChartData(chartData);
  }, []);

  return (
    <Chart
      ref={chartRef}
      type='line'
      data={chartData}
      options={options}
      // width={width}
      // height={height}
    />
  );
};

export default LineChart;

const labels = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];
const colors = [
  'red',
  'orange',
  'yellow',
  'lime',
  'green',
  'teal',
  'blue',
  'purple',
];

const data = {
  labels: labels.map((month) => month.slice(0, 3)),
  datasets: [
    {
      label: 'Dataset 1',
      data: labels.map(() => faker.datatype.number({ min: 10000, max: 20000 })),
    },
  ],
};

function createGradient(ctx: CanvasRenderingContext2D | null, area: ChartArea) {
  const colorStart = 'rgba(253, 224, 71, .6)';
  const colorMid = 'rgba(255,108,35, .7)';
  const colorEnd = 'rgba(255,108,35, 1)';

  if (ctx) {
    const gradient = ctx.createLinearGradient(0, area.bottom, 0, area.top);

    gradient.addColorStop(0, colorStart);
    gradient.addColorStop(0.5, colorMid);
    gradient.addColorStop(1, colorEnd);

    return gradient;
  }
  return 'rgba(253, 224, 71, .6)';
}

const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false,
    },
  },
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
  scales: {
    y: {
      display: true,
      grid: {
        color: 'gray',
      },
      autoSkip: true,
      ticks: {
        // Include a dollar sign in the ticks
        callback: (value: string | number, index: number, ticks: any) => {
          const formatter = Intl.NumberFormat('en', {
            notation: 'compact',
            compactDisplay: 'short',
          });
          return index % 2 === 0 ? '$' + formatter.format(Number(value)) : '';
        },
      },
    },
    x: {
      display: true,
      grid: {
        color: 'transparent',
      },
      autoSkip: true,
    },
  },
};
