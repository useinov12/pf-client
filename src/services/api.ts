import { AxiosResponse } from 'axios';
import { apiPrivate, apiPublic } from './axios';
import {
  CurrentUserData,
  GetTokenResponse,
  RegisterCredentials,
  LoginCredentials,
  LoginData,
  RegisterData,
  RefreshTokenData,
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
export const exchangePublicToken = (token: string) =>
  apiPrivate.post<GetTokenResponse>(`/access_token`, {
    public_token: token,
  });

export const getLinkToken = () =>
  apiPrivate.get<AxiosResponse, GetTokenResponse, any>(`/link/token/create`);
