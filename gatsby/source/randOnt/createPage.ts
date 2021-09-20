import { GatsbyNode } from 'gatsby'
import { resolve } from 'path'
import { nodeType } from '.'

const buildSeasonPath = season => ['season', season.fieldValue].join('/')

export const createPages: GatsbyNode['createPages'] = async ({ graphql, actions }) => {
  const { createPage } = actions

  const result = await graphql(`
  query {
    allEvent(filter: {chapter: {eq: "Toronto"}}) {
      group(field: season) {
        fieldValue
        nodes {
          chapter
          date
          date
          distance
          eventType
          route
          rwgpsId
          rwgpsUrl
          scheduleId
          startLocation
        }
      }
    }
  }`)

  if (result.errors) {
    console.error(result.errors)
    return
  }

  const {allEvent: {group: seasons}} = result.data as any

  seasons.forEach((season, i) => {
    createPage({
      path: buildSeasonPath(season),
      component: resolve('src/templates/Season.tsx'),
      context: {
        year: season.fieldValue,
        events: season.nodes,
        pageInfo: {
          title: season.fieldValue,
          prevUrl: i === 0 ? null : buildSeasonPath(seasons[i - 1]),
          prevTitle: seasons[i - 1]?.fieldValue,
          nextUrl: i === seasons.length - 1 ? null : buildSeasonPath(seasons[i + 1]),
          nextTitle: seasons[i + 1]?.fieldValue,
        }
      },
    })
  })
}
