import fetch from 'isomorphic-unfetch'

type Channels = 'registration' | 'default'

type slackParams = {
    message: string,
    attachments?: string[]
}

export const useSlack = () => {
    const sendSlackMsg = async ({ message, attachments }: slackParams, channel: Channels = 'default') => {
        try {
            const messageBody = {
                text: message,
                attachments: attachments ? attachments.map(block => ({ text: block })) : undefined,
            }

            const response = await fetch(`/.netlify/functions/send-slack?channel=${encodeURIComponent(channel)}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(messageBody),
            })

            return response.ok
        }
        catch (err) {
            return false
        }
    }

    return {
        sendSlackMsg,
    }
}
