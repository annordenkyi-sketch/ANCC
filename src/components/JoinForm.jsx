import { useState } from 'react'
import { submitForm } from '../utils/submitForm.js'

export default function JoinForm({ ministryName, recipientEmail }) {
  const [state, setState] = useState('idle') // 'idle' | 'submitting' | 'success' | 'error'
  const [errorMsg, setErrorMsg] = useState('')

  async function handleSubmit(e) {
    e.preventDefault()
    const data = Object.fromEntries(new FormData(e.target).entries())

    // Honeypot — real users leave this field blank; bots fill it.
    // Pretend success without actually sending.
    if (data.website) {
      setState('success')
      return
    }

    setState('submitting')
    setErrorMsg('')
    try {
      await submitForm({
        recipientEmail,
        subject: `New join request — ${ministryName}`,
        replyTo: data.email || undefined,
        fields: {
          Ministry: ministryName,
          Name: data.name,
          Phone: data.phone,
          Email: data.email || '(not provided)',
          Note: data.note || '(none)'
        }
      })
      setState('success')
    } catch (err) {
      setErrorMsg(err.message || 'Something went wrong. Please try again.')
      setState('error')
    }
  }

  if (state === 'success') {
    return (
      <div className="form form-success" role="status">
        <h3 style={{ marginTop: 0 }}>Thanks!</h3>
        <p style={{ margin: 0 }}>
          Your interest in {ministryName} has been received. A leader will be in
          touch with you shortly.
        </p>
      </div>
    )
  }

  const sending = state === 'submitting'

  return (
    <form className="form" onSubmit={handleSubmit} aria-labelledby="join-h">
      <h3 id="join-h">Join {ministryName}</h3>
      <p className="meta">
        Fill in a few details and a leader will reach out to welcome you.
      </p>

      <div className="field">
        <label htmlFor="j-name">Full name</label>
        <input id="j-name" name="name" type="text" required autoComplete="name" />
      </div>

      <div className="field">
        <label htmlFor="j-phone">Phone number</label>
        <input id="j-phone" name="phone" type="tel" required autoComplete="tel" />
      </div>

      <div className="field">
        <label htmlFor="j-email">Email (optional)</label>
        <input id="j-email" name="email" type="email" autoComplete="email" />
      </div>

      <div className="field">
        <label htmlFor="j-note">Anything we should know?</label>
        <textarea id="j-note" name="note" rows="3" />
      </div>

      {/* Honeypot: hidden from real users, trips up bots */}
      <div className="hp" aria-hidden="true">
        <label htmlFor="j-website">Leave this field blank</label>
        <input
          id="j-website"
          name="website"
          type="text"
          tabIndex="-1"
          autoComplete="off"
        />
      </div>

      {state === 'error' && (
        <div className="form-error" role="alert">
          {errorMsg} You can also reach us directly at{' '}
          <a href={`mailto:${recipientEmail}`}>{recipientEmail}</a>.
        </div>
      )}

      <button type="submit" className="btn btn--primary" disabled={sending}>
        {sending ? 'Sending…' : 'Send'}
      </button>
    </form>
  )
}
