import React, { useState, ChangeEvent, useEffect } from 'react'
import { ContentWrapper } from '../content-wrapper'
import { SubmitButton } from '../form/buttons'
import { ErrorsList } from '../form/errors-list'
import { formSubmit } from '../form/helpers'
import { InputField, SelectField, DateField } from '../form/input-field'
import { emailRegex } from '../form/regex'
import { PermanentDescription } from './permanent-description'
import { Route, RideType, Brevet } from './types'
import { UpcomingBrevets } from './upcoming-brevets'

const formName = 'registration'

const rideTypes = [{ value: 'brevet', label: 'Brevet' }, { value: 'permanent', label: 'Permanent' }]

type FormState = "submitted" | "dirty" | null
interface FormData {
    name: string
    email: string
    rideType: RideType | ''
    route: string
    startDate: Date
    startLocation: string
    notes: string
}

type Props = {
    routes: Route[]
}

const defaultFormData = {
    name: '',
    email: '',
    rideType: '' as FormData["rideType"],
    route: '',
    startDate: new Date(),
    startLocation: '',
    notes: '',
}

const fieldLabel = {
    name: 'Your name',
    email: 'Your email',
    rideType: 'Ride type',
    route: 'Route',
    startDate: 'Starting time',
    startLocation: 'Starting location',
    notes: 'Notes for the organizer',
}

const checkForErrors = (fields: FormData) => (
    Object.entries(fields)
        .map(([field, value]) => {
            if (field !== "notes" && !Boolean(value)) {
                return `${fieldLabel[field]} is required`
            }

            if (field === "email" && !emailRegex.test(value)) {
                return `${value} is not a valid email`
            }
        })
        .filter(Boolean)
)


export const RegistrationForm = ({ routes }: Props) => {
    const [formData, setFormData] = useState<FormData>(defaultFormData)
    const [formState, setFormState] = useState<FormState>(null)
    const [formErrors, setFormErrors] = useState<String[]>([])
    const isSubmitted = formState === "submitted"
    const isDirty = formState === "dirty"
    const hasError = Boolean(formErrors.length)

    const routeOptions = routes.map(route => ({ value: route.id, label: `${route.chapter} - ${route.routeName}` }))
    const isPermanent = formData.rideType === 'permanent'
    const isBrevet = formData.rideType === 'brevet'

    const handleInputChange = (evt: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { value = "", name } = evt.currentTarget

        setFormState("dirty")
        setFormData({
            ...formData,
            [name]: value,
        })
    }

    const handleDateChange = (startDate: Date) => {
        setFormState("dirty")
        setFormData({
            ...formData,
            startDate
        })
    }

    const handleBrevetChange = (brevet: Brevet) => {
        setFormState("dirty")
        setFormData({
            ...formData,
            rideType: 'brevet',
            route: `${brevet.chapter} - ${brevet.route} - ${brevet.distance}`,
            startDate: new Date(brevet.unixtime * 1000),
            startLocation: brevet.startloc
        })
    }

    const handleSubmit = async evt => {
        evt.preventDefault()
        console.log(formData)
        const errors = checkForErrors(formData)
        if (errors.length) {
            setFormErrors(errors)
            setFormState(null)
            return
        }
        const success = await formSubmit(formName, { ...formData })

        if (success) {
            setFormState("submitted")
        } else {
            setFormErrors(["Server error! Try again later."])
        }
    }
    if (isSubmitted) {
        return (
            <ContentWrapper>
                <p aria-live="polite">
                    <strong>Thank you for registering to ride with us.</strong><br />
                    A copy of your registration request has been sent to your email, and the ride organizer will be in contact to confirm your registration.
                    Refresh the page to submit again.
              </p>
            </ContentWrapper>
        )
    }

    return (
        <form
            name={formName}
            method="post"
            data-netlify="true"
            data-netlify-honeypot="bot-field"
        >
            <ContentWrapper>
                <InputField label={fieldLabel['name']} name="name" value={formData.name} onChange={handleInputChange} />
                <InputField label={fieldLabel['email']} name="email" type="email" value={formData.email} onChange={handleInputChange} />
                <SelectField label={fieldLabel['rideType']} name="rideType" options={rideTypes} value={formData.rideType} onChange={handleInputChange} />
                {isBrevet && <UpcomingBrevets onBrevetChange={handleBrevetChange} />}
                {isPermanent && <PermanentDescription />}
                {isPermanent && <SelectField label={fieldLabel['route']} name="route" options={routeOptions} value={formData.route} onChange={handleInputChange} />}
                <DateField label={fieldLabel['startDate']} name="startDate" value={formData.startDate} onChange={handleDateChange} />
                <InputField label={fieldLabel['startLocation']} name="startLocation" value={formData.startLocation} onChange={handleInputChange} disabled={isBrevet} />
                <InputField label={fieldLabel['notes']} name="notes" value={formData.notes} onChange={handleInputChange} optional />
                <ErrorsList formErrors={formErrors} />
                <SubmitButton handleSubmit={handleSubmit} disabled={hasError && !isDirty}>
                    Register
                </SubmitButton>
            </ContentWrapper>
        </form>)
}
