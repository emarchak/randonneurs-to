declare module "*.svg" {
  export const content: React.ReactType
}

declare namespace NodeJS {
  export interface Global {
    fetch: any
  }
}
