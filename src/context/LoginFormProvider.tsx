import React from 'react'

export const LoginFormContext = React.createContext<{
    openLoginForm:boolean;
    setOpenLoginForm:React.Dispatch<any>
}>({
    openLoginForm:false,
    setOpenLoginForm:()=>{}
});

const LoginFormProvider:React.FC<{children:JSX.Element}>=  ({children}) => {
    const [openLoginForm, setOpenLoginForm] = React.useState<boolean>(false);

    return (
        <LoginFormContext.Provider value={{
            openLoginForm, 
            setOpenLoginForm
        }}>
            {children}
        </LoginFormContext.Provider>
    )
};

export default LoginFormProvider;