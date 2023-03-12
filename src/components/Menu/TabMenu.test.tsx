import { render } from '@testing-library/react'
import React from 'react'
import { TabMenu } from '.'
import routes from './routes'

describe('<TabMenu>', () => {
    it('renders given menu section', () => {
        const { getByRole } = render(<TabMenu activeRoute={'/foo'} section={'seasons'} />)
        routes['seasons'].forEach(tab => {
            expect(getByRole('link', {name: tab.label})).toBeInTheDocument()
            expect(getByRole('option', {name: tab.label})).toBeInTheDocument()
         })
    })

    it('displays the active route', () => {
        const { getByRole } = render(<TabMenu activeRoute={'/registration/'} section={'registration'} />)
        routes['registration'].forEach(tab => {
            expect(getByRole('link', {name: tab.label})).toBeInTheDocument()
            expect(getByRole('option', {name: tab.label})).toBeInTheDocument()
        })

        expect(getByRole('combobox')).toHaveValue('https://register.randonneursontario.ca/registration/membership/')
    })
})
