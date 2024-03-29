
import React from "react"
import { IGatsbyImageData } from "gatsby-plugin-image"
import { graphql, useStaticQuery } from "gatsby"

type meta = { property: string; content: any; name?: any }

type Props = {
  description?: string
  lang?: string
  meta?: meta[]
  image?: IGatsbyImageData,
  title?: string
}

const getImage = (image: IGatsbyImageData) => image.images.fallback.src

export const SEO = ({
  description = "",
  meta = [],
  image,
  title,
}: Props) => {
  const { site: {siteMetadata} } = useStaticQuery(
    graphql`
      query seoImageQuery {
        site {
          siteMetadata {
            title
            description
            siteURL
          }
        }
      }
    `
  )

  const metaDescription = description + ' ' + siteMetadata.description
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
    const pageMeta = [
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
    ].concat(meta)
  return (
    <>
      <title>{title ? `${title} | ${siteMetadata.title}` : siteMetadata.title}</title>
      {pageMeta.map((meta, i) => (<meta key={`${i}-${meta.name}`} id={meta.name} {...meta} />))}
    </>
  )
}
