export const shop = [
  { label: 'Brevet medals', route: '/shop/medals/' },
  { label: 'Club audax à distance', route: '/shop/audax-a-distance/' },
]

export const seasons = [
  { label: '2023', route: '/event/2023/' },
  { label: '2022', route: '/event/2022/' },
  { label: '2021', route: '/event/2021/' },
  { label: 'Archive', route: '/event/' }
]

export const registration = [
  { label: 'Membership', description: 'Become a member', route: '/registration/membership/' },
  { label: 'Rides', description: 'Scheduled rides', route: '/registration/' },
  { label: 'Permanents', route: '/registration/permanent/' },
  { label: 'Trace', description: 'Trace Virtuelle', route: '/registration/trace-virtuelle/' },
]

export const loneliness = [
  { label: 'Club', route: '/loneliness/' },
  { label: 'Shop', route: '/shop/audax-a-distance/' },
  { label: 'Trace', route: '/registration/trace-virtuelle/' },
]

export const symposium = [
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
