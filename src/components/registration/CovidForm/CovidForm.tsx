import React, { ChangeEvent, ReactNode, useEffect, useState } from 'react'
import { Callout } from 'src/components/callout'
import { ContentWrapper } from 'src/components/content-wrapper'
import { Form, InputField, ErrorsList, CheckboxField, SelectField, SubmitButton } from 'src/components/form/components'
import { formatMessage, FormState, formSubmit, RequiredFields, validate } from 'src/components/form/utils'
import { Link } from 'src/components/Link'
import { useEvents } from 'src/data/events'
import { useMail } from 'src/data/mail'
import { useSheets } from 'src/hooks/useSheets'
import { getDateTimeLong } from 'src/utils'
import { getEventOptions } from './getEventOptions'

type FormData = {
    name: string
    email: string
    event: string
    fever: boolean
    cough: boolean
    breathing: boolean
    soreThroat: boolean
    stuffyNose: boolean
    tasteSmell: boolean
    nausea: boolean
    tired: boolean
    pinkEye: boolean
    household: boolean
    contact: boolean
    travel: boolean
}

type CovidFormProps = {
    children?: ReactNode
}

const defaultData = {
    name: '',
    email: '',
    event: '',
    fever: false,
    cough: false,
    breathing: false,
    soreThroat: false,
    stuffyNose: false,
    tasteSmell: false,
    nausea: false,
    tired: false,
    pinkEye: false,
    household: false,
    contact: false,
    travel: false,
}

const formName = "covid-screening"
const submitLabel = "Submit"

const fieldLabels = {
    name: 'Your name',
    email: 'Your email',
    event: 'Event',
    fever: "Fever or chills",
    cough: "Cough",
    breathing: "Difficulty breathing or shortness of breath",
    soreThroat: "Sore throat or trouble swallowing",
    stuffyNose: "Runny or stuffy nose",
    tasteSmell: "Decrease or loss of taste or smell",
    nausea: "Nausea, vomiting or diarrhea",
    tired: "Not feeling well, extreme tiredness or sore muscles",
    pinkEye: "Pink eye or headache",
    symptoms: "Do you have any of the following new or worsening symptoms or signs?",
    household: "Does anyone in your household have one or more of the above symptoms?",
    contact: "Have you been notified as a close contact of someone with COVID-19 or been told to stay home and self-isolate?",
    travel: "In the last 14 days, have you or anyone in your household travelled outside of Canada?",
}

const requiredFields: RequiredFields<FormData> = ['name', 'email', 'event']
const contactFields = ['household', 'contact', 'travel']
const symptomFields = [
    'fever',
    'cough',
    'breathing',
    'soreThroat',
    'stuffyNose',
    'tasteSmell',
    'nausea',
    'tired',
    'pinkEye',
]

const checkScreening = (formData: FormData) => (
    [...symptomFields, ...contactFields].some((fieldName) => (
        formData[fieldName]
    ))
)

const screeningResultText = (screeningStatus) => screeningStatus
    ? '✗ You may not participate in this event.'
    : '✔ You may participate in this event.'

const eventsHelp = 'You must submit a screening the day of your ride.'

