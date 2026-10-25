// Shared site content. CMS can replace fields here one-to-one.
export const site = {
  name: 'All Nations Christian Center',
  shortName: 'All Nations',
  tagline: 'Where powerful word are shared.',
  address: {
    line1: 'All Nations Christian Center, Adjacent Accra Academy',
    city: '',
    country: '',
    // Exact share link to the church's pin on Google Maps. Takes precedence
    // over `mapsQuery` wherever a map link is rendered.
    mapsUrl: 'https://maps.app.goo.gl/PDJJXQEm5uHo2bkV8?g_st=ic',
    mapsQuery: 'All Nations Christian Center, Accra'
  },
  phone: '+233 00 000 0000',
  email: 'hello@allnationscc.org',
  social: {
    facebook: 'https://www.facebook.com/share/1dYxgjsjX4/?mibextid=wwXIfr',
    instagram: 'https://www.instagram.com/allnations_christiancenter?stkn=dHJka2R5NGl4MW1x&utm_source=qr',
    youtube: 'https://youtube.com/@allnationschristiancenter?si=r3THhuOuKTNpuloF',
    tiktok: 'https://www.tiktok.com/@ancc_official?_r=1&_t=ZS-9AMVHCk0D3c'
  },
  serviceTimes: [
    { label: 'Sunday Service', time: '8:30 AM – 11:30 AM' },
    { label: 'Monday Prayer Meeting', time: '6:30 PM – 8:30 PM' },
    { label: 'Thursday Teaching Service', time: '6:30 PM – 8:30 PM' }
  ],
  live: {
    // Schedule-based live detection. All times are Africa/Accra (local).
    // day: 0 = Sunday, 1 = Monday, …, 6 = Saturday.
    schedule: [
      { day: 0, start: '08:45', end: '11:30' } // Sunday service
    ],
    liveLabel: 'Sunday service is streaming now',
    liveUrl: 'https://youtube.com/@allnationschristiancenter/live',
    offlineLabel: 'Catch up on past services and messages.',
    offlineUrl: 'https://youtube.com/@allnationschristiancenter?si=r3THhuOuKTNpuloF'
  },
  theme: {
    year: 2026,
    title: 'Year of Honour',
    scripture: '1 Kings 3:13A',
    summary: ''
  },
  welcome: {
    eyebrow: 'Welcome home',
    heading: 'You are loved. You belong here.',
    body:
      'Whether you are visiting Accra or searching for a church family, All Nations is a place to grow in faith, build friendships, and serve the community.',
    cta: { label: 'Plan a visit', to: '/connect' },
    ctaSecondary: { label: 'Watch latest sermon', to: '/#sermon' }
  },
  giving: {
    heading: 'Partner with the mission',
    body:
      'Your generosity funds outreach, youth programs and the care of our community. Online giving is coming soon.',
    cta: { label: 'Learn about giving', to: '/connect#giving' }
  }
}
