import fetch from 'isomorphic-unfetch'

export type registerRiderParams = {
    eventId: number
    hideRide: boolean
    email: string
    firstName: string
    lastName: string
    gender?: 'F' | 'M' | 'X'
}

export const registerRider = async (params: registerRiderParams) => {
    try {
        const response = await fetch('/.netlify/functions/data/ride', {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: JSON.stringify(params),
        })
        return response.ok
    }
    catch (err) {
        return false
    }
}