export const CovidForm = ({ children }: CovidFormProps) => {
    const [formData, setFormData] = useState<FormData>(defaultData)
    const [loading, setLoading] = useState(false)
    const [formState, setFormState] = useState<FormState>(null)
    const [formErrors, setFormErrors] = useState<string[]>([])
    const [screeningResult, setScreeningResult] = useState<boolean | null>(null)
    const { sendMail } = useMail()
    const { addRow } = useSheets()
    const { events } = useEvents({})
    const [ openingTime, setOpeningTime ] = useState<Date | null>(null)

    useEffect(() => {
      const deadline = new Date(Date.now())
      deadline.setDate(deadline.getDate() + 1)
      setOpeningTime(deadline)
    }, [])

    const eventOptions = getEventOptions(events, openingTime)

    const isSubmitted = formState === "submitted"
    const isDirty = formState === "dirty"
    const hasError = Boolean(formErrors.length)

    const handleSubmit = async evt => {
        evt.preventDefault()

        const errors = validate(formData, fieldLabels, requiredFields)
        if (errors.length) {
            setFormErrors(errors)
            setFormState(null)
            return
        }

        setLoading(true)
        const screeningStatus = checkScreening({ ...formData })

        const success = await formSubmit(formName, { ...formData })
        const successMail = await sendMail({
            to: formData.email,
            data: {
                name: formData.name,
                subject: `Randonneurs Ontario COVID-19 screening form`,
                body: `<p>Here are the results of your COVID-19 screening, for your own records.</p><p><strong>${screeningResultText(screeningStatus)}</strong></p>`,
                formData: formatMessage({ formData, fieldLabels })
            },
        }, 'defaultForm')

        const successSheet = await addRow({
            sheet: formName,
            row: {
                ...formData,
                submitted: getDateTimeLong(new Date(Date.now())),
            }
        })

        if (success && successMail && successSheet) {
            setScreeningResult(screeningStatus)
            setFormState("submitted")
        } else {
            setFormErrors(["Server error! Try again later."])
        }
        setLoading(false)
    }

    const handleChange = (evt: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { value = '', name } = evt.target
        setFormState("dirty")
        setFormData({ ...formData, [name]: value })
    }

    const handleCheckboxChange = (evt: ChangeEvent<HTMLInputElement>) => {
        const { name } = evt.currentTarget
        setFormState("dirty")
        setFormData({ ...formData, [name]: !formData[name] })
    }

    return (
        <>
            <Form name={formName}>
                <ContentWrapper>
                    {children}
                    <InputField name="name" label={fieldLabels.name} value={formData.name} onChange={handleChange} disabled={isSubmitted} />
                    <InputField name="email" label={fieldLabels.email} type="email" value={formData.email} onChange={handleChange} />
                    <SelectField name="event" label={fieldLabels.event} value={formData.event} onChange={handleChange} options={eventOptions} help={eventsHelp}/>
                    <Callout alternative>
                        <fieldset>
                            <legend><strong>1. {fieldLabels['symptoms']}</strong></legend>
                            <p>If you have an existing health condition that gives you the symptoms you should check these symptoms, unless the symptom is new, different or getting worse. Look for changes from your normal symptoms</p>
                            {symptomFields.map((fieldName) => (
                                <CheckboxField key={fieldName} name={fieldName} value={formData[fieldName]} onChange={handleCheckboxChange} disabled={isSubmitted} >
                                    {fieldLabels[fieldName]}
                                </CheckboxField>))}
                        </fieldset>
                    </Callout>
                    {contactFields.map((fieldName, i) => (
                        <CheckboxField key={fieldName} name={fieldName} value={formData[fieldName]} onChange={handleCheckboxChange} disabled={isSubmitted}>
                            <strong>{i + 2}. {fieldLabels[fieldName]}</strong>
                        </CheckboxField>)
                    )}

                    <ErrorsList formErrors={formErrors} />
                    <SubmitButton disabled={hasError && !isDirty || isSubmitted} loading={loading} handleSubmit={handleSubmit}>
                        {submitLabel}
                    </SubmitButton>
                </ContentWrapper>
            </Form>
            <ContentWrapper>
                {isSubmitted && <Callout alternative>
                    <h3>Your screening has been completed</h3>
                    <p>A copy has been sent to your email and has been recorded as per <Link href="https://ontariocycling.org/covid-19-information/">OCA guidelines</Link>.</p>
                    <p><strong>{screeningResultText(screeningResult)}</strong></p>
                    {screeningResult && <p>You've selected "Yes" to some of the above questions. Please stay home and follow regional guidelines.</p>}
                    <p>Refresh the page to submit again</p>
                </Callout>}
            </ContentWrapper>
        </>
    )
}
