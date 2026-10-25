import { endpointFor } from '../data/recipients.js'

// POST a form payload to Formsubmit.co's AJAX endpoint and return the
// parsed response. Throws if the recipient address is missing or the
// network request fails.
export async function submitForm({ recipientEmail, subject, replyTo, fields }) {
  const url = endpointFor(recipientEmail)
  if (!url) {
    throw new Error('No recipient address configured for this form.')
  }

  const payload = {
    _subject: subject,
    _template: 'table',
    _captcha: 'false', // honeypot handles spam; see HoneypotField
    ...(replyTo ? { _replyto: replyTo } : {}),
    ...fields
  }

  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    },
    body: JSON.stringify(payload)
  })

  let json = null
  try {
    json = await res.json()
  } catch {
    /* non-JSON response — leave null */
  }

  if (!res.ok) {
    throw new Error(json?.message || `Request failed (${res.status}).`)
  }
  if (json && json.success === 'false') {
    throw new Error(json.message || 'The service could not accept your submission.')
  }
  return json
}
