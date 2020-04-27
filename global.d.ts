declare module "*.scss" {
  const content: { [className: string]: string }
  export = content
}

declare module "*.module.scss" {
  const content: { [className: string]: string }
  export = content
}
declare module "*.svg" {
  const content: React.ReactType
  export = content
}

declare namespace NodeJS {
  export interface Global {
    fetch: any
  }
}
