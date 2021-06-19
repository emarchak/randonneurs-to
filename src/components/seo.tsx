
import React from "react"
import Helmet from "react-helmet"
import { IGatsbyImageData } from "gatsby-plugin-image"
import { useSiteMetadata } from "../hooks/use-site-metadata"

type meta = { property: string; content: any; name?: any }

type Props = {
  description?: string
  lang?: string
  meta?: meta[]
  image?: IGatsbyImageData,
  title: string
}

const getImage = (image: IGatsbyImageData) => image.images.fallback.src

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
        content: `${siteMetadata.siteURL}${getImage(image)}`,
      },
      {
        property: "twitter:image",
        content: `${siteMetadata.siteURL}${getImage(image)}`,
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
