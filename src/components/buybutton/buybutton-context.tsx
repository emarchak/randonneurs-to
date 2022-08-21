import React, { createContext, useContext, useEffect, useState } from "react"

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
  const [shopifyClient, setClient] = useState<ShopifyBuy.Client | null>(null)
  const [shopifyUI, setUI] = useState<ShopifyBuy.UI | null>(null)

  useEffect(() => {
    setTimeout(() => {
      const buySDK = window?.ShopifyBuy
      if (!buySDK || shopifyClient) {
        return
      }
      if (!shopifyClient) {
        const client = buySDK.buildClient({
          domain: 'randonneurs-ontario.myshopify.com',
          storefrontAccessToken: process.env.GATSBY_SHOPIFY_TOKEN,
        })
        setClient(client)
      }
    }, 500)
  }, [])

  useEffect(() => {
    const buildUI = async (client) => {
      const ui = await ShopifyBuy.UI.onReady(client)
      setUI(ui)
    }

    if (shopifyClient && !shopifyUI) {
      buildUI(shopifyClient)
    }
  }, [shopifyClient])

  return (
    <>
      <BuyButtonContext.Provider value={{shopifyClient, shopifyUI}}>
        {children}
      </BuyButtonContext.Provider>
    </>
  )
}

export const BuyButtonHead = () =>  <script async src="https://sdks.shopifycdn.com/buy-button/latest/buy-button-storefront.min.js" />

export const useBuyButton = () => useContext(BuyButtonContext)
