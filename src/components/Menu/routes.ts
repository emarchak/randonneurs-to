export const shop = [
  { label: 'Club audax à distance', route: '/shop/audax-a-distance/' },
]

export const seasons = [
  { label: '2021', route: '/seasons/2021/' },
  { label: '2020', route: '/seasons/2020/' },
  { label: '2019', route: '/seasons/2019/' },
  { label: 'Archive', route: '/seasons/' }
]

export const registration = [
  { label: 'Membership', description: 'Become a member', route: '/registration/membership/' },
  { label: 'Rides', description: 'Scheduled rides', route: '/registration/' },
  { label: 'Permanents', route: '/registration/permanent/' },
  { label: 'Trace', description: 'Trace Virtuelle',  route: '/registration/trace-virtuelle/' },
]

export const loneliness = [
  { label: 'Club', route: '/loneliness/' },
  { label: 'Shop', route: '/shop/audax-a-distance/' },
  { label: 'Trace', route: '/registration/trace-virtuelle/' },
]

export default {
  registration,
  seasons,
  loneliness,
  shop
}