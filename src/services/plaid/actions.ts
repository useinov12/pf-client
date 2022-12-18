import logger from '@/lib/logger';
import { toast } from 'react-hot-toast';
import {
  getLinkToken as apiGetLinkToken,
  exchangePublicToken as apiExchangePublicToken,
} from '../api';



/**
 * Calls Server that then handels call to Plaid
 * in order to get `link_token` from Plaid
 * that will initialize PlaidLink
 * https://plaid.com/docs/api/tokens/#linktokencreate
 */
export async function requestLinkToken() {
  try {
    const response = await apiGetLinkToken();
    logger(response.data.detail.data, 'REQUEST LINK TOKEN');
    return response.data.detail.data
  } catch (e: any) {
    logger(e, 'Plaid link request error', { error: true });
    toast.error('Something happened with Plaid connection. Try again!')
  }
}

/**
 *  Calls Server that then handels call to Plaid
 *  in order to exchange `public_token` for `access_token`
 *  https://plaid.com/docs/api/tokens/#token-exchange-flow
 */
export async function requestAccessToken({token, bankName}:{token: string, bankName:string}) {
  try {
    const response = await apiExchangePublicToken(token, bankName);
    logger({response, token}, 'REQUEST PUBLIC TOKEN');
  } catch (e: any) {
    logger(e, 'request plaid access token error', { error: true });
  }
}


