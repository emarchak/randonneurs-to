import React from 'react'
import { render, fireEvent, waitFor } from '@testing-library/react'
import MockDate from 'mockdate'
import * as fetch from 'cross-fetch'
import { EventRegistrationForm } from './EventRegistrationForm'
import * as useMail from 'src/data/mail'
import * as useSlack from 'src/hooks/useSlack'

describe('<EventRegistrationForm>', () => {
    const fetchSpy = jest.spyOn(fetch, 'default')
    const useMailMock = jest.spyOn(useMail, 'useMail')
    const sendMailSpy = jest.fn().mockReturnValue(true)
    const createListMock = jest.fn().mockResolvedValue({ id: 'listid' })

    beforeEach(() => {
        MockDate.set(new Date('Wed August 4 2021 09:00:00 EDT'))
        useMailMock.mockReturnValue({
            sendMail: sendMailSpy,
            createContact: jest.fn().mockResolvedValue(true),
            getList: createListMock,
            createList: createListMock,
        })
    })

    afterEach(() => {
        fetchSpy.mockClear()
        sendMailSpy.mockClear()
        createListMock.mockClear()
    })

    it('renders all the required fields to the user', () => {
        const mount = render(<EventRegistrationForm />)
        expect(() => {
            fireEvent.change(mount.getByLabelText(/name/i), {
                target: { value: 'Foo' },
            })
            fireEvent.change(mount.getByLabelText(/email/i), {
                target: { value: 'foo@bar.com' },
            })
            fireEvent.change(mount.getByLabelText(/time select/i), {
                target: { value: '06:00' },
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
        const mount = render(<EventRegistrationForm />)

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
        const useSlacklMock = jest.spyOn(useSlack, 'useSlack')
        const sendSlackMsgSpy = jest.fn().mockReturnValue(true)
        useSlacklMock.mockReturnValue({ sendSlackMsg: sendSlackMsgSpy })

        const mount = render(<EventRegistrationForm />)

        fireEvent.change(mount.getByLabelText(/name/i), {
            target: { value: 'Foo Bar' },
        })
        fireEvent.blur(mount.getByLabelText(/name/i), {
            target: { value: 'Foo Bar' }
        })

        fireEvent.change(mount.getByLabelText(/email/i), {
            target: { value: 'foo@bar.com' },
        })

        fireEvent.change(mount.getByLabelText(/gender/i), {
            target: { value: 'F' },
        })

        fireEvent.click(mount.getByLabelText(/Rouge Ramble 60/i))

        fireEvent.click(mount.getByLabelText(/I have read Randonneurs Ontario's Club Risk Management Policy/i))
        fireEvent.click(mount.getByLabelText(/I have read the Ontario Cycling Association's Progressive Return to Cycling/i))
        fireEvent.click(mount.getByLabelText(/Share my registration/i))

        fireEvent.change(mount.getByLabelText(/notes/i), {
            target: { value: 'notes' },
        })

        fireEvent.click(mount.getByText('Register'))

        await waitFor(() => {
            expect(sendMailSpy).toHaveBeenCalled()
            expect(sendSlackMsgSpy).toHaveBeenCalled()
            expect(fetchSpy).toHaveBeenCalledWith('/.netlify/functions/sheets', expect.objectContaining({
                method: 'POST',
                body: JSON.stringify({
                    sheet: 'registration',
                    row: {
                        name: 'Foo Bar',
                        email: 'foo@bar.com',
                        gender: 'F',
                        membership: 'Individual Membership',
                        route: 'Rouge Ramble 60',
                        eventId: '123',
                        eventUrl: 'event/path/rouge',
                        rideType: 'populaire',
                        startTime: '09:20',
                        scheduleTime: 'Sat August 7 2025 09:20',
                        startLocation: 'Second Cup, 355 Danforth Ave, Toronto',
                        chapter: 'Toronto',
                        distance: 60,
                        notes: 'notes',
                        ocaConsent: 'Yes',
                        roConsent: 'Yes',
                        shareRide: 'Yes',
                        submitted: 'Wed August 4 2021 09:00',
                        startDate: 'Sat August 7'
                    }
                }),
            }))
            expect(mount.getByText(/Thank you for registering to ride/)).toBeTruthy()
        })
    })

    it('shows an error when unable to submit', async () => {
        fetchSpy.mockImplementation(async () => {throw new Error()})

        const {getByLabelText, getByText } = render(<EventRegistrationForm />)
        fireEvent.change(getByLabelText(/name/i), {
            target: { value: 'Foo Bar' },
        })

        fireEvent.blur(getByLabelText(/name/i), {
            target: { value: 'Foo Bar' }
        })

        fireEvent.change(getByLabelText(/email/i), {
            target: { value: 'foo@bar.com' },
        })

        fireEvent.click(getByLabelText(/Rouge Ramble 60/i))

        fireEvent.click(getByLabelText(/I have read Randonneurs Ontario's Club Risk Management Policy/i))
        fireEvent.click(getByLabelText(/I have read the Ontario Cycling Association's Progressive Return to Cycling/i))

        fireEvent.change(getByLabelText(/notes/i), {
            target: { value: 'notes' },
        })

        fireEvent.click(getByText('Register'))

        await waitFor(() => {
            expect(fetchSpy).toHaveBeenCalled()
            expect(getByText(/Server error! Try again later/)).toBeTruthy()
        })

        fetchSpy.mockClear()
    })

    it('disables registrations for events that are not allowedToRegister', () => {
        MockDate.set(new Date('Thu August 6 2025 18:20:00 EDT'))

        const mount = render(<EventRegistrationForm />)

        expect(mount.baseElement).toHaveTextContent(/Learn more about riding brevets/i)
        expect(mount.baseElement).toHaveTextContent(/Rouge Ramble 60/i)

        expect(mount.queryByLabelText(/Rouge Ramble 60/i)).toBeNull()
        expect(mount.getByRole('textbox', { name: 'Starting location' })).not.toHaveValue('Second Cup, 355 Danforth Ave, Toronto')
    })
})
