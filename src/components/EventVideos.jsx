// Renders a list of event videos. Each item is:
//   { type: 'youtube' | 'facebook' | 'file', url: '…', title?: '…' }
// - youtube: accepts a watch URL, youtu.be short URL, or an 11-char ID
// - facebook: accepts a Facebook video page URL (uses FB's iframe plugin)
// - file:   accepts a direct video URL (served from /public/events/… or elsewhere)
export default function EventVideos({ items = [] }) {
  if (!items.length) return null
  return (
    <div className="event-videos">
      {items.map((v, i) => (
        <VideoEmbed key={i} item={v} />
      ))}
    </div>
  )
}

function VideoEmbed({ item }) {
  const title = item.title || 'Event video'
  if (item.type === 'youtube') {
    const id = extractYouTubeId(item.url)
    if (!id) return null
    return (
      <div className="video-frame">
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${id}`}
          title={title}
          loading="lazy"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    )
  }
  if (item.type === 'facebook') {
    const src = `https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(
      item.url
    )}&show_text=false`
    return (
      <div className="video-frame">
        <iframe
          src={src}
          title={title}
          loading="lazy"
          scrolling="no"
          allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
          allowFullScreen
        />
      </div>
    )
  }
  if (item.type === 'file') {
    return (
      <div className="video-frame">
        <video controls preload="metadata" src={item.url}>
          <p>Your browser does not support the video tag.</p>
        </video>
      </div>
    )
  }
  return null
}

function extractYouTubeId(url) {
  if (!url) return null
  if (/^[a-zA-Z0-9_-]{11}$/.test(url)) return url
  const m = String(url).match(
    /(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/|live\/))([a-zA-Z0-9_-]{11})/
  )
  return m ? m[1] : null
}
