import React from "react"
import * as styles from "./styles/layout.module.scss"
import { Link } from "./Link"

const CopyLeft = () => (
  <span aria-label={"Copyleft"} className={styles.copyleft}>
    ©
  </span>
)

export const Footer = () => (
  <footer className={styles.footer}>
    <div className={styles.content}>
      <CopyLeft /> {new Date().getFullYear()}{', '}
      Built with {' '} <Link href="https://www.gatsbyjs.org">Gatsby</Link>{', '}
      hosted on {' '} <Link href="https://github.com/emarchak/randonneurs-to">Github</Link>{', '}
      and deployed by {' '}<Link href="netlify.com/">Netlify</Link>
    </div>
  </footer>
)
