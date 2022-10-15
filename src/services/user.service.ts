import axios from 'axios';

const headers = {
  'Content-Type': 'application/json',
};

export async function register(signUpCred: {
  username: string;
  password: string;
  first_name: string;
  last_name: string;
}) {
  try {
    //re-do response when backend updated
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_SERVER_PATH}/create_user`,
      signUpCred,
      { headers }
    );
    const { data, status } = response;
    console.log(response);
    return { status, data, message: 'User succesfully created' };
  } catch (error: any) {
    if (error.response.status === 404) {
      console.log(error);
      return {
        status: error.response.status,
        data: {},
        message: error.response.data.detail[0].msg,
      };
    } else {
      console.log('Unexpected error: ', error);
      return {
        status: error.response.status,
        data: {},
        message: 'An unexpected error occurred',
      };
    }
  }
}

export async function login(loginCred: { username: string; password: string }) {
  try {
    //re-do response when backend updated
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_SERVER_PATH}/login`,
      loginCred,
      { headers }
    );
    const { data, status } = response;
    console.log(response);
    return { status, data, message: 'Successfull login' };
  } catch (error: any) {
    if (error.response.status === 404) {
      console.log(error);
      return {
        status: error.response.status,
        data: {},
        message: 'User not found',
      };
    } else {
      console.log('Unexpected error: ', error);
      return {
        status: error.response.status,
        data: {},
        message: 'An unexpected error occurred',
      };
    }
  }
}

export async function authorize(jwt: string) {
  const headers = {
    'Content-Type': 'application/json',
    Authorization: `bearer ${jwt}`,
  };
  console.log('jwt from Cookies memory', jwt);
  try {
    const { data } = await axios.get(
      `${process.env.NEXT_PUBLIC_SERVER_PATH}/user/home`,
      { headers }
    );

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
