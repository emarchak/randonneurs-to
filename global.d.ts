declare module "*.module.scss" {
  const content: { [className: string]: string }
  export default content;
}

declare module "*.svg" {
  export const content: React.ReactType
}

declare namespace NodeJS {
  export interface Global {
    fetch: any
  }
}
