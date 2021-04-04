import React from 'react'
import { render, waitFor } from '@testing-library/react'
import * as ShopifyBuy from '@shopify/buy-button-js'
import { BuyButton } from './buybutton'

describe('<buybutton>', () => {
    const createComponent = jest.fn()

    beforeEach(() => {
        ShopifyBuy.UI.init = jest.fn().mockReturnValue({ createComponent })
    })

    afterEach(() => {
        createComponent.mockReset()
    })

    it('calls buybutton.js with the correct product id', async () => {
        render(<BuyButton productId={123} />)

        await waitFor(() =>
            expect(createComponent).toHaveBeenCalledWith('product', expect.objectContaining({
                id: 123
            }))
        )
    })
    it('passes the contents configuration along if provided', async () => {
        render(<BuyButton productId={456} img button buttonWithQuantity title price />)

        await waitFor(() =>
            expect(createComponent).toHaveBeenCalledWith('product', expect.objectContaining({
                id: 456,
                options: expect.objectContaining({
                    product: expect.objectContaining({
                        contents: {
                            img: true,
                            button: true,
                            buttonWithQuantity: true,
                            title: true,
                            price: true,
                        }
                    })
                })
            })
            ))
    })
})
