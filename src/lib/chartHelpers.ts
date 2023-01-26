import type { ChartArea, ScriptableContext, Chart } from 'chart.js';
import {
  StyleOptions,
  ChartDataFormat,
  Dataset,
} from '@/components/charts/types';
import {
  defaultColorsBackground,
  defaultColorsStroke,
  grayShades,
  grayShadesBg,
} from '@/components/charts/defaults';
import { shortSumFormatter } from './sharedUtils';

/**
 *  Formats incoming dataset into Chart JS dataset format
 */
export function getChartDataStructure({
  incomingData,
  chartStyles,
  chart,
}: {
  incomingData: ChartDataFormat;
  chartStyles: StyleOptions;
  chart: Chart;
}) {
  const datasets: Dataset[] = incomingData.datasets.map((dataset, i) => {
    return {
      label: incomingData.label,
      data: dataset,
      backgroundColor:
        chartStyles === 'APP' ? defaultColorsBackground : grayShadesBg,
      borderColor: chartStyles === 'APP' ? defaultColorsStroke : grayShades,
      borderWidth: 1,
    };
  });

  return {
    labels: incomingData.labels,
    datasets: datasets,
  };
}

/**  Creates a gradient background for Chart */
export default function createGradient(
  ctx: CanvasRenderingContext2D | null,
  area: ChartArea
) {
  const colorStart = 'rgba(128, 128, 128, .8)';
  const colorMid = 'rgba(211, 211, 211, .5)';
  const colorEnd = 'rgba(169, 169, 169, .1)';

  if (ctx) {
    const gradient = ctx.createLinearGradient(0, area.bottom, 0, area.top);

    gradient.addColorStop(0, colorStart);
    gradient.addColorStop(0.5, colorMid);
    gradient.addColorStop(1, colorEnd);

    return gradient;
  }
  return 'rgba(253, 224, 71, .6)';
}

/**
 * dollar ticks:
 *  - add dollar sign
 *  - format sum to short variant(1200 -> 1.2k)
 *  - skip every second tick instance on the scale [1,2,3,4,5] -> [1,3,5]
 */
export const dollarTicks = {
  // color: '#C0C0C0',
  // Include a dollar sign in the ticks
  callback: (value: string | number, index: number, ticks: any) => {
    return index % 2 === 0 ? '$' + shortSumFormatter.format(Number(value)) : '';
  },
};

// example applying gradient
const fakeDataset = {
  labels: [1, 2, 3, 4, 5],
  datasets: [
    {
      label: 'Checking Account',
      data: [1, 2, 3, 4, 5].map(() => [1, 2, 3, 43, 4]),
      backgroundColor: ({ chart: { ctx } }: ScriptableContext<'bar'>) => {
        const gradient = ctx.createLinearGradient(0, 0, 0, 200);
        gradient.addColorStop(0, '#fde047');
        gradient.addColorStop(1, '#f97316');
        return gradient;
      },
    },
  ],
};
