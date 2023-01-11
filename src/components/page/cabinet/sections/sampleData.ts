import { ConnectedBanksDict, Account } from '@/services/types';

const sampleData: ConnectedBanksDict = {
  'Navy Federal': [
    {
      id: 'nMXbrOz4BRSMDVnyZV50hpYaOvgXmvHAxvR4P',
      subtype: 'credit card',
      bank_name: 'Navy Federal',
      balance: 1175,
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
      balance: 3169,
      name: 'MAKSYM KALINCHENKO -91008',
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
  'Capital One': [
    {
      id: 'Rav3jBBy1LULQ3P8OqeZCMprNDzZDkSVoopOa',
      subtype: 'credit card',
      bank_name: 'American Express',
      balance: 1869,
      name: 'MAKSYM KALINCHENKO -91008',
      user_id: 6,
    },
  ],
  'Bank of America': [
    {
      id: 'Rav3jBBy1LULQ3P8OqeZCMprNDzZDkSVoopOa',
      subtype: 'credit card',
      bank_name: 'American Express',
      balance: 1269,
      name: 'MAKSYM KALINCHENKO -91008',
      user_id: 6,
    },
    {
      id: 'RDbqKLNJv6SpdmPyJmA5f70Lekrp8kHykmxR0',
      subtype: 'checking',
      bank_name: 'Navy Federal',
      balance: 4200,
      name: 'Active Duty Checking',
      user_id: 6,
    },
  ],
  'Chase JP Morgan': [
    {
      id: 'Rav3jBBy1LULQ3P8OqeZCMprNDzZDkSVoopOa',
      subtype: 'credit card',
      bank_name: 'American Express',
      balance: 1769,
      name: 'MAKSYM KALINCHENKO -91008',
      user_id: 6,
    },
    {
      id: 'RDbqKLNJv6SpdmPyJmA5f70Lekrp8kHykmxR0',
      subtype: 'checking',
      bank_name: 'Navy Federal',
      balance: 6253,
      name: 'Active Duty Checking',
      user_id: 6,
    },
    {
      id: 'RDbqKLNJv6SpdmPyJmA5f70Lekrp8kHykmxR0',
      subtype: 'checking',
      bank_name: 'Navy Federal',
      balance: 4253,
      name: 'Active Duty Checking',
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
    {
      id: 'RDbqKLNJv6SpdmPyJmA5f70Lekrp8kHykmxR0',
      subtype: 'checking',
      bank_name: 'Navy Federal',
      balance: 1153,
      name: 'Active Duty Checking',
      user_id: 6,
    },
    {
      id: 'RDbqKLNJv6SpdmPyJmA5f70Lekrp8kHykmxR0',
      subtype: 'checking',
      bank_name: 'Navy Federal',
      balance: 153,
      name: 'Active Duty Checking',
      user_id: 6,
    },
  ],
  'Union Pay': [
    {
      id: 'Rav3jBBy1LULQ3P8OqeZCMprNDzZDkSVoopOa',
      subtype: 'credit card',
      bank_name: 'American Express',
      balance: 169,
      name: 'MAKSYM KALINCHENKO -91008',
      user_id: 6,
    },
  ],
  'Trust Bank': [
    {
      id: 'Rav3jBBy1LULQ3P8OqeZCMprNDzZDkSVoopOa',
      subtype: 'credit card',
      bank_name: 'American Express',
      balance: 7619,
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

interface PropsByBank {
  bank: string;
  data: ConnectedBanksDict;
}

function getPositiveAccTotalByBank({ bank, data }: PropsByBank): number {
  const positiveAccounts = data[bank].filter(
    (acc) => acc.subtype !== 'credit card'
  );

  return positiveAccounts.length > 0
    ? positiveAccounts.map((acc) => acc.balance).reduce((a, b) => a + b)
    : 0;
}
function getNegativeAccTotalByBank({ bank, data }: PropsByBank): number {
  const negativeAccounts = data[bank].filter(
    (acc) => acc.subtype === 'credit card'
  );

  return negativeAccounts.length > 0
    ? negativeAccounts.map((acc) => acc.balance).reduce((a, b) => a + b)
    : 0;
}

const getTotalBalanceByBank = ({ bank, data }: PropsByBank): number => {
  const positiveAccounts = getPositiveAccTotalByBank({ bank, data });
  const negativeAccounts = getNegativeAccTotalByBank({ bank, data });
  return positiveAccounts - negativeAccounts;
};

function getListOfBanksTotals(data: ConnectedBanksDict): number[] {
  const banksTotal = [];
  for (let bank in data) {
    banksTotal.push(getTotalBalanceByBank({ bank, data }));
  }
  return banksTotal;
}

export {
  sampleData,
  getListOfAllAccounts,
  getTotalCredit,
  getTotalBalance,
  getTotalBalanceByBank,
  getListOfBanksTotals,
};
