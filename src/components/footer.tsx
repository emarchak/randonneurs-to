import React from "react"

import styles from "./styles/layout.module.scss"

const CopyLeft = () => (
  <span aria-label={"Copyleft"} className={styles.copyleft}>
    ©
  </span>
)

export const Footer = () => (
  <footer className={styles.footer}>
    <div className={styles.content}>
      <CopyLeft /> {new Date().getFullYear()}{', '}
      Built with {' '} <a href="https://www.gatsbyjs.org">Gatsby</a>{', '}
      hosted on {' '} <a href="https://github.com/emarchak/randonneurs-to">Github</a>{', '}
      and deployed by {' '}<a href="netlify.com/">Netlify</a>
    </div>
  </footer>
)
