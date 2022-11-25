import {
  requestLinkToken as ApiRequestLinkToken,
  requestPublicToken as ApiRequestPublicToken,
} from './api';

export async function requestPublicToken(token: string) {
  try {
    const response = await ApiRequestPublicToken(token);
    console.log('REQUEST PUBLIC TOKEN', response);
    return {
      status: 200,
      data: response.data.detail.data,
      message: response.data.detail.message,
    };
  } catch (e: any) {
    console.log('plaid error', e);
    return { status: e.status, data: {}, message: e.data.detail.message };
  }
}

export async function requestLinkToken() {
  try {
    const response = await ApiRequestLinkToken();
    return {
      status: 201,
      data: response.data.detail.data,
      message: response.data.detail.message,
    };
  } catch (e: any) {
    console.log('plaid link error', e);
    return {
      status: e.status,
      data: {},
      message: 'Something happened with Plaid link.',
    };
  }
}
