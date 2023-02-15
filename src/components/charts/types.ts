export interface ChartProps{
  incomingData: ChartDataFormat | undefined;
  styleOptions:StyleOptions
  title?:string
}
export type StyleOptions = 'LANDING' | 'APP'

export type IncomingDataset = number[];

export type ChartDataFormat = {
  labels: string[];
  label: string; // common label is definitoin of dataset. Not the same as labels
  datasets: IncomingDataset[]; // array of datasets
  datasetsLabels?: string[]; // label for each IncomingDataset in IncomingDataset[]
};

/* IncomingData mapped and datasets created */

export type Dataset = {
  label: string;
  data: number[];
  backgroundColor?: string[];
  borderColor?: string[];
  borderWidth?: number;
};

export type ChartDataStructure = {
  labels: string[];
  datasets: Dataset[];
};













const example: ChartDataStructure = {
  labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
  datasets: [
    {
      label: '# of Votes', // common label
      data: [12, 19, 3, 5, 2, 3],
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)',
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)',
      ],
      borderWidth: 1,
    },
  ],
};
