import { GatsbyNode } from "gatsby"

export const createPageSchemaCustomization: GatsbyNode['createSchemaCustomization'] = ({ actions: { createTypes } }) => {
  createTypes(`
    enum PageType {
      season
      mail
    }
    type PageInfo {
      title: String
      prevUrl: String
      prevTitle: String
      nextUrl: String
      nextTitle: String
    }
    type SitePageContext {
      id: String
      type: PageType
      pageInfo: PageInfo
    }
    type SitePage implements Node {
      context: SitePageContext
    }
  `)
}
