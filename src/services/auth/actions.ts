import mem from 'mem';
import { toast } from 'react-hot-toast';
import { useQueryClient } from 'react-query';

import logger from '@/lib/logger';
import { Storage } from '@/lib/storage';

import {
  createNewUser as apiCreateNewUser,
  loginUser as apiLoginUser,
  refreshAccessToken as apiRefreshAccessToken,
} from '../api/api';
import { LoginCredentials, RegisterCredentials } from '../types';

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
export async function login(
  credentials: LoginCredentials
): Promise<{ status: number }> {
  try {
    const response = await apiLoginUser(credentials);
    logger(response.data.detail.data.access_token, `Succesfull login`);
    Storage.set('accessToken', response.data.detail.data.access_token);
    Storage.set('refreshToken', response.data.detail.data.refresh_token);
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
}

/**
 * `refresh` is an `Action` - API call that
 * does not have an effect on cached entity data
 */
export async function refresh() {
  try {
    const response = await apiRefreshAccessToken();
    logger(response, '✅ REFRESH RESPONSE');

    /* save new tokens */
    Storage.set('accessToken', response.data.data.jwt_token);
    Storage.set('refreshToken', response.data.data.refresh_token);

    return response.data.data.jwt_token;
  } catch (e: any) {
    /* if can not refresh -> fail request */
    logger(e, '❌ Error refreshing access token');
    return null;
  }
}

/**
 * Memoize `refresh` call to avoid multiple requests
 */
export const memoizeRefreshTokens = mem(refresh, { maxAge: 10000 });
