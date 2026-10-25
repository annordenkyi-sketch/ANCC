import { useEffect, useState } from 'react'

// Returns `true` when the current moment falls inside any slot in the
// given schedule. All slot times are interpreted in `timeZone`
// (default Africa/Accra). The hook re-checks itself every `pollMs` so
// the UI flips as a service starts/ends without a manual page refresh.
export function useLiveStatus(schedule, { timeZone = 'Africa/Accra', pollMs = 60_000 } = {}) {
  const [isLive, setIsLive] = useState(() => checkLive(schedule, timeZone))

  useEffect(() => {
    const tick = () => setIsLive(checkLive(schedule, timeZone))
    tick()
    const id = window.setInterval(tick, pollMs)
    return () => window.clearInterval(id)
  }, [schedule, timeZone, pollMs])

  return isLive
}

function checkLive(schedule, timeZone) {
  if (!Array.isArray(schedule) || schedule.length === 0) return false

  const now = nowInZone(timeZone)
  const minutesNow = now.hour * 60 + now.minute

  return schedule.some((slot) => {
    if (slot.day !== now.day) return false
    const start = toMinutes(slot.start)
    const end = toMinutes(slot.end)
    return minutesNow >= start && minutesNow < end
  })
}

function toMinutes(hhmm) {
  const [h, m] = String(hhmm).split(':').map(Number)
  return h * 60 + (m || 0)
}

const WEEKDAY = {
  Sunday: 0,
  Monday: 1,
  Tuesday: 2,
  Wednesday: 3,
  Thursday: 4,
  Friday: 5,
  Saturday: 6
}

function nowInZone(timeZone) {
  // en-GB with hour12: false returns a 24-hour clock, which lets us
  // read day + hour + minute cleanly without AM/PM parsing quirks.
  const fmt = new Intl.DateTimeFormat('en-GB', {
    timeZone,
    weekday: 'long',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  })
  const parts = fmt.formatToParts(new Date())
  const get = (type) => parts.find((p) => p.type === type)?.value
  return {
    day: WEEKDAY[get('weekday')] ?? new Date().getDay(),
    hour: parseInt(get('hour'), 10) || 0,
    minute: parseInt(get('minute'), 10) || 0
  }
}
