import * as styles from '../styles/form.module.scss'

export type ButtonTypes = {
  primary?: boolean
  secondary?: boolean
  small?: boolean
  block?: boolean
  loading?: boolean
}

type getButtonClassNameType = ButtonTypes & { className?: string }

export const getButtonClassName = ({ primary, secondary, block, small, loading, className = '' }: getButtonClassNameType) => (
  [
    styles.button,
    className,
    ...(primary ? [styles.primaryButton] : []),
    ...(secondary ? [styles.secondaryButton] : []),
    ...(block ? [styles.blockButton] : []),
    ...(small ? [styles.smallButton] : []),
    ...(loading ? [styles.loadingButton] : [])
  ].join(' '))
