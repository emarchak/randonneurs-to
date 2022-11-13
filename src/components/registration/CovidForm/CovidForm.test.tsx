import React from "react"
import { render, fireEvent, waitFor } from "@testing-library/react"
import * as fetch from 'cross-fetch'
import * as useMail from 'src/data/mail'
import CovidForm from "."
import MockDate from 'mockdate'


describe("<CovidForm>", () => {
    const fetchSpy = jest.spyOn(fetch, 'default')
    beforeAll(() =>{
      MockDate.set((new Date('August 7 2021 07:00 EDT')))
    })

    beforeEach(() => {
        fetchSpy.mockResolvedValue({ ok: true } as Response)
    })

    afterEach(() => {
        fetchSpy.mockReset()
    })

    it("requires name, email and event", async () => {
        const mount = render(<CovidForm />)

        expect(mount.getByText("Submit")).not.toBeDisabled()

        fireEvent.change(mount.getByLabelText(/name/i), {
            target: { value: "Foo" },
        })

        fireEvent.click(mount.getByText("Submit"))

        expect(fetchSpy).not.toHaveBeenCalled()
        expect(mount.getByText("Submit")).toBeDisabled()

        fireEvent.change(mount.getByLabelText(/email/i), {
            target: { value: "foo@bar.com" },
        })

        fireEvent.click(mount.getByText("Submit"))

        expect(fetchSpy).not.toHaveBeenCalled()
        expect(mount.getByText("Submit")).toBeDisabled()

        fireEvent.change(mount.getByLabelText(/event/i), {
            target: { value: "permanent" },
        })

        expect(mount.getByText("Submit")).not.toBeDisabled()
        fireEvent.click(mount.getByText("Submit"))

        await waitFor(() => expect(fetchSpy).toHaveBeenCalled())
    })

    it("rejects incorrect emails", () => {
        const mount = render(<CovidForm />)

        fireEvent.change(mount.getByLabelText(/email/i), {
            target: { value: "higgeldy-piggeldy" },
        })
        fireEvent.click(mount.getByText("Submit"))

        expect(mount.getByText("Submit")).toBeDisabled()

        expect(
            mount.getByText(/higgeldy-piggeldy is not a valid email/i)
        ).toBeTruthy()
    })

    it("shows error message if unable to submit", async () => {
        fetchSpy.mockRejectedValue({ ok: false })

        const mount = render(<CovidForm />)

        expect(mount.getByText("Submit")).not.toBeDisabled()

        fireEvent.change(mount.getByLabelText(/name/i), {
            target: { value: "Foo" },
        })

        fireEvent.change(mount.getByLabelText(/email/i), {
            target: { value: "foo@bar.com" },
        })

        fireEvent.change(mount.getByLabelText(/event/i), {
            target: { value: "permanent" },
        })

        expect(mount.getByText("Submit")).not.toBeDisabled()
        fireEvent.click(mount.getByText("Submit"))

        await waitFor(() => {
            expect(fetchSpy).toHaveBeenCalled()
            expect(mount.getByText(/Server error/)).toBeTruthy()
        })
    })

    it("shows confirmation on symptomatic submit", async () => {
        const mount = render(<CovidForm />)

        expect(mount.getByText("Submit")).not.toBeDisabled()

        fireEvent.change(mount.getByLabelText(/name/i), {
            target: { value: "Foo" },
        })

        fireEvent.change(mount.getByLabelText(/email/i), {
            target: { value: "foo@bar.com" },
        })

        fireEvent.change(mount.getByLabelText(/event/i), {
            target: { value: "permanent" },
        })

        fireEvent.click(mount.getByLabelText(/Pink eye or headache/i))

        expect(mount.getByText("Submit")).not.toBeDisabled()
        fireEvent.click(mount.getByText("Submit"))

        await waitFor(() => {
            expect(fetchSpy).toHaveBeenCalledWith('/', expect.objectContaining({ method: "POST" }))
            expect(fetchSpy).toHaveBeenCalledWith('/.netlify/functions/send-mail/send', expect.objectContaining({
                body: expect.stringContaining("You may not participate in this event")
            }))
            expect(mount.getByText(/Your screening has been completed/)).toBeTruthy()
            expect(mount.getByText(/You may not participate in this event/)).toBeTruthy()
        })
    })

    it("shows confirmation on asymptomatic submit", async () => {
        const mount = render(<CovidForm />)

        expect(mount.getByText("Submit")).not.toBeDisabled()

        fireEvent.change(mount.getByLabelText(/name/i), {
            target: { value: "Foo" },
        })

        fireEvent.change(mount.getByLabelText(/email/i), {
            target: { value: "foo@bar.com" },
        })

        fireEvent.change(mount.getByLabelText(/event/i), {
            target: { value: "permanent" },
        })

        expect(mount.getByText("Submit")).not.toBeDisabled()
        fireEvent.click(mount.getByText("Submit"))

        await waitFor(() => {
            expect(fetchSpy).toHaveBeenCalledWith('/', expect.objectContaining({ method: "POST" }))
            expect(fetchSpy).toHaveBeenCalledWith('/.netlify/functions/send-mail/send', expect.objectContaining({
                body: expect.stringContaining("You may participate in this event")
            }))
            expect(mount.getByText(/Your screening has been completed/)).toBeTruthy()
            expect(mount.getByText(/You may participate in this event/)).toBeTruthy()
        })
    })

    it('records the screening when submitted', async () => {
        const fetchSpy = jest.spyOn(fetch, 'default')
        const useMailMock = jest.spyOn(useMail, 'useMail')
        const sendMailSpy = jest.fn().mockReturnValue(true)
        useMailMock.mockReturnValue({ sendMail: sendMailSpy })

        const mount = render(<CovidForm />)
        fireEvent.change(mount.getByLabelText(/name/i), {
            target: { value: "Foo" },
        })

        fireEvent.change(mount.getByLabelText(/email/i), {
            target: { value: "foo@bar.com" },
        })

        fireEvent.change(mount.getByLabelText(/event/i), {
            target: { value: 'Sat August 7 - 200 - Waterfront East' },
        })

        fireEvent.click(mount.getByText("Submit"))

        await waitFor(() => {
            const fetchBody = fetchSpy.mock.calls[0][1]?.body
            const mailBody = sendMailSpy.mock.calls[0][0]?.data.formData
            const expectedFields = {
                name: 'Foo',
                email: 'foo@bar.com',
                event: 'Sat August 7 - 200 - Waterfront East',
            }
            expect(sendMailSpy).toHaveBeenCalled()
            expect(sendMailSpy).toHaveBeenCalled()
            expect(fetchSpy).toHaveBeenCalled()
            Object.keys(expectedFields).forEach((label) => {
                expect(fetchBody).toMatch(`${label}=${encodeURIComponent(expectedFields[label])}`)
                expect(mailBody).toContain(expectedFields[label])
            })
            expect(mount.getByText(/You may participate in this event/)).toBeTruthy()
        })
    })
})
