import React from "react"

import styles from "./styles/layout.module.scss"

type Props = {
  children: React.ReactNode
}

export const ContentWrapper = ({ children }: Props) => (
  <div className={styles.content}>{children}</div>
)
