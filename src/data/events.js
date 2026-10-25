// Events data. Set `tbd: true` when the date is not yet confirmed;
// EventCard will display "Date to be confirmed" and sorting pushes the
// item to the end of the upcoming list.
//
// Media per event:
//   gallery:  [{ src: '/events/<slug>/<file>.jpg', alt: '…' }, …]
//   videos:   [{ type: 'youtube' | 'facebook' | 'file', url: '…', title?: '…' }]
// Leave either array empty to show the "Photos and videos coming soon"
// placeholder on the event detail page.
export const events = [
  // -------- Upcoming --------
  {
    id: 'annual-fundraising',
    title: 'Annual Fundraising',
    date: '2026-10-25',
    time: '9:00 AM',
    venue: 'Main Auditorium',
    summary:
      'Join us as we come together to resource the mission and ministries of the church.',
    ministrySlug: null,
    gallery: [],
    videos: []
  },
  {
    id: 'last-week-fasting-prayer',
    title: 'Last Week of Fasting and Prayers',
    date: null,
    tbd: true,
    time: '7:00 PM',
    venue: 'Main Auditorium',
    summary:
      'A dedicated week of corporate fasting and prayer to close out the year in His presence.',
    ministrySlug: null,
    gallery: [],
    videos: []
  },
  {
    id: 'highest-praise-angelic-voices',
    title: 'Highest Praise by the Angelic Voices',
    date: null,
    tbd: true,
    time: '7:00 PM',
    venue: 'Main Auditorium',
    summary:
      'An evening of praise, thanksgiving and ministration from our Angelic Voices.',
    ministrySlug: 'choir-and-music',
    gallery: [],
    videos: []
  },
  {
    id: 'childrens-fun-day-2026',
    title: "Children's Fun Day",
    date: '2026-12-26',
    time: 'All day',
    venue: "Children's Wing",
    summary:
      'A day of games, music, snacks and the Word for all our children, bring a friend!',
    ministrySlug: 'children',
    gallery: [],
    videos: []
  },

  // -------- Recent --------
  {
    id: 'youth-camp-week',
    title: 'Youth Camp Week',
    date: '2026-08-11',
    time: 'All week',
    venue: 'Aburi Retreat Centre',
    summary:
      'Five days of worship, teaching, friendship and adventure for our young people.',
    ministrySlug: 'youth',
    gallery: [],
    videos: []
  },
  {
    id: 'childrens-day-celebration',
    title: "Children's Day Celebration",
    date: '2026-05-30',
    time: '9:00 AM',
    venue: 'Main Auditorium',
    summary:
      'A joyful service dedicated to our children, games, prizes, songs and the Word.',
    ministrySlug: 'children',
    gallery: [],
    videos: []
  },
  {
    id: 'mens-week-celebration',
    title: "Men's Week Celebration",
    date: '2026-06-22',
    time: 'All week',
    venue: 'Main Auditorium',
    summary:
      'A week set apart to honour, equip and encourage the men of the house.',
    ministrySlug: 'men',
    gallery: [],
    videos: []
  }
]
