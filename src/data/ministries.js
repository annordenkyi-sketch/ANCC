// Ministries data. One record per ministry; `group` controls grouping on the
// Ministries page and in the header dropdown. `joinable: false` swaps the
// join form for a contact option (used by the committee group).
export const ministryGroups = [
  { id: 'fellowship', label: 'Fellowship groups' },
  { id: 'service', label: 'Service teams' },
  { id: 'committee', label: 'Committees' }
]

export const ministries = [
  // --- Fellowship groups ---
  {
    slug: 'women',
    name: "Women's Fellowship",
    group: 'fellowship',
    tagline: 'Sisters growing in grace, courage and purpose.',
    quickFacts: {
      meetingTime: 'Saturdays, 4:00 PM',
      venue: 'Fellowship Hall',
      leader: 'Mrs. Abena Mensah'
    },
    about:
      "The Women's Fellowship is a sisterhood of prayer, mentorship and service. We meet weekly for bible study, share life together and lead outreach to mothers and widows in Kaneshie.",
    leaders: [
      { name: 'Abena Mensah', role: 'Coordinator' },
      { name: 'Grace Owusu', role: 'Prayer Lead' },
      { name: 'Linda Boateng', role: 'Outreach' }
    ],
    schedule: [
      { day: 'Saturday', activity: 'Weekly fellowship', time: '4:00 PM' },
      { day: 'Last Sunday', activity: "Women's Sunday", time: 'After service' }
    ],
    joinable: true
  },
  {
    slug: 'men',
    name: "Men's Fellowship",
    group: 'fellowship',
    tagline: 'Men standing together as husbands, fathers and leaders.',
    quickFacts: {
      meetingTime: 'Saturdays, 6:00 AM',
      venue: 'Church Auditorium',
      leader: 'Mr. Kwame Asare'
    },
    about:
      "A brotherhood committed to spiritual growth, accountability and practical leadership at home, work and in the community.",
    leaders: [
      { name: 'Kwame Asare', role: 'Coordinator' },
      { name: 'Daniel Addo', role: 'Discipleship' }
    ],
    schedule: [],
    coverImage: '/men/men-cover.jpg',
    coverImageAlt: "Men's Fellowship members gathered at a celebration",
    coverImagePosition: 'center 25%',
    joinable: true
  },
  {
    slug: 'youth',
    name: 'Youth Ministry',
    group: 'fellowship',
    tagline: 'Teens and young adults chasing Jesus together.',
    quickFacts: {
      meetingTime: 'First or second Saturday of every month',
      venue: 'Main Auditorium',
      leader: 'Pastor Eric Fordjor'
    },
    about:
      '',
    leaders: [
      { name: 'Pastor Eric Fordjor', role: 'Youth Pastor' },
      { name: 'Kelvin Dogbe', role: 'Youth President' },
      { name: 'David', role: 'Organizing Secretary' }
    ],
    schedule: [
      { day: 'Every first or second Saturday of every month', activity: '', time: '' }
    ],
    latestMedia: [],
    coverImage: '/youth/youth-cover.jpg',
    coverImageAlt: 'Youth ministry gathered for a group photo',
    gallery: [
      { src: '/youth/youth-04.jpg', alt: 'Youth members smiling together after service' },
      { src: '/youth/youth-05.jpg', alt: 'Youth members celebrating with peace signs' },
      { src: '/youth/youth-06.jpg', alt: 'Youth members having fun on stage' },
      { src: '/youth/youth-01.jpg', alt: 'Young worshipper during a youth service' },
      { src: '/youth/youth-02.jpg', alt: 'Youth member listening attentively' },
      { src: '/youth/youth-03.jpg', alt: 'Two youth members smiling for the camera' },
      { src: '/youth/youth-07.jpg', alt: 'Youth member on his phone after service' }
    ],
    joinable: true
  },
  {
    slug: 'children',
    name: "Children's Ministry",
    group: 'fellowship',
    tagline: 'Where every child meets the love of Jesus.',
    quickFacts: {
      meetingTime: 'Sundays, 9:00 AM',
      venue: "Children's Ministry Hall",
      leader: 'Mr Erasmus Okine'
    },
    about:
      "A place where children can learn about God's love through play, music and age-appropriate teachings.",
    leadersHeading: 'Teachers',
    leaders: [],
    // Simple photo gallery under the Teachers heading — no names or roles.
    // Add more entries by dropping files into public/children/teachers/.
    teachersGallery: [
      { src: '/children/teachers/teachers-01.jpg', alt: "Children's Ministry teachers" },
      { src: '/children/teachers/teachers-02.jpg', alt: "Children's Ministry teachers" }
    ],
    schedule: [
      { day: 'Sunday', activity: 'Sunday school', time: '9:00 AM' },
      { day: '26 December 2026', activity: "Children's Fun Day", time: 'All day' }
    ],
    latestMedia: [],
    coverImage: '/children/children-cover.jpg',
    coverImageAlt: 'Children and youth clapping and worshipping together',
    coverImagePosition: 'center 35%',
    // Children's Ministry activity gallery.
    gallery: [
      { src: '/children/gallery/cm-01.jpg', alt: 'Children in traditional Ghanaian attire with crowns during a Children\'s Ministry presentation' },
      { src: '/children/gallery/cm-02.jpg', alt: "Children's Ministry activity — young speakers presenting at the altar" },
      { src: '/children/gallery/cm-03.jpg', alt: "Children's Ministry activity — a young girl giving a speech at the pulpit" },
      { src: '/children/gallery/cm-04.jpg', alt: "Children's Ministry activity — a youth in judge's robes speaking during a mock trial" },
      { src: '/children/gallery/cm-05.jpg', alt: "Children's Ministry activity — a youth presentation during a mock court scene" },
      { src: '/children/gallery/cm-06.jpg', alt: "Children's Ministry activity — a mock court scene with young participants" },
      { src: '/children/gallery/cm-07.jpg', alt: "Children's Ministry activity — youth dancing joyfully together" },
      { src: '/children/gallery/cm-08.jpg', alt: "Children's Ministry activity — two boys dancing enthusiastically" },
      { src: '/children/gallery/cm-09.jpg', alt: "Children's Ministry activity — leaders ministering from the stage" },
      { src: '/children/gallery/cm-10.jpg', alt: "Children's Ministry activity — a young worship leader with the children's choir" },
      { src: '/children/gallery/cm-11.jpg', alt: "Children's Ministry activity — a church member recording the event" },
      { src: '/children/gallery/cm-12.jpg', alt: "Children's Ministry activity — young children in colourful attire during a service" }
    ],
    joinable: true
  },

  // --- Service teams ---
  {
    slug: 'choir-and-music',
    name: 'Choir & Music',
    group: 'service',
    tagline: 'Leading the church into the presence of God.',
    quickFacts: {
      meetingTime: 'Thursdays, 6:30 PM',
      venue: 'Auditorium',
      leader: 'Minister Yaw Darko'
    },
    about:
      'Singers and instrumentalists serving every Sunday and midweek. Auditions are open twice a year.',
    leaders: [
      { name: 'Yaw Darko', role: 'Music Director' },
      { name: 'Ama Nyarko', role: 'Choir Lead' }
    ],
    schedule: [
      { day: 'Sunday', activity: 'Rehearsal (after service)', time: '12:00 PM – 1:20 PM' }
    ],
    latestMedia: [],
    joinable: true
  },
  {
    slug: 'ushering',
    name: 'Ushering',
    group: 'service',
    tagline: 'The welcoming face of our Sunday.',
    quickFacts: {
      meetingTime: 'Sundays, 7:30 AM',
      venue: 'Main Entrance',
      leader: 'Mr. Isaac Tagoe'
    },
    about:
      'Ushers greet guests, seat the congregation, manage offering and keep services flowing smoothly.',
    leaders: [
      { name: 'Isaac Tagoe', role: 'Head Usher' },
      { name: 'Patience Mensah', role: 'Guest Care' }
    ],
    schedule: [
      { day: 'Sunday', activity: 'Pre-service brief', time: '7:30 AM' },
      { day: 'Monthly', activity: 'Training', time: 'First Saturday 9 AM' }
    ],
    joinable: true
  },
  {
    slug: 'media-team',
    name: 'Media Team',
    group: 'service',
    tagline: 'Capturing the message, telling the story.',
    coverImage: '/media-team/media-team-cover-src-1600.jpg',
    coverImageAlt: 'Media Team members in branded t-shirts smiling together',
    coverImagePosition: 'center 35%',
    coverImageSrcSet: {
      webp: '/media-team/media-team-cover-src-480.webp 480w, /media-team/media-team-cover-src-960.webp 960w, /media-team/media-team-cover-src-1600.webp 1600w',
      jpeg: '/media-team/media-team-cover-src-480.jpg 480w, /media-team/media-team-cover-src-960.jpg 960w, /media-team/media-team-cover-src-1600.jpg 1600w',
      sizes: '100vw',
      width: 1600,
      height: 1067
    },
    coverImageLqipKey: 'mediaTeam',
    quickFacts: {
      meetingTime: 'Saturdays, 11:00 AM',
      venue: 'Media Room',
      leader: 'Edward Alan Wealth'
    },
    about:
      'Sound, projection, livestream, photography and social media volunteers.',
    leadersHeading: 'Meet the Media Team',
    // Placeholders — replace `name` and set `image` to a file in
    // public/media-team/members/ once the real photos arrive.
    leaders: [
      { name: 'Kojo Appiah', role: 'Media Director', image: '', imageAlt: '' },
      { name: 'Team member', role: 'Camera', image: '', imageAlt: '' },
      { name: 'Team member', role: 'Sound', image: '', imageAlt: '' },
      { name: 'Team member', role: 'Livestream', image: '', imageAlt: '' },
      { name: 'Team member', role: 'Graphics', image: '', imageAlt: '' },
      { name: 'Nana Yaa', role: 'Social Media', image: '', imageAlt: '' }
    ],
    schedule: [
      { day: 'Saturday', activity: 'Prep & training', time: '11:00 AM' },
      { day: 'Sunday', activity: 'Service support', time: '7:30 AM' }
    ],
    joinable: true
  },
  // --- Committees ---
  {
    slug: 'social-service',
    name: 'Social Service Committee',
    group: 'committee',
    tagline: 'Caring for the vulnerable in our community.',
    quickFacts: {
      meetingTime: 'Second Saturday, 10:00 AM',
      venue: 'Conference Room',
      leader: 'Deacon Samuel Nti'
    },
    about:
      'We help members and their families when a need comes up — whether that is sickness, loss or hardship.',
    services: [
      { title: 'Benevolence', description: 'Help for members going through financial difficulty. Requests are kept private.' },
      { title: 'Hospital visitation', description: 'We visit members who are sick at home or in the hospital.' },
      { title: 'Bereavement support', description: 'Prayer and practical support for families who have lost a loved one.' },
      { title: 'Community outreach', description: 'Outreach projects every quarter to serve the Kaneshie community.' }
    ],
    leadersHeading: 'Committee members',
    leaders: [
      { name: 'Samuel Nti', role: 'Chair' },
      { name: 'Beatrice Owusu', role: 'Secretary' },
      { name: 'Richard Danso', role: 'Treasurer' }
    ],
    hideQuickFacts: true,
    joinable: false,
    contactEmail: 'social-service@allnationscc.org'
  }
]
