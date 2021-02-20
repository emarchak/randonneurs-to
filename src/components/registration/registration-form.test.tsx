import React from "react"
import { render, fireEvent } from "@testing-library/react"
import { RegistrationForm } from "./registration-form"
import { Route } from './types'

const route = {
    chapter: 'Toronto',
    distance: 200,
    startLocation: 'Starbucks',
    routeName: 'Urban 200'
} as Route

const routeB = {
    chapter: 'Huron',
    distance: 300,
    startLocation: 'Careys House',
    routeName: 'Golf 300'
} as Route

jest.mock('./hooks/useBrevets', () => ({
    __esModule: true,
    useBrevets: jest.fn().mockReturnValue({
        loading: false,
        brevets:
            [{
                chapter: "Toronto",
                event: "populaire",
                distance: "60",
                date: "2021-03-14",
                route: "Rouge Ramble 60",
                startloc: "Second Cup, 355 Danforth Ave, Toronto",
                stime: "10:00:00",
                organizer: "Register",
                sched_id: 1,
                contact: "https://example.com",
                rwgps: "https://rwgps.com",
                unixtime: 1615734000
            }]
    }
    )
}))

describe('<RegistrationForm>', () => {
    it('renders all the required fields to the user', () => {
        const mount = render(<RegistrationForm routes={[route]} />)
        expect(() => {
            fireEvent.change(mount.getByLabelText(/name/i), {
                target: { value: "Foo" },
            })
            fireEvent.change(mount.getByLabelText(/email/i), {
                target: { value: "foo@bar.com" },
            })
            fireEvent.change(mount.getByLabelText(/ride/i), {
                target: { value: "permanent" },
            })
            fireEvent.change(mount.getByLabelText(/starting time/i), {
                target: { value: new Date() },
            })
            fireEvent.change(mount.getByLabelText(/notes/i), {
                target: { value: "notes" },
            })
        }).not.toThrow()
    })

    it('shows routes when registering for permanents', () => {
        const mount = render(<RegistrationForm routes={[route, routeB]} />)

        fireEvent.change(mount.getByLabelText(/ride/i), {
            target: { value: "permanent" },
        })

        const RouteSelector = mount.getByLabelText(/route/i)
        expect(mount.baseElement).toHaveTextContent(/A Permanent ride is one of the existing Randonneurs Ontario brevet route/i)
        expect(RouteSelector).toHaveTextContent(/Toronto - Urban 200/i)
        expect(RouteSelector).toHaveTextContent(/Huron - Golf 300/i)
    })

    it('shows brevets when registering for brevet', () => {
        const mount = render(<RegistrationForm routes={[route]} />)

        fireEvent.change(mount.getByLabelText(/ride/i), {
            target: { value: "brevet" },
        })
        expect(mount.baseElement).toHaveTextContent(/Learn more about riding brevets/i)
        expect(mount.baseElement).toHaveTextContent(/Rouge Ramble 60/i)

        fireEvent.click(mount.getByLabelText(/Rouge Ramble 60/i))

        expect(mount.getByRole('textbox', { name: 'Starting location' })).toHaveValue('Second Cup, 355 Danforth Ave, Toronto')
        expect(mount.getByRole('textbox', { name: 'Starting location' })).toHaveAttribute('disabled')
    })

    it.skip('shows more brevets on click', () => { })
    it.skip('requires email and rider name', () => { })
    it.skip('requires rider to be registered with the OCA', () => { })
    it.skip('requires rider to acknowledge all policies', () => { })
    it.skip('requires the start date to be > 1 week in the future', () => { })
    it.skip('requires brevet start date to be within -2 / +1 weeks from scheduled date', () => { })
    it.skip('allows the rider to choose a start time', () => { })
    it.skip('limits registration to maximum of 10 riders per start time', () => { })
    it.skip('records the registration when submitted', () => { })
    it.skip('notifies riders when submitted', () => { })
    it.skip('notifies rider organizers when submitted', () => { })
})