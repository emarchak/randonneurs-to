import { Brevet } from 'src/data/brevets'
import { formatSlackMessage, formSubmit } from 'src/components/form/utils'
import { useSendMail } from 'src/hooks/useSendMail'
import { useSlack } from 'src/hooks/useSlack'
import { useSheets } from 'src/hooks/useSheets'
import { getDateShort, getDateTimeLong, getTime, getToday } from 'src/utils'
import Bugsnag from '@bugsnag/js'

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

const permEmail = 'treasurer@randonneursontario.ca'
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
    const { addRow } = useSheets()

    const onSubmit = async (formData: FormData) => {
        const message = `Registration for ${formData.chapter} ${formData.route} ${formData.rideType}`

        const successSubmit = await formSubmit(formName, { ...formData })
        const successSlack = await sendSlackMsg(formatSlackMessage({ fieldLabels, formData, message }), 'registration')
        const successSheet = await addRow({
            sheet: formName,
            row: {
                ...formData,
                submitted: getDateTimeLong(getToday()),
                scheduleTime: formData.scheduleTime && getDateTimeLong(formData.scheduleTime),
                startDate: getDateShort(formData.startTime),
                startTime: getTime(formData.startTime),
            }
        })
        const replyTo = replyToEmails[formData.chapter.toLowerCase() || 'default']
        const memberAtLarge = formData.chapter === 'Huron' ? 'director1@randonneursontario.ca' : undefined
        const vpPermanent = formData.rideType === 'permanent' ? permEmail : undefined
        const successMail = await sendMail({
            to: [formData.email, replyTo, vpPermanent, memberAtLarge].filter(Boolean),
            replyTo,
            data: formData,
        }, 'brevetRegistration')

        if (!successSlack || !successMail || !successSheet) {
            Bugsnag.notify('Registration error');
        }

        return successSubmit
    }

    return {
        onSubmit,
    }

}
