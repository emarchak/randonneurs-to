import React, { useState, ChangeEvent, useEffect } from 'react'
import { ContentWrapper } from '../content-wrapper'
import { SubmitButton } from '../form/buttons'
import { ErrorsList } from '../form/errors-list'
import { formSubmit } from '../form/helpers'
import { InputField, SelectField, DateField, CheckboxField } from '../form/input-field'
import { emailRegex } from '../form/regex'
import { PermanentDescription } from './components/permanent-description'
import { Route, RideType, Brevet } from './types'
import { UpcomingBrevets } from './components/upcoming-brevets'

import styles from '../styles/registration.module.scss'
import { Aside } from '../callout'

const formName = 'registration'

const rideTypes = [{ value: 'brevet', label: 'Brevet' }, { value: 'permanent', label: 'Permanent' }]

type FormState = "submitted" | "dirty" | null
interface FormData {
    name: string
    email: string
    rideType: RideType | ''
    route: Brevet['route']
    scheduleDate?: Date
    startDate: Date
    startLocation: string
    chapter: Brevet['chapter'] | '',
    distance: Brevet['distance'],
    notes: string,
    ocaConsent: boolean,
    roConsent: boolean,
}

type Props = {
    routes: Route[]
}

const defaultFormData: FormData = {
    name: '',
    email: '',
    rideType: '' as FormData["rideType"],
    route: '',
    startDate: new Date(),
    startLocation: '',
    chapter: '',
    distance: '',
    notes: '',
    ocaConsent: false,
    roConsent: false,
}

const fieldLabel = {
    name: 'Your name',
    email: 'Your email',
    rideType: 'Ride type',
    route: 'Route',
    startDate: 'Starting time',
    startLocation: 'Starting location',
    notes: 'Notes for the organizer',
    ocaConsent: 'OCA risk awareness',
    roConsent: 'Randonneurs Ontario risk policy',
}

const requiredFields: Partial<keyof FormData>[] = [
    'name',
    'email',
    'rideType',
    'route',
    'startDate',
    'startLocation',
    'ocaConsent',
    'roConsent'
]

const checkForErrors = (fields: FormData) => (
    Object.entries(fields)
        .map(([field, value]) => {
            if (requiredFields.includes(field as keyof FormData) && !Boolean(value)) {
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

    const dirtyForm = (newFormData: Partial<FormData>) => {
        setFormState("dirty")
        setFormData({
            ...formData,
            ...newFormData
        })
    }

    const handleInputChange = (evt: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { value = "", name } = evt.currentTarget
        dirtyForm({ [name]: value })
    }

    const handleCheckboxChange = (evt: ChangeEvent<HTMLInputElement>) => {
        const { name } = evt.currentTarget
        dirtyForm({ [name]: !formData[name] })
    }

    const handleDateChange = (startDate: Date) => {
        dirtyForm({ startDate })
    }

    const handleBrevetChange = (brevet: Brevet) => {
        dirtyForm({
            rideType: 'brevet',
            route: brevet.route,
            startDate: new Date(brevet.unixtime * 1000),
            scheduleDate: new Date(brevet.unixtime * 1000),
            chapter: brevet.chapter,
            distance: brevet.distance,
            startLocation: brevet.startloc
        })
    }

    const handleSubmit = async evt => {
        evt.preventDefault()

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
            className={styles.registrationForm}
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
                <Aside>
                    <h2>COVID-19 risk awareness</h2>
                    <CheckboxField name="ocaConsent" value={formData.ocaConsent} onChange={handleCheckboxChange}>
                        <p>I have read the <a href="https://www.ontariocycling.org/forms/oca-progressive-return-to-cycling-policy/">Ontario Cycling Association's Progressive Return</a> to Cycling Policy and understand the risks.</p>
                    </CheckboxField>
                    <CheckboxField name="roConsent" value={formData.roConsent} onChange={handleCheckboxChange}>
                        <p>I have read <a href="http://randonneursontario.ca/down/RO%20Risk%20Management%20Plan%202016.pdf">Randonneurs Ontario's Club Risk Management Policy</a> and understand my responsibilities.</p>
                    </CheckboxField>
                </Aside>
                <ErrorsList formErrors={formErrors} />
                <SubmitButton handleSubmit={handleSubmit} disabled={hasError && !isDirty}>
                    Register
            </SubmitButton>
            </ContentWrapper>
        </form >

    )
}
