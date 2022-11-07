import axios from 'axios';
import instance from '@/lib/axios';

export async function register(signUpCred: {
  username: string;
  password: string;
  first_name: string;
  last_name: string;
}) {
  try {
    //re-do response when backend updated
    const { status, data } = await instance.post(`/create_user`, signUpCred );
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
      console.log('Unexpected error: ', error);
      return {
        status: error.response.status,
        data: error.response.data,
        message: error.response.data.detail.message,
      };
    }
  }
}

export async function login(loginCred: { username: string; password: string }) {
  try {
    const { status, data } = await instance.post(`/login`, loginCred );
    console.log(status, data)
    return { status, data, message: 'Successfull login' };
  } catch (error: any) {
    console.log(error);
    return {
      status: error.response.status,
      data: error.response.data,
      message: error.response.data.detail.message,
    };
  }
}


//wait backend update
export async function auth(jwt: string) {
  try {
    const { data } = await instance.get( `/user/home`);
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
