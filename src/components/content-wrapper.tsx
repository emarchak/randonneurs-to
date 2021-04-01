import React from "react"

import styles from "./styles/layout.module.scss"

type ContentWrapperProps = {
  container?: boolean,
  children: React.ReactNode
}

export const ContentWrapper = ({ container = false, children }: ContentWrapperProps) => (
  <div className={`${styles.content} ${container ? styles.contentContainer : ''}`} > { children}</div>
)

type ContentContainerProps = {
  children: React.ReactNode
}

export const ContentChild = ({ children }: ContentContainerProps) => (
  <div className={styles.contentContainerChild}>{children}</div>
)