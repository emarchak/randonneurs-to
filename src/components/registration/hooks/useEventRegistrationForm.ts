import { useState } from 'react'
import Bugsnag from '@bugsnag/js'
import { formatSlackMessage } from 'src/components/form/utils'
import { useMail } from 'src/data/mail'
import { useSlack } from 'src/hooks/useSlack'
import { useSheets } from 'src/hooks/useSheets'
import { getDateShort, getDateTimeLong, getTime, trackEvent } from 'src/utils'
import { registerEvent } from './utils'
import { FormData } from '../components/EventRegistrationForm'

const formName = 'registration'
type useEventRegistrationFormParams = {
    fieldLabels: {
        [keyof: string]: string
    }
}

const replyToEmails = {
    "toronto": "vp@randonneurs.to",
    "simcoe": "vp-simcoe@randonneursontario.ca",
    "huron": "vp-huron@randonneursontario.ca",
    "ottawa": "vp-ottawa@randonneursontario.ca",
    "default": "vp@randonneurs.to"
}

export const useEventRegistrationForm = ({ fieldLabels }: useEventRegistrationFormParams) => {
    const [loading, setLoading] = useState(false)
    const { sendMail } = useMail()
    const { sendSlackMsg } = useSlack()
    const { addRow } = useSheets()

    const onSubmit = async (data: FormData) => {
        setLoading(true)
        const message = `Registration for ${data.chapter} ${data.route} ${data.rideType}`
        const successRegistration = await registerEvent(data)

        const successSlack = await sendSlackMsg(formatSlackMessage({ fieldLabels, formData: data, message }), 'registration')
        const successSheet = await addRow({
            sheet: 'registration',
            row: {
                ...data,
                submitted: getDateTimeLong(new Date(Date.now())),
                scheduleTime: data.scheduleTime && getDateTimeLong(data.scheduleTime),
                startDate: data.startTime && getDateShort(data.startTime),
                startTime: data.startTime && getTime(data.startTime),
            }
        })
        const replyTo = replyToEmails[data.chapter.toLowerCase() || 'default']
        const memberAtLarge = data.chapter === 'Huron' ? 'director1@randonneursontario.ca' : undefined
        const successMail = await sendMail({
            to: [data.email, replyTo, memberAtLarge].filter(Boolean),
            replyTo,
            data
        }, 'brevetRegistration')

        if (!successSlack || !successMail || !successSheet) {
            Bugsnag.notify('Registration error')
        }

        trackEvent("sign_up", { method: formName, ...data })

        setLoading(false)
        return successRegistration && successSheet
    }
    return {
        loading,
        onSubmit
    }

}
