import React, { useState, useEffect } from 'react';
import { Storage } from '@/lib/storage';

import LaunchLink from './LaunchLink';

// Component rendered when user is redirected back to site from Oauth institution site.
// It initiates link immediately with the original link token that was set in local storage
// from the initial link initialization.
const OAuthLink = () => {
  const [token, setToken] = useState<string>();
  const [itemId, setItemId] = useState<string>();

  const linkToken = Storage.get('oauthLinkToken')
  const ItemId = Storage.get('oauthItemId')
  
  useEffect(() => {
    if(linkToken && ItemId){
      setToken(linkToken)
      setItemId(ItemId)
    }
  }, [linkToken, ItemId]);

  return (
    <>
      {token != null && (
        <LaunchLink
          isOauth // this will initiate link immediately
          itemId={itemId}
          token={token}
        />
      )}
    </>
  );
};

export default OAuthLink;