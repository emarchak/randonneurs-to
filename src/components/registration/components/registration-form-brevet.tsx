import React, { useState, ChangeEvent, ReactChild } from 'react'
import { ContentWrapper } from 'src/components/content-wrapper'
import { SubmitButton } from 'src/components/form/buttons'
import { ErrorsList } from 'src/components/form/errors-list'
import { formSubmit } from 'src/components/form/helpers'
import { InputField, DateField, CheckboxField, HiddenField } from 'src/components/form/input-field'
import { emailRegex } from 'src/components/form/regex'
import { Brevet } from 'src/hooks/useBrevets'
import { SelectBrevets } from './select-brevets'
import styles from 'src/components/styles/registration.module.scss'
import { Aside, Callout } from 'src/components/callout'
import { useAllowedStartTimes } from '../hooks/useAllowedStartTimes'
import { useCheckRiderMembership, Rider } from 'src/hooks/useCheckRiderMembership'
import { MissingMembership } from './missing-membership'
const formName = 'registration'

const twoDaysFromToday = new Date(Date.now())
twoDaysFromToday.setDate(twoDaysFromToday.getDate() + 2)

type FormState = 'submitted' | 'dirty' | null
interface FormData {
    name: string
    email: string
    membership: Rider['membership'] | 'missing' | ''
    route: Brevet['route']
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
    startTime: twoDaysFromToday,
    scheduleTime: twoDaysFromToday,
    startLocation: '',
    chapter: '',
    distance: 0,
    notes: '',
    ocaConsent: false,
    roConsent: false,
}

const fieldLabel = {
    name: 'Your name',
    email: 'Your email',
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

            if (field === 'email' && !emailRegex.test(value)) {
                return `${value} is not a valid email`
            }
        })
        .filter(Boolean)
)


export const RegistrationFormBrevet = () => {
    const [formData, setFormData] = useState<FormData>(defaultFormData)
    const [formState, setFormState] = useState<FormState>(null)
    const [formErrors, setFormErrors] = useState<ReactChild[]>([])

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

        const errors = checkForErrors(formData)
        if (errors.length) {
            setFormErrors(errors)
            setFormState(null)
            return
        }
        const success = await formSubmit(formName, { ...formData })

        if (success) {
            setFormState('submitted')
        } else {
            setFormErrors(['Server error! Try again later.'])
        }
    }

    return (
        <form
            name={formName}
            method='post'
            data-netlify='true'
            data-netlify-honeypot='bot-field'
            className={styles.registrationForm}
        >
            <ContentWrapper>
                <InputField label={fieldLabel['name']} name='name' value={formData.name} onChange={handleInputChange} onBlur={handleNameBlur} help={NameHelp} />
                <InputField label={fieldLabel['email']} name='email' type='email' value={formData.email} onChange={handleInputChange} />
                <Aside>
                    <p>To encourage social distancing, riders may schedule their own start times on the scheduled date.</p>

                    <p>Brevets cards will be emailed out for each ride. Submit the brevet cards, photos, and recorded activity (strava, ridewgps, garmin, etc.) to your chapter VP when you're done.</p>

                    <p><a href="http://randonneursontario.ca/who/whatis.html#COVID" target="_blank">Learn more about riding brevets and our COVID-19 guidelines.</a></p>
                </Aside>
                <SelectBrevets onChange={handleBrevetChange} />
                <DateField label={fieldLabel['startTime']} name='startTime' value={formData.startTime} onChange={handleDateChange} allowedRange={handleValidStartTimes} />
                <InputField label={fieldLabel['startLocation']} name='startLocation' value={formData.startLocation} onChange={handleInputChange} disabled={true} />
                <InputField label={fieldLabel['notes']} name='notes' value={formData.notes} onChange={handleInputChange} optional />
                <Callout alternative>
                    <h2>COVID-19 risk awareness</h2>
                    <CheckboxField name='ocaConsent' value={formData.ocaConsent} onChange={handleCheckboxChange}>
                        I have read the <a href='https://www.ontariocycling.org/forms/oca-progressive-return-to-cycling-policy/'>Ontario Cycling Association's Progressive Return to Cycling Policy</a> and understand the risks.
                    </CheckboxField>
                    <CheckboxField name='roConsent' value={formData.roConsent} onChange={handleCheckboxChange}>
                        I have read <a href='http://randonneursontario.ca/down/RO%20Risk%20Management%20Plan%202016.pdf'>Randonneurs Ontario's Club Risk Management Policy</a> and understand my responsibilities.
                    </CheckboxField>
                </Callout>
                <HiddenField name='route' value={formData.route} />
                <HiddenField name='chapter' value={formData.chapter} />
                <HiddenField name='distance' value={formData.distance.toString()} />
                <HiddenField name='scheduleTime' value={formData.scheduleTime.toString()} />
                <HiddenField name='membership' value={formData.membership} />
                <ErrorsList formErrors={formErrors} />
                {isSubmitted ?
                    <p aria-live='polite'>
                        <strong>Thank you for registering to ride with us.</strong><br />
                        <>A copy of your registration request has been sent to your email, and the ride organizer will be in contact to confirm your registration. </>
                        <>Refresh the page to submit again.</>
                    </p>
                    : <SubmitButton handleSubmit={handleSubmit} disabled={hasError && !isDirty}>Register</SubmitButton>}
            </ContentWrapper>
        </form >
    )
}
