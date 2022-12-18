import { createContext, useContext, useState } from 'react';

const CabinetPageContext = createContext({
  openDeletePopup: false,
  openConfigPopup: false,
  handleDeleteBankPopup: () => {},
  handleBankConfigPopup: () => {},
});

export const CabinetPageProvider = (props: any) => {
  const [openDeletePopup, setOpenDeletePopup] = useState(false);
  const [openConfigPopup, setOpenSettingsPopup] = useState(false);

  function handleDeleteBankPopup(){
    setOpenDeletePopup(p => !p)
  }
  function handleBankConfigPopup(){
    setOpenSettingsPopup(p => !p)
  }

  const value = {
    openDeletePopup,
    openConfigPopup,
    handleDeleteBankPopup,
    handleBankConfigPopup,
  };

  return <CabinetPageContext.Provider {...props} value={value} />;
};

export const useCabinetPageContext = () => useContext(CabinetPageContext);
