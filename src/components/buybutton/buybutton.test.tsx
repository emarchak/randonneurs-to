import React from 'react'
import { render, waitFor } from '@testing-library/react'
import { BuyButton } from './buybutton'
import * as BuyButtonContext from './buybutton-context'

describe('<buybutton>', () => {
    const createComponent = jest.fn()
    const destroyComponent = jest.fn()
    const buySpy = jest.spyOn(BuyButtonContext, 'useBuyButton')

    beforeEach(() => {
        buySpy.mockReturnValue({
            shopifyClient: null,
            shopifyUI: { createComponent, destroyComponent }
        })
    })

    afterEach(() => {
        buySpy.mockClear()
        createComponent.mockClear()
    })

    it('shows loading screen on start', () => {
        buySpy.mockReturnValueOnce({shopifyClient: null, shopifyUI: null })
        const {getByLabelText} = render(<BuyButton productId={123} />)
        expect(getByLabelText('Loading')).toBeInTheDocument()
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
