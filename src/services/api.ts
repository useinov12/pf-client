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
  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${Storage.get('refreshToken')}`,
  };
  return apiPublic.get<RefreshTokenData>(`/refresh`, { headers });
};

export const getMe = () => apiPrivate.get<CurrentUserData>(`/user`);

// PLAID API
export const exchangePublicToken = (token: { public_token: string }) =>
  apiPrivate.post(`/access_token`, token);

export const getLinkToken = () =>
  apiPrivate.get<LinkTokenData>(`/link/token/create`);

// DATA
export const getConnectedBanks = () =>
  apiPrivate.get<ConnectedBanksData>('/accounts/get');