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
      <h1 className={styles.headerTitle} style={{ margin: 0 }}>
        <Link
          to='/'
          className={styles.headerLink}
          style={{
            color: '#333',
            textDecoration: 'none',
            borderBottomWidth: 0
          }}
        >
          {siteTitle}
        </Link>
      </h1>
    </ContentWrapper>
  </header>
)

