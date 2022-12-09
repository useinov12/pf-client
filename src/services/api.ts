import { AxiosResponse } from 'axios';
import api from './axios';
import {
  CurrentUserData,
  GetTokenResponse,
  RegisterCredentials,
  LoginCredentials,
  LoginData,
  RegisterData,
  Error,
} from './types';

// USER API
export const createNewUser = (credentials: RegisterCredentials) =>
  api.post<RegisterData>(`/create_user`, credentials);

export const loginUser = async (credentials: LoginCredentials) =>
  api.post<LoginData>(`/login`, credentials);

export const getMe = async () => api.get<CurrentUserData>(`/user`);

// PLAID API
export const exchangePublicToken = (token: string) =>
  api.post<GetTokenResponse>(`/access_token`, {
    public_token: token,
  });

export const getLinkToken = () =>
  api.get<AxiosResponse, GetTokenResponse, any>(`/link/token/create`);
