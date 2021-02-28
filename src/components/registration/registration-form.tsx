import React, { useState, ChangeEvent } from 'react'
import { ContentWrapper } from '../content-wrapper'
import { SubmitButton } from '../form/buttons'
import { ErrorsList } from '../form/errors-list'
import { formSubmit } from '../form/helpers'
import { InputField, SelectField, DateField, CheckboxField, HiddenField } from '../form/input-field'
import { emailRegex } from '../form/regex'
import { Route, RideType, Brevet } from './types'
import { SelectBrevets } from './components/select-brevets'

import styles from '../styles/registration.module.scss'
import { Callout } from '../callout'
import { SelectPermanents } from './components/select-permanents'
import { useAllowedStartTimes } from './hooks/useAllowedStartTimes'

const formName = 'registration'

const rideTypes = [{ value: 'brevet', label: 'Brevet' }, { value: 'permanent', label: 'Permanent' }]

type FormState = "submitted" | "dirty" | null
interface FormData {
    name: string
    email: string
    rideType: RideType | ''
    route: Brevet['route']
    scheduleTime?: Date
    startTime: Date
    startLocation: string
    chapter: Brevet['chapter'] | '',
    distance: Brevet['distance'],
    notes: string,
    ocaConsent: boolean,
    roConsent: boolean,
}

const defaultFormData: FormData = {
    name: '',
    email: '',
    rideType: '' as FormData["rideType"],
    route: '',
    startTime: new Date(),
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
    startTime: 'Starting time',
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
    'startTime',
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


export const RegistrationForm = () => {
    const [formData, setFormData] = useState<FormData>(defaultFormData)
    const [formState, setFormState] = useState<FormState>(null)
    const [formErrors, setFormErrors] = useState<String[]>([])
    const { allowedStartTimes } = useAllowedStartTimes()

    const isSubmitted = formState === "submitted"
    const isDirty = formState === "dirty"
    const hasError = Boolean(formErrors.length)

    const isPermanent = formData.rideType === 'permanent'
    const isBrevet = formData.rideType === 'brevet'

    const handleValidStartTimes = (requestedStartTime: Date) => {
        const scheduleTime = isBrevet ? formData.scheduleTime : undefined
        return allowedStartTimes(requestedStartTime, scheduleTime)
    }

    const dirtyForm = (newFormData: Partial<FormData>) => {
        setFormState("dirty")
        setFormData({
            ...formData,
            ...newFormData
        })
    }

    const handleInputChange = (evt: ChangeEvent<HTMLInputElement>) => {
        const { value = "", name } = evt.currentTarget
        dirtyForm({ [name]: value })
    }

    const handleSelectChange = (evt: ChangeEvent<HTMLSelectElement>) => {
        const { value = "", name } = evt.currentTarget
        dirtyForm({ [name]: value })
    }

    const handleCheckboxChange = (evt: ChangeEvent<HTMLInputElement>) => {
        const { name } = evt.currentTarget
        dirtyForm({ [name]: !formData[name] })
    }

    const handleDateChange = (startTime: Date) => {
        dirtyForm({ startTime })
    }

    const handlePermanentChange = (permanent: Route) => {
        dirtyForm({
            rideType: 'permanent',
            route: permanent.routeName,
            startLocation: permanent.startLocation,
            chapter: permanent.chapter,
            distance: String(permanent.distance)
        })
    }

    const handleBrevetChange = (brevet: Brevet) => {
        dirtyForm({
            rideType: 'brevet',
            route: brevet.route,
            startTime: new Date(brevet.unixtime * 1000),
            scheduleTime: new Date(brevet.unixtime * 1000),
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
                <SelectField label={fieldLabel['rideType']} name="rideType" options={rideTypes} value={formData.rideType} onChange={handleSelectChange} />
                {isBrevet && <SelectBrevets onChange={handleBrevetChange} />}
                {isPermanent && <SelectPermanents onChange={handlePermanentChange} />}
                <DateField label={fieldLabel['startTime']} name="startTime" value={formData.startTime} onChange={handleDateChange} allowedRange={handleValidStartTimes} />
                <InputField label={fieldLabel['startLocation']} name="startLocation" value={formData.startLocation} onChange={handleInputChange} disabled={isBrevet} />
                <InputField label={fieldLabel['notes']} name="notes" value={formData.notes} onChange={handleInputChange} optional />
                <Callout alternative>
                    <h2>COVID-19 risk awareness</h2>
                    <CheckboxField name="ocaConsent" value={formData.ocaConsent} onChange={handleCheckboxChange}>
                        I have read the <a href="https://www.ontariocycling.org/forms/oca-progressive-return-to-cycling-policy/">Ontario Cycling Association's Progressive Return</a> to Cycling Policy and understand the risks.
                    </CheckboxField>
                    <CheckboxField name="roConsent" value={formData.roConsent} onChange={handleCheckboxChange}>
                        I have read <a href="http://randonneursontario.ca/down/RO%20Risk%20Management%20Plan%202016.pdf">Randonneurs Ontario's Club Risk Management Policy</a> and understand my responsibilities.
                    </CheckboxField>
                </Callout>
                <HiddenField name='route' value={formData.route} />
                <HiddenField name='scheduleTime' value={formData.scheduleTime?.toString()} />
                <ErrorsList formErrors={formErrors} />
                <SubmitButton handleSubmit={handleSubmit} disabled={hasError && !isDirty}>
                    Register
                </SubmitButton>
            </ContentWrapper>
        </form >
    )
}
