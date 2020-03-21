import React from "react";

import styles from './styles/layout.module.scss';

export const Footer = () => (
  <footer
    className={styles.footer}
  >
    <div
      className={styles.content}
    >
    © {new Date().getFullYear()}, Built with {` `}
    <a href="https://www.gatsbyjs.org">Gatsby</a>
          
    </div>
  </footer>
);

