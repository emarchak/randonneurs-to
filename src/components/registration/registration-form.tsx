import React, { useState, ChangeEvent, useEffect } from 'react'
import { ContentWrapper } from '../content-wrapper'
import { InputField, SelectField, DateField } from '../form/input-field'
import { PermanentDescription } from './permanent-description'
import { Route, RideType, Brevet } from './types'
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
    startLocation: string
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
    startLocation: '',
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

    const handleBrevetChange = (brevet: Brevet) => {
        console.log(brevet)
        setFormState("dirty")
        setFormData({
            ...formData,
            rideType: 'brevet',
            route: `${brevet.chapter} - ${brevet.route} - ${brevet.distance}`,
            startDate: new Date(brevet.unixtime * 1000),
            startLocation: brevet.startloc
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
                {isBrevet && <UpcomingBrevets onBrevetChange={handleBrevetChange} />}
                {isPermanent && <PermanentDescription />}
                {isPermanent && <SelectField label="Route" name="route" options={routeOptions} value={formData.route} onChange={handleInputChange} />}
                <DateField label="Starting time" name="startDate" value={formData.startDate} onChange={handleDateChange} />
                <InputField label="Starting location" name="startLocation" value={formData.startLocation} onChange={handleInputChange} disabled={isBrevet} />
                <InputField label="Notes for the organizer" name="notes" value={formData.notes} onChange={handleInputChange} />
            </ContentWrapper>
        </form>)
}
