import React from 'react';

import Button from '@/components/buttons/Button';

import { PlaidContext } from '@/context/PlaidTokenProvider';

const ManualLinkTest = () => {
  const {token, setToken} = React.useContext(PlaidContext)

  const [link, setLink] = React.useState<string>('');

  function handleTokenInput(e: React.ChangeEvent<HTMLInputElement>) {
    setLink(e.target.value);
  }


  return (
    <div className='m-3'>
      <input
        type='text'
        value={link}
        onChange={(e) => handleTokenInput(e)}
        className='p-1 text-dark'
      />
      <Button
        onClick={() => {
          setToken(link);
          console.log('LINK_TOKEN_SET', link);
        }}
      >
        set token
      </Button>
    </div>
  );
};

export default ManualLinkTest;
