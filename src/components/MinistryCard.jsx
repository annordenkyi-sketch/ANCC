import { Link } from 'react-router-dom'

export default function MinistryCard({ ministry }) {
  return (
    <Link to={`/ministries/${ministry.slug}`} className="card card--link">
      <h3>{ministry.name}</h3>
      <p className="meta">{ministry.quickFacts.meetingTime}</p>
      <p>{ministry.tagline}</p>
      <span style={{ color: 'var(--gold-600)', fontWeight: 600 }}>
        Learn more →
      </span>
    </Link>
  )
}
