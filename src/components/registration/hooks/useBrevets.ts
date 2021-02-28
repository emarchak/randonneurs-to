import { useState, useEffect } from 'react'
import { Brevet } from '../types'
import fetch from 'isomorphic-unfetch'

const today = new Date().toISOString().slice(0, 10)

type Response = {
    loading: boolean,
    brevets: Brevet[]
}

const lowercaseKeys = (o) => Object.keys(o).reduce((c, k) => (c[k.toLowerCase()] = o[k], c), {})

export const useBrevets = (date = today) => {
    const [response, setResponse] = useState<Response>({
        loading: true,
        brevets: [],
    })

    useEffect(() => {
        const fetchBrevet = async () => {
            try {
                const response = await fetch(
                    `https://www.randonneursontario.ca/brevetcard/schedule.php?from=${date}`,
                    { method: 'GET' })
                const body = await response.json()
                if (body.status === 'ok') {
                    setResponse({
                        loading: false,
                        brevets: body.schedule.map(lowercaseKeys) as Brevet[]
                    })
                }
            }
            catch (err) {
                setResponse({
                    loading: false,
                    brevets: []
                })
            }
        }

        fetchBrevet()
    }, [])

    return response
}