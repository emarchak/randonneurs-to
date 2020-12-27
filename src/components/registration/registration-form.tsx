import React, { useState, ChangeEvent } from 'react';
import { ContentWrapper } from '../content-wrapper';
import { InputField, SelectField, DateField } from '../form/input-field';


const formName = 'registration'

const rideTypes = ['brevet', 'permanent']

type FormState = "submitted" | "dirty" | null
type FormData = {
    name: string
    email: string
    rideType: '' | 'brevet' | 'permanent'
    route: string
    startDate: Date
    notes: string
}

export const RegistrationForm = () => {
    const [formState, setFormState] = useState<FormState>(null)
    const [formData, setFormData] = useState<FormData>({
        name: '',
        email: '',
        rideType: '',
        route: '',
        startDate: new Date(),
        notes: '',
    })
    const routes = ['routeA', 'routeB']

    const handleInputChange = (evt: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { value = "", name } = evt.currentTarget

        setFormState("dirty")
        setFormData({
            ...formData,
            [name]: value,
        })
    }

    const handleDateChange = (dates: Date[]) => {
        setFormState("dirty")
        setFormData({
            ...formData,
            'startDate': dates.pop(),
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
                <SelectField label="Route" name="route" options={routes} value={formData.route} onChange={handleInputChange} />
                <DateField label="Starting time" name="startDate" value={formData.startDate} onChange={handleDateChange} />
                <InputField label="Notes for the organizer" name="notes" value={formData.notes} onChange={handleInputChange} />
            </ContentWrapper>
        </form>)
}
