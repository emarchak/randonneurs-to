gitimport { GatsbyNode } from "gatsby"

export const createPageSchemaCustomization: GatsbyNode['createSchemaCustomization'] = ({ actions: { createTypes } }) => {
  createTypes(`
    enum PageType {
      season
      mail
    }
    type SitePageContext {
      type: PageType
      id: String
      pageInfo: PageInfo
    }
    type SitePage implements Node {
      context: SitePageContext
    }
  `)
}
