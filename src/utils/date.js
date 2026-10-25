export function formatDate(iso) {
  const d = new Date(iso)
  if (Number.isNaN(d.getTime())) return iso
  return d.toLocaleDateString('en-GB', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  })
}

export function isUpcoming(event) {
  // Accepts either an event object or an ISO string (back-compat).
  if (event && typeof event === 'object') {
    if (event.tbd) return true
    if (!event.date) return false
    return isDateUpcoming(event.date)
  }
  return isDateUpcoming(event)
}

function isDateUpcoming(iso) {
  const d = new Date(iso)
  if (Number.isNaN(d.getTime())) return false
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  return d >= today
}

export function sortByDateAsc(items, key = 'date') {
  // TBD events (no date / tbd:true) sort to the end.
  return [...items].sort((a, b) => {
    const aTbd = a.tbd || !a[key]
    const bTbd = b.tbd || !b[key]
    if (aTbd && bTbd) return 0
    if (aTbd) return 1
    if (bTbd) return -1
    return new Date(a[key]) - new Date(b[key])
  })
}
