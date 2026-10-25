import { useState } from 'react'
import { submitForm } from '../utils/submitForm.js'
import { ministries } from '../data/ministries.js'

const AGE_RANGES = ['Under 18', '18–24', '25–34', '35–44', '45–54', '55–64', '65+']
const MARITAL = ['Single', 'Married', 'Engaged', 'Divorced', 'Widowed', 'Prefer not to say']
const HEARD_FROM = [
  'Friend or family',
  'Social media',
  'YouTube or online service',
  'Walked by',
  'Other'
]

// Ministries a visitor can opt into — committees aren't recruitable.
const JOINABLE_MINISTRIES = ministries
  .filter((m) => m.joinable)
  .map((m) => m.name)

export default function VisitorConnectForm({ recipientEmail }) {
  const [state, setState] = useState('idle')
  const [errorMsg, setErrorMsg] = useState('')

  async function handleSubmit(e) {
    e.preventDefault()
    const form = e.target
    const data = new FormData(form)

    // Honeypot
    if (data.get('website')) {
      setState('success')
      return
    }

    const interests = data.getAll('interests').join(', ') || '(none selected)'
    const toText = (v) => (v && String(v).trim()) || '(not provided)'

    setState('submitting')
    setErrorMsg('')
    try {
      await submitForm({
        recipientEmail,
        subject: 'New Visitor Connect Card',
        replyTo: data.get('email') || undefined,
        fields: {
          'Full name': data.get('name'),
          'Phone': data.get('phone'),
          'Email': toText(data.get('email')),
          'Gender': toText(data.get('gender')),
          'Age range': toText(data.get('ageRange')),
          'Marital status': toText(data.get('marital')),
          'Address / area': toText(data.get('address')),
          'City / town': toText(data.get('city')),
          'Date of visit': toText(data.get('visitDate')),
          'Visit number': toText(data.get('visitNumber')),
          'How they heard about us': toText(data.get('heardFrom')),
          'Invited by': toText(data.get('invitedBy')),
          'Born again': toText(data.get('bornAgain')),
          'Baptized': toText(data.get('baptized')),
          'Wants membership': data.get('wantsMembership') ? 'Yes' : 'No',
          'Interested in ministries': interests,
          'Prayer request / comments': toText(data.get('message')),
          'Consent to contact': data.get('consent') ? 'Yes' : 'No'
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
        <h3 style={{ marginTop: 0 }}>Welcome home!</h3>
        <p style={{ margin: 0 }}>
          Thank you for connecting with us. A member of our Connect team will
          reach out personally within the next few days. We can't wait to meet
          you.
        </p>
      </div>
    )
  }

  const sending = state === 'submitting'
  const todayIso = new Date().toISOString().slice(0, 10)

  return (
    <form
      className="form visitor-form"
      onSubmit={handleSubmit}
      aria-labelledby="visitor-form-h"
    >
      <h3 id="visitor-form-h">New here? Fill in your connect card</h3>
      <p className="meta">
        Takes about two minutes. We'd love to welcome you properly.
      </p>

      {/* 1. Personal details */}
      <fieldset className="form-section">
        <legend>Personal details</legend>
        <div className="form-grid">
          <div className="field field--full">
            <label htmlFor="v-name">Full name <span className="req">*</span></label>
            <input id="v-name" name="name" type="text" required autoComplete="name" />
          </div>
          <div className="field">
            <label htmlFor="v-phone">Phone number <span className="req">*</span></label>
            <input
              id="v-phone"
              name="phone"
              type="tel"
              required
              inputMode="tel"
              pattern="[0-9+()\-\s]{7,}"
              autoComplete="tel"
            />
          </div>
          <div className="field">
            <label htmlFor="v-email">Email</label>
            <input id="v-email" name="email" type="email" autoComplete="email" />
          </div>
          <div className="field">
            <label htmlFor="v-gender">Gender</label>
            <select id="v-gender" name="gender" defaultValue="">
              <option value="" disabled>Select…</option>
              <option>Male</option>
              <option>Female</option>
              <option>Prefer not to say</option>
            </select>
          </div>
          <div className="field">
            <label htmlFor="v-age">Age range</label>
            <select id="v-age" name="ageRange" defaultValue="">
              <option value="" disabled>Select…</option>
              {AGE_RANGES.map((a) => <option key={a}>{a}</option>)}
            </select>
          </div>
          <div className="field field--full">
            <label htmlFor="v-marital">Marital status</label>
            <select id="v-marital" name="marital" defaultValue="">
              <option value="" disabled>Select…</option>
              {MARITAL.map((m) => <option key={m}>{m}</option>)}
            </select>
          </div>
        </div>
      </fieldset>

      {/* 2. Location */}
      <fieldset className="form-section">
        <legend>Where you live</legend>
        <div className="form-grid">
          <div className="field">
            <label htmlFor="v-address">Residential address or area</label>
            <input id="v-address" name="address" type="text" autoComplete="street-address" />
          </div>
          <div className="field">
            <label htmlFor="v-city">City or town</label>
            <input id="v-city" name="city" type="text" autoComplete="address-level2" />
          </div>
        </div>
      </fieldset>

      {/* 3. Visit details */}
      <fieldset className="form-section">
        <legend>About your visit</legend>
        <div className="form-grid">
          <div className="field">
            <label htmlFor="v-date">Date of visit</label>
            <input id="v-date" name="visitDate" type="date" defaultValue={todayIso} />
          </div>
          <div className="field">
            <label htmlFor="v-visit-no">Is this your…</label>
            <select id="v-visit-no" name="visitNumber" defaultValue="">
              <option value="" disabled>Select…</option>
              <option>First visit</option>
              <option>Second visit</option>
              <option>I attend regularly</option>
            </select>
          </div>
          <div className="field">
            <label htmlFor="v-heard">How did you hear about us?</label>
            <select id="v-heard" name="heardFrom" defaultValue="">
              <option value="" disabled>Select…</option>
              {HEARD_FROM.map((h) => <option key={h}>{h}</option>)}
            </select>
          </div>
          <div className="field">
            <label htmlFor="v-invited-by">Who invited you? (if anyone)</label>
            <input id="v-invited-by" name="invitedBy" type="text" />
          </div>
        </div>
      </fieldset>

      {/* 4. Spiritual background */}
      <fieldset className="form-section">
        <legend>Spiritual background</legend>
        <div className="form-grid">
          <div className="field">
            <label>Are you born again?</label>
            <div className="radio-row">
              <label><input type="radio" name="bornAgain" value="Yes" /> Yes</label>
              <label><input type="radio" name="bornAgain" value="No" /> No</label>
              <label><input type="radio" name="bornAgain" value="Not sure" /> Not sure</label>
            </div>
          </div>
          <div className="field">
            <label>Have you been baptized?</label>
            <div className="radio-row">
              <label><input type="radio" name="baptized" value="Yes" /> Yes</label>
              <label><input type="radio" name="baptized" value="No" /> No</label>
            </div>
          </div>
          <div className="field field--full">
            <label className="checkbox">
              <input type="checkbox" name="wantsMembership" value="1" />
              <span>I'd like to become a member of All Nations</span>
            </label>
          </div>
        </div>
      </fieldset>

      {/* 5. Interests */}
      <fieldset className="form-section">
        <legend>Ministries I'd like to hear about</legend>
        <div className="checkbox-grid">
          {JOINABLE_MINISTRIES.map((name) => (
            <label key={name} className="checkbox">
              <input type="checkbox" name="interests" value={name} />
              <span>{name}</span>
            </label>
          ))}
        </div>
      </fieldset>

      {/* 6. Prayer request / comments */}
      <fieldset className="form-section">
        <legend>Prayer request or comments</legend>
        <div className="field field--full">
          <label htmlFor="v-message" className="sr-only">Prayer request or comments</label>
          <textarea
            id="v-message"
            name="message"
            rows="4"
            placeholder="Share anything we can be praying for or any questions you have…"
          />
        </div>
      </fieldset>

      {/* 7. Consent */}
      <fieldset className="form-section">
        <legend className="sr-only">Consent</legend>
        <div className="field field--full">
          <label className="checkbox">
            <input type="checkbox" name="consent" value="1" required />
            <span>
              I agree to be contacted by All Nations Christian Center.
              <span className="req"> *</span>
            </span>
          </label>
        </div>
      </fieldset>

      {/* Honeypot */}
      <div className="hp" aria-hidden="true">
        <label htmlFor="v-website">Leave this field blank</label>
        <input
          id="v-website"
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

      <button type="submit" className="btn btn--primary btn--block" disabled={sending}>
        {sending ? 'Sending…' : 'Send my connect card'}
      </button>
    </form>
  )
}
