declare module "*.svg" {
  export const content: React.ElementType
}

declare namespace NodeJS {
  export interface Global {
    fetch: any
  }
}

declare module '*.graphql' {
  import { DocumentNode } from 'graphql'
  const Schema: DocumentNode

  export = Schema
}