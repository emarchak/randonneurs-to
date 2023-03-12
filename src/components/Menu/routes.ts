export type MenuRoute = {
  label: string,
  route: string,
  description?: string,
  external?: boolean
}

export const shop: MenuRoute[] = [
  { label: 'Brevet medals', route: '/shop/medals/' },
  { label: 'Club audax à distance', route: '/shop/audax-a-distance/' },
]

export const seasons: MenuRoute[] = [
  { label: '2023', route: '/event/2023/' },
  { label: '2022', route: '/event/2022/' },
  { label: '2021', route: '/event/2021/' },
  { label: 'Archive', route: '/event/' }
]

export const registration: MenuRoute[] = [
  { label: 'Membership', description: 'Become a member', route: 'https://register.randonneursontario.ca/registration/membership/', external: true },
  { label: 'Rides', description: 'Scheduled rides', route: 'https://register.randonneursontario.ca/registration/', external: true },
  { label: 'Permanents', route: 'https://register.randonneursontario.ca/registration/permanent/', external: true },
  { label: 'Trace', description: 'Trace Virtuelle', route: 'https://register.randonneursontario.ca/registration/trace-virtuelle/', external: true },
]

export const loneliness: MenuRoute[] = [
  { label: 'Club', route: '/loneliness/' },
  { label: 'Shop', route: '/shop/audax-a-distance/' },
  { label: 'Trace', route: 'https://register.randonneursontario.ca/registration/trace-virtuelle/', external: true },
]

export const symposium: MenuRoute[] = [
  { label: '2020', description: '2020 Virtual Symposium', route: '/symposium/2020' },
  { label: '2021', description: '2021 Virtual Symposium', route: '/symposium/2021' },
]

export default {
  symposium,
  registration,
  seasons,
  loneliness,
  shop
}
