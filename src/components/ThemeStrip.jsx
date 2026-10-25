import { site } from '../data/site.js'

export default function ThemeStrip() {
  const t = site.theme
  if (!t?.title) return null
  return (
    <section className="theme-strip" aria-label={`${t.year} church theme`}>
      <div className="container">
        <span className="theme-year">{t.year}</span>
        <span className="theme-divider" aria-hidden="true" />
        <div className="theme-text">
          <div className="theme-title-row">
            <strong>{t.title}</strong>
            {t.scripture && (
              <>
                <span className="theme-sep" aria-hidden="true">—</span>
                <span className="theme-scripture">{t.scripture}</span>
              </>
            )}
          </div>
          {t.summary && <p>{t.summary}</p>}
        </div>
      </div>
    </section>
  )
}
