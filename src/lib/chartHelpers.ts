import type { ChartArea, ScriptableContext, Chart } from 'chart.js';
import {
  StyleOptions,
  ChartDataFormat,
  ChartDataStructure,
  Dataset,
} from '@/components/charts/types';
import {
  defaultColorsBackground,
  defaultColorsStroke,
  grayShades,
  grayShadesBg,
} from '@/components/charts/defaults';

/* Creates a gradient background for Chart */
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

/* Formats incoming dataseet into Chart Js data for charts */
interface GetChartStructureProps {
  incomingData: ChartDataFormat;
  chartStyles: StyleOptions;
  chart: Chart;
}
export function getChartDataStructure({
  incomingData,
  chartStyles,
  chart,
}: GetChartStructureProps) {
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
      data: labels.map(() => [1, 2, 3, 43, 4]),
      backgroundColor: ({ chart: { ctx } }: ScriptableContext<'bar'>) => {
        const gradient = ctx.createLinearGradient(0, 0, 0, 200);
        gradient.addColorStop(0, '#fde047');
        gradient.addColorStop(1, '#f97316');
        return gradient;
      },
    },
    {
      label: 'Saving Account',
      data: labels.map(() => [1, 2, 3, 43, 4]),
      backgroundColor: ({ chart: { ctx } }: ScriptableContext<'bar'>) => {
        const gradient = ctx.createLinearGradient(0, 0, 0, 200);
        gradient.addColorStop(0, '#bae6fd');
        gradient.addColorStop(1, '#2563eb');
        return gradient;
      },
    },
    {
      label: 'Credit Account',
      data: labels.map(() => [1, 2, 3, 43, 4]),
      backgroundColor: ({ chart: { ctx } }: ScriptableContext<'bar'>) => {
        const gradient = ctx.createLinearGradient(0, 0, 0, 200);
        gradient.addColorStop(0, '#a78bfa');
        gradient.addColorStop(1, '#c026d3');
        return gradient;
      },
    },
  ],
};
