import React from "react"

import styles from "./styles/layout.module.scss"

type CalloutProps = {
  children: React.ReactNode
  alternative?: boolean
}

export const Callout = ({ children, alternative = false }: CalloutProps) => (
  <section className={`${alternative ? styles.calloutAlternative : styles.callout}`}>{children}</section>
)

export const Aside = ({ children }: { children: React.ReactNode }) => (
  <aside className={styles.aside}>{children}</aside>
)
