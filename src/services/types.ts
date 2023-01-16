/* Shared */

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

/* User */
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

/* Plaid */
export type LinkTokenData = Response<string>;

/* Data */
export type Account = {
  id: string;
  subtype: string;
  bank_name: string;
  balance: number;
  name: string;
  user_id: number;
};

export type Bank = Account[];

type BankName = string;
export type ConnectedBanksDict = Record<BankName, Account[]>;

export type ConnectedBanksData = Response<ConnectedBanksDict>;
