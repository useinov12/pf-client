import React, { Dispatch, useContext, useState } from 'react';

export const LoginFormContext = React.createContext<{
  openLoginForm: boolean;
  handleOpenLoginForm: ()=>void;
  setOpenLoginForm:Dispatch<React.SetStateAction<boolean>>
}>({
  openLoginForm: false,
  handleOpenLoginForm: () => {},
  setOpenLoginForm: () => {},
});

export const LoginFormProvider = (props: any) => {
  const [openLoginForm, setOpenLoginForm] = useState<boolean>(false);

  function handleOpenLoginForm(){
   setOpenLoginForm( p => !p )
  }

  const value = {
    openLoginForm,
    handleOpenLoginForm,
    setOpenLoginForm
  };

  return <LoginFormContext.Provider value={value} {...props} />;
};


export const useLoginForm = () => useContext(LoginFormContext)