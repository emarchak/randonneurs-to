import React from "react"
import { render, fireEvent } from "@testing-library/react"
import { RegistrationForm } from "./registration-form"

describe('<RegistrationForm>', () => {
    it('renders all the required fields to the user', () => {
        const mount = render(<RegistrationForm />)

        fireEvent.change(mount.getByLabelText(/name/i), {
            target: { value: "Foo" },
        })
        fireEvent.change(mount.getByLabelText(/email/i), {
            target: { value: "foo@bar.com" },
        })
        fireEvent.change(mount.getByLabelText(/ride/i), {
            target: { value: "brevet" },
        })
        fireEvent.change(mount.getByLabelText(/ride/i), {
            target: { value: "routeA" },
        })
        fireEvent.change(mount.getByLabelText(/starting time/i), {
            target: { value: new Date() },
        })
        fireEvent.change(mount.getByLabelText(/notes/i), {
            target: { value: "notes" },
        })
    })
    it.skip('only shows bevets when registering for brevets', () => { })
    it.skip('only shows permanents when registering for permanents', () => { })
    it.skip('allows the rider to choose from all available routes', () => { })
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