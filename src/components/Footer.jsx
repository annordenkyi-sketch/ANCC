import { Link } from 'react-router-dom'
import { site } from '../data/site.js'

export default function Footer() {
  const year = new Date().getFullYear()
  const mapsHref =
    site.address.mapsUrl ||
    `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
      site.address.mapsQuery
    )}`

  return (
    <footer className="site-footer">
      <div className="container">
        {/* Top band — brand + get in touch */}
        <div className="footer-top">
          <div className="footer-brand">
            <img
              className="footer-logo"
              src="/logo.jpg"
              alt=""
              width="64"
              height="64"
              loading="lazy"
              decoding="async"
            />
            <div>
              <h3 className="footer-brand-name">{site.name}</h3>
              <p className="footer-brand-tag">{site.tagline}</p>
            </div>
          </div>

          <div className="footer-contact-block">
            <h4>Get in touch</h4>
            <address className="footer-contact">
              <a
                href={mapsHref}
                target="_blank"
                rel="noreferrer"
                className="footer-contact-row"
              >
                {site.address.line1}
              </a>
              <a
                href={`tel:${site.phone.replace(/\s/g, '')}`}
                className="footer-contact-row"
              >
                {site.phone}
              </a>
              <a
                href={`mailto:${site.email}`}
                className="footer-contact-row"
              >
                {site.email}
              </a>
            </address>

            <ul className="footer-socials" aria-label="Social media">
              <li>
                <a href={site.social.facebook} aria-label="Visit our Facebook page" target="_blank" rel="noopener noreferrer">
                  <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
                    <path d="M22 12a10 10 0 1 0-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.51 1.49-3.9 3.78-3.9 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.77l-.44 2.89h-2.33v6.99A10 10 0 0 0 22 12z"/>
                  </svg>
                </a>
              </li>
              <li>
                <a href={site.social.instagram} aria-label="Visit our Instagram page" target="_blank" rel="noopener noreferrer">
                  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                    <rect x="3" y="3" width="18" height="18" rx="5" />
                    <circle cx="12" cy="12" r="4" />
                    <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
                  </svg>
                </a>
              </li>
              <li>
                <a href={site.social.youtube} aria-label="Visit our YouTube channel" target="_blank" rel="noopener noreferrer">
                  <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true">
                    <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 0 0 .5 6.2 31 31 0 0 0 0 12a31 31 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 0 0 2.1-2.1c.3-1.8.5-3.9.5-5.8a31 31 0 0 0-.5-5.8zM9.6 15.6V8.4l6.3 3.6-6.3 3.6z"/>
                  </svg>
                </a>
              </li>
              <li>
                <a href={site.social.tiktok} aria-label="Visit our TikTok page" target="_blank" rel="noopener noreferrer">
                  <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.14V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5.8 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1.84-.1z"/>
                  </svg>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-divider" aria-hidden="true" />

        {/* Bottom bar — slim nav + copyright */}
        <div className="footer-bottom">
          <ul className="footer-mini-nav" aria-label="Quick links">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/ministries">Ministries</Link></li>
            <li><Link to="/events">Events</Link></li>
            <li><Link to="/connect">Connect</Link></li>
          </ul>
          <span>&copy; {year} {site.name}.</span>
        </div>
      </div>
    </footer>
  )
}
