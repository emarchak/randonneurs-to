import React from 'react'
import * as styles from "../styles/form.module.scss"

type ButtonProps = {
    handleClick: (evt: any) => any,
    disabled?: boolean,
    className?: string,
    children: React.ReactChild
}

export const Button = ({ handleClick, disabled, className, children }: ButtonProps) => (
    <button
        className={className + ' ' + styles.button}
        disabled={disabled}
        onClick={handleClick}
    >
        {children}
    </button>
)

type SubmitButtonProps = {
    handleSubmit: (evt: any) => Promise<void>,
    disabled?: boolean,
    children: React.ReactChild
}

export const SubmitButton = ({ handleSubmit, disabled = false, children }: SubmitButtonProps) => (
    <button
        type="submit"
        className={styles.submit + ' ' + styles.button}
        disabled={disabled}
        onClick={handleSubmit}
    >
        {children}
    </button>
)