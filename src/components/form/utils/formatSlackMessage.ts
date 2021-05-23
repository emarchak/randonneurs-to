import fetch from 'isomorphic-unfetch'
import { getDateTimeShort } from 'src/utils'
import { FieldLabel, FormData } from './types'

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
