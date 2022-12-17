import { createContext, useContext, useState } from "react";

const AppPageContext = createContext({
    openSidebar:false,
    hanldeSidebar:()=>{}
})

export const AppPageProvider = (props:any) => {
    const [openSidebar, setOpenSidebar] = useState(false)

    function hanldeSidebar(){
        setOpenSidebar(p => !p)
    }

    const value = {openSidebar, hanldeSidebar}
    return <AppPageContext.Provider value={value} {...props}/>
}


export const useAppPageContext = () => useContext(AppPageContext)