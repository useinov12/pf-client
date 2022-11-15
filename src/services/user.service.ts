import axios from 'axios';
import axiosInstance from '@/lib/axios';
import toast from 'react-hot-toast';

interface Credentials {
  username: string;
  password: string;
  first_name: string;
  last_name: string;
}

export async function register(signUpCred: Credentials) {
  try {
    //re-do response when backend updated
    const { status, data } = await axiosInstance.post(`/create_user`, signUpCred);
    console.log(status, data);
    return {
      status,
      data,
      message: `Your account is ready, ${data.detail.data.first_name}`,
    };
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

export async function login(
  loginCred: Pick<Credentials, 'username' | 'password'>
) {
  try {
    const { status, data } = await axiosInstance.post(`/login`, loginCred);
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
    const { data } = await axiosInstance.get(`/user/home`);
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
