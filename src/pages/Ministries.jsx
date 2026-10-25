import MinistryCard from '../components/MinistryCard.jsx'
import { ministries, ministryGroups } from '../data/ministries.js'

export default function Ministries() {
  return (
    <>
      <section className="welcome ministry-banner" aria-labelledby="min-h">
        <div className="ministry-banner-glow" aria-hidden="true" />
        <div className="container">
          <span className="eyebrow">Get involved</span>
          <h1 id="min-h">Ministries</h1>
          <span className="ministry-rule" aria-hidden="true" />
          <p className="ministry-tagline">
            From fellowship groups to service teams and committees — there is a
            place for you to grow and serve.
          </p>
        </div>
      </section>

      {ministryGroups.map((group, idx) => {
        const list = ministries.filter((m) => m.group === group.id)
        if (list.length === 0) return null
        return (
          <section
            key={group.id}
            className={`section ${idx % 2 === 0 ? '' : 'section--cream'}`}
            aria-labelledby={`g-${group.id}`}
          >
            <div className="container">
              <h2 id={`g-${group.id}`} className="m-heading">{group.label}</h2>
              <div className="grid grid--3">
                {list.map((m) => (
                  <MinistryCard key={m.slug} ministry={m} />
                ))}
              </div>
            </div>
          </section>
        )
      })}
    </>
  )
}
