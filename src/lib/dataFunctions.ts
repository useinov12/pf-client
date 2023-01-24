import { ConnectedBanksDict, Account, Bank } from '@/services/types';
import { months } from '@/components/charts/defaults';

// get list of all acounts from all banks
export function getListOfAllAccounts(data: ConnectedBanksDict): Account[] {
  const accounts: Account[] = [];
  for (const bank in data) {
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

  for (const bankName in data) {
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

/* methods by bank  */
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

// get array of sorted banks
export const getSortedBankData = (connectedBanksDict: ConnectedBanksDict) => {
  const sortedBanks = sortedListOfBanksByBalance(connectedBanksDict);
  const sortedBankNames = sortedBanks.map((bank) => bank[0].bank_name);
  const sortedTotals = sortedBanks.map((bankName) =>
    getTotalBalanceByBank({
      bank: bankName[0].bank_name,
      data: connectedBanksDict,
    })
  );

  return {
    sortedBankNames,
    sortedTotals,
  };
};