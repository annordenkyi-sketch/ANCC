import { Link } from 'react-router-dom'
import { site } from '../data/site.js'
import { pastors } from '../data/pastors.js'
import PastorCard from '../components/PastorCard.jsx'

export default function About() {
  return (
    <>
      <section
        className="welcome ministry-banner ministry-banner--photo"
        aria-labelledby="about-h"
      >
        <img
          className="ministry-banner-photo"
          src="/about/about-cover.jpg"
          alt="A worshipper lifting their voice during a Sunday service"
          fetchpriority="high"
          decoding="async"
        />
        <div className="ministry-banner-glow" aria-hidden="true" />
        <div className="container">
          <span className="eyebrow">About us</span>
          <h1 id="about-h">A family of faith for every tribe and tongue</h1>
          <span className="ministry-rule" aria-hidden="true" />
          <p className="ministry-tagline">{site.tagline}</p>
        </div>
      </section>

      <section className="section about-story">
        <div className="container">
          <div className="story-card">
            <h2>Our story</h2>
            <span className="story-rule" aria-hidden="true" />
            <p>
              All Nations Christian Center began in Kaneshie with a small
              group of believers praying for a church where visitors from
              every background would feel at home. Today we are a growing
              family — evangelical in doctrine, charismatic in worship,
              practical in service — seeing people meet Jesus and grow into
              His likeness.
            </p>
          </div>
        </div>
      </section>

      <section className="photo-band" aria-label="Worshippers at All Nations">
        <img
          src="/about/worship-01.jpg"
          alt="A church member lifting her hands in worship during a Sunday service"
          loading="lazy"
          decoding="async"
        />
        <figcaption className="photo-band-caption">
          <span>“Let everything that has breath praise the Lord.”</span>
          <small>Psalm 150:6</small>
        </figcaption>
      </section>

      <section className="section section--cream">
        <div className="container">
          <div className="section-head" style={{ justifyContent: 'center' }}>
            <div style={{ textAlign: 'center' }}>
              <h2>Meet our pastors</h2>
              <p>The ministers who shepherd and serve our church family.</p>
            </div>
          </div>
          <div className="pastors-grid">
            {pastors.map((p) => (
              <PastorCard key={p.id} pastor={p} />
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head" style={{ justifyContent: 'center' }}>
            <div style={{ textAlign: 'center' }}>
              <h2>What we believe</h2>
              <p>The convictions that shape our life together.</p>
            </div>
          </div>
          <div className="grid grid--3">
            <article className="card belief">
              <span className="belief-num">01</span>
              <h3>The authority of Scripture</h3>
              <p>The Bible is God's inspired Word and our rule for faith and life.</p>
            </article>
            <article className="card belief">
              <span className="belief-num">02</span>
              <h3>The Lordship of Jesus</h3>
              <p>Jesus Christ is Lord, Saviour and the Head of the Church.</p>
            </article>
            <article className="card belief">
              <span className="belief-num">03</span>
              <h3>Grace through faith</h3>
              <p>Salvation is a gift received by grace through faith in Christ alone.</p>
            </article>
            <article className="card belief">
              <span className="belief-num">04</span>
              <h3>The Holy Spirit</h3>
              <p>The Spirit empowers believers to live, witness and serve today.</p>
            </article>
            <article className="card belief">
              <span className="belief-num">05</span>
              <h3>The mission of the Church</h3>
              <p>We exist to make disciples of all nations, starting at home.</p>
            </article>
          </div>
        </div>
      </section>

      <section className="section section--tight">
        <div className="container">
          <p className="page-tail-link">
            Learn more or <Link to="/connect">plan a visit on our Connect page →</Link>
          </p>
        </div>
      </section>
    </>
  )
}
