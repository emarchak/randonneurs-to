
import { getDateTimeShort } from 'src/utils'
import { FieldLabel, FormData } from './types'

type formatMessageArgs = { formData: FormData, fieldLabels: FieldLabel }

const sentenceCase = (str: string) => {
    const result = str.replace(/([A-Z])/g, " $1")
    return result.charAt(0).toUpperCase() + result.slice(1)
}

export const formatMessage = ({ formData, fieldLabels }: formatMessageArgs) => (
    Object.keys(formData).map(key => {
        const value = formData[key] instanceof Date ? getDateTimeShort(formData[key]) : formData[key]
        const label = fieldLabels[key] || sentenceCase(key)
        return `${label}: ${value}`
    }).join(' \n '))
