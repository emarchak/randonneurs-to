/**
 * Layout component that queries for data
 * with Gatsby's StaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/static-query/
 */

import React, { useState } from "react"
import { Header } from "./header"
import { Footer } from "./footer"
import { graphql, useStaticQuery } from "gatsby"
import { Menu, MenuState, MenuTrigger, menuConfig } from "./Menu/Menu"

import "normalize.css"
import * as styles from "./styles/layout.module.scss"
import "./styles/index.scss"

const layoutQuery = graphql`
  query SiteTitleQuery {
    site {
      siteMetadata {
        title
      }
    }
  }
`

type Props = React.PropsWithChildren<{
  hideHeader?: boolean
}>

export const Layout = ({ hideHeader = false, children }: Props) => {
  const [menuOpen, setMenuState] = useState(false)
  const { site } = useStaticQuery(layoutQuery)

  const toggleMenu = () => {
    setMenuState(!menuOpen)
  }

  const handleMenuChange = (state: MenuState) => {
    setMenuState(state.isOpen)
  }

  return (
    <div id={menuConfig.outerContainerId}>
      <Menu isOpen={menuOpen} onMenuChange={handleMenuChange} />
      <div className={styles.mainWrapper} id={menuConfig.pageWrapId}>
        <MenuTrigger onTrigger={toggleMenu} />
        {!hideHeader && <Header siteTitle={site.siteMetadata.title} />}

        <main>{children}</main>
      </div>
      <Footer />
    </div>
  )
}
