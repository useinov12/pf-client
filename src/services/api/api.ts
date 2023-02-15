import axios from 'axios';

import { Storage } from '@/lib/storage';

import { InitialData } from '@/constant/demo-data/demoData';

import { apiPrivate, apiPublic } from './instances';
import {
  ConnectedBanksData,
  CurrentUserData,
  LinkTokenData,
  LoginCredentials,
  LoginData,
  RefreshTokenData,
  RegisterCredentials,
  RegisterData,
} from '../types';

/* USER API */
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
// .catch((e) => logger(e, '🛑 get user error'));

/* PLAID API */
export const exchangePublicToken = (token: { public_token: string }) =>
  apiPrivate.post(`/access_token`, token);

export const getLinkToken = () =>
  apiPrivate.get<LinkTokenData>(`/link/token/create`);

/* DATA API */
export const getConnectedBanks = () =>
  apiPrivate.get<ConnectedBanksData>('/accounts/get');

export const nextApiGetDemoBanks = () =>
  axios.get<InitialData>(`http://localhost:3000/api/demo-data`, {
    headers: { 'Content-Type': 'application/json' },
  });

// export const nextApiGetDemoBanks = async () => {
//   try {
//     const resp = await axios.get<InitialData>(
//       `http://localhost:3000/api/demo-data`,
//       {
//         headers: { 'Content-Type': 'application/json' },
//       }
//     );
//     if (resp.status === 200) {
//       return resp.data;
//     }
//   } catch (e) {
//     logger(e, '☹️ NEXT DEMO ERROR');
//   }
// };
