import { PageProps } from 'gatsby'

type PageType = 'season' | 'mail'

export type PageInfo = {
  title: string
  prevUrl?: string
  prevTitle?: string
  nextUrl?: string
  nextTitle?: string
}

export type PageTemplateType<D> = PageProps & {
  pageContext: {
    id: string
    type: PageType
    pageInfo: PageInfo
  }
  data: D
}
