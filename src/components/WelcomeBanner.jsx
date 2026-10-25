import { Link } from 'react-router-dom'
import { site } from '../data/site.js'
import { homeHeroLqip } from '../data/home-lqip.js'

export default function WelcomeBanner() {
  const w = site.welcome
  return (
    <section
      className="welcome ministry-banner ministry-banner--photo"
      aria-labelledby="welcome-h"
    >
      <picture>
        <source
          type="image/webp"
          srcSet="/home/home-cover-480.webp 480w, /home/home-cover-960.webp 960w, /home/home-cover-1600.webp 1600w"
          sizes="100vw"
        />
        <source
          type="image/jpeg"
          srcSet="/home/home-cover-480.jpg 480w, /home/home-cover-960.jpg 960w, /home/home-cover-1600.jpg 1600w"
          sizes="100vw"
        />
        <img
          className="ministry-banner-photo"
          src="/home/home-cover-1600.jpg"
          alt="All Nations Christian Center congregation gathered for a Sunday service"
          width="1600"
          height="1067"
          fetchpriority="high"
          decoding="async"
          style={{
            objectPosition: 'center 35%',
            backgroundImage: `url(${homeHeroLqip})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center 35%'
          }}
        />
      </picture>
      <div className="ministry-banner-glow" aria-hidden="true" />
      <div className="container">
        <img
          className="welcome-logo"
          src="/logo.jpg"
          alt={`${site.name} logo`}
          width="96"
          height="96"
          decoding="async"
        />
        <span className="eyebrow">{w.eyebrow}</span>
        <h1 id="welcome-h">{w.heading}</h1>
        <span className="ministry-rule" aria-hidden="true" />
        <p className="ministry-tagline">{w.body}</p>
        <div className="actions">
          <Link to={w.cta.to} className="btn btn--primary">{w.cta.label}</Link>
          <Link to={w.ctaSecondary.to} className="btn btn--ghost">{w.ctaSecondary.label}</Link>
        </div>
      </div>
    </section>
  )
}
