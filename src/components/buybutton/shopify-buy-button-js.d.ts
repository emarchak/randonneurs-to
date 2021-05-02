/// <reference path="shopify-buy.d.ts" />
/**
 * BuyButton.js is a highly customizable UI library for adding ecommerce functionality to any website. It allows you to create interactive UI components such as product listings and shopping carts with minimal configuration, while allowing you to easily customize the appearance and behaviour of the components.
 * It uses the [JS Buy SDK](http://shopify.github.io/js-buy-sdk/) to connect to your Shopify store, giving you access to your products and collections.
 */

declare namespace BuyButtonJs {
    export const UI: BuyButtonJsLibrary

    interface BuyButtonJsLibrary {
        init(client: ShopifyBuy.Client): UI
    }

    interface UI {
        createComponent(type: ComponentTypes, config: Config): Promise<Component>
        destroyComponent(type: ComponentTypes, id: Number),
    }

    type ComponentTypes = 'product' | 'cart' | 'collection' | 'productSet' | 'toggle'
    interface Component { }
    interface Config {
        id: number,
        node: HTMLElement,
        options: Object,
    }
}

declare module '@shopify/buy-button-js' {
    export = BuyButtonJs
}