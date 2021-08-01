import React from 'react'
import { render, fireEvent, waitFor } from '@testing-library/react'
import { advanceTo, clear } from 'jest-date-mock'
import { RegistrationFormBrevet } from './registration-form-brevet'
import * as isomorphicUnfetch from 'isomorphic-unfetch'
import * as useCheckRiderMembership from 'src/hooks/useCheckRiderMembership'
import * as useSendMail from 'src/hooks/useSendMail'
import * as useSlack from 'src/hooks/useSlack'

jest.mock('src/data/brevets', () => ({
    __esModule: true,
    useBrevets: jest.fn().mockReturnValue({
        loading: false,
        brevets:
            [{
                chapter: 'Toronto',
                event: 'populaire',
                distance: '60',
                date: new Date('Sat August 7 2021 09:20:00 EDT'),
                route: 'Rouge Ramble 60',
                startLocation: 'Second Cup, 355 Danforth Ave, Toronto',
                id: 1,
                rwgpsUrl: 'https://rwgps.com',

            }]
    })
}))

jest.mock('src/hooks/useCheckRiderMembership', () => ({
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
    beforeEach(() => {
        advanceTo(new Date('Wed August 4 2021 09:00:00 EDT'))
    })

    afterEach(() => {
        clear()
    })

    it('renders all the required fields to the user', () => {
        const mount = render(<RegistrationFormBrevet />)
        expect(() => {
            fireEvent.change(mount.getByLabelText(/name/i), {
                target: { value: 'Foo' },
            })
            fireEvent.change(mount.getByLabelText(/email/i), {
                target: { value: 'foo@bar.com' },
            })
            fireEvent.change(mount.getByLabelText(/starting time/i), {
                target: { value: new Date() },
            })
            fireEvent.change(mount.getByLabelText(/notes/i), {
                target: { value: 'notes' },
            })
        }).not.toThrow()

        expect(mount.baseElement).toHaveTextContent(/Learn more about riding brevets/i)
        expect(mount.baseElement).toHaveTextContent(/Rouge Ramble 60/i)

        fireEvent.click(mount.getByLabelText(/Rouge Ramble 60/i))

        expect(mount.getByRole('textbox', { name: 'Starting location' })).toHaveValue('Second Cup, 355 Danforth Ave, Toronto')
        expect(mount.getByRole('textbox', { name: 'Starting location' })).toHaveAttribute('disabled')
    })

    it('requires email, rider name, randonneurs ontario consent and oca consent', () => {
        const mount = render(<RegistrationFormBrevet />)

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
        const useSendMailMock = jest.spyOn(useSendMail, 'useSendMail')
        const sendMailSpy = jest.fn().mockReturnValue(true)
        useSendMailMock.mockReturnValue({ sendMail: sendMailSpy })

        const useSlacklMock = jest.spyOn(useSlack, 'useSlack')
        const sendSlackMsgSpy = jest.fn().mockReturnValue(true)
        useSlacklMock.mockReturnValue({ sendSlackMsg: sendSlackMsgSpy })

        const mount = render(<RegistrationFormBrevet />)
        const rideDate = new Date('Sat August 7 2021 09:20:00 EDT')

        fireEvent.change(mount.getByLabelText(/name/i), {
            target: { value: 'Foo Bar' },
        })
        fireEvent.blur(mount.getByLabelText(/name/i), {
            target: { value: 'Foo Bar' }
        })

        fireEvent.change(mount.getByLabelText(/email/i), {
            target: { value: 'foo@bar.com' },
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
                route: 'Rouge Ramble 60',
                rideType: 'populaire',
                startTime: rideDate.toString(),
                scheduleTime: rideDate.toString(),
                startLocation: 'Second Cup, 355 Danforth Ave, Toronto',
                chapter: 'Toronto',
                distance: 60,
                notes: 'notes',
                ocaConsent: true,
                roConsent: true,
            }
            expect(sendMailSpy).toHaveBeenCalled()
            expect(sendSlackMsgSpy).toHaveBeenCalled()
            expect(fetchSpy).toHaveBeenCalled()
            Object.keys(expectedFields).forEach((label) => {
                expect(fetchBody).toMatch(`${label}=${encodeURIComponent(expectedFields[label])}`)
            })
            expect(mount.getByText(/Thank you for registering to ride/)).toBeTruthy()
        })
    })

    it('shows an error when unable to submit', async () => {
        const fetchSpy = jest.spyOn(isomorphicUnfetch, 'default')
        fetchSpy.mockRejectedValue({ ok: false })

        const mount = render(<RegistrationFormBrevet />)
        fireEvent.change(mount.getByLabelText(/name/i), {
            target: { value: 'Foo Bar' },
        })

        fireEvent.change(mount.getByLabelText(/email/i), {
            target: { value: 'foo@bar.com' },
        })

        fireEvent.click(mount.getByLabelText(/Rouge Ramble 60/i))

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

        fetchSpy.mockClear()
    })

    it('disables registrations for events that are not allowedToRegister', () => {
        advanceTo(new Date('Fri August 7 2021 17:20:00 EDT'))

        const mount = render(<RegistrationFormBrevet />)

        expect(mount.baseElement).toHaveTextContent(/Learn more about riding brevets/i)
        expect(mount.baseElement).toHaveTextContent(/Rouge Ramble 60/i)

        expect(mount.queryByLabelText(/Rouge Ramble 60/i)).toBeNull()
        expect(mount.getByRole('textbox', { name: 'Starting location' })).not.toHaveValue('Second Cup, 355 Danforth Ave, Toronto')

        clear()
    })

    it('warns riders if they are not a member', () => {
        const checkMembershipMock = jest.fn()
            .mockReturnValueOnce(null)
            .mockReturnValueOnce({ membership: 'Trial' })
        const useCheckRiderMembershipSpy = jest.spyOn(useCheckRiderMembership, 'useCheckRiderMembership')
        useCheckRiderMembershipSpy.mockReturnValue({ checkMembership: checkMembershipMock })

        const mount = render(<RegistrationFormBrevet />)

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
