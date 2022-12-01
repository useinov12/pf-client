import React from 'react';
import {
  getLinkToken as apiGetLinkToken,
  exchangePublicToken as apiExchangePublicToken,
} from './api';

/**
 * **requestPublicToken**\
 *  Calls Server that then handels call to Plaid
 *  in order to exchange `public_token` for `access_token`
 *  https://plaid.com/docs/api/tokens/#token-exchange-flow
 */
export async function requestAccessToken(token: string) {
  try {
    const response = await apiExchangePublicToken(token);
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

/**
 * **requestLinkToken**\
 * Calls Server that then handels call to Plaid
 * in order to get `link_token` from Plaid
 * that will initialize PlaidLink
 * https://plaid.com/docs/api/tokens/#linktokencreate
 */
export async function requestLinkToken() {
  try {
    const response = await apiGetLinkToken();
    console.log('REQUEST LINK TOKEN', response);
    return response.data.detail.data;
  } catch (e: any) {
    console.log('plaid link error', e);
  }
}

interface PlaidLinkContextShape{
  generateLinkToken:() => void;
  deleteLinkToken:() => void;
  linkToken:string|undefined
}

export const PlaidContext = React.createContext<PlaidLinkContextShape>({
  generateLinkToken:()=>{},
  deleteLinkToken:()=>{},
  linkToken:undefined
});

export const PlaidLinkProvider = (props: any) => {

  // token State
  const [linkToken, setLinkToken] = React.useState()

  // generate Token
  const generateLinkToken = React.useCallback(async () => {
    const response = await apiGetLinkToken()
    console.log(response)

  },[])

  // delete token
  const deleteLinkToken = React.useCallback(async () => {
    
  },[])

  // memo
  const value = React.useMemo(
    ()=>({
      generateLinkToken, 
      deleteLinkToken, 
      linkToken
    }), [])

  return <PlaidContext.Provider value={value} {...props} />;
};

export const usePlaid = () => React.useContext(PlaidContext)