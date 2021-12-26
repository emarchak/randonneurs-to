import { render } from '@testing-library/react'
import { Link, MapLink } from './Link'
import React from 'react'

describe('<Link>', () => {
    it('renders link when provided with internal url', () => {
        const { getByRole } = render(<Link to="/foo">Foo</Link>)
        expect(getByRole('link')).toHaveAttribute('href', '/foo')
        expect(getByRole('link')).not.toHaveAttribute('target', '_blank')
    })
    it('renders an outbound link when provided with external url', () => {
        const { getByRole } = render(<Link href="/foo">Foo</Link>)
        expect(getByRole('link')).toHaveAttribute('href', '/foo')
        expect(getByRole('link')).toHaveAttribute('target', '_blank')
    })
})

describe('<MapLink>', () => {
    it('encodes location to google maps', () => {
        const { getByRole } = render(<MapLink location="Foo Bar">Foo Bar</MapLink>)
        expect(getByRole('link')).toHaveAttribute('href', 'https://www.google.com/maps/search/?api=1&query=Foo%20Bar')
    })
})
