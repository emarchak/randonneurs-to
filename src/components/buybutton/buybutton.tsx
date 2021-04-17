
import React, { useEffect } from 'react'
import { useBuyButton } from './buybutton-context'

const bbOptions = {
    'product': {
        'contents': {
            'img': false,
            'button': false,
            'buttonWithQuantity': true,
            'title': false,
            'price': false
        },
        'styles': {
            'button': {
                'font-family': 'Roboto, sans-serif',
                'color': '#333333',
                ':hover': {
                    'color': '#333333',
                    'background-color': '#b1d3c4'
                },
                'background-color': '#c5eada',
                ':focus': {
                    'background-color': '#b1d3c4'
                },
                'border-radius': '0px'
            },
            'price': {
                'font-size': '18px'
            },
        },
        'buttonDestination': 'checkout',
        'text': {
            'button': 'Buy now'
        },
        'googleFonts': [
            'Roboto'
        ]
    },
    'cart': {
        'popup': false,
    },
}

type Props = {
    productId: number,
    img?: boolean,
    button?: boolean,
    buttonWithQuantity?: boolean,
    title?: boolean,
    price?: boolean
}

export const BuyButton = ({ productId,
    img = false,
    button = false,
    buttonWithQuantity = false,
    title = false,
    price = false }: Props) => {

    const buttonId = `product-component-${productId}`
    bbOptions.product.contents = { img, button, buttonWithQuantity, title, price }

    const { shopifyUI } = useBuyButton()
    useEffect(() => {
        if (shopifyUI) {
            shopifyUI.createComponent('product', {
                id: productId,
                node: document.getElementById(buttonId),
                options: bbOptions
            })
        }
    }, [])

    return <div id={buttonId}></div>
}
