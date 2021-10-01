import React from 'react'
import { LinkButton } from "src/components/Buttons"
import { ContentChild, ContentWrapper } from "src/components/content-wrapper"
import { PageInfo } from '../types'

type PaginationProps = {
  pageInfo: PageInfo
}

export const Pagination = ({pageInfo: {prevTitle, prevUrl, nextTitle, nextUrl}}:PaginationProps) => (
  <ContentWrapper container>
    <ContentChild>
      {prevUrl && <LinkButton primary block to={`/${prevUrl}`}>{prevTitle}</LinkButton>}
    </ContentChild>
    <ContentChild>
      {nextUrl && <LinkButton primary block to={`/${nextUrl}`}>{nextTitle}</LinkButton>}
    </ContentChild>
  </ContentWrapper>
)
