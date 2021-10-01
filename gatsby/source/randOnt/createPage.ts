import { GatsbyNode } from 'gatsby'
import { resolve } from 'path'
import { nodeType } from '.'

const buildSeasonPath = season => ['seasons', season.fieldValue].join('/')

export const createPages: GatsbyNode['createPages'] = async ({ graphql, actions }) => {
  const { createPage } = actions

  const result = await graphql(`
  query {
    allEvent(filter: {chapter: {eq: Toronto}}) {
      group(field: season) {
        fieldValue
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
        id: season.fieldValue,
        type: nodeType,
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
