import fetch from 'isomorphic-unfetch'
import { FormData } from './types'

const formEncode = data => {
    return Object.keys(data)
        .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
        .join("&")
}

export const formSubmit = async (formName: string, formData: FormData) => {
    const body = formEncode({ "form-name": formName, ...formData })
    try {
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