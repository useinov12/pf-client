/* =============== Common ================== */
type Response<T> = {
  detail: {
    message: string;
    data: T;
  };
};
type Tokens = {
  access_token: string;
  refresh_token: string;
  refresh_token_type: 'bearer';
  token_type: 'bearer';
};
type UserData = {
  username: string;
  password: string;
  first_name: string;
  last_name: string;
};
export type Error = any

/* ================== User ==================*/
type UserApiData = Omit<UserData, 'password'>;
export type RegisterCredentials = UserData;
export type RegisterFormCredentials = RegisterCredentials & {
  passwordChecker: string;
};
export type LoginCredentials = Pick<UserData, 'username' | 'password'>;

export type LoginData = Response<Tokens>;
export type RegisterData = Response<UserApiData>;
export type CurrentUserData = Response<UserApiData>;

export type UserInContext = {
  firstName: string;
  lastName: string;
  username: string;
};

/* ================== Plaid ================== */
export type GetTokenResponse = Response<{
  link_token: string;
}>;
