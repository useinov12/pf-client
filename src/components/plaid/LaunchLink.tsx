import { ReactNode, useCallback, useEffect } from 'react';
import {
  PlaidLinkOnEvent,
  PlaidLinkOnExit,
  PlaidLinkOnSuccess,
  PlaidLinkOptionsWithLinkToken,
  usePlaidLink,
} from 'react-plaid-link';

interface LinkLaunchProps {
  isOauth?: boolean;
  token: string;
  itemId?: string | null;
  children?: ReactNode;
}

import { useRouter } from 'next/router';
import { toast } from 'react-hot-toast';

import logger from '@/lib/logger';
import { Storage } from '@/lib/storage';

import { requestAccessToken } from '@/services/plaid/actions';
import { usePlaidContext } from '@/services/plaid/PlaidLinkProvider';

/**
  Uses the usePlaidLink hook to manage the Plaid Link creation.\
  The link token passed to usePlaidLink cannot be null.  It must be generated outside of this component.
  ref: https://github.com/plaid/pattern/tree/master/client/src/components
 */
export default function LaunchLink(props: LinkLaunchProps) {
  const router = useRouter();
  const { deleteLinkToken, generateLinkToken } = usePlaidContext();

  /* On successfull open Plaid UI with linkToken ->  pubcliToken is generated.
  publicToken need to be exchanged for accessToken that gets saved in DB */
  const onSuccess = useCallback<PlaidLinkOnSuccess>((publicToken, metadata) => {
    logger({ metadata }, 'ON_SUCCESS PLAID UI');
    /* Delete Link token from Context after Plaid UI is mounted is used */
    /* regular link initialization: request access token. */
    /* otherwise LaunchLink in update mode: no need to request new access token */
    deleteLinkToken();
    if (!props.itemId) requestAccessToken(publicToken);
    if (props.isOauth) router.push('/cabinet');
  }, []);

  const onExit = useCallback<PlaidLinkOnExit>((error, metadata) => {
    if (error != null && error.error_code === 'INVALID_LINK_TOKEN') {
      /* re-generate token and store in context */
      generateLinkToken();
    } else if (error != null) {
      toast.error(error.display_message || error.error_message);
    } else deleteLinkToken();
    /* to handle other error codes, see https://plaid.com/docs/errors/ */
  }, []);

  const onEvent = useCallback<PlaidLinkOnEvent>((eventName, metadata) => {
    /* handle errors in the event end-user does not exit with onExit function error enabled. */
    if (eventName === 'ERROR' && metadata.error_code != null) {
      toast.error(metadata.error_code);
    }
  }, []);

  const config: PlaidLinkOptionsWithLinkToken = {
    onSuccess,
    onExit,
    onEvent,
    token: props.token,
  };

  /* update mode: add required receivedRedirectUri prop to config when handling an OAuth reidrect */
  if (props.isOauth) {
    config.receivedRedirectUri = window.location.href;
  }

  const { open, ready } = usePlaidLink(config);

  useEffect(() => {
    /* update mode: initiallizes Link automatically */
    if (props.isOauth && ready) {
      open();
    } else if (ready) {
      /* regular mode: non-OAuth case */
      /* save to Storage & itemId  token for use if needed later by OAuth*/
      Storage.set('oauthLinkToken', props.token);
      Storage.set('oauthItemId', props.itemId);
      open();
    }
  }, [ready, open, props.isOauth, props.itemId, props.token]);

  return <></>;
}
