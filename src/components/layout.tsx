/**
 * Layout component that queries for data
 * with Gatsby's StaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/static-query/
 */

import React from "react";
import {Header} from "./header";
import {Footer} from "./footer";
import {StaticQuery, graphql} from "gatsby";

import styles from './styles/layout.module.scss';
import "./styles/index.scss";


type Props = {
  children: React.ReactNode;
}

export const Layout = ({children}: Props) => (
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
      <>
        <div
          className={styles.mainContent}
        >
          <Header siteTitle={data.site.siteMetadata.title} />
          <main>{children}</main>
        </div>
        <Footer />
      </>
    )}
  />
);
