import axios, { AxiosRequestConfig } from 'axios';
import https from 'https';
import logger from '@/lib/logger';
import { Storage } from '@/lib/storage';
import { memoizeRefreshFn } from './user/actions';

/* Axios instance
  docs: https://github.com/axios/axios#config-defaults
*/

/**
 * Axios API instance for requests that do not require **Authorization**
 *  */
export const apiPublic = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_SERVER_PATH}`,
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * Axios API instance for requests that require **Authorization**
 *  */
export const apiPrivate = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_SERVER_PATH}`,
  // withCredentials: true,
});

/* Axios interceptors
  docs: https://axios-http.com/docs/interceptors
  ref: https://lightrains.com/blogs/axios-intercepetors-react/
  ref:https://dev.to/franciscomendes10866/how-to-use-axios-interceptors-b7d
*/

/* Request interceptor */
apiPrivate.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    config.headers = config.headers ?? {};
    config.headers['Content-Type'] = 'application/json';

    config.headers['Authorization'] = 'Bearer ' + Storage.get('token');

    logger({ token: Storage.get('token') }, 'Token set in interceptor');

    return config;
  },
  (error) => {
    logger({ error: error }, 'Error occured in interceptor');
    Promise.reject(error);
  }
);

/* Response interceptor */
apiPrivate.interceptors.response.use(
  (response) => {
    return response;
  },
  async function (error) {
    const originalRequest = error.config;
    if (error.response.status === 403 && !originalRequest._retry) {
      originalRequest._retry = true;
      const access_token = await memoizeRefreshFn();
      Storage.set('token', access_token)
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + access_token;
      return apiPrivate(originalRequest);
    }
    return Promise.reject(error);
  }
);
