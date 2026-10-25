import { useEffect, useRef } from 'react'

export default function Lightbox({ items = [], index, onClose, onPrev, onNext }) {
  const closeBtnRef = useRef(null)

  const isOpen = index !== null && index >= 0 && index < items.length

  useEffect(() => {
    if (!isOpen) return
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    // Focus the close button so keyboard users land somewhere sensible
    requestAnimationFrame(() => closeBtnRef.current?.focus())

    function onKey(e) {
      if (e.key === 'Escape') onClose()
      else if (e.key === 'ArrowLeft') onPrev()
      else if (e.key === 'ArrowRight') onNext()
    }
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prevOverflow
    }
  }, [isOpen, onClose, onPrev, onNext])

  if (!isOpen) return null

  const item = items[index]

  return (
    <div
      className="lightbox"
      role="dialog"
      aria-modal="true"
      aria-label="Image viewer"
      onClick={(e) => {
        if (e.target.classList.contains('lightbox')) onClose()
      }}
    >
      <button
        ref={closeBtnRef}
        type="button"
        className="lightbox-btn lightbox-close"
        onClick={onClose}
        aria-label="Close image viewer"
      >
        ✕
      </button>

      {items.length > 1 && (
        <button
          type="button"
          className="lightbox-btn lightbox-prev"
          onClick={onPrev}
          aria-label="Previous image"
        >
          ‹
        </button>
      )}

      <figure className="lightbox-figure" onClick={(e) => e.stopPropagation()}>
        {item.webp ? (
          <picture>
            <source type="image/webp" srcSet={item.webp} />
            <img src={item.src} alt={item.alt || ''} decoding="async" />
          </picture>
        ) : (
          <img src={item.src} alt={item.alt || ''} decoding="async" />
        )}
        {item.alt && <figcaption>{item.alt}</figcaption>}
      </figure>

      {items.length > 1 && (
        <button
          type="button"
          className="lightbox-btn lightbox-next"
          onClick={onNext}
          aria-label="Next image"
        >
          ›
        </button>
      )}

      <div className="lightbox-counter" aria-live="polite">
        {index + 1} / {items.length}
      </div>
    </div>
  )
}
