export default function SermonCard({ sermon }) {
  if (!sermon) return null
  if (sermon.image) {
    return (
      <article className="sermon-card">
        <a
          href={sermon.url}
          target="_blank"
          rel="noopener noreferrer"
          className="sermon-flyer"
          aria-label={`Watch "${sermon.title}" on YouTube`}
        >
          {sermon.imageWebp ? (
            <picture>
              <source type="image/webp" srcSet={sermon.imageWebp} />
              <img src={sermon.image} alt={sermon.imageAlt || sermon.title} loading="lazy" decoding="async" />
            </picture>
          ) : (
            <img src={sermon.image} alt={sermon.imageAlt || sermon.title} loading="lazy" decoding="async" />
          )}
        </a>
        <a
          className="btn btn--primary sermon-watch-btn"
          href={sermon.url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Watch "${sermon.title}" on YouTube`}
        >
          Watch on YouTube
        </a>
      </article>
    )
  }
  return (
    <article className="card">
      <div className="sermon sermon--no-cover">
        <div>
          <a
            className="btn btn--outline"
            href={sermon.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Watch "${sermon.title}" on YouTube`}
          >
            Watch on YouTube
          </a>
        </div>
      </div>
    </article>
  )
}
