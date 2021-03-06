declare module "*.svg" {
  export const content: React.ElementType
}

declare namespace NodeJS {
  export interface Global {
    fetch: any
  }
}
