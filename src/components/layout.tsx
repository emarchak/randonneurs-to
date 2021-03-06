/**
 * Layout component that queries for data
 * with Gatsby's StaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/static-query/
 */

import React, { useState } from "react"
import { Header } from "./header"
import { Footer } from "./footer"
import { StaticQuery, graphql } from "gatsby"
import { Menu, MenuState, MenuTrigger, menuConfig } from './menu'

// import "normalize.css"
import * as styles from './styles/layout.module.scss'
import "./styles/index.scss"

type Props = {
  children: React.ReactNode
}

export const Layout = ({ children }: Props) => {
  const [menuOpen, setMenuState] = useState(false)

  const toggleMenu = () => {
    setMenuState(!menuOpen)
  }

  const handleMenuChange = (state: MenuState) => {
    setMenuState(state.isOpen)
  }

  return (
    <StaticQuery
      query={graphql`
      query SiteTitleQuery {
        site {
          siteMetadata {
            title
          }
        }
      }
    `}
      render={(data) => (
        <div id={menuConfig.outerContainerId}>
          <Menu isOpen={menuOpen} onMenuChange={handleMenuChange} />
          <div
            className={styles.mainWraper}
            id={menuConfig.pageWrapId}
          >
            <MenuTrigger onTrigger={toggleMenu} />
            <Header siteTitle={data.site.siteMetadata.title} />

            <main
              className={styles.mainContent}>{children}</main>
          </div>
          <Footer />
        </div>
      )}
    />
  )
}
