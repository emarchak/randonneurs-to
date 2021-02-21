import React from 'react'
import styles from "../styles/form.module.scss"

type SubmitButtonProps = {
    handleSubmit: (evt: any) => Promise<void>,
    disabled?: boolean,
    children: React.ReactChild
}

export const SubmitButton = ({ handleSubmit, disabled = false, children }: SubmitButtonProps) => (
    <button
        type="submit"
        className={styles.submit}
        disabled={disabled}
        onClick={handleSubmit}
    >
        {children}
    </button>
)