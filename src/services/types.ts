/* =============== Common ================== */

/* backend response format */
type Response<T> = {
  detail: {
    message: string;
    data: T;
  };
};

/* tokens response format */
type Tokens = {
  access_token: string;
  refresh_token: string;
  refresh_token_type: 'bearer';
  token_type: 'bearer';
};

/* user data response format */
type UserData = {
  username: string;
  password: string;
  first_name: string;
  last_name: string;
};
export type Error = any;

/* ================== User ==================*/
export type UserApiData = Omit<UserData, 'password'>;
export type RegisterCredentials = UserData;
export type RegisterFormCredentials = RegisterCredentials & {
  passwordChecker: string;
};
export type LoginCredentials = Pick<UserData, 'username' | 'password'>;

export type LoginData = Response<Tokens>;
export type RegisterData = Response<UserApiData>;
export type CurrentUserData = Response<UserApiData>;

export type RefreshData = {
  jwt_token: string;
  refresh_token: string;
};
// export type RefreshTokenData = Response<RefreshData>;
/* temporary while backend refactoring */
export type RefreshTokenData = {
  message: string;
  data: RefreshData;
};

export type UserInContext = {
  firstName: string;
  lastName: string;
  username: string;
};


/* ================== Plaid ================== */
export type LinkTokenData = Response<string>;

/* ================== Data ================== */
export type Account = {
  id: string;
  subtype: string;
  bank_name: string;
  balance: number;
  name: string;
  user_id: number;
};
type BankName = string;
export type ConnectedBanksDict = Record<BankName, Account[]>;

export type ConnectedBanksData = Response<ConnectedBanksDict>;

/* example */
const banks: ConnectedBanksDict = {
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
};
