declare module "*.svg" {
  export const content: React.ElementType
}

declare module '*.scss' {
  const content: { [className: string]: string }
  export = content
}

declare module '*.gql' {
  const content: string
  export = content
}

declare namespace NodeJS {
  export interface Global {
    fetch: any
  }
  export interface Window {
    gtag: any
  }
}
