import { Link } from 'react-router-dom'
import { formatDate } from '../utils/date.js'

export default function EventCard({ event }) {
  const dateLabel = event.tbd || !event.date
    ? 'Date to be confirmed'
    : formatDate(event.date)
  return (
    <Link
      to={`/events/${event.id}`}
      className="card card--link event-card"
      aria-label={`Open event: ${event.title}`}
    >
      <span className="tag">{event.tbd ? 'Coming soon' : 'Event'}</span>
      <h3>{event.title}</h3>
      <p className="meta">
        {dateLabel}
        {event.time ? ` · ${event.time}` : ''}
        <br />
        {event.venue}
      </p>
      <p>{event.summary}</p>
      <span className="event-card-cta" aria-hidden="true">View details →</span>
    </Link>
  )
}
