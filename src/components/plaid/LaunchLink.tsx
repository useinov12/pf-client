import React, { useEffect } from 'react';
import {
  usePlaidLink,
  PlaidLinkOptionsWithLinkToken,
  PlaidLinkOnSuccess,
  PlaidLinkOnEvent,
  PlaidLinkOnExit,
} from 'react-plaid-link';

interface LinkLaunchProps {
  isOauth?: boolean;
  token: string;
  // userId: number;
  itemId?: number | null;
  children?: React.ReactNode;
}

// import { requestPublicToken } from '@/services/api';
import { requestAccessToken } from '@/services/plaid';

// Uses the usePlaidLink hook to manage the Plaid Link creation.  See https://github.com/plaid/react-plaid-link for full usage instructions.
// The link token passed to usePlaidLink cannot be null.  It must be generated outside of this component.  In this sample app, the link token
// is generated in the link context in client/src/services/link.js.

export default function LaunchLink(props: LinkLaunchProps) {

  const onSuccess = React.useCallback<PlaidLinkOnSuccess>(
    (publicToken, metadata) => {
      console.log('ON_SUCCESS', publicToken, metadata);

      // setToken(data.access_token)
      // change itemId to Plaid context currentToken
      if (props.itemId != null) {
        // update mode: no need to exchange public token
      } else {
        requestAccessToken(publicToken);
      }
      // deleteLinkToken(props.userId, null);
      // history.push(`/user/${props.userId}`);

      // update mode: no need to exchange public token
      if(!props.isOauth){
        requestAccessToken(publicToken);
      }
      
    },
    []
  );

  const onExit = React.useCallback<PlaidLinkOnExit>((error, metadata) => {
    if (error != null && error.error_code === 'INVALID_LINK_TOKEN') {
      // re-generate token and store in context
      // requestPublicToken(publicToken);
    }
    if (error != null) {
      //   setError(error.error_code, error.display_message || error.error_message);
    }
    // to handle other error codes, see https://plaid.com/docs/errors/
  }, []);

  const onEvent = React.useCallback<PlaidLinkOnEvent>((eventName, metadata) => {
    // handle errors in the event end-user does not exit with onExit function error enabled.
    if (eventName === 'ERROR' && metadata.error_code != null) {
      //   setError(metadata.error_code, ' ');
    }
  }, []);

  const config: PlaidLinkOptionsWithLinkToken = {
    onSuccess,
    onExit,
    onEvent,
    token: props.token,
  };

  if (props.isOauth) {
    config.receivedRedirectUri = window.location.href; // add additional receivedRedirectUri config when handling an OAuth reidrect
  }

  const { open, ready } = usePlaidLink(config);

  useEffect(() => {
    // initiallizes Link automatically
    if (props.isOauth && ready) {
      open();
    } else if (ready) {
      // regular, non-OAuth case:
      // set link token, userId and itemId in local storage for use if needed later by OAuth
      localStorage.setItem(
        'oauthConfig',
        JSON.stringify({
          // userId: props.userId,
          itemId: props.itemId,
          token: props.token,
        })
      );
      open();
    }
  }, [ready, open, props.isOauth,  props.itemId, props.token]);

  
  // if LaunchKlink in OathLink -> initiallizes Link automatically for update mode
  // else render Button
  if (props.isOauth && ready) {
    open() 
    return <></>
  }
  else return <></>
}
