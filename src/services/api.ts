import axios from 'axios';
import Cookies from 'js-cookie';
import https from 'https';

const agent = new https.Agent({
  rejectUnauthorized: false,
});

// docs: https://github.com/axios/axios#config-defaults
const api = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_SERVER_PATH}`,
  headers: {
    Authorization: `Bearer ${Cookies.get('token')}`,
    'Content-Type': 'application/json',
  },
  httpsAgent: agent,
});

export default api;

export interface Credentials {
  username: string;
  password: string;
  first_name: string;
  last_name: string;
}
export type LoginCredentials = Pick<Credentials, 'username' | 'password'>;

// USER API
export const createNewUser = (credentials: Credentials) => api.post(`/create_user`, credentials);

export const loginUser = (credentials: LoginCredentials) => api.post(`/login`, credentials);

export const getMe = async () => {
  const { data } = await api.get(`/user`);
  return data;
};

// export const getMe = async () => await api.get(`/user`);


// PLAID APIs
export const requestPublicToken = (token: string) =>
  axios.post(`/access_token`, { public_token: token });

export const requestLinkToken = () => axios.get(`/link/token/create`);
