import axios, { AxiosResponse } from 'axios';
import Cookies from 'js-cookie';
import https from 'https';

import {
  GetCurrentUserResponse,
  getLinkTokenResponse,
  RegisterCredentials,
  LoginCredentials,
} from './types';

const agent = new https.Agent({
  rejectUnauthorized: false,
});

const token = Cookies.get('token');

// docs: https://github.com/axios/axios#config-defaults
const api = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_SERVER_PATH}`,
  headers: {
    Authorization: `bearer ${token}`,
    'Content-Type': 'application/json',
  },
  httpsAgent: agent,
});

// Axios interceptors
// https://axios-http.com/docs/interceptors

// USER API
export const createNewUser = (credentials: RegisterCredentials) =>
  api.post(`/create_user`, credentials);

export const loginUser = (credentials: LoginCredentials) =>
  api.post(`/login`, credentials);

export const getMe = () =>
  api.get<AxiosResponse, GetCurrentUserResponse, any>(`/user`);

// PLAID API
export const exchangePublicToken = (token: string) =>
  api.post<AxiosResponse, getLinkTokenResponse, any>(`/access_token`, {
    public_token: token,
  });

export const getLinkToken = () =>
  api.get<AxiosResponse, getLinkTokenResponse, any>(`/link/token/create`);