import React from "react"

import styles from "./styles/layout.module.scss"

export const Footer = () => (
  <footer className={styles.footer}>
    <div className={styles.content}>
      <span aria-label={"Copyleft"} className={styles.copyleft}>
        ©
      </span>{" "}
      {new Date().getFullYear()}, Built with {` `}
      <a href="https://www.gatsbyjs.org">Gatsby</a>
    </div>
  </footer>
)
