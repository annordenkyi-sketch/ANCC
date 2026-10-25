import { site } from '../data/site.js'
import { useLiveStatus } from '../utils/useLiveStatus.js'

export default function LiveBar() {
  const live = site.live
  const isLive = useLiveStatus(live?.schedule)

  if (isLive) {
    return (
      <div className="live-bar live-bar--on" role="status" aria-live="polite">
        <div className="container">
          <span className="live-dot" aria-hidden="true" />
          <strong>Live</strong>
          <span>{live.liveLabel}</span>
          <a
            className="btn btn--primary"
            href={live.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Watch the live service on YouTube"
          >
            Watch now
          </a>
        </div>
      </div>
    )
  }

  return (
    <div className="live-bar live-bar--off">
      <div className="container">
        <span className="live-bar-icon" aria-hidden="true">▶</span>
        <span>{live.offlineLabel}</span>
        <a
          className="btn btn--primary"
          href={live.offlineUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Watch past services on our YouTube channel"
        >
          Watch past services
        </a>
      </div>
    </div>
  )
}
