import React, { createContext, useContext } from "react"

type ContextType = {
}

export const BuyButtonContext = createContext<ContextType>({
    shopifyClient: null,
    shopifyUI: null
})

type BuyButtonProviderProps = {
    children: React.ReactChild
}

export const BuyButtonProvider = ({ children }: BuyButtonProviderProps) => {
    const shopifyClient = {}
    const shopifyUI = {}
    return (
        <BuyButtonContext.Provider value={{ shopifyClient, shopifyUI }}>
            {children}
        </BuyButtonContext.Provider>
    )
}

export const useBuyButton = () => useContext(BuyButtonContext)
