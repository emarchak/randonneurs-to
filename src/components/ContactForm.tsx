import React, { ChangeEvent, ReactNode, useState } from 'react'
import { SubmitButton } from './buttons'
import { ContentWrapper } from './content-wrapper'
import { Form, InputField } from './form/components'
import { TextField } from './form/components/TextField'
import { ErrorsList } from './form/errors-list'
import { formatSlackMessage, FormState, formSubmit } from './form/utils'
import { emailRegex } from './form/regex'
import { useSlack } from 'src/hooks/useSlack'

const checkForErrors = (fields: FormData, fieldLabels: FormLabels) =>
    Object.entries(fields)
        .map(([field, value]) => {
            if (!value.length) {
                return `${fieldLabels[field]} is required`
            }

            if (field === "email" && !emailRegex.test(value)) {
                return `${value} is not a valid email`
            }
        })
        .filter(Boolean)

type FormData = {
    name: string
    email: string
    message: string
}

type FormLabels = {
    name: string
    email: string
    message: string
}

type ContactFormProps = {
    formName: string
    messageLabel?: string
    submitLabel?: string
    children?: ReactNode
}

export const ContactForm = ({ formName, messageLabel = "Message", submitLabel = "Submit", children }: ContactFormProps) => {
    const [formData, setFormData] = useState<FormData>({
        name: "",
        email: "",
        message: ""
    })
    const [formState, setFormState] = useState<FormState>(null)
    const [formErrors, setFormErrors] = useState<string[]>([])
    const { sendSlackMsg } = useSlack()

    const fieldLabels = {
        name: 'Your name',
        email: 'Your email',
        message: messageLabel
    }
    const isSubmitted = formState === "submitted"
    const isDirty = formState === "dirty"
    const hasError = Boolean(formErrors.length)

    const handleSubmit = async evt => {
        evt.preventDefault()

        const errors = checkForErrors(formData, fieldLabels)
        if (errors.length) {
            setFormErrors(errors)
            setFormState(null)
            return
        }

        const successSlack = await sendSlackMsg(formatSlackMessage({ fieldLabels, formData, formName }))
        const success = await formSubmit(formName, { ...formData })

        if (successSlack && success) {
            setFormState("submitted")
        } else {
            setFormErrors(["Server error! Try again later."])
        }
    }

    const handleChange = (evt: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { value = "", name } = evt.target

        setFormState("dirty")
        setFormData({
            ...formData,
            [name]: value,
        })
    }

    if (isSubmitted) {
        return (
            <Form name={formName}>
                <ContentWrapper>
                    {children}
                    <div aria-live="polite">
                        Thank you! We'll be in contact soon.
              </div>
                </ContentWrapper>
            </Form>
        )
    }

    return (
        <Form name={formName}>
            <ContentWrapper>
                {children}
                <InputField name="name" label={fieldLabels.name} value={formData.name} onChange={handleChange} />
                <InputField name="email" label={fieldLabels.email} type="email" value={formData.email} onChange={handleChange} />
                <TextField name="message" label={fieldLabels.message} value={formData.message} onChange={handleChange} />
                <ErrorsList formErrors={formErrors} />
                <SubmitButton
                    disabled={hasError && !isDirty}
                    handleSubmit={handleSubmit}
                >
                    {submitLabel}
                </SubmitButton>
            </ContentWrapper>
        </Form>
    )
}