import axios, { AxiosRequestConfig } from 'axios';
import https from 'https';
import logger from '@/lib/logger';
import { Storage } from '@/lib/storage';
import { memoizeRefreshTokenFn } from './user/actions';
import jwt from 'jsonwebtoken';
import dayjs from 'dayjs';
import jwt_decode from 'jwt-decode';

/* Axios instance
  docs: https://github.com/axios/axios#config-defaults
*/

/**
 * Axios API instance for requests that do not require **Auth**
 *  */
export const apiPublic = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_SERVER_PATH}`,
  headers: {
    'Content-Type': 'application/json',
  },
});

const accessToken = Storage.get('accessToken')
  ? Storage.get('accessToken')
  : null;
/**
 * Axios API instance for requests that require **Auth**
 *  */
export const apiPrivate = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_SERVER_PATH}`,
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${accessToken}`,
  },
  // withCredentials: true,
});

/* Axios interceptors
  docs: https://axios-http.com/docs/interceptors
  ref: https://lightrains.com/blogs/axios-intercepetors-react/
  ref:https://dev.to/franciscomendes10866/how-to-use-axios-interceptors-b7d
*/

apiPrivate.interceptors.request.use(
  async (req: AxiosRequestConfig) => {
    req.headers = req.headers ?? {};
    req.headers['Content-Type'] = 'application/json';
    req.headers['Authorization'] = `Bearer ${accessToken}`;

    if (accessToken) {
      const user = jwt_decode<JwtPayload>(accessToken);
      logger(user.exp, '🟪 Decoed user');
      const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1;

      if (!isExpired) return req;
      logger(isExpired, '🟨 JWT is Expired');
  
      const response = await memoizeRefreshTokenFn();
  
      Storage.set('accessToken', response?.jwt_token);
      Storage.set('refreshToken', response?.refresh_token);
  
      req.headers['Authorization'] = 'Bearer ' + response?.jwt_token;
      return req;
    }

    return req;
  },
  (error) => {
    logger({ error: error }, '🟥 Error occured in  request interceptor');
    Promise.reject(error);
  }
);

type JwtPayload = {
  exp: number;
  first: string;
  last: string;
  username: string;
};

