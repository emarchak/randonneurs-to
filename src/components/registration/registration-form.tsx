import React, { useState, ChangeEvent, useEffect } from 'react'
import { ContentWrapper } from '../content-wrapper'
import { InputField, SelectField, DateField } from '../form/input-field'
import { PermanentDescription } from './permanent-description'
import { BrevetDescription } from './brevet-description'
import { Route, RideType } from './types'
import { UpcomingBrevets } from './upcoming-brevets'

const formName = 'registration'

const rideTypes = [{ value: 'brevet', label: 'Brevet' }, { value: 'permanent', label: 'Permanent' }]

type FormState = "submitted" | "dirty" | null
interface FormData {
    name: string
    email: string
    rideType: RideType | ''
    route: string
    startDate: Date
    notes: string
}

type Props = {
    routes: Route[]
}

const defaultFormData = {
    name: '',
    email: '',
    rideType: '' as FormData["rideType"],
    route: '',
    startDate: new Date(),
    notes: '',
}

export const RegistrationForm = ({ routes }: Props) => {
    const [formData, setFormData] = useState<FormData>(defaultFormData)
    const [formState, setFormState] = useState<FormState>(null)

    const routeOptions = routes.map(route => ({ value: route.id, label: `${route.chapter} - ${route.routeName}` }))
    const isPermanent = formData.rideType === 'permanent'
    const isBrevet = formData.rideType === 'brevet'

    const handleInputChange = (evt: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { value = "", name } = evt.currentTarget

        setFormState("dirty")
        setFormData({
            ...formData,
            [name]: value,
        })
    }

    const handleDateChange = (startDate: Date) => {
        setFormState("dirty")
        setFormData({
            ...formData,
            startDate
        })
    }

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
                <SelectField label="Ride type" name="rideType" options={rideTypes} value={formData.rideType} onChange={handleInputChange} />
                {isBrevet && <BrevetDescription />}
                {isBrevet && <UpcomingBrevets />}
                {isPermanent && <PermanentDescription />}
                {isPermanent && <SelectField label="Route" name="route" options={routeOptions} value={formData.route} onChange={handleInputChange} />}
                <DateField label="Starting time" name="startDate" value={formData.startDate} onChange={handleDateChange} />
                <InputField label="Notes for the organizer" name="notes" value={formData.notes} onChange={handleInputChange} />
            </ContentWrapper>
        </form>)
}
