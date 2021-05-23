import React from 'react'
import * as styles from "../styles/form.module.scss"

type Props = {
    id?: string,
    children: React.ReactNode
}

export const Fieldset = ({ id, children }: Props) => (
    <fieldset id={id} className={styles.fieldset}>{children}</fieldset>
)

export const InlineInputs = ({ children }: Props) => (
    <fieldset className={styles.inlineInputs}>{children}</fieldset>
)