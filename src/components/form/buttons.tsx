import { Link } from 'gatsby'
import React from 'react'
import styles from "../styles/form.module.scss"

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

type LinkButtonProps = {
    to: string,
    children: React.ReactChild,
    primary?: boolean,
    secondary?: boolean,
    small?: boolean,
    block?: boolean,
}

export const LinkButton = ({ to, primary = false, secondary = false, block = false, small = false, children }: LinkButtonProps) => {
    const classes = [
        styles.button,
        ...(primary ? [styles.primaryButton] : []),
        ...(secondary ? [styles.secondaryButton] : []),
        ...(block ? [styles.blockButton] : []),
        ...(small ? [styles.smallButton] : []),
    ]
    return <Link to={to} className={classes.join(' ')}>{children}</Link>
}