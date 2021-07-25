import React from 'react'
import { Post } from "src/data/blog"
import { LinkButton } from '../buttons'


type PostTeaserProps = {
  post: Post,
}

export const PostTeaser = ({post}: PostTeaserProps) => {

  return (
  <article>
    <h3>{post.title}</h3>
    <p>
      {post.teaser}
      <br/>
    </p>
    <LinkButton secondary block small href={post.link}><>
      Continue reading
    </></LinkButton>

  </article>
  )
}
