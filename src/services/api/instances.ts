import axios, { AxiosRequestConfig } from 'axios';
import dayjs from 'dayjs';
import jwt_decode from 'jwt-decode';

import logger from '@/lib/logger';
import { Storage } from '@/lib/storage';

import { memoizeRefreshTokens } from '../auth/actions';

/**
 * Axios API instance for requests that do not require **Auth**\
 * docs: https://github.com/axios/axios#config-defaults
 *  */
export const apiPublic = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_SERVER_PATH}/api/`,
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * Axios API instance for requests that require **Auth**
 * docs: https://github.com/axios/axios#config-defaults
 *  */
export const apiPrivate = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_SERVER_PATH}/api/`,
  // withCredentials: true,
});

/* Axios interceptors
  docs: https://axios-http.com/docs/interceptors
  ref: https://lightrains.com/blogs/axios-intercepetors-react/
  ref:https://dev.to/franciscomendes10866/how-to-use-axios-interceptors-b7d
*/
apiPrivate.interceptors.request.use(
  async (req: AxiosRequestConfig) => {
    const accessToken = Storage.get('accessToken')
      ? Storage.get('accessToken')
      : null;

    req.headers = req.headers ?? {};
    req.headers['Content-Type'] = 'application/json';
    req.headers['Authorization'] = `Bearer ${accessToken}`;

    if (accessToken) {
      const session = jwt_decode<JwtPayload>(accessToken);
      const isExpired = dayjs.unix(session.exp).diff(dayjs()) < 1;

      if (!isExpired) return req;

      logger(isExpired, '🟨 JWT is Expired');

      const newAccessToken = await memoizeRefreshTokens();
      req.headers['Authorization'] = 'Bearer ' + newAccessToken;
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
