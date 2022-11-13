import fetch from 'cross-fetch'
import { urlEncode } from 'src/utils'
import { trackEvent } from 'src/utils/tracking'
import { FormData } from './types'

export const formSubmit = async (formName: string, formData: FormData) => {
    const body = urlEncode({ "form-name": formName, ...formData })
    try {
        trackEvent("sign_up", { method: formName, ...formData })
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
