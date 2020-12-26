import React, { ChangeEvent } from "react"
import styles from "../styles/form.module.scss"

type InputFieldProps = {
    type?: 'text' | 'email'
    name: string
    value: string
    label: string
    onChange: (evt: ChangeEvent<HTMLInputElement>) => void
}

export const InputField = ({ type = 'text', name, value = '', label, onChange }: InputFieldProps) => (
    <p>
        <label>
            <span className={styles.label}>{label}</span>
            <input
                type={type}
                name={name}
                className={styles.input}
                value={value}
                onChange={onChange}
            />
        </label>
    </p>
)