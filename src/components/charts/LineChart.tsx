import React, { useRef, useEffect, useState } from 'react';
import type { ChartData, ChartArea } from 'chart.js';
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
} from 'chart.js';
ChartJS.register(
  CategoryScale,
  LinearScale,
  LineController,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  Filler
);

import { Chart } from 'react-chartjs-2';
import { faker } from '@faker-js/faker';

const LineChart: React.FC<{
  width: string;
  height: string;
  isFakeData?: boolean;
  externalData?:number[];
  delay?:number;
}> = ({ width, height, isFakeData, externalData, delay }) => {

  const chartRef = useRef<ChartJS>(null);
  const [chartData, setChartData] = useState<ChartData<'line'>>({
    datasets: [],
  });

  const data = {
    labels: labels.map((month) => month.slice(0, 3)),
    datasets: [
      {
        label: 'Dataset 1',
        data: externalData ? externalData : labels.map(() => 1000),
      },
    ],
  };

  useEffect(() => {
    const chart = chartRef.current;

    if (!chart) {
      return;
    }
    const chartData = {
      ...data,
      datasets: data.datasets.map((dataset) => ({
        ...dataset,
        borderColor: 'rgba(150, 149, 149, 1)',
        backgroundColor: createGradient(chart.ctx, chart.chartArea),
      })),
    };
    
    if(delay){
      const timer = setTimeout(()=>{
        setChartData(chartData);
      }, delay)
      return () => clearTimeout(timer)
    }
    else setChartData(chartData);

  }, [externalData]);

  return (
    <Chart
      ref={chartRef}
      type='line'
      data={chartData}
      options={options}
      width={width}
      height={height}
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
  // 'September',
  // 'October',
  // 'November',
  // 'December',
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


function createGradient(ctx: CanvasRenderingContext2D | null, area: ChartArea) {
  const colorStart = 'rgba(208, 208, 208, 0.5)';
  const colorMid = 'rgba(168, 168, 168, 0.5)';
  const colorEnd = 'rgba(150, 149, 149, 0.5)';

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
      display: false,
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
