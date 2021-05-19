import React from 'react'
import { render, fireEvent, waitFor } from '@testing-library/react'
import { RegistrationFormPermanent } from './registration-form-permanent'
import * as isomorphicUnfetch from 'isomorphic-unfetch'
import * as useCheckRiderMembership from 'src/hooks/useCheckRiderMembership'
import * as useSendMail from 'src/hooks/useSendMail'
import * as useSlack from 'src/hooks/useSlack'

jest.mock('../hooks/useRoutes', () => ({
    __esModule: true,
    useRoutes: jest.fn().mockReturnValue({
        routes:
            [{
                id: 'route1',
                chapter: 'Toronto',
                distance: 200,
                startLocation: 'Starbucks',
                routeName: 'Urban'
            },
            {
                id: 'route2',
                chapter: 'Huron',
                distance: 300,
                startLocation: 'Careys House',
                routeName: 'Golf'
            }]
    }),
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

describe('<RegistrationFormPermanent>', () => {
    it('renders all the required fields to the user', () => {
        const mount = render(<RegistrationFormPermanent />)
        expect(() => {
            fireEvent.change(mount.getByLabelText(/name/i), {
                target: { value: 'Foo' },
            })
            fireEvent.change(mount.getByLabelText(/email/i), {
                target: { value: 'foo@bar.com' },
            })

            expect(mount.baseElement).toHaveTextContent(/Urban/i)
            expect(mount.baseElement).toHaveTextContent(/Golf/i)

            fireEvent.click(mount.getByLabelText(/Urban/i))

            fireEvent.change(mount.getByLabelText(/starting time/i), {
                target: { value: new Date() },
            })
            fireEvent.change(mount.getByLabelText(/notes/i), {
                target: { value: 'notes' },
            })
        }).not.toThrow()
    })

    it('requires email, rider name, randonneurs ontario consent and oca consent', () => {
        const mount = render(<RegistrationFormPermanent />)

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
        const mount = render(<RegistrationFormPermanent />)
        const rideDate = new Date('2021-10-09T12:00:00.000Z')

        const useSendMailMock = jest.spyOn(useSendMail, 'useSendMail')
        const sendMailSpy = jest.fn().mockReturnValue(true)
        useSendMailMock.mockReturnValue({ sendMail: sendMailSpy })

        const useSlacklMock = jest.spyOn(useSlack, 'useSlack')
        const sendSlackMsgSpy = jest.fn().mockReturnValue(true)
        useSlacklMock.mockReturnValue({ sendSlackMsg: sendSlackMsgSpy })

        fireEvent.change(mount.getByLabelText(/name/i), {
            target: { value: 'Foo Bar' },
        })
        fireEvent.blur(mount.getByLabelText(/name/i), {
            target: { value: 'Foo Bar' }
        })

        fireEvent.change(mount.getByLabelText(/email/i), {
            target: { value: 'foo@bar.com' },
        })

        fireEvent.click(mount.getByLabelText(/Urban/i))

        fireEvent.change(mount.getByLabelText(/starting time/i), {
            target: { value: rideDate },
        })

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
                route: 'Urban',
                startTime: rideDate.toString(),
                startLocation: 'Starbucks',
                chapter: 'Toronto',
                distance: 200,
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
        fetchSpy.mockRejectedValueOnce({ ok: false })

        const mount = render(<RegistrationFormPermanent />)
        fireEvent.change(mount.getByLabelText(/name/i), {
            target: { value: 'Foo Bar' },
        })

        fireEvent.change(mount.getByLabelText(/email/i), {
            target: { value: 'foo@bar.com' },
        })

        fireEvent.click(mount.getByLabelText(/Urban/i))

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

    it('warns riders if they are not a member', () => {
        const checkMembershipMock = jest.fn()
            .mockReturnValueOnce(null)
            .mockReturnValueOnce({ membership: 'Trial' })
        const useCheckRiderMembershipSpy = jest.spyOn(useCheckRiderMembership, 'useCheckRiderMembership')
        useCheckRiderMembershipSpy.mockReturnValue({ checkMembership: checkMembershipMock })

        const mount = render(<RegistrationFormPermanent />)

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
})
