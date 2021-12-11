import { GatsbyNode } from "gatsby"

export const createSchemaCustomization:GatsbyNode['createSchemaCustomization'] = ({ actions: { createTypes } }) => {
  createTypes(`
    enum Membership {
      Individual
      Family
      Trial
    }

    type rider implements Node {
      membership: Membership
    }
  `)
}
