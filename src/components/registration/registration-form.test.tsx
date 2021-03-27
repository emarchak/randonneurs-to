import React from 'react'
import { render, fireEvent, waitFor } from '@testing-library/react'
import { RegistrationForm } from './registration-form'
import * as isomorphicUnfetch from 'isomorphic-unfetch'
import * as useAllowedStartTimes from './hooks/useAllowedStartTimes'
import * as useCheckRiderMembership from '../../hooks/useCheckRiderMembership'

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

jest.mock('../../hooks/useBrevets', () => ({
    __esModule: true,
    useBrevets: jest.fn().mockReturnValue({
        loading: false,
        brevets:
            [{
                chapter: 'Toronto',
                event: 'populaire',
                distance: '60',
                date: '2021-10-09T12:00:00.000Z',
                route: 'Rouge Ramble 60',
                startLocation: 'Second Cup, 355 Danforth Ave, Toronto',
                id: 1,
                rwgpsUrl: 'https://rwgps.com',

            }]
    })
}))

jest.mock('../../hooks/useCheckRiderMembership', () => ({
    __esModule: true,
    useCheckRiderMembership: jest.fn().mockReturnValue({
        checkMembership: jest.fn().mockImplementation((fullName) => ({
            fullName,
            city: 'Toronto',
            country: 'Canada',
            seasons: [2021],
            membership: 'Individual',
        }))
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
        const rideDate = new Date('2021-10-09T12:00:00.000Z')

        fireEvent.change(mount.getByLabelText(/name/i), {
            target: { value: 'Foo Bar' },
        })
        fireEvent.blur(mount.getByLabelText(/name/i), {
            target: { value: 'Foo Bar' }
        })

        fireEvent.change(mount.getByLabelText(/email/i), {
            target: { value: 'foo@bar.com' },
        })

        fireEvent.change(mount.getByLabelText(/ride/i), {
            target: { value: 'brevet' },
        })

        fireEvent.click(mount.getByLabelText(/Rouge Ramble 60/i))

        fireEvent.click(mount.getByLabelText(/I have read Randonneurs Ontario's Club Risk Management Policy/i))
        fireEvent.click(mount.getByLabelText(/I have read the Ontario Cycling Association's Progressive Return to Cycling/i))

        fireEvent.change(mount.getByLabelText(/notes/i), {
            target: { value: 'notes' },
        })

        fireEvent.click(mount.getByText('Register'))

        await waitFor(() => {
            const fetchBody = fetchSpy.mock.calls[0][1]?.body
            const expectedFields = {
                'form-name': 'registration',
                name: 'Foo Bar',
                email: 'foo@bar.com',
                membership: 'Individual',
                rideType: 'brevet',
                route: 'Rouge Ramble 60',
                startTime: rideDate.toString(),
                scheduleTime: rideDate.toString(),
                startLocation: 'Second Cup, 355 Danforth Ave, Toronto',
                chapter: 'Toronto',
                distance: 60,
                notes: 'notes',
                ocaConsent: true,
                roConsent: true,
            }
            expect(fetchSpy).toHaveBeenCalled()
            Object.keys(expectedFields).forEach((label) => {
                expect(fetchBody).toMatch(`${label}=${encodeURIComponent(expectedFields[label])}`)
            })
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

    it('disables registrations for events that are not allowedToRegister', () => {
        const useAllowedStartTimesSpy = jest.spyOn(useAllowedStartTimes, 'useAllowedStartTimes')
        useAllowedStartTimesSpy.mockReturnValue({
            allowedStartTimes: jest.fn(),
            allowedToRegister: jest.fn().mockReturnValue(false),
        })

        const mount = render(<RegistrationForm />)

        fireEvent.change(mount.getByLabelText(/ride/i), {
            target: { value: 'brevet' },
        })
        expect(mount.baseElement).toHaveTextContent(/Learn more about riding brevets/i)
        expect(mount.baseElement).toHaveTextContent(/Rouge Ramble 60/i)

        expect(mount.queryByLabelText(/Rouge Ramble 60/i)).toBeNull()
        expect(mount.getByRole('textbox', { name: 'Starting location' })).not.toHaveValue('Second Cup, 355 Danforth Ave, Toronto')
        useAllowedStartTimesSpy.mockRestore()
    })

    it('warns riders if they are not registered', () => {
        const checkMembershipMock = jest.fn()
            .mockReturnValueOnce(null)
            .mockReturnValueOnce({ membership: 'Trial' })
        const useCheckRiderMembershipSpy = jest.spyOn(useCheckRiderMembership, 'useCheckRiderMembership')
        useCheckRiderMembershipSpy.mockReturnValue({ checkMembership: checkMembershipMock })

        const mount = render(<RegistrationForm />)

        fireEvent.blur(mount.getByLabelText(/name/i),
            { target: { value: 'Foo Bar' } }
        )
        expect(checkMembershipMock).toHaveBeenCalledTimes(1)
        expect(checkMembershipMock).toHaveBeenCalledWith({ 'fullName': 'Foo Bar' })
        expect(mount.getByText(/We can't find your name/)).toBeTruthy()

        fireEvent.blur(mount.getByLabelText(/name/i))
        expect(checkMembershipMock).toHaveBeenCalledTimes(2)
        expect(mount.queryByText(/We can't find your name/)).toBeFalsy()

        useCheckRiderMembershipSpy.mockRestore()
    })

    it.skip('limits registration to maximum of 10 riders per start time', () => { })
})
