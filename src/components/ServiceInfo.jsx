import { site } from '../data/site.js'

export default function ServiceInfo() {
  const mapsHref =
    site.address.mapsUrl ||
    `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
      site.address.mapsQuery
    )}`
  return (
    <section className="section service-info" aria-labelledby="svc-h">
      <div className="container">
        <div className="section-head">
          <div>
            <h2 id="svc-h">Service times & location</h2>
            <p>Join us in person this week. All are welcome.</p>
          </div>
          <a className="btn btn--outline" href={mapsHref} target="_blank" rel="noreferrer">
            Get directions
          </a>
        </div>
        <div className="grid">
          <div className="card">
            <div className="times">
              {site.serviceTimes.map((s) => (
                <div className="time-row" key={s.label}>
                  <strong>{s.label}</strong>
                  <span>{s.time}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="card">
            <h3>Find us</h3>
            <p className="meta">
              {site.address.line1}
              {(site.address.city || site.address.country) && (
                <>
                  <br />
                  {[site.address.city, site.address.country].filter(Boolean).join(', ')}
                </>
              )}
            </p>
            <p className="meta">
              <a href={`tel:${site.phone.replace(/\s/g, '')}`}>{site.phone}</a>
              <br />
              <a href={`mailto:${site.email}`}>{site.email}</a>
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
