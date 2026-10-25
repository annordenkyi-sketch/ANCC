import { Link, useParams } from 'react-router-dom'
import NotFound from './NotFound.jsx'
import Gallery from '../components/Gallery.jsx'
import EventVideos from '../components/EventVideos.jsx'
import { events } from '../data/events.js'
import { formatDate } from '../utils/date.js'

export default function EventPage() {
  const { slug } = useParams()
  const event = events.find((e) => e.id === slug)
  if (!event) return <NotFound />

  const dateLabel = event.tbd || !event.date
    ? 'Date to be confirmed'
    : formatDate(event.date)

  const hasGallery = Array.isArray(event.gallery) && event.gallery.length > 0
  const hasVideos = Array.isArray(event.videos) && event.videos.length > 0

  return (
    <>
      <section className="welcome ministry-banner" aria-labelledby="ev-h">
        <div className="ministry-banner-glow" aria-hidden="true" />
        <div className="container">
          <span className="eyebrow">{event.tbd ? 'Coming soon' : 'Event'}</span>
          <h1 id="ev-h">{event.title}</h1>
          <span className="ministry-rule" aria-hidden="true" />
          <p className="ministry-tagline">{event.summary}</p>
        </div>
      </section>

      <nav className="container breadcrumb" aria-label="Breadcrumb">
        <Link to="/events">← Back to Events</Link>
      </nav>

      <section className="section section--tight">
        <div className="container">
          <div className="quick-facts" aria-label="Event details">
            <div className="qf-card">
              <div>
                <span className="qf-label">Date</span>
                <strong className="qf-value">{dateLabel}</strong>
              </div>
            </div>
            <div className="qf-card">
              <div>
                <span className="qf-label">Time</span>
                <strong className="qf-value">{event.time || 'TBA'}</strong>
              </div>
            </div>
            <div className="qf-card">
              <div>
                <span className="qf-label">Venue</span>
                <strong className="qf-value">{event.venue || 'TBA'}</strong>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section section--tight">
        <div className="container">
          <div className="m-section">
            <h2 className="m-heading">About this event</h2>
            <p className="m-about">{event.details || event.summary}</p>
          </div>

          {hasVideos && (
            <div className="m-section">
              <h2 className="m-heading">Videos</h2>
              <EventVideos items={event.videos} />
            </div>
          )}

          {hasGallery && (
            <div className="m-section">
              <h2 className="m-heading">Gallery</h2>
              <Gallery items={event.gallery} variant="masonry" pageSize={24} />
            </div>
          )}

          {!hasGallery && !hasVideos && (
            <div className="m-section">
              <div className="gallery gallery--empty" role="status">
                <p>Photos and videos coming soon.</p>
              </div>
            </div>
          )}
        </div>
      </section>

      <section className="section section--tight">
        <div className="container">
          <p className="page-tail-link">
            <Link to="/events">← Back to all events</Link>
          </p>
        </div>
      </section>
    </>
  )
}
