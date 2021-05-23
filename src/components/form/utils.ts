import fetch from 'isomorphic-unfetch'
import { getDateTimeShort } from 'src/utils'

export type FormState = "submitted" | "dirty" | null
type FormData = { [key: string]: any }
type FieldLabel = { [key: string]: any }

const formEncode = data => {
    return Object.keys(data)
        .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
        .join("&")
}

type formatSlackMessageArgs = { formData: FormData, fieldLabels: FieldLabel }
    & ({ formName?: never, message: string } | { formName: string, message?: never })

const sentenceCase = (str: string) => {
    const result = str.replace(/([A-Z])/g, " $1")
    return result.charAt(0).toUpperCase() + result.slice(1)
}

export const formatSlackMessage = ({ formName, formData, fieldLabels, message }: formatSlackMessageArgs) => ({
    message: message || `Submission from ${formName}`,
    attachments: [
        Object.keys(formData).map(key => {
            const value = formData[key] instanceof Date ? getDateTimeShort(formData[key]) : formData[key]
            const label = fieldLabels[key] || sentenceCase(key)
            return `${label}: ${value}`
        }).join(' \n ')
    ]
})

export const formSubmit = async (formName: string, formData: FormData) => {
    const body = formEncode({ "form-name": formName, ...formData })
    try {
        const response = await fetch(`/`, {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body,
        })
        return response.ok
    }
    catch (err) {
        return false
    }
}