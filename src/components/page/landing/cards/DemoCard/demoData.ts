import { faker } from '@faker-js/faker';

export type Transaction = {
  amount: number;
  type: string;
};

type Account = {
  type: string;
  sum: number;
};

export interface DemoData {
  bank: string;
  transactions: Transaction[];
  accounts: Account[];
  dynamic: number[];
}

const transactions1 = [
  {
    amount: -401,
    type: 'TRANSFER',
  },
  {
    amount: -28,
    type: 'TRANSACTION',
  },
  {
    amount: -1259,
    type: 'LOAN',
  },
  {
    amount: 640,
    type: 'DEPOSIT',
  },
];
const transactions2 = [
  {
    amount: -23,
    type: 'TRANSFER',
  },
  {
    amount: -117,
    type: 'TRANSACTION',
  },
  {
    amount: 455,
    type: 'DEPOSIT',
  },
  {
    amount: 385,
    type: 'DEPOSIT',
  },
];
const transactions3 = [
  {
    amount: -12300,
    type: 'LOAN',
  },
  {
    amount: 6417,
    type: 'DEPOSIT',
  },
  {
    amount: 2385,
    type: 'DEPOSIT',
  },
  {
    amount: -2300,
    type: 'LOAN',
  },
];

/* Demo data collection */
export const demoDataCollection: DemoData[] = [
  {
    bank: 'Capital One',
    transactions: transactions1,
    accounts: [
      { type: 'Credit', sum: -2200 },
      { type: 'Checking', sum: 1100 },
      { type: 'Saving', sum: 5000 },
    ],
    dynamic: [1000, 1200, 1400, 1800, 1400, 1600, 1700, 1200],
  },
  {
    bank: 'Bank of America',
    transactions: transactions2,
    accounts: [
      { type: 'Credit', sum: -1700 },
      { type: 'Checking', sum: 4200 },
      { type: 'Saving', sum: 9700 },
    ],
    dynamic: [1200, 1700, 1400, 1800, 2100, 1900, 1700, 2200],
  },
  {
    bank: 'American Express',
    transactions: transactions3,
    accounts: [
      { type: 'Credit', sum: 700 },
      { type: 'Checking', sum: 2700 },
      { type: 'Saving', sum: 12000 },
    ],
    dynamic: [2200, 1700, 1400, 1800, 1500, 1200, 1100, 1700],
  },
];
