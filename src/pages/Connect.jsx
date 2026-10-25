import { useState } from 'react'
import ContactForm from '../components/ContactForm.jsx'
import VisitorConnectForm from '../components/VisitorConnectForm.jsx'
import { site } from '../data/site.js'
import { recipients } from '../data/recipients.js'

export default function Connect() {
  const [subject, setSubject] = useState('general')

  const mapsHref =
    site.address.mapsUrl ||
    `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
      site.address.mapsQuery
    )}`

  return (
    <>
      <section className="welcome ministry-banner" aria-labelledby="c-h">
        <div className="ministry-banner-glow" aria-hidden="true" />
        <div className="container">
          <span className="eyebrow">Connect</span>
          <h1 id="c-h">We'd love to hear from you</h1>
          <span className="ministry-rule" aria-hidden="true" />
          <p className="ministry-tagline">
            New here, need prayer, or just want to say hi? Pick what fits and
            we'll follow up personally.
          </p>
        </div>
      </section>

      <section className="section" aria-labelledby="ways-h">
        <div className="container">
          <h2 id="ways-h" className="sr-only">Ways to connect</h2>
          <div className="grid grid--3">
            <a href="#visit" className="card card--link connect-tile">
              <h3>Plan a visit</h3>
              <p>Let us know you're coming and we'll save a seat for you.</p>
              <span className="connect-cta">See service times →</span>
            </a>
            <button
              type="button"
              className="card card--link connect-tile"
              onClick={() => {
                setSubject('prayer')
                document.getElementById('message')?.scrollIntoView({
                  behavior: 'smooth'
                })
              }}
            >
              <h3>Prayer request</h3>
              <p>Share a need in confidence — our prayer team is standing by.</p>
              <span className="connect-cta">Send a request →</span>
            </button>
            <button
              type="button"
              className="card card--link connect-tile"
              onClick={() => {
                setSubject('general')
                document.getElementById('message')?.scrollIntoView({
                  behavior: 'smooth'
                })
              }}
            >
              <h3>Ask a question</h3>
              <p>Membership, baptism, ministries — ask us anything.</p>
              <span className="connect-cta">Send a message →</span>
            </button>
          </div>
        </div>
      </section>

      <section id="visit" className="section section--cream" aria-labelledby="visit-h">
        <div className="container">
          <div className="prose-centered" style={{ marginBottom: 'var(--sp-6)' }}>
            <h2 id="visit-h">Visit us</h2>
            <p>We'd love to welcome you in person this week.</p>
          </div>

          <div className="grid grid--2 visit-grid">
            <article className="card visit-card">
              <h3>Service times</h3>
              <ul className="time-list">
                {site.serviceTimes.map((s) => (
                  <li key={s.label}>
                    <strong>{s.label}</strong>
                    <span>{s.time}</span>
                  </li>
                ))}
              </ul>
            </article>

            <article className="card visit-card">
              <h3>Location</h3>
              <p className="meta">
                {site.address.line1}
                {(site.address.city || site.address.country) && (
                  <>
                    <br />
                    {[site.address.city, site.address.country].filter(Boolean).join(', ')}
                  </>
                )}
              </p>
              <a className="btn btn--outline" href={mapsHref} target="_blank" rel="noreferrer">
                Open in Google Maps
              </a>
            </article>
          </div>
        </div>
      </section>

      <section id="message" className="section" aria-labelledby="msg-h">
        <div className="container">
          <div className="prose-centered">
            <h2 id="msg-h">
              {subject === 'prayer' ? 'Send a prayer request' : 'Welcome - tell us about yourself'}
            </h2>
            <p>
              {subject === 'prayer'
                ? 'Your request is shared only with our prayer team.'
                : "If you've visited (or plan to visit) All Nations, this short card helps us welcome you properly."}
            </p>
          </div>
          <div style={{ maxWidth: '720px', margin: '0 auto' }}>
            {subject === 'prayer' ? (
              <ContactForm
                key="prayer"
                title="Prayer request"
                recipientEmail={recipients.prayer}
                subjectPrefix="Prayer request"
              />
            ) : (
              <VisitorConnectForm recipientEmail={recipients.general} />
            )}
          </div>
        </div>
      </section>

      <section className="section section--cream" aria-labelledby="follow-h">
        <div className="container">
          <div className="prose-centered">
            <h2 id="follow-h">Follow us</h2>
            <p>Stay in the loop between Sundays.</p>
          </div>
          <ul className="social-row">
            <li>
              <a
                href={site.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Visit our Facebook page"
              >
                <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
                  <path d="M22 12a10 10 0 1 0-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.51 1.49-3.9 3.78-3.9 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.77l-.44 2.89h-2.33v6.99A10 10 0 0 0 22 12z"/>
                </svg>
                <span>Facebook</span>
              </a>
            </li>
            <li>
              <a
                href={site.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Visit our Instagram page"
              >
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                  <rect x="3" y="3" width="18" height="18" rx="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
                </svg>
                <span>Instagram</span>
              </a>
            </li>
            <li>
              <a
                href={site.social.youtube}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Visit our YouTube channel"
              >
                <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true">
                  <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 0 0 .5 6.2 31 31 0 0 0 0 12a31 31 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 0 0 2.1-2.1c.3-1.8.5-3.9.5-5.8a31 31 0 0 0-.5-5.8zM9.6 15.6V8.4l6.3 3.6-6.3 3.6z"/>
                </svg>
                <span>YouTube</span>
              </a>
            </li>
            <li>
              <a
                href={site.social.tiktok}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Visit our TikTok page"
              >
                <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.14V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5.8 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1.84-.1z"/>
                </svg>
                <span>TikTok</span>
              </a>
            </li>
          </ul>
        </div>
      </section>
    </>
  )
}
