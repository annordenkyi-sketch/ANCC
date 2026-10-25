import { Link } from 'react-router-dom'
import { site } from '../data/site.js'

export default function GivingPrompt() {
  const g = site.giving
  return (
    <section className="giving" aria-labelledby="giving-h">
      <div className="container">
        <h2 id="giving-h">{g.heading}</h2>
        <p>{g.body}</p>
        <Link to={g.cta.to} className="btn btn--outline" style={{ borderColor: 'var(--navy)' }}>
          {g.cta.label}
        </Link>
      </div>
    </section>
  )
}
