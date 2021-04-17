import React, { createContext, useContext } from "react"
import ShopifyBuy, { Client } from 'shopify-buy'
import { UI } from '@shopify/buy-button-js'

type ContextType = {
    shopifyClient?: Client,
    shopifyUI?: UI
}

export const BuyButtonContext = createContext<ContextType>({
    shopifyClient: null,
    shopifyUI: null
})

type BuyButtonProviderProps = {
    children: React.ReactChild
}

export const BuyButtonProvider = ({ children }: BuyButtonProviderProps) => {
    const shopifyClient = ShopifyBuy.buildClient({
        domain: 'randonneurs-ontario.myshopify.com',
        storefrontAccessToken: process.env.GATSBY_SHOPIFY_TOKEN,
    })
    const shopifyUI = UI.init(shopifyClient)
    return (
        <BuyButtonContext.Provider value={{ shopifyClient, shopifyUI }}>
            {children}
        </BuyButtonContext.Provider>
    )
}

export const useBuyButton = () => useContext(BuyButtonContext)