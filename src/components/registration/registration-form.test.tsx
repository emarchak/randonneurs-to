import React from 'react'
import { render, fireEvent, waitFor } from '@testing-library/react'
import { RegistrationForm } from './registration-form'
import { Route } from './types'
import * as isomorphicUnfetch from 'isomorphic-unfetch'

jest.mock('isomorphic-unfetch', () => ({
    __esModule: true,
    default: jest.fn().mockReturnValue({ ok: true })
}))

jest.mock('./hooks/useRoutes', () => ({
    __esModule: true,
    useRoutes: jest.fn().mockReturnValue({
        routes:
            [{
                id: 'route1',
                chapter: 'Toronto',
                distance: 200,
                startLocation: 'Starbucks',
                routeName: 'Urban 200'
            },
            {
                id: 'route2',
                chapter: 'Huron',
                distance: 300,
                startLocation: 'Careys House',
                routeName: 'Golf 300'
            }]
    }),
}))

jest.mock('./hooks/useBrevets', () => ({
    __esModule: true,
    useBrevets: jest.fn().mockReturnValue({
        loading: false,
        brevets:
            [{
                chapter: 'Toronto',
                event: 'populaire',
                distance: '60',
                date: '2021-03-14',
                route: 'Rouge Ramble 60',
                startloc: 'Second Cup, 355 Danforth Ave, Toronto',
                stime: '10:00:00',
                organizer: 'Register',
                sched_id: 1,
                contact: 'https://example.com',
                rwgps: 'https://rwgps.com',
                unixtime: 1615734000
            }]
    })
}))

describe('<RegistrationForm>', () => {
    it('renders all the required fields to the user', () => {
        const mount = render(<RegistrationForm />)
        expect(() => {
            fireEvent.change(mount.getByLabelText(/name/i), {
                target: { value: 'Foo' },
            })
            fireEvent.change(mount.getByLabelText(/email/i), {
                target: { value: 'foo@bar.com' },
            })
            fireEvent.change(mount.getByLabelText(/ride/i), {
                target: { value: 'permanent' },
            })
            fireEvent.change(mount.getByLabelText(/starting time/i), {
                target: { value: new Date() },
            })
            fireEvent.change(mount.getByLabelText(/notes/i), {
                target: { value: 'notes' },
            })
        }).not.toThrow()
    })

    it('shows routes when registering for permanents', () => {
        const mount = render(<RegistrationForm />)

        fireEvent.change(mount.getByLabelText(/ride/i), {
            target: { value: 'permanent' },
        })

        const RouteSelector = mount.getByLabelText(/route/i)
        expect(mount.baseElement).toHaveTextContent(/A Permanent ride is one of the existing Randonneurs Ontario brevet route/i)
        expect(RouteSelector).toHaveTextContent(/Toronto - Urban 200/i)
        expect(RouteSelector).toHaveTextContent(/Huron - Golf 300/i)
    })

    it('shows brevets when registering for brevet', () => {
        const mount = render(<RegistrationForm />)

        fireEvent.change(mount.getByLabelText(/ride/i), {
            target: { value: 'brevet' },
        })
        expect(mount.baseElement).toHaveTextContent(/Learn more about riding brevets/i)
        expect(mount.baseElement).toHaveTextContent(/Rouge Ramble 60/i)

        fireEvent.click(mount.getByLabelText(/Rouge Ramble 60/i))

        expect(mount.getByRole('textbox', { name: 'Starting location' })).toHaveValue('Second Cup, 355 Danforth Ave, Toronto')
        expect(mount.getByRole('textbox', { name: 'Starting location' })).toHaveAttribute('disabled')
    })

    it.skip('shows more brevets on click', () => { })

    it('requires email, rider name, randonneurs ontario consent and oca consent', () => {
        const mount = render(<RegistrationForm />)

        fireEvent.change(mount.getByLabelText(/email/i), {
            target: { value: 'higgeldy-piggeldy' },
        })

        fireEvent.click(mount.getByText('Register'))

        expect(mount.getByText('Register')).toBeDisabled()

        expect(
            mount.getByText(/name is required/i)
        ).toBeTruthy()

        expect(
            mount.getByText(/higgeldy-piggeldy is not a valid email/i)
        ).toBeTruthy()

        expect(
            mount.getByText(/OCA risk awareness is required/i)
        ).toBeTruthy()

        expect(
            mount.getByText(/Randonneurs Ontario risk policy is required/i)
        ).toBeTruthy()
    })

    it('records the registration when submitted', async () => {
        const fetchSpy = jest.spyOn(isomorphicUnfetch, 'default')
        const mount = render(<RegistrationForm />)
        fireEvent.change(mount.getByLabelText(/name/i), {
            target: { value: 'Foo Bar' },
        })
        fireEvent.change(mount.getByLabelText(/email/i), {
            target: { value: 'foo@bar.com' },
        })

        fireEvent.change(mount.getByLabelText(/ride/i), {
            target: { value: 'permanent' },
        })

        fireEvent.change(mount.getByLabelText(/route/i), {
            target: { value: 'route1' }
        })

        fireEvent.change(mount.getByLabelText(/starting time/i), {
            target: { value: new Date() },
        })

        fireEvent.change(mount.getByLabelText(/starting location/i), {
            target: { value: 'Starbucks' },
        })

        fireEvent.click(mount.getByLabelText(/I have read Randonneurs Ontario's Club Risk Management Policy/i))
        fireEvent.click(mount.getByLabelText(/I have read the Ontario Cycling Association's Progressive Return to Cycling/i))

        fireEvent.change(mount.getByLabelText(/notes/i), {
            target: { value: 'notes' },
        })

        fireEvent.click(mount.getByText('Register'))

        await waitFor(() => {
            expect(fetchSpy).toHaveBeenCalled()
            expect(mount.getByText(/Thank you for registering to ride/)).toBeTruthy()
        })
    })

    it('shows an error when unable to submit', async () => {
        const fetchSpy = jest.spyOn(isomorphicUnfetch, 'default')
        fetchSpy.mockRejectedValueOnce({ ok: false })

        const mount = render(<RegistrationForm />)
        fireEvent.change(mount.getByLabelText(/name/i), {
            target: { value: 'Foo Bar' },
        })

        fireEvent.change(mount.getByLabelText(/email/i), {
            target: { value: 'foo@bar.com' },
        })

        fireEvent.change(mount.getByLabelText(/ride/i), {
            target: { value: 'permanent' },
        })

        fireEvent.change(mount.getByLabelText(/route/i), {
            target: { value: 'route1' }
        })

        fireEvent.change(mount.getByLabelText(/starting time/i), {
            target: { value: new Date() },
        })

        fireEvent.change(mount.getByLabelText(/starting location/i), {
            target: { value: 'Starbucks' },
        })

        fireEvent.click(mount.getByLabelText(/I have read Randonneurs Ontario's Club Risk Management Policy/i))
        fireEvent.click(mount.getByLabelText(/I have read the Ontario Cycling Association's Progressive Return to Cycling/i))

        fireEvent.change(mount.getByLabelText(/notes/i), {
            target: { value: 'notes' },
        })

        fireEvent.click(mount.getByText('Register'))

        await waitFor(() => {
            expect(fetchSpy).toHaveBeenCalled()
            expect(mount.getByText(/Server error! Try again later/)).toBeTruthy()
        })
    })

    it.skip('requires rider to be registered with the OCA', () => { })
    it.skip('limits registration to maximum of 10 riders per start time', () => { })
    it.skip('notifies riders when submitted', () => { })
    it.skip('notifies rider organizers when submitted', () => { })
})