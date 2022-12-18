import { AxiosResponse } from 'axios';
import { apiPrivate, apiPublic } from './axios';
import {
  CurrentUserData,
  LinkTokenData,
  RegisterCredentials,
  LoginCredentials,
  LoginData,
  RegisterData,
  RefreshTokenData,
  ConnectedBanksData,
} from './types';
import { Storage } from '@/lib/storage';

// USER API
export const createNewUser = (credentials: RegisterCredentials) =>
  apiPublic.post<RegisterData>(`/create_user`, credentials);

export const loginUser = (credentials: LoginCredentials) =>
  apiPublic.post<LoginData>(`/login`, credentials);

export const refreshAccessToken = () => {
  // temporary set refresh token as Authorization in header
  // refactor to param  when backend is ready
  const refreshToken = Storage.get('refresh');
  const headers = {
    Authorization: `Bearer ${refreshToken}`,
  };

  return apiPublic.get<RefreshTokenData>(`/refresh`, { headers });
};

export const getMe = () => apiPrivate.get<CurrentUserData>(`/user`);

// PLAID API
export const exchangePublicToken = (token:string, bankName:string) =>
  apiPrivate.post(`/access_token`, {
    public_token: token,
    bank_name:bankName
  });

export const getLinkToken = () =>
  apiPrivate.get<LinkTokenData>(`/link/token/create`);


// DATA
export const getConnectedBanks = () => apiPrivate.get<ConnectedBanksData>('/accounts/get')


