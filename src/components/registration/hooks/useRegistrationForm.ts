import { Brevet, useEvent } from 'src/data/events'
import { formatSlackMessage, formSubmit } from 'src/components/form/utils'
import { useMail } from 'src/data/mail'
import { useSlack } from 'src/hooks/useSlack'
import { useSheets } from 'src/hooks/useSheets'
import { createEventRegistration } from 'src/data/events'
import { getDateShort, getDateTimeLong, getTime } from 'src/utils'
import Bugsnag from '@bugsnag/js'
import { useState } from 'react'

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
    rideType: Brevet['eventType'] | ''
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

export const useRegistrationForm = ({ formName, fieldLabels }: useRegistrationFormParams) => {
    const [loading, setLoading] = useState(false)
    const { sendMail } = useMail()
    const { sendSlackMsg } = useSlack()
    const { addRow } = useSheets()

    const onSubmit = async (formData: FormData) => {
        setLoading(true)
        const message = `Registration for ${formData.chapter} ${formData.route} ${formData.rideType}`

        const [firstName, ...lastName] = formData.name.split(' ')

        const successRegistration = await createEventRegistration({
            eventId: formData.eventId,
            hidden: false,
            email: formData.email,
            firstName: firstName,
            lastName: lastName.join(' '),
            gender: formData.gender
        })
        const successSlack = await sendSlackMsg(formatSlackMessage({ fieldLabels, formData, message }), 'registration')
        const successSheet = await addRow({
            sheet: formName,
            row: {
                ...formData,
                submitted: getDateTimeLong(new Date(Date.now())),
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
            Bugsnag.notify('Registration error')
        }

        setLoading(false)
        return successRegistration || true
    }

    return {
        loading,
        onSubmit
    }

}
