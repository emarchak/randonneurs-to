import React, { useState, ChangeEvent } from 'react'
import { ContentWrapper } from '../content-wrapper'
import { InputField, SelectField, DateField } from '../form/input-field'
import { PermanentDescription } from './permanent-description'
import { BrevetDescription } from './brevet-description'
import { Route, Brevet, RideType } from './types'
import { UpcomingBrevets } from './upcoming-brevets'
import fetch from 'isomorphic-unfetch'

const formName = 'registration'

const rideTypes = [{ value: 'brevet', label: 'Brevet' }, { value: 'permanent', label: 'Permanent' }]

type FormState = "submitted" | "dirty" | null
type FormData = {
    name: string
    email: string
    rideType: RideType
    route: string
    startDate: Date
    notes: string
}

type Props = {
    routes: Route[]
}

export const RegistrationForm = ({ routes }: Props) => {
    const [formData, setFormData] = useState<FormData>({
        name: '',
        email: '',
        rideType: '',
        route: '',
        startDate: new Date(),
        notes: '',
    })
    const [formState, setFormState] = useState<FormState>(null)
    const [brevets, setBrevets] = useState<Brevet[] | undefined>(undefined)
    const fetchBrevet = async () => {
        try {
            const response = await fetch("http://localhost:3000/schedule.php", {
                method: 'GET',
            })
            const body = await response.json()
            if (body.status === 'ok') {
                setBrevets(body.schedule as Brevet[]);
            }
        }
        catch (err) { console.warn(err) }
    }

    const handleInputChange = (evt: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { value = "", name } = evt.currentTarget

        setFormState("dirty")
        setFormData({
            ...formData,
            [name]: value,
        })
    }

    const handleRideTypeChange = (evt: ChangeEvent<HTMLSelectElement>) => {
        if (!brevets) { fetchBrevet() }
        handleInputChange(evt);
    }

    const handleDateChange = (startDate: Date) => {
        setFormState("dirty")
        setFormData({
            ...formData,
            startDate
        })
    }

    const routeOptions = routes.map(route => ({ value: route.id, label: `${route.chapter} - ${route.routeName}` }))
    const isPermanent = formData.rideType === 'permanent'
    const isBrevet = formData.rideType === 'brevet'

    return (
        <form
            name={formName}
            method="post"
            data-netlify="true"
            data-netlify-honeypot="bot-field"
        >
            <ContentWrapper>
                <InputField label="Your name" name="name" value={formData.name} onChange={handleInputChange} />
                <InputField label="Your email" name="email" type="email" value={formData.email} onChange={handleInputChange} />
                <SelectField label="Ride type" name="rideType" options={rideTypes} value={formData.rideType} onChange={handleRideTypeChange} />
                {isPermanent && <PermanentDescription />}
                {isBrevet && <BrevetDescription />}
                {isBrevet && <UpcomingBrevets brevets={brevets} />}
                <SelectField label="Route" name="route" options={routeOptions} value={formData.route} onChange={handleInputChange} />
                <DateField label="Starting time" name="startDate" value={formData.startDate} onChange={handleDateChange} />
                <InputField label="Notes for the organizer" name="notes" value={formData.notes} onChange={handleInputChange} />
            </ContentWrapper>
        </form>)
}
