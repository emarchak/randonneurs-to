import React from "react"
import { form, formWrapper } from "../../styles/form.module.scss"

type FormProps = {
    name: string,
    children: React.ReactNode
    className?: string
}

export const Form = ({ name, children, className }: FormProps) => (
    <div className={formWrapper}>
        <form
            name={name}
            method='post'
            data-netlify='true'
            data-netlify-honeypot='bot-field'
            className={[form, className].join(' ')}
        >
            {children}
        </form>
    </div>
)