import { ConnectedBanksDict } from '@/services/types';
import { months } from '@/components/charts/defaults';

const banksDict: ConnectedBanksDict = {
  'Navy Federal': [
    {
      id: 'nMXbrOz4BRSMDVnyZV50hpYaOvgXmvHAxvR4P',
      subtype: 'credit card',
      bank_name: 'Navy Federal',
      balance: 230,
      name: 'More Rewards Amex',
      user_id: 6,
    },
    {
      id: 'QLBP76NJAwTvarMmkr5Zs1k6OmNpRmHEKqYj6',
      subtype: 'savings',
      bank_name: 'Navy Federal',
      balance: 6515,
      name: 'Share Savings',
      user_id: 6,
    },
    {
      id: 'RDbqKLNJv6SpdmPyJmA5f70Lekrp8kHykmxR0',
      subtype: 'checking',
      bank_name: 'Navy Federal',
      balance: 1253,
      name: 'Active Duty Checking',
      user_id: 6,
    },
  ],
  'American Express': [
    {
      id: 'Rav3jBBy1LULQ3P8OqeZCMprNDzZDkSVoopOa',
      subtype: 'credit card',
      bank_name: 'American Express',
      balance: 430,
      name: 'MAKSYM KALINCHENKO -91008',
      user_id: 6,
    },
    {
      id: 'RDbqKLNJv6SpdmPyJmA5f70Lekrp8kHykmxR0',
      subtype: 'checking',
      bank_name: 'American Express',
      balance: 1253,
      name: 'Active Duty Checking',
      user_id: 6,
    },
  ],
  'Capital One': [
    {
      id: 'Rav3jBBy1LULQ3P8OqeZCMprNDzZDkSVoopOa',
      subtype: 'credit card',
      bank_name: 'Capital One',
      balance: 100,
      name: 'MAKSYM KALINCHENKO -91008',
      user_id: 6,
    },
  ],
  'Bank of America': [
    {
      id: 'Rav3jBBy1LULQ3P8OqeZCMprNDzZDkSVoopOa',
      subtype: 'credit card',
      bank_name: 'Bank of America',
      balance: 800,
      name: 'MAKSYM KALINCHENKO -91008',
      user_id: 6,
    },
    {
      id: 'RDbqKLNJv6SpdmPyJmA5f70Lekrp8kHykmxR0',
      subtype: 'checking',
      bank_name: 'Bank of America',
      balance: 4200,
      name: 'Active Duty Checking',
      user_id: 6,
    },
  ],
  'Chase JP Morgan': [
    {
      id: 'Rav3jBBy1LULQ3P8OqeZCMprNDzZDkSVoopOa',
      subtype: 'credit card',
      bank_name: 'Chase JP Morgan',
      balance: 1230,
      name: 'MAKSYM KALINCHENKO -91008',
      user_id: 6,
    },
    {
      id: 'RDbqKLNJv6SpdmPyJmA5f70Lekrp8kHykmxR0',
      subtype: 'checking',
      bank_name: 'Chase JP Morgan',
      balance: 6253,
      name: 'Active Duty Checking',
      user_id: 6,
    },
    {
      id: 'RDbqKLNJv6SpdmPyJmA5f70Lekrp8kHykmxR0',
      subtype: 'checking',
      bank_name: 'Chase JP Morgan',
      balance: 4253,
      name: 'Active Duty Checking',
      user_id: 6,
    },
  ],
  PNC: [
    {
      id: 'Rav3jBBy1LULQ3P8OqeZCMprNDzZDkSVoopOa',
      subtype: 'credit card',
      bank_name: 'PNC',
      balance: 567,
      name: 'MAKSYM KALINCHENKO -91008',
      user_id: 6,
    },
    {
      id: 'RDbqKLNJv6SpdmPyJmA5f70Lekrp8kHykmxR0',
      subtype: 'checking',
      bank_name: 'PNC',
      balance: 1153,
      name: 'Active Duty Checking',
      user_id: 6,
    },
    {
      id: 'RDbqKLNJv6SpdmPyJmA5f70Lekrp8kHykmxR0',
      subtype: 'checking',
      bank_name: 'PNC',
      balance: 1153,
      name: 'Active Duty Checking',
      user_id: 6,
    },
  ],
  'Union Pay': [
    {
      id: 'Rav3jBBy1LULQ3P8OqeZCMprNDzZDkSVoopOa',
      subtype: 'credit card',
      bank_name: 'Union Pay',
      balance: 5678,
      name: 'MAKSYM KALINCHENKO -91008',
      user_id: 6,
    },
  ],
  'Trust Bank': [
    {
      id: 'Rav3jBBy1LULQ3P8OqeZCMprNDzZDkSVoopOa',
      subtype: 'credit card',
      bank_name: 'Trust Bank',
      balance: 1200,
      name: 'MAKSYM KALINCHENKO -91008',
      user_id: 6,
    },
  ],
};

const demoMonhtlyTotalBalance = [
  1200, 1700, 1400, 1800, 2100, 1900, 1700, 2200, 2400, 1800, 2100,
];

const demoMonths = months
  .filter((_, i) => i < demoMonhtlyTotalBalance.length)
  .map((month) => month.slice(0, 3));

const demoMonthlyDynamic = {
  months: demoMonths,
  balances: demoMonhtlyTotalBalance,
};

export const demoData = {
  monthlyBalanceDynamic: demoMonthlyDynamic,
  connectedBanksDict: banksDict,
};

export interface BanksData {
  monthlyBalanceDynamic: {
    months: string[];
    balances: number[];
  };
  connectedBanksDict: ConnectedBanksDict;
}