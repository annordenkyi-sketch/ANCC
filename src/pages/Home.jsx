import { Link } from 'react-router-dom'
import WelcomeBanner from '../components/WelcomeBanner.jsx'
import ThemeStrip from '../components/ThemeStrip.jsx'
import LiveBar from '../components/LiveBar.jsx'
import ServiceInfo from '../components/ServiceInfo.jsx'
import SermonCard from '../components/SermonCard.jsx'
import EventCard from '../components/EventCard.jsx'
import MinistryCard from '../components/MinistryCard.jsx'
import Announcement from '../components/Announcement.jsx'
import GivingPrompt from '../components/GivingPrompt.jsx'
import { sermons } from '../data/sermons.js'
import { events } from '../data/events.js'
import { ministries } from '../data/ministries.js'
import { announcements } from '../data/announcements.js'
import { isUpcoming, sortByDateAsc } from '../utils/date.js'

export default function Home() {
  const upcoming = sortByDateAsc(events.filter((e) => isUpcoming(e))).slice(0, 3)
  const previewMinistries = ministries.slice(0, 3)

  return (
    <>
      <WelcomeBanner />
      <ThemeStrip />
      <LiveBar />
      <ServiceInfo />

      <section className="section section--cream" aria-labelledby="sermon-h">
        <div className="container">
          <div className="section-head">
            <div>
              <h2 id="sermon-h">Latest sermon</h2>
              <p>Catch up on what God is saying to the house.</p>
            </div>
            <span className="meta">Media centre coming soon</span>
          </div>
          <SermonCard sermon={sermons[0]} />
        </div>
      </section>

      <section className="section" aria-labelledby="events-h">
        <div className="container">
          <div className="section-head">
            <div>
              <h2 id="events-h">Upcoming events</h2>
              <p>Mark your calendar and bring a friend.</p>
            </div>
            <Link to="/events" className="btn btn--outline">All events</Link>
          </div>
          <div className="grid grid--3">
            {upcoming.length > 0
              ? upcoming.map((e) => <EventCard key={e.id} event={e} />)
              : <p className="meta">No upcoming events — check back soon.</p>}
          </div>
        </div>
      </section>

      <section className="section section--cream" aria-labelledby="min-h">
        <div className="container">
          <div className="section-head">
            <div>
              <h2 id="min-h">Find your people</h2>
              <p>Ministries for every season of life.</p>
            </div>
            <Link to="/ministries" className="btn btn--outline">All ministries</Link>
          </div>
          <div className="grid grid--3">
            {previewMinistries.map((m) => (
              <MinistryCard key={m.slug} ministry={m} />
            ))}
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="ann-h">
        <div className="container">
          <div className="section-head">
            <div>
              <h2 id="ann-h">Announcements</h2>
              <p>This week at All Nations.</p>
            </div>
          </div>
          {announcements.length === 0 ? (
            <p className="meta">No announcements at the moment-check back soon.</p>
          ) : (
            <div className="grid grid--2">
              {announcements.map((a) => (
                <Announcement key={a.id} item={a} />
              ))}
            </div>
          )}
        </div>
      </section>

      <GivingPrompt />
    </>
  )
}
