import { GatsbyNode } from "gatsby"

export const createSchemaCustomization:GatsbyNode['createSchemaCustomization'] = ({ actions }) => {
  const { createTypes } = actions
  createTypes(`
    enum Chapter {
        Toronto
        Huron
        Ottawa
        Simcoe
    }
    enum RideType {
        brevet
        permanent
        fleche
        populaire
    }
    type Event implements Node {
        rwgpsId: Int
        chapter: Chapter
        eventType: RideType
    }
  `)
}
