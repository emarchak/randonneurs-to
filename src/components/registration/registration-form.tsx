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

    const handleChange = (evt: ChangeEvent<Element>) => { }

    return (
        <form
            name={formName}
            method="post"
            data-netlify="true"
            data-netlify-honeypot="bot-field"
        >
            <ContentWrapper>
                <InputField label="Your name" name="name" value={formData.name} onChange={handleChange} />
                <InputField label="Your email" name="email" type="email" value={formData.email} onChange={handleChange} />
                <SelectField label="Ride type" name="rideType" options={rideTypes} value={formData.rideType} onChange={handleChange} />
                <SelectField label="Route" name="route" options={routes} value={formData.route} onChange={handleChange} />
                <DateField label="Starting time" name="startDate" value={formData.startDate} onChange={handleChange} />
                <InputField label="Notes for the organizer" name="notes" value={formData.notes} onChange={handleChange} />
            </ContentWrapper>
        </form>)
}