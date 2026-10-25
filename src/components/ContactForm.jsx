import { useState } from 'react'
import { submitForm } from '../utils/submitForm.js'

export default function ContactForm({
  title = 'Contact us',
  recipientEmail,
  subjectPrefix
}) {
  const [state, setState] = useState('idle')
  const [errorMsg, setErrorMsg] = useState('')

  async function handleSubmit(e) {
    e.preventDefault()
    const data = Object.fromEntries(new FormData(e.target).entries())

    // Honeypot
    if (data.website) {
      setState('success')
      return
    }

    setState('submitting')
    setErrorMsg('')
    try {
      await submitForm({
        recipientEmail,
        subject: subjectPrefix
          ? `${subjectPrefix}: ${data.subject}`
          : `[${title}] ${data.subject}`,
        replyTo: data.email,
        fields: {
          Name: data.name,
          Email: data.email,
          Subject: data.subject,
          Message: data.message
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
        <h3 style={{ marginTop: 0 }}>Message received</h3>
        <p style={{ margin: 0 }}>
          Thanks for reaching out. We will reply as soon as possible.
        </p>
      </div>
    )
  }

  const sending = state === 'submitting'

  return (
    <form className="form" onSubmit={handleSubmit} aria-labelledby="contact-h">
      <h3 id="contact-h">{title}</h3>
      {recipientEmail && (
        <p className="meta">
          Or email directly:{' '}
          <a href={`mailto:${recipientEmail}`}>{recipientEmail}</a>
        </p>
      )}

      <div className="field">
        <label htmlFor="c-name">Your name</label>
        <input id="c-name" name="name" type="text" required autoComplete="name" />
      </div>

      <div className="field">
        <label htmlFor="c-email">Email</label>
        <input id="c-email" name="email" type="email" required autoComplete="email" />
      </div>

      <div className="field">
        <label htmlFor="c-subject">Subject</label>
        <input id="c-subject" name="subject" type="text" required />
      </div>

      <div className="field">
        <label htmlFor="c-message">Message</label>
        <textarea id="c-message" name="message" rows="4" required />
      </div>

      {/* Honeypot */}
      <div className="hp" aria-hidden="true">
        <label htmlFor="c-website">Leave this field blank</label>
        <input
          id="c-website"
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
        {sending ? 'Sending…' : 'Send message'}
      </button>
    </form>
  )
}
