import React from 'react'
import * as styles from "../styles/form.module.scss"

type Props = {
    id?: string,
    children: React.ReactChild
}

export const Fieldset = ({ id, children }: Props) => (
    <fieldset id={id} className={styles.fieldset}>{children}</fieldset>
)