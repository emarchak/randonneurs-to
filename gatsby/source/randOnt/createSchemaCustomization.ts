import { GatsbyNode } from "gatsby"

export const createSchemaCustomization: GatsbyNode['createSchemaCustomization'] = ({ actions }) => {
  const { createTypes } = actions
  createTypes(`
    enum Chapter {
        Club
        Toronto
        Huron
        Ottawa
        Simcoe
        Other
    }
    enum EventType {
        Brevet
        Permanent
        Fleche
        Populaire
        Other
    }
    type event implements Node {
        season: String
        rwgpsId: String
        chapter: Chapter
        eventType: EventType
    }
  `)
}
