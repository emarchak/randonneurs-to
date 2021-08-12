import React from "react"
import { render, fireEvent, waitFor } from "@testing-library/react"
import * as isomorphicUnfetch from 'isomorphic-unfetch'
import CovidForm from "."

describe("<CovidForm>", () => {
    const fetchSpy = jest.spyOn(isomorphicUnfetch, 'default')

    beforeEach(() => {
        fetchSpy.mockResolvedValue({ ok: true } as Response)
    })

    afterEach(() => {
        fetchSpy.mockReset()
    })

    it("requires name and email", async () => {
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

        fireEvent.click(mount.getByLabelText(/Pink eye or headache/i))

        expect(mount.getByText("Submit")).not.toBeDisabled()
        fireEvent.click(mount.getByText("Submit"))

        await waitFor(() => {
            expect(fetchSpy).toHaveBeenCalledWith('/', expect.objectContaining({ method: "POST" }))
            expect(fetchSpy).toHaveBeenCalledWith('/.netlify/functions/send-mail', expect.objectContaining({
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

        expect(mount.getByText("Submit")).not.toBeDisabled()
        fireEvent.click(mount.getByText("Submit"))

        await waitFor(() => {
            expect(fetchSpy).toHaveBeenCalledWith('/', expect.objectContaining({ method: "POST" }))
            expect(fetchSpy).toHaveBeenCalledWith('/.netlify/functions/send-mail', expect.objectContaining({
                body: expect.stringContaining("You may participate in this event")
            }))
            expect(mount.getByText(/Your screening has been completed/)).toBeTruthy()
            expect(mount.getByText(/You may participate in this event/)).toBeTruthy()
        })
    })
})
