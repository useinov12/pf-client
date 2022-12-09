import { RegisterCredentials, LoginCredentials } from '../types';
import {
  createNewUser as apiCreateNewUser,
  loginUser as apiLoginUser,
} from '../api';
import { toast } from 'react-hot-toast';
import { useQueryClient } from 'react-query';
import { Storage } from '@/lib/storage';
import logger from '@/lib/logger';

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
