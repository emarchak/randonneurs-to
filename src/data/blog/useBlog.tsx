

import { graphql, useStaticQuery } from 'gatsby'
import { useMemo } from 'react'

export type Post = {
  title: string
  link: string
  content: string
  teaser: string
}


export const useBlog = ({ limit }) => {
  const { allFeedblog: { nodes } } = useStaticQuery(graphql`
    query {
      allFeedblog(limit: 10) {
        nodes {
          title
          link
          content {
            encodedSnippet
          }
        }
      }
    }
  `)

  const posts = useMemo(() => nodes.slice(0, limit).map(node => ({
    title: node.title,
    link: node.link,
    content: node.content.encodedSnippet,
    teaser: node.content.encodedSnippet.substring(0, 600) + '...',
  })), [nodes, limit])

  return ({ posts })
}
