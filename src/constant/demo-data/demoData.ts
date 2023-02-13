import { getTotalBalance, getTotalCredit } from '@/lib/dataFormatingMethods';

import { months } from '@/components/charts/defaults';

import { connectedBanksSet } from '@/constant/demo-data/connectedBanksSet';
import { ConnectedBanksDict } from '@/services/types';
import { UserApiData } from '@/services/types';

const User: UserApiData = {
  username: 'john_doe@mail.com',
  first_name: 'John',
  last_name: 'Doe',
};

const initData = {
  totalBalance: getTotalBalance(connectedBanksSet),
  totalDebt: getTotalCredit(connectedBanksSet),
  totalBalanceMonthlyChange: [
    10200, 13700, 12400, 11800, 11100, 11900, 17700, 24200, 19400, 13800, 22100,
  ],
  connectedBanksSet: connectedBanksSet,
};

const demo = {
  user: User,
  data: initData,
};

// ! total balance monthly change
// ! monthly change ba account type

const demoMonhtlyTotalBalance = [
  14200, 13700, 12400, 11800, 11100, 1900, 17700, 24200, 19400, 13800, 22100,
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
  connectedBanksDict: connectedBanksSet,
};

export interface BanksData {
  monthlyBalanceDynamic: {
    months: string[];
    balances: number[];
  };
  connectedBanksDict: ConnectedBanksDict;
}

export interface InitialData {
  monthlyBalanceDynamic: {
    months: string[];
    balances: number[];
  };
  connectedBanksDict: ConnectedBanksDict;
}
