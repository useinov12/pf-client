import axios from 'axios';
import { Credentials, LoginCredentials } from './api';
import { 
  createNewUser as apiCreateNewUser,
  loginUser as  apiLoginUser,
  getCurrentSession as apiGetCurrentSession
} from './api';


// re-do error handling

export async function register(signUpCred: Credentials) {
  try {
    const { status, data } = await apiCreateNewUser(signUpCred);
    console.log(status, data);
    return data;
  } catch (error: any) {
    
    if (error.response.status === 404) {
      console.log(error);
      return {
        status: error.response.status,
        data: error.response.data,
        message: error.response.data.detail.message,
      };
    } else {
      return {
        status: error.response.status,
        data: error.response.data,
        message: 'An unexpected error occurred :(  Try again.',
      };
    }
  }
}

export async function login( loginCred:LoginCredentials ) {
  try {
    const { status, data } = await apiLoginUser(loginCred);
    return { status, data, message: 'Successfull login' };
  } catch (error: any) {
    if(error.response.status === 403){
      return {
        status: error.response.status,
        data: error.response.data,
        message: error.response.data.detail.message,
      };
    }
    return {
      status: error.response.status,
      data: error.response.data,
      message: 'An unexpected error occurred :(  Try again.',
    };
  }
}

//wait backend update -> SWR/Query
export async function auth() {
  try {
    const { data } = await apiGetCurrentSession();
    console.log('data', data);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log(error);
      return error.message;
    } else {
      console.log('Unexpected error: ', error);
      return 'An unexpected error occurred';
    }
  }
}
