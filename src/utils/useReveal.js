import { useEffect, useRef, useState } from 'react'

// One-shot IntersectionObserver hook — flips a `revealed` flag the first
// time the ref enters the viewport. Used for scroll-in animations.
export function useReveal({ threshold = 0.15, rootMargin = '0px 0px -60px 0px' } = {}) {
  const ref = useRef(null)
  const [revealed, setRevealed] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (typeof IntersectionObserver === 'undefined') {
      setRevealed(true)
      return
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setRevealed(true)
            io.disconnect()
            break
          }
        }
      },
      { threshold, rootMargin }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [threshold, rootMargin])

  return [ref, revealed]
}
