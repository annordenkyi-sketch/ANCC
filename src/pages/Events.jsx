import EventCard from '../components/EventCard.jsx'
import { events } from '../data/events.js'
import { isUpcoming, sortByDateAsc } from '../utils/date.js'

export default function Events() {
  const upcoming = sortByDateAsc(events.filter((e) => isUpcoming(e)))
  const past = sortByDateAsc(events.filter((e) => !isUpcoming(e))).reverse()

  return (
    <>
      <section className="welcome ministry-banner" aria-labelledby="ev-h">
        <div className="ministry-banner-glow" aria-hidden="true" />
        <div className="container">
          <span className="eyebrow">What's on</span>
          <h1 id="ev-h">Events</h1>
          <span className="ministry-rule" aria-hidden="true" />
          <p className="ministry-tagline">
            Conferences, outreach, retreats and family gatherings — see what's
            coming up and join us.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <h2 className="m-heading">Upcoming</h2>
          {upcoming.length === 0 ? (
            <p className="meta">No upcoming events yet. Watch this space.</p>
          ) : (
            <div className="grid grid--3">
              {upcoming.map((e) => (
                <EventCard key={e.id} event={e} />
              ))}
            </div>
          )}
        </div>
      </section>

      {past.length > 0 && (
        <section className="section section--cream">
          <div className="container">
            <h2 className="m-heading">Recent</h2>
            <div className="grid grid--3">
              {past.map((e) => (
                <EventCard key={e.id} event={e} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  )
}
