/* 
 Functions to remember last page visited by user, 
 before redirected to login page 
*/
const redirectKey = 'sign_in_redirect';

export const setRedirect = (redirect: string) =>
  window.sessionStorage.setItem(redirectKey, redirect);

export const getRedirect = (): string | null =>
  window.sessionStorage.getItem(redirectKey);

export const clearRedirect = () => window.sessionStorage.removeItem(redirectKey);