import React from 'react';
import { requestLinkToken } from './actions';

interface PlaidLinkContextShape {
  generateLinkToken: () => void;
  deleteLinkToken: () => void;
  linkToken: string | undefined;
}

export const PlaidContext = React.createContext<PlaidLinkContextShape>({
  generateLinkToken: () => {},
  deleteLinkToken: () => {},
  linkToken: undefined,
});

export const PlaidLinkProvider = (props: any) => {
  // token State
  const [linkToken, setLinkToken] = React.useState();

  // generate Token
  const generateLinkToken = React.useCallback(async () => {
    const response = await requestLinkToken();
    console.log(response);
  }, []);

  // delete token
  const deleteLinkToken = React.useCallback(async () => {}, []);

  // memo
  const value = React.useMemo(
    () => ({
      generateLinkToken,
      deleteLinkToken,
      linkToken,
    }),
    []
  );

  return <PlaidContext.Provider value={value} {...props} />;
};

export const usePlaid = () => React.useContext(PlaidContext);
