import React from "react"
import { render, fireEvent, waitFor } from "@testing-library/react"
import * as isomorphicUnfetch from 'cross-fetch'
import { ContactForm } from "./ContactForm"

jest.mock('cross-fetch', () => ({
    __esModule: true,
    default: jest.fn().mockReturnValue({ ok: true })
}))

describe("<ContactForm>", () => {
    it("renders child content", () => {
        const mount = render(<ContactForm formName="contact-form">{"content"}</ContactForm >)

        expect(mount.getByText("content")).toBeTruthy()
    })

    it("requires all fields", async () => {
        const fetchSpy = jest.spyOn(isomorphicUnfetch, 'default')
        const mount = render(<ContactForm formName="contact-form" />)

        expect(mount.getByText("Submit")).not.toBeDisabled()

        fireEvent.change(mount.getByLabelText(/name/i), {
            target: { value: "Foo" },
        })

        fireEvent.change(mount.getByLabelText(/email/i), {
            target: { value: "foo@bar.com" },
        })
        fireEvent.click(mount.getByText("Submit"))

        expect(fetchSpy).not.toHaveBeenCalled()
        expect(mount.getByText("Submit")).toBeDisabled()

        fireEvent.change(mount.getByLabelText(/message/i), {
            target: { value: "Hello" },
        })
        expect(mount.getByText("Submit")).not.toBeDisabled()
        fireEvent.click(mount.getByText("Submit"))

        await waitFor(() => expect(fetchSpy).toHaveBeenCalled())
    })

    it("rejects incorrect emails", () => {
        const mount = render(<ContactForm formName="contact-form" />)

        fireEvent.change(mount.getByLabelText(/email/i), {
            target: { value: "higgeldy-piggeldy" },
        })
        fireEvent.click(mount.getByText("Submit"))

        expect(mount.getByText("Submit")).toBeDisabled()

        expect(
            mount.getByText(/higgeldy-piggeldy is not a valid email/i)
        ).toBeTruthy()
    })

    it("shows confirmation on submit", async () => {
        const fetchSpy = jest.spyOn(isomorphicUnfetch, 'default')
        const mount = render(<ContactForm formName="contact-form" />)

        expect(mount.getByText("Submit")).not.toBeDisabled()

        fireEvent.change(mount.getByLabelText(/name/i), {
            target: { value: "Foo" },
        })

        fireEvent.change(mount.getByLabelText(/email/i), {
            target: { value: "foo@bar.com" },
        })

        fireEvent.change(mount.getByLabelText(/message/i), {
            target: { value: "Hello" },
        })

        expect(mount.getByText("Submit")).not.toBeDisabled()
        fireEvent.click(mount.getByText("Submit"))

        await waitFor(() => {
            expect(fetchSpy).toHaveBeenCalled()
            expect(mount.getByText(/Thank you/)).toBeTruthy()
        })
    })

    it("shows error message if unable to submit", async () => {
        const fetchSpy = jest.spyOn(isomorphicUnfetch, 'default')
        fetchSpy.mockRejectedValue({ ok: false })

        const mount = render(<ContactForm formName="contact-form" />)

        expect(mount.getByText("Submit")).not.toBeDisabled()

        fireEvent.change(mount.getByLabelText(/name/i), {
            target: { value: "Foo" },
        })

        fireEvent.change(mount.getByLabelText(/email/i), {
            target: { value: "foo@bar.com" },
        })

        fireEvent.change(mount.getByLabelText(/message/i), {
            target: { value: "Hello" },
        })

        expect(mount.getByText("Submit")).not.toBeDisabled()
        fireEvent.click(mount.getByText("Submit"))

        await waitFor(() => {
            expect(fetchSpy).toHaveBeenCalled()
            expect(mount.getByText(/Server error/)).toBeTruthy()
        })
    })
})
