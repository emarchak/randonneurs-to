import React, { ChangeEvent, ReactNode, useState } from 'react'
import { Button, LinkButton, SubmitButton } from 'src/components/buttons'
import { Callout } from 'src/components/callout'
import { ContentWrapper } from 'src/components/content-wrapper'
import { Form, InputField, TextField, ErrorsList, CheckboxField } from 'src/components/form/components'
import { Label } from 'src/components/form/components/Label'
import { formatMessage, formatSlackMessage, FormState, formSubmit, RequiredFields, validate } from 'src/components/form/utils'
import { Link } from 'src/components/link'
import { useSendMail } from 'src/hooks/useSendMail'
import { useSlack } from 'src/hooks/useSlack'

type FormData = {
    name: string
    email: string
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
    name: "",
    email: "",
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

const requiredFields: RequiredFields<FormData> = ['name', 'email']
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

const formatEmail = (formData) => formatSlackMessage({ formName, formData, fieldLabels }).attachments.pop()

export const CovidForm = ({ children }: CovidFormProps) => {
    const [formData, setFormData] = useState<FormData>(defaultData)
    const [formState, setFormState] = useState<FormState>(null)
    const [formErrors, setFormErrors] = useState<string[]>([])
    const [failedScreening, setScreeningResult] = useState<boolean | null>(null)
    const { sendMail } = useSendMail()
    const { sendSlackMsg } = useSlack()

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

        // const successSlack = await sendSlackMsg(formatSlackMessage({ fieldLabels, formData, formName }))
        const success = await formSubmit(formName, { ...formData })
        const successMail = await sendMail({
            to: formData.email,
            subject: `Randonneurs Ontario COVID-19 screening form`,
            data: {
                body: "Here are the results of your COVID-19 screening, for your own records.",
                formData: formatMessage({ formData, fieldLabels })
            },
        }, 'defaultForm')

        if (success && successMail) {
            setScreeningResult(checkScreening({ ...formData }))
            setFormState("submitted")
        } else {
            setFormErrors(["Server error! Try again later."])
        }
    }

    const handleChange = (evt: ChangeEvent<HTMLInputElement>) => {
        const { value = "", name } = evt.target
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
                    <SubmitButton disabled={hasError && !isDirty || isSubmitted} handleSubmit={handleSubmit}>
                        {submitLabel}
                    </SubmitButton>
                </ContentWrapper>
            </Form>
            <ContentWrapper>
                {isSubmitted && <Callout alternative>
                    <h3>Your screening has been completed</h3>
                    <p><small>A copy has been sent to your email and has been recorded as per <Link href="https://ontariocycling.org/covid-19-information/">OCA guidelines</Link>.</small></p>
                    {!failedScreening && <p>✔ <strong>You may participate in this event.</strong></p>}
                    {failedScreening && <>
                        <p>You've selected "Yes" to some of the above questions. Please stay home and follow regional guidelines</p>
                        <p>✗ <strong>You may not participate in this event.</strong></p>
                    </>}
                    <p>Refresh the page to submit again</p>
                </Callout>}
            </ContentWrapper>
        </>
    )
}