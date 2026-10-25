// Recipient email addresses for every form on the site.
// Update these placeholder addresses to the real inboxes before launch.
//
// Formsubmit.co will send a one-time activation link to each new address
// the first time a form is submitted to it. The recipient must click that
// link once, after which submissions flow directly to their inbox.
export const recipients = {
  // Per-ministry inboxes (keyed by ministry slug)
  'women': 'women@allnationscc.org',
  'men': 'men@allnationscc.org',
  'youth': 'youth@allnationscc.org',
  'children': 'children@allnationscc.org',
  'choir-and-music': 'choir@allnationscc.org',
  'ushering': 'ushering@allnationscc.org',
  'media-team': 'media@allnationscc.org',
  'social-service': 'social-service@allnationscc.org',

  // Site-wide inboxes used by the Connect page
  'general': 'hello@allnationscc.org',
  'prayer': 'prayer@allnationscc.org'
}

// Build the Formsubmit AJAX endpoint URL for a given recipient address.
export function endpointFor(email) {
  if (!email) return null
  return `https://formsubmit.co/ajax/${encodeURIComponent(email)}`
}
