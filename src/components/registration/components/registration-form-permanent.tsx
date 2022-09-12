import React, { useState, ChangeEvent, ReactChild } from 'react'
import { ContentWrapper } from 'src/components/content-wrapper'
import { FormState } from 'src/components/form/utils'
import { InputField, DateTimeField, CheckboxField, HiddenField, ErrorsList, Form, SubmitButton } from 'src/components/form/components'
import { Callout } from 'src/components/callout'
import { SelectPermanents } from './select-permanents'
import { useAllowedStartTimes } from '../hooks/useAllowedStartTimes'
import { Rider } from 'src/data/riders'
import { Route } from 'src/data/routes'
import { Link } from 'src/components/Link'
import { useRegistrationForm } from '../hooks/useRegistrationForm'
import { validate, RequiredFields } from 'src/components/form/utils'
import * as styles from 'src/components/styles/registration.module.scss'
import { NameField } from 'src/components/form/components/NameField'
import { MembershipType } from 'src/graphql.gql'
import { Chapter, EventType } from 'src/gatsby.gql'
const formName = 'registration-permanent'
interface FormData {
    name: string
    email: string
    membership: Rider['membership'] | 'missing' | ''
    route: Route['name']
    distance: Number,
    startTime: Date | ''
    startLocation: string
    chapter: Route['chapter'] | '',
    notes: string,
    ocaConsent: boolean,
    roConsent: boolean,
}

const defaultFormData: FormData = {
    name: '',
    email: '',
    membership: '',
    route: '',
    startTime: '',
    startLocation: '',
    chapter: '',
    distance: 0,
    notes: '',
    ocaConsent: false,
    roConsent: false,
}

const fieldLabels = {
    name: 'Your name',
    email: 'Your email',
    route: 'Route',
    startTime: 'Starting time',
    startLocation: 'Starting location',
    notes: 'Notes for the organizer',
    ocaConsent: 'OCA risk awareness',
    roConsent: 'Randonneurs Ontario risk policy',
}

const requiredFields: RequiredFields<FormData> = [
    'name',
    'email',
    'route',
    'startTime',
    'startLocation',
    'ocaConsent',
    'roConsent'
]

export const RegistrationFormPermanent = () => {
    const [formData, setFormData] = useState<FormData>(defaultFormData)
    const [formState, setFormState] = useState<FormState>(null)
    const [formErrors, setFormErrors] = useState<ReactChild[]>([])

    const { onSubmit, loading } = useRegistrationForm({ fieldLabels })
    const { allowedStartTimes } = useAllowedStartTimes()

    const isSubmitted = formState === 'submitted'
    const isDirty = formState === 'dirty'
    const hasError = Boolean(formErrors.length)


    const handleValidStartTimes = (requestedStartTime: Date) => allowedStartTimes(requestedStartTime)

    const dirtyForm = (newFormData: Partial<FormData>) => {
        setFormState('dirty')
        setFormData({
            ...formData,
            ...newFormData
        })
    }

    const handleInputChange = (evt: ChangeEvent<HTMLInputElement>) => {
        const { value = '', name } = evt.currentTarget
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
            route: permanent.name || '',
            startLocation: permanent.startLocation || '',
            chapter: permanent.chapter || Chapter.Toronto,
            distance: permanent.distance || 0
        })
    }

    const handleNameChange = (name: string, membership: MembershipType) => {
        setFormData({ ...formData, name, membership })
    }

    const handleSubmit = async evt => {
        evt.preventDefault()

        const errors = validate(formData, fieldLabels, requiredFields)
        if (errors.length) {
            setFormErrors(errors)
            setFormState(null)
            return
        }
        const success = await onSubmit({ ...formData, rideType: EventType.Permanent })
        if (success) {
            setFormState('submitted')
        } else {
            setFormErrors(['Server error! Try again later.'])
        }
    }

    return (
        <Form name={formName} className={styles.registrationForm}>
            <ContentWrapper>
                <NameField label={fieldLabels['name']} value={formData.name} onChange={handleNameChange} />
                <InputField label={fieldLabels['email']} name='email' type='email' value={formData.email} onChange={handleInputChange} />
                <SelectPermanents onChange={handlePermanentChange} />
                <DateTimeField label={fieldLabels['startTime']} name='startTime' value={formData.startTime} onChange={handleDateChange} allowedRange={handleValidStartTimes} />
                <InputField label={fieldLabels['startLocation']} name='startLocation' value={formData.startLocation} onChange={handleInputChange} />
                <InputField label={fieldLabels['notes']} name='notes' value={formData.notes} onChange={handleInputChange} optional />
                <Callout alternative>
                    <h2>COVID-19 risk awareness</h2>
                    <CheckboxField name='ocaConsent' value={formData.ocaConsent} onChange={handleCheckboxChange}>
                        I have read the <Link href='https://www.ontariocycling.org/forms/oca-progressive-return-to-cycling-policy/'>Ontario Cycling Association's Progressive Return to Cycling Policy</Link> and understand the risks.
                    </CheckboxField>
                    <CheckboxField name='roConsent' value={formData.roConsent} onChange={handleCheckboxChange}>
                        I have read <Link href='http://randonneursontario.ca/down/RO%20Risk%20Management%20Plan%202016.pdf'>Randonneurs Ontario's Club Risk Management Policy</Link> and understand my responsibilities.
                    </CheckboxField>
                </Callout>

                <HiddenField name='route' value={formData.route} />
                <HiddenField name='chapter' value={formData.chapter} />
                <HiddenField name='distance' value={formData.distance.toString()} />
                <HiddenField name='membership' value={formData.membership} />
                <div aria-live='polite'>
                    <ErrorsList formErrors={formErrors} />
                    {isSubmitted ?
                        <p>
                            <strong>Thank you for registering to ride with us.</strong><br />
                            <>A copy of your registration request has been sent to your email, and the ride organizer will be in contact to confirm your registration. </>
                            <>Refresh the page to submit again.</>
                        </p>
                        : <SubmitButton handleSubmit={handleSubmit} disabled={hasError && !isDirty} loading={loading}>Register</SubmitButton>}
                </div>
            </ContentWrapper>
        </Form>
    )
}
