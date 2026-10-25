import { useEffect, useRef, useState } from 'react'
import { NavLink, Link, useLocation } from 'react-router-dom'
import { site } from '../data/site.js'
import { ministries, ministryGroups } from '../data/ministries.js'

export default function Header() {
  const [open, setOpen] = useState(false)
  const [ddOpen, setDdOpen] = useState(false)
  const ddRef = useRef(null)
  const location = useLocation()

  useEffect(() => {
    setOpen(false)
    setDdOpen(false)
  }, [location.pathname])

  useEffect(() => {
    function onClick(e) {
      if (ddRef.current && !ddRef.current.contains(e.target)) setDdOpen(false)
    }
    function onKey(e) {
      if (e.key === 'Escape') setDdOpen(false)
    }
    document.addEventListener('mousedown', onClick)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onClick)
      document.removeEventListener('keydown', onKey)
    }
  }, [])

  return (
    <header className="site-header">
      <div className="container">
        <Link to="/" className="brand" aria-label={`${site.name} home`}>
          <img
            className="brand-logo"
            src="/logo.jpg"
            alt=""
            width="40"
            height="40"
            decoding="async"
          />
          <span>
            {site.shortName}
            <small> &middot; Christian Center</small>
          </span>
        </Link>

        <button
          className="menu-toggle"
          aria-expanded={open}
          aria-controls="primary-nav"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? 'Close' : 'Menu'}
        </button>

        <nav
          id="primary-nav"
          className={`nav ${open ? 'open' : ''}`}
          aria-label="Primary"
        >
          <ul>
            <li>
              <NavLink to="/" end>Home</NavLink>
            </li>
            <li>
              <NavLink to="/about">About</NavLink>
            </li>
            <li ref={ddRef} className={`dropdown ${ddOpen ? 'open' : ''}`}>
              <button
                aria-haspopup="true"
                aria-expanded={ddOpen}
                onClick={() => setDdOpen((v) => !v)}
              >
                Ministries <span className="dropdown-caret" aria-hidden="true">▾</span>
              </button>
              <div className="dropdown-panel" role="menu">
                <div className="dropdown-groups">
                  {ministryGroups.map((group) => (
                    <div className="dropdown-group" key={group.id}>
                      <h4>{group.label}</h4>
                      <ul>
                        {ministries
                          .filter((m) => m.group === group.id)
                          .map((m) => (
                            <li key={m.slug}>
                              <Link to={`/ministries/${m.slug}`}>{m.name}</Link>
                            </li>
                          ))}
                      </ul>
                    </div>
                  ))}
                </div>
                <div className="dropdown-footer">
                  <Link to="/ministries">See all ministries</Link>
                </div>
              </div>
            </li>
            <li>
              <NavLink to="/events">Events</NavLink>
            </li>
            <li>
              <NavLink to="/connect">Connect</NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}
