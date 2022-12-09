import axios, { AxiosRequestConfig } from 'axios';
import https from 'https';
import logger from '@/lib/logger';
import { Storage } from '@/lib/storage';

const agent = new https.Agent({
  rejectUnauthorized: false,
});

// docs: https://github.com/axios/axios#config-defaults
const api = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_SERVER_PATH}`,
  httpsAgent: agent,
  // withCredentials: true,
});

export default api;

// Axios interceptors
// https://axios-http.com/docs/interceptors
// https://lightrains.com/blogs/axios-intercepetors-react/

// Request interceptor
api.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    config.headers = config.headers ?? {};
    config.headers['Authorization'] = 'Bearer ' + Storage.get('token');
    config.headers['Content-Type'] = 'application/json';

    logger({ token: Storage.get('token') }, 'Token set in interceptor');

    return config;
  },
  (error) => {
    logger({ error: error }, 'Error occured in interceptor');
    Promise.reject(error);
  }
);
