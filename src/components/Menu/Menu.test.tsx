import React from 'react'
import { render } from "@testing-library/react"
import { Menu } from "."
import {seasons, registration, shop} from './routes'

jest.mock('react-burger-menu', () => ({
    slide: ({children}) => <>{children}</>
}))

describe('<Menu>', () => {
    it('shows menu sections', () => {
        const { getByRole } = render(<Menu isOpen={true} />)

        seasons.forEach(link => {
            expect(getByRole('link', { name: link.label })).toBeInTheDocument()
        })
        registration.forEach(link => {
            expect(getByRole('link', { name: link.description || link.label })).toBeInTheDocument()
        })
        shop.forEach(link => {
            expect(getByRole('link', { name: link.label })).toBeInTheDocument()
        })
    })
})
