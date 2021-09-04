import React from 'react'
import { ButtonTypes, getButtonClassName } from './utils'

type ButtonProps = React.PropsWithChildren<ButtonTypes & {
  handleClick: (evt: any) => any
  disabled?: boolean
  loading?: boolean
  className?: string
  type?: React.ButtonHTMLAttributes<HTMLButtonElement>['type']
}>

export const Button = ({ handleClick, type = 'button', loading, disabled, children, ...props }: ButtonProps) => (
  <button
    type={type}
    className={getButtonClassName({loading, ...props})}
    disabled={disabled || loading}
    onClick={handleClick}
  >
    {children}
  </button>
)
