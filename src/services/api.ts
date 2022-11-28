import axios from 'axios';
import Cookies from 'js-cookie';
import https from 'https';
import { User } from './user';

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

function modifyResponseShape(data: any): User {
  return data.detail.data;
}

// USER API
export const createNewUser = (credentials: Credentials) =>
  api.post(`/create_user`, credentials);

export const loginUser = (credentials: LoginCredentials) =>
  api.post(`/login`, credentials);

export async function getMe() {
  const response = await api.get(`/user`);
  if (response.status !== 200) {
    throw new Error('Problem fetching user');
  }
  const { data } = response;
  return modifyResponseShape(data);
}


// PLAID APIs
export const requestPublicToken = (token: string) =>
  axios.post(`/access_token`, { public_token: token });

export const requestLinkToken = () => axios.get(`/link/token/create`);
