import { Link } from 'gatsby'
import React from 'react'
import { ContentWrapper } from './content-wrapper'
import styles from './styles/layout.module.scss'

type Props = {
  siteTitle: string
}

export const Header = ({ siteTitle = '' }: Props) => (
  <header
    className={styles.header}
  >
    <ContentWrapper
    >
      <h1 className={styles.headerTitle}>
        <Link
          to='/'
          className={styles.headerLink}
        >
          {siteTitle}
        </Link>
      </h1>
    </ContentWrapper>
  </header>
)

