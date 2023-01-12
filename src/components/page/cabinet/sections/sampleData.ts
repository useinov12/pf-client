import { ConnectedBanksDict, Account, Bank } from '@/services/types';

// get list of all acounts from all banks
export function getListOfAllAccounts(data: ConnectedBanksDict): Account[] {
  const accounts: Account[] = [];
  for (let bank in data) {
    data[bank].map((acc) => accounts.push(acc));
  }
  return accounts;
}

// get total debt
export function getTotalCredit(data: ConnectedBanksDict): number {
  const accounts = getListOfAllAccounts(data);

  const negativeAccounts = accounts
    .filter((acc) => acc.subtype === 'credit card')
    .map((acc) => acc.balance)
    .reduce((a, b) => a + b);

  return negativeAccounts;
}

// get total cash accounts
export function getCashBalanceByBank({ bank, data }: PropsByBank): number {
  const positiveAccounts = data[bank].filter(
    (acc) => acc.subtype !== 'credit card'
  );

  return positiveAccounts.length > 0
    ? positiveAccounts.map((acc) => acc.balance).reduce((a, b) => a + b)
    : 0;
}

// get total balance
export function getTotalBalance(data: ConnectedBanksDict): number {
  const accounts = getListOfAllAccounts(data);

  const balance = accounts
    .filter((acc) => acc.subtype !== 'credit card')
    .map((acc) => acc.balance)
    .reduce((a, b) => a + b);

  return balance - getTotalCredit(data);
}

// get list of banks frrom banks dictionary
export function getListOfBanks(data: ConnectedBanksDict): Bank[] {
  const listOfBanks: Bank[] = [];

  for (let bankName in data) {
    const bank = data[bankName];
    listOfBanks.push(bank);
  }
  return listOfBanks;
}

// get sorted Bank list
export function sortedListOfBanksByBalance(data: ConnectedBanksDict): Bank[] {
  const unsortedList = getListOfBanks(data);

  const sortedList = unsortedList.sort((a, b) => {
    const currentBank = a[0].bank_name;
    const nextBankName = b[0].bank_name;

    const currentTotal = getTotalBalanceByBank({ bank: currentBank, data });
    const prevTotal = getTotalBalanceByBank({ bank: nextBankName, data });

    return currentTotal - prevTotal;
  });

  return sortedList;
}

/*  by bank funcitons */
interface PropsByBank {
  bank: string;
  data: ConnectedBanksDict;
}

// get Bank Balance
export function getTotalBalanceByBank({ bank, data }: PropsByBank): number {
  const positiveAccounts = getCashBalanceByBank({ bank, data });
  const negativeAccounts = getDebtBalanceByBank({ bank, data });
  return positiveAccounts - negativeAccounts;
}

// get Total of Bank's credit accounst
export function getDebtBalanceByBank({ bank, data }: PropsByBank): number {
  const negativeAccounts = data[bank].filter(
    (acc) => acc.subtype === 'credit card'
  );

  return negativeAccounts.length > 0
    ? negativeAccounts.map((acc) => acc.balance).reduce((a, b) => a + b)
    : 0;
}

export const sampleData: ConnectedBanksDict = {
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
