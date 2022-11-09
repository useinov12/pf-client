import React, { useRef, useState } from 'react';
import type { ChartData } from 'chart.js';
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


interface Dataset{
    label: string;
    data: number[];
}

const MultipleLineChart: React.FC<{
  width: string;
  height: string;
  isFakeData?: boolean;
  externalData?:Dataset[];
  delay?:number;
  labels?:string[] | number[];
}> = ({ width, height, isFakeData, externalData, delay, labels }) => {

  const chartRef = useRef<ChartJS>(null);
  const [chartData, setChartData] = useState<ChartData<'line'>>({
    datasets: [],
  });

  const data = {
    labels: months.map((month) => month.slice(0, 3)),
    datasets:  fakeDatasets
  };

  React.useEffect(() => {
    const chart = chartRef.current;

    if (!chart) {
      return;
    }
    
    const chartData = {
      labels:labels ? labels : months,

      datasets: externalData ? 
      externalData.map((dataset, i) => ({
        ...dataset,
        borderColor: colors[i],
        backgroundColor: 'transparent',
      })) :
      data.datasets.map((dataset, i) => ({
        ...dataset,
        borderColor: colors[i],
        backgroundColor: 'transparent',
      }))
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

export default MultipleLineChart;


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

const months = [
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

const fakeDatasets = [
    {
        label: 'Dataset 1',
        data: months.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
    },
    {
        label: 'Dataset 2',
        data: months.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
    },
]

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
        color: 'transparent',
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

