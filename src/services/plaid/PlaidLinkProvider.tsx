import logger from '@/lib/logger';
import {
  useState,
  useMemo,
  createContext,
  useCallback,
  useContext,
  useRef,
} from 'react';
import { requestLinkToken } from './actions';

interface PlaidLinkContextShape {
  generateLinkToken: () => void;
  deleteLinkToken: () => void;
  linkToken: string | undefined;
  // tokenMemo:string|undefined;
}

export const PlaidContext = createContext<PlaidLinkContextShape>({
  generateLinkToken: () => {},
  deleteLinkToken: () => {},
  linkToken: undefined,
  // tokenMemo:undefined
});

export const PlaidLinkProvider = (props: any) => {
  // token State
  const [linkToken, setLinkToken] = useState<string | undefined>(undefined);

  // generate Token
  const generateLinkToken = useCallback(async () => {
    const response = await requestLinkToken();
    setLinkToken(response);
    logger(response, 'LINK TOKEN IN CTX');
  }, []);

  // delete token
  const deleteLinkToken = useCallback(() => {
    setLinkToken(undefined);
  }, []);

  // memo
  const value = useMemo(
    () => ({
      generateLinkToken,
      deleteLinkToken,
      linkToken,
    }),
    []
  );
  // console.log('value link', value.linkToken)

  // const tokenMemo = useRef(linkToken)

  const value2 = {
    generateLinkToken, 
    deleteLinkToken, 
    // tokenMemo,
    linkToken, 
  }

  return <PlaidContext.Provider value={value2} {...props} />;
};

export const usePlaidContext = () => useContext(PlaidContext);
