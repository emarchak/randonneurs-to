import React, { useState, ChangeEvent, ReactChild } from 'react'
import { ContentWrapper } from 'src/components/content-wrapper'
import { InputField, DateTimeField, CheckboxField, HiddenField, ErrorsList, Form, SubmitButton, SelectField } from 'src/components/form/components'
import { Brevet } from 'src/data/brevets'
import { SelectBrevets } from './select-brevets'
import * as styles from 'src/components/styles/registration.module.scss'
import { Aside, Callout } from 'src/components/callout'
import { useAllowedStartTimes } from '../hooks/useAllowedStartTimes'
import { useRiders, Rider } from 'src/data/riders'
import { MissingMembership } from './missing-membership'
import { Link } from 'src/components/link'
import { useRegistrationForm } from '../hooks/useRegistrationForm'
import { FormState, RequiredFields, validate } from 'src/components/form/utils'
import { getDateTimeLong } from 'src/utils'

const formName = 'registration'

interface FormData {
    name: string
    email: string
    gender: '' | 'M' | 'F' | 'X'
    membership: Rider['membership'] | 'missing' | ''
    route: Brevet['route']
    rideType: Brevet['event'] | ''
    scheduleTime: Date | ''
    startTime: Date | ''
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
    gender: '',
    membership: '',
    route: '',
    rideType: '',
    startTime: '',
    scheduleTime: '',
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
    gender: 'Your gender',
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

const GrandDepartWarning = ({date}: {date?: Date | ''}) => (
    date
        ? <>The <em>grand depart</em> is {getDateTimeLong(date)}. For social distancing, you may pick an alternative time.</>
        : null
)

const NameHelp = ({isMissingMembership}: {isMissingMembership: boolean}) => (
    isMissingMembership
        ? <MissingMembership />
        : <>Must match what you used to register with the OCA</>
)

export const RegistrationFormBrevet = () => {
    const [formData, setFormData] = useState<FormData>(defaultFormData)
    const [formState, setFormState] = useState<FormState>(null)
    const [formErrors, setFormErrors] = useState<ReactChild[]>([])

    const { onSubmit, loading } = useRegistrationForm({ formName, fieldLabels })
    const { checkMembership } = useRiders()
    const { allowedStartTimes } = useAllowedStartTimes()

    const isSubmitted = formState === 'submitted'
    const isDirty = formState === 'dirty'
    const hasError = Boolean(formErrors.length)

    const isMissingMembership = formData.membership === 'missing'

    const handleValidStartTimes = (requestedStartTime: Date) => allowedStartTimes(requestedStartTime, formData.scheduleTime || null)

    const dirtyForm = (newFormData: Partial<FormData>) => {
        setFormState('dirty')
        setFormData({
            ...formData,
            ...newFormData
        })
    }

    const handleInputChange = (evt: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { value = '', name, type } = evt.currentTarget
        dirtyForm({ [name]: type === 'checkbox' ? !formData[name] : value })
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
                <InputField label={fieldLabels['name']} name='name' value={formData.name} onChange={handleInputChange} onBlur={handleNameBlur} help={<NameHelp isMissingMembership={isMissingMembership}/>} />
                <InputField label={fieldLabels['email']} name='email' type='email' value={formData.email} onChange={handleInputChange} />
                <Aside>
                    <p>To encourage social distancing, you can pick your own start time on the scheduled date.</p>

                    <p>You'll be emailed a brevet card before each ride. Submit your brevet card and recorded activity (strava, ridewgps, garmin, etc.) to your Chapter VP when you're done.</p>

                    <p><Link href="http://randonneursontario.ca/who/whatis.html#COVID">Learn more about riding brevets and our COVID-19 guidelines.</Link></p>
                </Aside>
                <SelectBrevets onChange={handleBrevetChange} />
                <DateTimeField label={fieldLabels['startTime']} name='startTime' value={formData.startTime} onChange={handleDateChange} allowedRange={handleValidStartTimes} disableDate help={<GrandDepartWarning date={formData.scheduleTime}/>} />
                <InputField label={fieldLabels['startLocation']} name='startLocation' value={formData.startLocation} onChange={handleInputChange} disabled />
                <SelectField label={fieldLabels['gender']} name='gender' options={['M', 'F', 'X']} value={formData.gender} onChange={handleInputChange} optional help={<>The <em lang='fr'>Audax Club Parisien</em> uses this for ridership statistics</>}/>
                <InputField label={fieldLabels['notes']} name='notes' value={formData.notes} onChange={handleInputChange} optional />
                <Callout alternative>
                    <h2>COVID-19 risk awareness</h2>
                    <CheckboxField name='ocaConsent' value={formData.ocaConsent} onChange={handleInputChange}>
                        I have read the <Link href='https://www.ontariocycling.org/forms/oca-progressive-return-to-cycling-policy/'>Ontario Cycling Association's Progressive Return to Cycling Policy</Link> and understand the risks.
                    </CheckboxField>
                    <CheckboxField name='roConsent' value={formData.roConsent} onChange={handleInputChange}>
                        I have read <Link href='http://randonneursontario.ca/down/RO%20Risk%20Management%20Plan%202016.pdf'>Randonneurs Ontario's Club Risk Management Policy</Link> and understand my responsibilities.
                    </CheckboxField>
                </Callout>
                <HiddenField name='route' value={formData.route} />
                <HiddenField name='chapter' value={formData.chapter} />
                <HiddenField name='distance' value={formData.distance.toString()} />
                <HiddenField name='scheduleTime' value={formData.scheduleTime?.toString()} />
                <HiddenField name='membership' value={formData.membership} />
                <HiddenField name='rideType' value={formData.rideType} />

                <div aria-live='polite'>
                    <ErrorsList formErrors={formErrors} />
                    {isSubmitted ?
                        <p>
                            <strong>Thank you for registering to ride with us.</strong><br />
                            <>A copy of your registration request has been sent to your email, and the ride organizer will be in contact to confirm your registration.</>
                        </p>
                        : <SubmitButton handleSubmit={handleSubmit} disabled={hasError && !isDirty} loading={loading}>Register</SubmitButton>}
                </div>
            </ContentWrapper>
        </Form>
    )
}
