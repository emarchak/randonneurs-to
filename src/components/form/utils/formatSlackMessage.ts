import { formatMessage } from './formatMessage'
import { FieldLabel, FormData } from './types'

type formatSlackMessageArgs = { formData: FormData, fieldLabels: FieldLabel }
    & ({ formName?: never, message: string } | { formName: string, message?: never })

export const formatSlackMessage = ({ formName, formData, fieldLabels, message }: formatSlackMessageArgs) => ({
    message: message || `Submission from ${formName}`,
    attachments: [
        formatMessage({ formData, fieldLabels })
    ]
})
