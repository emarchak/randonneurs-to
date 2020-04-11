/**
 * SEO component that queries for data with
 *  Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import Helmet from "react-helmet"
import { useStaticQuery, graphql } from "gatsby"
import { useSiteMetadata } from "../hooks/use-site-metadata"

type meta = { property: string; content: any; name?: any }

type Props = {
  description?: string
  lang?: string
  meta?: meta[]
  image?: string
  title: string
}

export const SEO = ({
  description = "",
  lang = "en",
  meta = [],
  image,
  title,
}: Props) => {
  const siteMetadata = useSiteMetadata()

  const metaDescription = description || siteMetadata.description
  const metaImage: meta[] = image
    ? [
        {
          property: "og:image",
          content: `${siteMetadata.siteURL}${image}`,
        },
        {
          property: "twitter:image",
          content: `${siteMetadata.siteURL}${image}`,
        },
      ]
    : []

  return (
    <Helmet
      htmlAttributes={{
        lang,
      }}
      title={title}
      titleTemplate={`%s | ${siteMetadata.title}`}
      meta={[
        {
          name: "description",
          content: metaDescription,
        },
        {
          property: "og:title",
          content: title,
        },
        {
          property: "og:description",
          content: metaDescription,
        },
        {
          property: "og:type",
          content: "website",
        },
        {
          name: "twitter:card",
          content: "summary",
        },
        {
          name: "twitter:title",
          content: title,
        },
        {
          name: "twitter:description",
          content: metaDescription,
        },
        ...metaImage,
      ].concat(meta)}
    />
  )
}
