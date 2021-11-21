import React, { createContext, useContext, useEffect, useState } from "react"
import Helmet from "react-helmet"

type ContextType = {
  shopifyClient: ShopifyBuy.Client | null
  shopifyUI: ShopifyBuy.UI | null
}

const defaultContext: ContextType = {
  shopifyClient: null,
  shopifyUI: null
}

export const BuyButtonContext = createContext<ContextType>(defaultContext)

type BuyButtonProviderProps = {
  children: React.ReactChild
}

export const BuyButtonProvider = ({ children }: BuyButtonProviderProps) => {
  const [context, setContext] = useState<ContextType>(defaultContext)
  const buySDK = window?.ShopifyBuy

  useEffect(() => {
    if (buySDK?.UI) {
      const shopifyClient = buySDK.buildClient({
        domain: 'randonneurs-ontario.myshopify.com',
        storefrontAccessToken: process.env.GATSBY_SHOPIFY_TOKEN,
      })

      const shopifyUI = buySDK.UI.init(shopifyClient)

      setContext({shopifyClient, shopifyUI})
    }
  }, [])

  return (
    <>
      <Helmet>
        <script src="https://sdks.shopifycdn.com/buy-button/latest/buy-button-storefront.min.js" />
      </Helmet>
      <BuyButtonContext.Provider value={context}>
        {children}
      </BuyButtonContext.Provider>
    </>
  )
}

export const useBuyButton = () => useContext(BuyButtonContext)
