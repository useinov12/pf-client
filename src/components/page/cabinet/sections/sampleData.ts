import { ConnectedBanksDict, Account } from '@/services/types';

const sampleData: ConnectedBanksDict = {
  'Navy Federal': [
    {
      id: 'nMXbrOz4BRSMDVnyZV50hpYaOvgXmvHAxvR4P',
      subtype: 'credit card',
      bank_name: 'Navy Federal',
      balance: 175,
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
      balance: 769,
      name: 'MAKSYM KALINCHENKO -91008',
      user_id: 6,
    },
  ],
  'Capital One': [
    {
      id: 'Rav3jBBy1LULQ3P8OqeZCMprNDzZDkSVoopOa',
      subtype: 'credit card',
      bank_name: 'American Express',
      balance: 769,
      name: 'MAKSYM KALINCHENKO -91008',
      user_id: 6,
    },
  ],
  'Bank of America': [
    {
      id: 'Rav3jBBy1LULQ3P8OqeZCMprNDzZDkSVoopOa',
      subtype: 'credit card',
      bank_name: 'American Express',
      balance: 769,
      name: 'MAKSYM KALINCHENKO -91008',
      user_id: 6,
    },
  ],
  'Chase JP Morgan': [
    {
      id: 'Rav3jBBy1LULQ3P8OqeZCMprNDzZDkSVoopOa',
      subtype: 'credit card',
      bank_name: 'American Express',
      balance: 769,
      name: 'MAKSYM KALINCHENKO -91008',
      user_id: 6,
    },
  ],
  PNC: [
    {
      id: 'Rav3jBBy1LULQ3P8OqeZCMprNDzZDkSVoopOa',
      subtype: 'credit card',
      bank_name: 'American Express',
      balance: 769,
      name: 'MAKSYM KALINCHENKO -91008',
      user_id: 6,
    },
  ],
  'Union Pay': [
    {
      id: 'Rav3jBBy1LULQ3P8OqeZCMprNDzZDkSVoopOa',
      subtype: 'credit card',
      bank_name: 'American Express',
      balance: 769,
      name: 'MAKSYM KALINCHENKO -91008',
      user_id: 6,
    },
  ],
  'Bank #3': [
    {
      id: 'Rav3jBBy1LULQ3P8OqeZCMprNDzZDkSVoopOa',
      subtype: 'credit card',
      bank_name: 'American Express',
      balance: 769,
      name: 'MAKSYM KALINCHENKO -91008',
      user_id: 6,
    },
  ],
  'Bank #7': [
    {
      id: 'Rav3jBBy1LULQ3P8OqeZCMprNDzZDkSVoopOa',
      subtype: 'credit card',
      bank_name: 'American Express',
      balance: 769,
      name: 'MAKSYM KALINCHENKO -91008',
      user_id: 6,
    },
  ],
  'Bank #12': [
    {
      id: 'Rav3jBBy1LULQ3P8OqeZCMprNDzZDkSVoopOa',
      subtype: 'credit card',
      bank_name: 'American Express',
      balance: 769,
      name: 'MAKSYM KALINCHENKO -91008',
      user_id: 6,
    },
  ],
};

const connectedBanks = Object.keys(sampleData);
const getAccountsByBank = (bank: string) => sampleData[bank];

const accountTitleByBank = (bank: string) =>
  sampleData[bank].map((acc) => acc.name);
const accountTypesByBank = (bank: string) =>
  sampleData[bank].map((acc) => acc.subtype);
const accBalanceByBank = (bank: string) =>
  sampleData[bank].map((acc) => acc.balance);
const totalBalanceByBank = (bank: string) =>
  accBalanceByBank(bank).reduce((a, b) => a + b);

function getListOfAllAccounts(data: ConnectedBanksDict): Account[] {
  const accounts: Account[] = [];
  for (let bank in data) {
    data[bank].map((acc) => accounts.push(acc));
  }
  return accounts;
}

function getTotalCredit(data: ConnectedBanksDict): number {
  const accounts = getListOfAllAccounts(data);

  const negativeAccounts = accounts
    .filter((acc) => acc.subtype === 'credit card')
    .map((acc) => acc.balance)
    .reduce((a, b) => a + b);

  return negativeAccounts;
}

function getTotalBalance(data: ConnectedBanksDict): number {
  const accounts = getListOfAllAccounts(data);

  const balance = accounts
    .filter((acc) => acc.subtype !== 'credit card')
    .map((acc) => acc.balance)
    .reduce((a, b) => a + b);

  return balance - getTotalCredit(data);
}

export { sampleData, getListOfAllAccounts, getTotalCredit, getTotalBalance };
