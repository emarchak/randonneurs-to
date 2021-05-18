import { Brevet } from 'src/hooks/useBrevets'
import { formSubmit } from 'src/components/form/helpers'
import { useSendMail } from 'src/hooks/useSendMail'
import { useSlack } from 'src/hooks/useSlack'
import { getDateTimeShort } from 'src/utils'

type useRegistrationFormParams = {
    formName: string,
    fieldLabels: {
        [keyof: string]: string
    }
}

type FormData = {
    name: string
    email: string
    route: Brevet['route']
    rideType: Brevet['event'] | ''
    chapter: Brevet['chapter'] | '',
    [keyof: string]: any
}

const permEmail = 'treasurer_2021@randonneursontario.ca'
const replyToEmails = {
   "toronto": "vp@randonneurs.to",
   "simcoe":  "vp-simcoe_2021@randonneursontario.ca", 
   "huron":   "vp-huron_2021@randonneursontario.ca", 
   "ottawa":  "vp-ottawa_2021@randonneursontario.ca", 
   "default": "vp@randonneurs.to"
}

const sentenceCase = (str: string) => {
    const result = str.replace(/([A-Z])/g, " $1")
    return result.charAt(0).toUpperCase() + result.slice(1)
}

export const useRegistrationForm = (params: useRegistrationFormParams) => {
    const { formName, fieldLabels } = params
    const { sendMail } = useSendMail()
    const { sendSlackMsg } = useSlack()

    const formatSlackMessage = (formData: FormData) => ({
        message: `Registration for ${formData.chapter} ${formData.route} ${formData.rideType}`,
        attachments: [
            Object.keys(formData).map(key => {
                const value = formData[key] instanceof Date ? getDateTimeShort(formData[key]) : formData[key]
                const label = fieldLabels[key] || sentenceCase(key)
                return `${label}: ${value}`
            }).join(' \n ')
        ]
    })

    const onSubmit = async (formData: FormData) => {
        const successSubmit = await formSubmit(formName, { ...formData })

        const successSlack = await sendSlackMsg(formatSlackMessage(formData), 'registration')

        const replyTo = replyToEmails[formData.chapter.toLowerCase() || 'default']
        const vpPermanent = formData.rideType === 'permanent' ? permEmail : undefined
        const successMail = await sendMail({
            to: [formData.email, replyTo, vpPermanent].filter(Boolean),
            subject: `Registration for ${formData.route} ${formData.rideType}`,
            body: `Thank you for registering.`,
            replyTo,
            data: formData,
        }, 'brevetRegistration')

        return successSubmit && successSlack && successMail
    }

    return {
        onSubmit,
    }

}
