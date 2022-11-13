import React from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import { GatsbyImage } from 'gatsby-plugin-image'
import { gallery, galleryTile } from '../styles/gallery.module.scss'

type GalleryProps = {}

const galleryQuery =  graphql`
query GalleryQuery {
  allFile(
    filter: {extension: {regex: "/(jpg|JPG|jpeg)/"}, relativeDirectory: {eq: "gallery"}}
    limit: 6
    sort: {birthTime: DESC}
  ) {
    nodes {
      name
      childImageSharp {
        gatsbyImageData(aspectRatio: 1, height: 300, formats: JPG)
      }
    }
  }
}
`

export const Gallery = ({}: GalleryProps) => {
  const { allFile: { nodes: images } } = useStaticQuery(galleryQuery)

  return (
    <div className={gallery}>
    {images.map(image => (
      <GatsbyImage
        className={galleryTile}
        key={image.name}
        image={image.childImageSharp.gatsbyImageData}
        alt={image.name}
      />
    ))}
  </div>
  )
}
