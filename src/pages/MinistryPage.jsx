import { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import NotFound from './NotFound.jsx'
import JoinForm from '../components/JoinForm.jsx'
import ContactForm from '../components/ContactForm.jsx'
import EventCard from '../components/EventCard.jsx'
import Gallery from '../components/Gallery.jsx'
import { ministries, ministryGroups } from '../data/ministries.js'
import { events } from '../data/events.js'
import { sermons } from '../data/sermons.js'
import { recipients } from '../data/recipients.js'
import { isUpcoming, sortByDateAsc, formatDate } from '../utils/date.js'
import { mediaTeamHeroLqip } from '../data/media-team-lqip.js'

const LQIP_MAP = {
  mediaTeam: mediaTeamHeroLqip
}

function useCoverPreload(srcSet) {
  useEffect(() => {
    if (!srcSet?.webp) return
    const link = document.createElement('link')
    link.rel = 'preload'
    link.as = 'image'
    link.type = 'image/webp'
    link.setAttribute('imagesrcset', srcSet.webp)
    link.setAttribute('imagesizes', srcSet.sizes || '100vw')
    link.setAttribute('fetchpriority', 'high')
    document.head.appendChild(link)
    return () => {
      document.head.removeChild(link)
    }
  }, [srcSet?.webp, srcSet?.sizes])
}

export default function MinistryPage() {
  const { slug } = useParams()
  const ministry = ministries.find((m) => m.slug === slug)
  useCoverPreload(ministry?.coverImageSrcSet)
  if (!ministry) return <NotFound />
  const lqip = ministry.coverImageLqipKey ? LQIP_MAP[ministry.coverImageLqipKey] : null

  const groupLabel =
    ministryGroups.find((g) => g.id === ministry.group)?.label ?? 'Ministry'

  const ministryEvents = sortByDateAsc(
    events.filter((e) => e.ministrySlug === ministry.slug && isUpcoming(e))
  )

  const latestMedia = Array.isArray(ministry.latestMedia)
    ? ministry.latestMedia
    : []

  return (
    <>
      <section
        className={`ministry-banner ${ministry.coverImage ? 'ministry-banner--photo' : ''} ${
          ministry.coverImage && ministry.coverImageNoOverlay
            ? 'ministry-banner--plain'
            : ''
        }`}
        aria-labelledby="m-h"
      >
        {ministry.coverImage && (
          ministry.coverImageSrcSet ? (
            <picture>
              <source type="image/webp" srcSet={ministry.coverImageSrcSet.webp} sizes={ministry.coverImageSrcSet.sizes || '100vw'} />
              <source type="image/jpeg" srcSet={ministry.coverImageSrcSet.jpeg} sizes={ministry.coverImageSrcSet.sizes || '100vw'} />
              <img
                className="ministry-banner-photo"
                src={ministry.coverImage}
                alt={ministry.coverImageAlt || ''}
                width={ministry.coverImageSrcSet.width}
                height={ministry.coverImageSrcSet.height}
                fetchpriority="high"
                decoding="async"
                style={{
                  ...(ministry.coverImagePosition ? { objectPosition: ministry.coverImagePosition } : {}),
                  ...(lqip ? {
                    backgroundImage: `url(${lqip})`,
                    backgroundSize: 'cover',
                    backgroundPosition: ministry.coverImagePosition || 'center'
                  } : {})
                }}
              />
            </picture>
          ) : (
            <img
              className="ministry-banner-photo"
              src={ministry.coverImage}
              alt={ministry.coverImageAlt || ''}
              fetchpriority="high"
              decoding="async"
              style={
                ministry.coverImagePosition
                  ? { objectPosition: ministry.coverImagePosition }
                  : undefined
              }
            />
          )
        )}
        <div className="ministry-banner-glow" aria-hidden="true" />
        <div className="container">
          <h1 id="m-h">{ministry.name}</h1>
          <span className="ministry-rule" aria-hidden="true" />
          <p className="ministry-tagline">{ministry.tagline}</p>
        </div>
      </section>

      <nav className="container breadcrumb" aria-label="Breadcrumb">
        <Link to="/ministries">Ministries</Link>
        <span aria-hidden="true"> / </span>
        <span>{ministry.name}</span>
      </nav>

      {!ministry.hideQuickFacts && (
      <section className="section section--tight">
        <div className="container">
          <div className="quick-facts" aria-label="Quick facts">
            <div className="qf-card">
              <div>
                <span className="qf-label">Meeting time</span>
                <strong className="qf-value">{ministry.quickFacts.meetingTime}</strong>
              </div>
            </div>
            <div className="qf-card">
              <div>
                <span className="qf-label">Venue</span>
                <strong className="qf-value">{ministry.quickFacts.venue}</strong>
              </div>
            </div>
            <div className="qf-card">
              <div>
                <span className="qf-label">Leader</span>
                <strong className="qf-value">{ministry.quickFacts.leader}</strong>
              </div>
            </div>
          </div>
        </div>
      </section>
      )}

      <section
        className={`section section--tight ${
          ministry.contentBackground ? 'ministry-content--photo-bg' : ''
        }`}
        style={
          ministry.contentBackground
            ? { '--ministry-bg-image': `url(${ministry.contentBackground})` }
            : undefined
        }
      >
        <div className="container">
          <div className="ministry-layout">
            <div>
              <div className="m-section">
                <h2 className="m-heading">About</h2>
                {ministry.aboutImage ? (
                  <div className="m-about-split">
                    <figure className="m-about-photo">
                      <img
                        src={ministry.aboutImage}
                        alt={ministry.aboutImageAlt || ''}
                        loading="lazy"
                        decoding="async"
                      />
                    </figure>
                    <p className="m-about">{ministry.about}</p>
                  </div>
                ) : (
                  <p className="m-about">{ministry.about}</p>
                )}
              </div>

              {Array.isArray(ministry.services) && ministry.services.length > 0 && (
                <div className="m-section">
                  <h2 className="m-heading">What we do</h2>
                  <div className="services-grid">
                    {ministry.services.map((s, i) => (
                      <article key={i} className="service-card">
                        <h3>{s.title}</h3>
                        <p>{s.description}</p>
                      </article>
                    ))}
                  </div>
                </div>
              )}

              {Array.isArray(ministry.teachersGallery) && ministry.teachersGallery.length > 0 && (
                <div className="m-section">
                  <h2 className="m-heading">{ministry.leadersHeading || 'Teachers'}</h2>
                  <Gallery items={ministry.teachersGallery} variant="large" />
                </div>
              )}

              {ministry.leaders && ministry.leaders.length > 0 && (
                <div className="m-section">
                  <h2 className="m-heading">{ministry.leadersHeading || 'Leaders'}</h2>
                  <div className="leaders">
                    {ministry.leaders.map((l, idx) => {
                      const initials = l.name
                        .split(/\s+/)
                        .filter((p) => !/^(pastor|rev\.?|reverend|minister|mrs\.?|mr\.?|elder|deacon|auntie)$/i.test(p))
                        .map((p) => p[0])
                        .filter(Boolean)
                        .slice(0, 2)
                        .join('')
                        .toUpperCase()
                      return (
                        <div className="leader" key={`${l.name}-${idx}`}>
                          <div className="avatar">
                            {l.image ? (
                              <img
                                src={l.image}
                                alt={l.imageAlt || `${l.name}, ${l.role}`}
                                loading="lazy"
                                decoding="async"
                              />
                            ) : (
                              <span className="avatar-initials" aria-hidden="true">
                                {initials || '+'}
                              </span>
                            )}
                          </div>
                          <strong>{l.name}</strong>
                          <span>{l.role}</span>
                        </div>
                      )
                    })}
                  </div>
                </div>
              )}

              {Array.isArray(ministry.schedule) && (
                <div className="m-section">
                  <h2 className="m-heading">Schedule</h2>
                  {ministry.schedule.length > 0 ? (
                    <ul className="schedule-list">
                      {ministry.schedule.map((s, i) => (
                        <li key={i}>
                          <span className="sch-dot" aria-hidden="true" />
                          <span className="day">
                            {s.day}
                            {s.activity ? ` · ${s.activity}` : ''}
                          </span>
                          {s.time && <span className="time">{s.time}</span>}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="meta">Schedule to be announced.</p>
                  )}
                </div>
              )}

              {ministryEvents.length > 0 && (
                <div className="m-section">
                  <h2 className="m-heading">Upcoming events</h2>
                  <div className="grid grid--2">
                    {ministryEvents.map((e) => (
                      <EventCard key={e.id} event={e} />
                    ))}
                  </div>
                </div>
              )}

              {latestMedia.length > 0 && (
                <div className="m-section">
                  <h2 className="m-heading">Latest media</h2>
                  <div className="grid grid--2">
                    {latestMedia.map((s) => (
                      <article key={s.id} className="card">
                        <span className="tag">{s.series}</span>
                        <h3>{s.title}</h3>
                        <p className="meta">
                          {s.speaker} &middot; {formatDate(s.date)}
                        </p>
                        <p>{s.summary}</p>
                      </article>
                    ))}
                  </div>
                </div>
              )}

              {Array.isArray(ministry.gallery) && (
                <div className="m-section">
                  <h2 className="m-heading">Gallery</h2>
                  <Gallery
                    items={ministry.gallery}
                    variant="masonry"
                    pageSize={24}
                  />
                </div>
              )}
            </div>

            <aside
              className="ministry-aside"
              aria-label={ministry.joinable ? 'Join form' : 'Contact form'}
            >
              {ministry.joinable ? (
                <JoinForm
                  ministryName={ministry.name}
                  recipientEmail={
                    ministry.contactEmail ||
                    recipients[ministry.slug] ||
                    recipients.general
                  }
                />
              ) : (
                <ContactForm
                  title={`Contact ${ministry.name}`}
                  recipientEmail={
                    ministry.contactEmail ||
                    recipients[ministry.slug] ||
                    recipients.general
                  }
                  subjectPrefix={`${ministry.name} enquiry`}
                />
              )}
            </aside>
          </div>
        </div>
      </section>
    </>
  )
}
