import React from "react"

import * as styles from "./styles/layout.module.scss"

type ContentWrapperProps = {
  container?: boolean,
  children: React.ReactNode
}

export const ContentWrapper = ({ container = false, children }: ContentWrapperProps) => (
  <div className={`${styles.content} ${container ? styles.contentContainer : ''}`} > { children}</div>
)

type ContentContainerProps = {
  className?: string,
  children: React.ReactNode
}

export const ContentChild = ({ className = '', children }: ContentContainerProps) => (
  <div className={`${styles.contentContainerChild} ${className}`}>{children}</div>
)