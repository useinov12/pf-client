import { useRef, useEffect, useState } from 'react';
import { Chart as ChartJS, ChartData  } from 'chart.js';
import { Chart } from 'react-chartjs-2';
import { ChartProps } from './types';
import 'chart.js/auto';
import { getChartDataStructure } from '@/lib/chartHelpers'


interface LineChartProps extends ChartProps{
  width: string;
  height: string;
}

export default function LineChart({ width, height, delay, incomingData }:LineChartProps){

  const chartRef = useRef<ChartJS>(null);
  const [chartData, setChartData] = useState<ChartData<'line'>>({
    datasets: [],
  });

  useEffect(() => {
    const chart = chartRef.current;

    if (!chart || !incomingData) {
      return;
    }

    const chartData = getChartDataStructure(incomingData)
    
    if(delay){
      const timer = setTimeout(()=>{
        setChartData(chartData);
      }, delay)
      return () => clearTimeout(timer)
    }
    else setChartData(chartData);

  }, [incomingData]);

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



/* Chart JS options for Line chart*/
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