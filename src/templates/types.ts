type PageInfo = {
  title: string
  prevUrl?: string
  prevTitle?: string
  nextUrl?: string
  nextTitle?: string
}

export type PageTemplateType<T> = {
  pageContext: T & {
    pageInfo: PageInfo
  }

}
