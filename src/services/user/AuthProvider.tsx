import { createContext, useState, useContext } from 'react';
import { CurrentUserData, UserInContext } from '../types';
import { useRouter } from 'next/router';
import { useQuery } from 'react-query';
import { getMe } from '../api';
import logger from '@/lib/logger';
import { Storage } from '@/lib/storage';
import { AxiosResponse } from 'axios';

export const AuthContext = createContext<
  | {
      isLoading: boolean;
      isFetching: boolean;
      user: UserInContext | null;
      setRedirect: (redirect: string) => void;
      getRedirect: () => string | null;
      clearRedirect: () => void;
      handleLogout: () => void;
    }
  | undefined
>(undefined);

export function AuthProvider(props:any) {
  const router = useRouter();
  const [user, setUser] = useState<UserInContext | null>(null);
  const { data, isSuccess, isLoading, isError, isFetching } = useQuery(
    ['user'],
    getMe,
    {
      onError: (data) => logger(data, 'Error occured during user fetching.'),
      onSuccess: (data:AxiosResponse<CurrentUserData, any>) => {
        if (data) {
          const formatedUserResponse = formatUserApiResponse(data);
          if(user?.username !== formatedUserResponse.username){
            setUser(formatedUserResponse);
            logger(formatedUserResponse, 'Succesfull user fetch.');
          }
        }
      },
    }
  );

  async function handleLogout() {
    /* Order matters: do route first, then rest.
      Otherwise will trigger AuthGuard and redirect to /signup */
    await router.push('/');
    Storage.clear('token');
    setUser(null);
    logger({user:user}, 'Logout performed',);
  }

  const value = {
    user,
    isLoading,
    isFetching,
    setRedirect,
    getRedirect,
    clearRedirect,
    handleLogout,
  };

  return <AuthContext.Provider value={value} {...props}/>;
}

/**
 * Auth Context access */
export function useAuth() {
  const auth = useContext(AuthContext);
  if (!auth) throw new Error('useAuth must be used within AuthProvider');
  return auth;
}

/* 
 Functions to remember last page visited by user, 
 before redirected to login page 
*/
const redirectKey = 'sign_in_redirect';

const setRedirect = (redirect: string) =>
  window.sessionStorage.setItem(redirectKey, redirect);

const getRedirect = (): string | null =>
  window.sessionStorage.getItem(redirectKey);

const clearRedirect = () => window.sessionStorage.removeItem(redirectKey);

/* Format user API response  */
export function formatUserApiResponse(data: AxiosResponse<CurrentUserData>): UserInContext {
  return {
    firstName: data.data.detail.data.first_name,
    lastName: data.data.detail.data.last_name,
    username: data.data.detail.data.username,
  };
}
