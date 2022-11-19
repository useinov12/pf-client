import axios from 'axios';
import Cookie from 'js-cookie';

export async function requestPublicToken(token: string) {
  const jwt = Cookie.get('token');
  const headers = {
    'Content-Type': 'application/json',
    Authorization: `bearer ${jwt}`,
  };

  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_SERVER_PATH}/access_token`,
      { public_token: token, name: 'BofA' },
      { headers }
    );
    console.log('REQUEST PUBLIC TOKEN', response);
    return {
      status: 200,
      data: response.data.detail.data,
      message: response.data.detail.message,
    };
  } catch (e: any) {
    console.log('error', e);
    return { status: e.status, data: {}, message: e.data.detail.message };
  }
}

export async function requestLinkToken() {
  const jwt = Cookie.get('token');
  const headers = {
    'Content-Type': 'application/json',
    Authorization: `bearer ${jwt}`,
  };

  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_SERVER_PATH}/link/token/create`,
      { headers }
    );

    return {
      status: 201,
      data: response.data.detail.data,
      message: response.data.detail.message,
    };
  } catch (e: any) {
    console.log('error', e);
    return {
      status: e.status,
      data: {},
      message: 'Something happened with Plaid link.',
    };
  }
}
