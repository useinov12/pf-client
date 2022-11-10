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

import type { ChartData } from 'chart.js';
import { Chart } from 'react-chartjs-2';

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
  externalData?:number[];
  labels?:string[];
  delay?:number;
}> = ({ width, height, isFakeData, externalData, delay, labels}) => {

  const chartRef = React.useRef<ChartJS>(null);
  const [chartData, setChartData] = React.useState<ChartData<'line'>>({
    datasets: [],
  });

  const data = {
    // labels: labels.map((month) => month.slice(0, 3)),
    labels: labels ? labels : months.map((month) => month.slice(0, 3)),
    datasets: [
      {
        label: 'Dataset 1',
        data: externalData ? externalData : months.map(() => 100 ),
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
        backgroundColor: 'rgba(120, 113, 108, 1)',
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
      type='bar'
      ref={chartRef}
      data={chartData}
      width={width}
      height={height}
      options={options}
    />
  );
};

export default BarChart;

const months = [
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

// const data = {
//   months,
//   datasets: [
//     {
//       //   label: 'LAbEL',
//       data: months.map(() => faker.datatype.number({ min: 0, max: 1000 })),
//       backgroundColor: (context: ScriptableContext<'bar'>) => {
//         const ctx = context.chart.ctx;
//         const gradient = ctx.createLinearGradient(0, 0, 0, 200);
//         gradient.addColorStop(0, '#fde047');
//         gradient.addColorStop(1, '#f97316');
//         return gradient;
//       },
//     },
//   ],
// };
