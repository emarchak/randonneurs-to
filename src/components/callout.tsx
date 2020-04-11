import React from "react"

import styles from "./styles/layout.module.scss"

type Props = {
  children: React.ReactNode
}

export const Callout = ({ children }: Props) => (
  <section className={styles.callout}>{children}</section>
)
