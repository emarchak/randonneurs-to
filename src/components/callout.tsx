import React from "react"

import styles from "./styles/layout.module.scss"

type Props = {
  children: React.ReactNode
  alternative?: boolean
}

export const Callout = ({ children, alternative = false }: Props) => (
  <section className={`${alternative ? styles.calloutAlternative : styles.callout}`}>{children}</section>
)
