import React, { useCallback, useState } from 'react';
import clsx from 'clsx';

import {
  usePlaidLink,
  PlaidLinkOnSuccess,
  PlaidLinkOnEvent,
  PlaidLinkOnExit,
  PlaidLinkOptions,
} from 'react-plaid-link';
import axios from 'axios';
import Cookies from 'js-cookie';
import Button from './buttons/Button';

async function requestLinkToken() {
  const jwt = Cookies.get('token');
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
    return { status: e.status, data: {}, message: 'Something happened with Plaid link.' };
  }
}
async function requestPublicToken(token: string) {
  const jwt = Cookies.get('token');
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

const PlaidLink = () => {
  const [token, setToken] = useState<string | null>(null);

  const createLinkToken = async () => {
    const { status, data, message } = await requestLinkToken();

    if (status === 201) {
      console.log('createLinkToken', data)
      // setToken(data);
      setToken('link-development-42567e6c-ae29-4351-9bf2-292334ace7b1');
      // setToken('link-development-534806b0-d83c-4fe5-8334-8b43cd778945');
    }
  };

  React.useEffect(() => {
    createLinkToken();
  }, []);

  /* #region   get a link_token from your API when component mounts */
  const onSuccess = useCallback<PlaidLinkOnSuccess>((publicToken, metadata) => {
    // send public_token to your server
    // https://plaid.com/docs/api/tokens/#token-exchange-flow
    console.log('ON_SUCCESS', publicToken, metadata);
    requestPublicToken(publicToken);
  }, []);

  const onEvent = useCallback<PlaidLinkOnEvent>((eventName, metadata) => {
    // log onEvent callbacks from Link
    // https://plaid.com/docs/link/web/#onevent
    console.log(eventName, metadata);
  }, []);

  const onExit = useCallback<PlaidLinkOnExit>((error, metadata) => {
    // log onExit callbacks from Link, handle errors
    // https://plaid.com/docs/link/web/#onexit
    console.log(error, metadata);
  }, []);
  /* #endregion */

  const config: PlaidLinkOptions = {
    token,
    onSuccess,
    onEvent,
    onExit,
  };

  const {
    open,
    ready,
    // error,
    // exit
  } = usePlaidLink(config);

  return (
    <Button
      className={clsx(
        'flex items-center px-4 py-2',
        'text-sm text-gray-700',
        'hover:bg-primary-500 hover:text-white',
        'cursor-pointer',
        'w-full',
        'rounded-none'
      )}
      onClick={() => open()}
      // disabled={!ready}
    >
      Connect Plaid
    </Button>
  );
};

export default PlaidLink;
