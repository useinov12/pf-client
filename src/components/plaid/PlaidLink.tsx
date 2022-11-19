import React, { useCallback, useState } from 'react';
import clsx from 'clsx';
import {
  usePlaidLink,
  PlaidLinkOnSuccess,
  PlaidLinkOnEvent,
  PlaidLinkOnExit,
  PlaidLinkOptions,
} from 'react-plaid-link';

import Button from '../buttons/Button';
// import { PlaidContext } from '@/context/PlaidTokenProvider';
import { requestLinkToken, requestPublicToken  } from './api';


const PlaidLink = () => {
  const [token, setToken] = useState<string | null>(null);
  const [redirectURI, setRedirectURI] = React.useState<string | undefined>(undefined)

  // const {token} = React.useContext(PlaidContext)

  async function createLinkToken() {
    const { status, data } = await requestLinkToken();

    if (status === 201) {
      console.log('CREATED_LINK_TOKEN', data)
      setToken(data);
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
    console.log('ON EVENT CALL', window.location.href);
    setRedirectURI('https://pf-client-kdih.vercel.app/cabinet')
  }, []);
  /* #endregion */

  const config: PlaidLinkOptions = {
    token,
    // receivedRedirectUri:'https://pf-client-kdih.vercel.app/cabinet', 
    receivedRedirectUri:redirectURI, 
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
    <div>
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
        disabled={!ready}
      >
        Connect Plaid
      </Button>
    </div>
  );
};

export default PlaidLink;


