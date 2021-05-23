import React from 'react'
import * as styles from "../styles/form.module.scss"
import { Link, LinkProps } from './link'

type ButtonTypes = {
    primary?: boolean,
    secondary?: boolean,
    small?: boolean,
    block?: boolean,
}

const getButtonClassName = ({ primary = false, secondary = false, block = false, small = false }) => (
    [
        styles.button,
        ...(primary ? [styles.primaryButton] : []),
        ...(secondary ? [styles.secondaryButton] : []),
        ...(block ? [styles.blockButton] : []),
        ...(small ? [styles.smallButton] : []),
    ].join(' '))

type ButtonProps = ButtonTypes & {
    handleClick: (evt: any) => any,
    disabled?: boolean,
    className?: string,
    children: React.ReactChild
}

export const Button = ({ handleClick, disabled, className, children, ...props }: ButtonProps) => (
    <button
        className={className + ' ' + getButtonClassName(props)}
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
        className={getButtonClassName({ primary: true })}
        disabled={disabled}
        onClick={handleSubmit}
    >
        {children}
    </button>
)

type LinkButtonProps = ButtonTypes & LinkProps
export const LinkButton = (props: LinkButtonProps) => <Link {...props} className={getButtonClassName(props)} />
