import axios from 'axios';
import Cookies from 'js-cookie';

// docs: https://github.com/axios/axios#config-defaults
const api = axios.create({
    baseURL: `${process.env.NEXT_PUBLIC_SERVER_PATH}`,
    headers: {
        "Authorization": `Bearer ${Cookies.get('token')}`,
        "Content-Type":'application/json'
    }
});

export default api;

export interface Credentials {
    username: string;
    password: string;
    first_name: string;
    last_name: string;
}

export type LoginCredentials = Pick<Credentials, 'username' | 'password'>

export const createNewUser = (credentials:Credentials) => api.post(`/create_user`, credentials);

export const loginUser = (credentials:LoginCredentials) => api.post(`/login`, credentials);

export const getCurrentSession = () => api.get(`/user/home`) //re-do to session

