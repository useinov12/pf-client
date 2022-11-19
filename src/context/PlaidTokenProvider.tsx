import React from 'react'

export const PlaidContext = React.createContext<{
    token:string | null,
    setToken:React.Dispatch<any>
}>({
    token:null,
    setToken:()=>{}
})

const PlaidTokenProvider:React.FC<{children:JSX.Element}>=  ({children}) => {

    const [token, setToken] = React.useState(null)

  return (
    <PlaidContext.Provider value={{token, setToken}}>
        {children}
    </PlaidContext.Provider>
  )
}

export default PlaidTokenProvider
