import React from 'react'
import * as styles from "./styles/form.module.scss"
import { Link, LinkProps } from 'src/components/link'

type ButtonTypes = {
  primary?: boolean
  secondary?: boolean
  small?: boolean
  block?: boolean
  loading?: boolean
}

type getButtonClassNameType = ButtonTypes & { className?: string }

const getButtonClassName = ({ primary, secondary, block, small, loading, className = '' }:getButtonClassNameType) => (
  [
    styles.button,
    className,
    ...(primary ? [styles.primaryButton] : []),
    ...(secondary ? [styles.secondaryButton] : []),
    ...(block ? [styles.blockButton] : []),
    ...(small ? [styles.smallButton] : []),
    ...(loading ? [styles.loadingButton] : [])
  ].join(' '))

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

type SubmitButtonProps = React.PropsWithChildren<{
  handleSubmit: (evt: any) => Promise<void>
  loading?: boolean
  disabled?: boolean
}>

export const SubmitButton = ({ handleSubmit, ...props }: SubmitButtonProps) => (
  <Button
    primary
    type='submit'
    handleClick={handleSubmit}
    {...props}
    />
)

type LinkButtonProps = ButtonTypes & LinkProps
export const LinkButton = (props: LinkButtonProps) => <Link {...props} className={getButtonClassName(props)} />
