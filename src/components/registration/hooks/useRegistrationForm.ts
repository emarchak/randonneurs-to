import { Brevet } from 'src/hooks/useBrevets'
import { formatSlackMessage, formSubmit } from 'src/components/form/utils'
import { useSendMail } from 'src/hooks/useSendMail'
import { useSlack } from 'src/hooks/useSlack'

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
    "simcoe": "vp-simcoe@randonneursontario.ca",
    "huron": "vp-huron@randonneursontario.ca",
    "ottawa": "vp-ottawa@randonneursontario.ca",
    "default": "vp@randonneurs.to"
}

export const useRegistrationForm = (params: useRegistrationFormParams) => {
    const { formName, fieldLabels } = params
    const { sendMail } = useSendMail()
    const { sendSlackMsg } = useSlack()

    const onSubmit = async (formData: FormData) => {
        const message = `Registration for ${formData.chapter} ${formData.route} ${formData.rideType}`
        const successSubmit = await formSubmit(formName, { ...formData })

        const successSlack = await sendSlackMsg(formatSlackMessage({ fieldLabels, formData, message }), 'registration')

        const replyTo = replyToEmails[formData.chapter.toLowerCase() || 'default']
        const vpPermanent = formData.rideType === 'permanent' ? permEmail : undefined
        const successMail = await sendMail({
            to: [formData.email, replyTo, vpPermanent].filter(Boolean),
            replyTo,
            data: formData,
        }, 'brevetRegistration')

        return successSubmit && successSlack && successMail
    }

    return {
        onSubmit,
    }

}
