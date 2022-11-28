import React, { Dispatch, createContext, useReducer, useContext } from 'react';
import Cookies from 'js-cookie';
import toast from 'react-hot-toast';
import { useQuery } from '@tanstack/react-query';

import {
  Credentials,
  LoginCredentials,
  createNewUser as apiCreateNewUser,
  loginUser as apiLoginUser,
  getMe as apiGetMe,
} from './api';

/**
 * *Sends Post request to Server*\
 * Notifies user about results of the request with `toast`
 * @description `register` is an `Action` - API call that
 * does not have an effect on cached entity data
 * @param {Credentials} Credentials
 * @returns {number} `Status Code`
 * */
export async function register(signUpCred: Credentials) {
  try {
    const { status } = await apiCreateNewUser(signUpCred);
    toast.success('You are successfully registered!');
    return { status: status };
  } catch (error: any) {
    if (error.response.status === 404) {
      toast.error(error.response.data.detail.message);
    } else {
      toast.error('An unexpected error occurred :(  Try again.');
    }
    return { status: error.response.status };
  }
}

/**
 * ** Login user**\
 * Sets JWT as a cookie\
 * Notifies user about results of the request with `toast`\
 * **@description** `login` is an `Action` - API call that
 * does not have an effect on cached entity data
 * @param {LoginCredentials} LoginCredentials
 * @returns {number} `Status Code`
 */
export async function login(loginCred: LoginCredentials) {
  try {
    const { status, data } = await apiLoginUser(loginCred);
    Cookies.set('token', data.detail.data.access_token, { secure: true });
    toast.success('Successfull login');
    return { status: status };
  } catch (error: any) {
    if (error.response.status === 403) {
      toast.error('The email address or password you entered is invalid');
    } else {
      toast.error('An unexpected error occurred :(  Try again.');
    }
    return { status: error.response.status };
  }
}




export type User = {
  firstName: string;
  lastName: string;
  username: string;
};

interface UserContextShape {
  user: User | null;
  isLoading: boolean;
  handleLogout:()=>void
}

export const UserContext = createContext<UserContextShape>({
  user: null,
  isLoading: true,
  handleLogout:()=>{}
});

export function UserProvider(props: any) {
  const { data, isLoading } = useQuery(['user'], apiGetMe);

  const [user, setUser] = React.useState(data);

  function handleLogout() {
    Cookies.remove('token');
    setUser(undefined)
  }

  React.useEffect(() => {
    setUser(data);
  }, [isLoading]);

  return <UserContext.Provider value={{ user, isLoading, handleLogout }} {...props} />;
}

export const useUser = () => React.useContext(UserContext);
