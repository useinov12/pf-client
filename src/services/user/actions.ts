import { RegisterCredentials, LoginCredentials } from '../types';
import {
  createNewUser as apiCreateNewUser,
  loginUser as apiLoginUser,
  refreshAccessToken as apiRefreshAccessToken,
} from '../api';
import { toast } from 'react-hot-toast';
import { useQueryClient } from 'react-query';
import { Storage } from '@/lib/storage';
import logger from '@/lib/logger';
import mem from 'mem';
import { useAuth } from './AuthProvider';

/**
 *  Access react-query `useQueryClient()`*/
export const useCashedClient = () => {
  return useQueryClient();
};

/**
 *`register` is an `Action` - API call that
 * does not have an effect on cached entity data
 * */
export async function register(
  signUpCred: RegisterCredentials
): Promise<{ status: number }> {
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
    console.log(error);
    return { status: error.response.status };
  }
}

/**
 * `login` is an `Action` - API call that
 * does not have an effect on cached entity data
 */
export const login = async (
  credentials: LoginCredentials
): Promise<{ status: number }> => {
  try {
    const response = await apiLoginUser(credentials);
    logger(response, `Succesfull login`);
    Storage.set('token', response.data.detail.data.access_token);
    Storage.set('refresh', response.data.detail.data.refresh_token);
    return { status: response.status };
  } catch (error: any) {
    if (error.response.status === 404) {
      toast.error(error.response.data.detail.message);
    } else {
      toast.error('An unexpected error occurred :(  Try again.');
    }
    console.log(error);
    return { status: error.response.status };
  }
};

/**
 * `refresh` is an `Action` - API call that
 * does not have an effect on cached entity data
 */
export const refresh = async () => {
  const { handleLogout } = useAuth();
  // const refreshToken = Storage.get('refresh');
  try {
    // send refreshToken as param when backend refactored
    const response = await apiRefreshAccessToken();
    const accessToken = response.data.detail.data.access_token;

    //if could not refresh access token -> logout user
    if (!accessToken) {
      // handleLogout or just Storage.clear('token')?
      handleLogout();
      // Storage.clear('token')
      logger('', 'Failed to Refresh access token')
    }

    // return refreshToken here
    
    return accessToken;
  } catch (e: any) {
    logger(e, 'Error refreshing access token');
  }
};

/**
 * Memoize refresh function to avoid multiple refresh requests.\
 * `memoizeRefreshFn` will invoke refresh function only once
 * and remember results for `maxAge` time.*/
export const memoizeRefreshFn = mem(refresh, { maxAge: 10000 });
