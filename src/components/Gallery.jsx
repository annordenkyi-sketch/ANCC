import { useRef, useState, useEffect } from 'react'
import { useReveal } from '../utils/useReveal.js'
import Lightbox from './Lightbox.jsx'

const PAGE_SIZE = 6

function GalleryItem({ item, index, onOpen }) {
  const [ref, revealed] = useReveal()
  return (
    <button
      ref={ref}
      type="button"
      className={`gal-item ${revealed ? 'is-revealed' : ''}`}
      style={{ transitionDelay: `${(index % 4) * 70}ms` }}
      onClick={onOpen}
      aria-label={`Open image: ${item.alt || 'photo'}`}
    >
      {item.webp ? (
        <picture>
          <source type="image/webp" srcSet={item.webp} />
          <img
            src={item.src}
            alt={item.alt || ''}
            loading="lazy"
            decoding="async"
          />
        </picture>
      ) : (
        <img
          src={item.src}
          alt={item.alt || ''}
          loading="lazy"
          decoding="async"
        />
      )}
      <span className="gal-overlay" aria-hidden="true">
        <span className="gal-view">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </span>
      </span>
    </button>
  )
}

export default function Gallery({ items = [], pageSize = PAGE_SIZE, variant = '' }) {
  const [page, setPage] = useState(0)
  const [lightboxIndex, setLightboxIndex] = useState(null)
  const topRef = useRef(null)

  if (!items.length) {
    return (
      <div
        className={`gallery gallery--empty ${variant ? `gallery--${variant}` : ''}`}
        role="status"
      >
        <p>Photos coming soon.</p>
      </div>
    )
  }

  const totalPages = Math.ceil(items.length / pageSize)
  const needsPagination = items.length > pageSize
  const safePage = Math.min(page, totalPages - 1)
  const start = safePage * pageSize
  const visible = items.slice(start, start + pageSize)

  function goTo(nextPage) {
    setPage(nextPage)
    // Scroll back to the top of the gallery so page 2+ doesn't feel disorienting.
    requestAnimationFrame(() => {
      topRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    })
  }

  // If `items` changes (e.g. ministry switch) reset to page 0.
  useEffect(() => {
    setPage(0)
  }, [items])

  return (
    <div ref={topRef}>
      <div className={`gallery ${variant ? `gallery--${variant}` : ''}`} key={safePage}>
        {visible.map((item, i) => (
          <GalleryItem
            key={item.src}
            item={item}
            index={i}
            onOpen={() => setLightboxIndex(start + i)}
          />
        ))}
      </div>

      <Lightbox
        items={items}
        index={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onPrev={() =>
          setLightboxIndex((i) => (i === 0 ? items.length - 1 : i - 1))
        }
        onNext={() =>
          setLightboxIndex((i) => (i === items.length - 1 ? 0 : i + 1))
        }
      />

      {needsPagination && (
        <nav
          className="gallery-pager"
          aria-label={`Gallery, page ${safePage + 1} of ${totalPages}`}
        >
          <button
            type="button"
            className="gallery-pager-btn"
            onClick={() => goTo(safePage - 1)}
            disabled={safePage === 0}
            aria-label="Previous page"
          >
            ‹
          </button>
          <ul className="gallery-pager-pages">
            {Array.from({ length: totalPages }, (_, i) => (
              <li key={i}>
                <button
                  type="button"
                  className={`gallery-pager-page ${
                    i === safePage ? 'is-active' : ''
                  }`}
                  onClick={() => goTo(i)}
                  aria-current={i === safePage ? 'page' : undefined}
                  aria-label={`Go to page ${i + 1}`}
                >
                  {i + 1}
                </button>
              </li>
            ))}
          </ul>
          <button
            type="button"
            className="gallery-pager-btn"
            onClick={() => goTo(safePage + 1)}
            disabled={safePage === totalPages - 1}
            aria-label="Next page"
          >
            ›
          </button>
        </nav>
      )}
    </div>
  )
}
