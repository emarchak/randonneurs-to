import React, { useState, ChangeEvent, ReactChild } from 'react'
import { ContentWrapper } from 'src/components/content-wrapper'
import { SubmitButton } from 'src/components/buttons'
import { InputField, DateField, CheckboxField, HiddenField, ErrorsList, Form } from 'src/components/form/components'
import { Brevet } from 'src/hooks/useBrevets'
import { SelectBrevets } from './select-brevets'
import * as styles from 'src/components/styles/registration.module.scss'
import { Aside, Callout } from 'src/components/callout'
import { useAllowedStartTimes } from '../hooks/useAllowedStartTimes'
import { useCheckRiderMembership, Rider } from 'src/hooks/useCheckRiderMembership'
import { MissingMembership } from './missing-membership'
import { Link } from 'src/components/link'
import { useRegistrationForm } from '../hooks/useRegistrationForm'
import { FormState, validate, RequiredFields } from 'src/components/form/utils'
import { useQuery } from "@apollo/react-hooks"
import { queryChapters } from '../graphql'
const formName = 'registration'

const twoDaysFromToday = new Date(Date.now())
twoDaysFromToday.setDate(twoDaysFromToday.getDate() + 2)

interface FormData {
    name: string
    email: string
    membership: Rider['membership'] | 'missing' | ''
    route: Brevet['route']
    rideType: Brevet['event'] | ''
    scheduleTime: Date
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
    membership: '',
    route: '',
    rideType: '',
    startTime: twoDaysFromToday,
    scheduleTime: twoDaysFromToday,
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

export const RegistrationFormBrevet = () => {
    const [formData, setFormData] = useState<FormData>(defaultFormData)
    const [formState, setFormState] = useState<FormState>(null)
    const [formErrors, setFormErrors] = useState<ReactChild[]>([])
    const { loading, data } = useQuery(queryChapters)
    console.log({ loading, data })
    const { onSubmit } = useRegistrationForm({ formName, fieldLabels })
    const { checkMembership } = useCheckRiderMembership()
    const { allowedStartTimes } = useAllowedStartTimes()

    const isSubmitted = formState === 'submitted'
    const isDirty = formState === 'dirty'
    const hasError = Boolean(formErrors.length)

    const isMissingMembership = formData.membership === 'missing'

    const NameHelp = isMissingMembership
        ? <MissingMembership />
        : 'Must match what you used to register with the OCA'

    const handleValidStartTimes = (requestedStartTime: Date) => allowedStartTimes(requestedStartTime, formData.scheduleTime)

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

    const handleBrevetChange = (brevet: Brevet) => {
        const time = new Date(brevet.date)
        dirtyForm({
            route: brevet.route,
            rideType: brevet.event,
            startTime: time,
            scheduleTime: time,
            chapter: brevet.chapter,
            distance: brevet.distance,
            startLocation: brevet.startLocation
        })
    }

    const handleNameBlur = (evt: ChangeEvent<HTMLInputElement>) => {
        const { value = '' } = evt.currentTarget
        const riderData = checkMembership({ fullName: value })
        setFormData({ ...formData, membership: riderData?.membership || 'missing' })
    }

    const handleSubmit = async evt => {
        evt.preventDefault()

        const errors = validate(formData, fieldLabels, requiredFields)
        if (errors.length) {
            setFormErrors(errors)
            setFormState(null)
            return
        }
        const success = await onSubmit(formData)
        if (success) {
            setFormState('submitted')
        } else {
            setFormErrors(['Server error! Try again later.'])
        }
    }

    return (
        <Form name={formName} className={styles.registrationForm}>
            <ContentWrapper>
                <InputField label={fieldLabels['name']} name='name' value={formData.name} onChange={handleInputChange} onBlur={handleNameBlur} help={NameHelp} />
                <InputField label={fieldLabels['email']} name='email' type='email' value={formData.email} onChange={handleInputChange} />
                <Aside>
                    <p>To encourage social distancing, you can pick your own start time on the scheduled date.</p>

                    <p>You'll be emailed a brevets card before each ride. Submit your brevet card and recorded activity (strava, ridewgps, garmin, etc.) to your Chapter VP when you're done.</p>

                    <p><Link href="http://randonneursontario.ca/who/whatis.html#COVID">Learn more about riding brevets and our COVID-19 guidelines.</Link></p>
                </Aside>
                <SelectBrevets onChange={handleBrevetChange} />
                <DateField label={fieldLabels['startTime']} name='startTime' value={formData.startTime} onChange={handleDateChange} allowedRange={handleValidStartTimes} />
                <InputField label={fieldLabels['startLocation']} name='startLocation' value={formData.startLocation} onChange={handleInputChange} disabled={true} />
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
                <HiddenField name='scheduleTime' value={formData.scheduleTime.toString()} />
                <HiddenField name='membership' value={formData.membership} />
                <HiddenField name='rideType' value={formData.rideType} />
                <ErrorsList formErrors={formErrors} />
                {isSubmitted ?
                    <p aria-live='polite'>
                        <strong>Thank you for registering to ride with us.</strong><br />
                        <>A copy of your registration request has been sent to your email, and the ride organizer will be in contact to confirm your registration.</>
                        <>Refresh the page to submit again.</>
                    </p>
                    : <SubmitButton handleSubmit={handleSubmit} disabled={hasError && !isDirty}>Register</SubmitButton>}
            </ContentWrapper>
        </Form>
    )
}
