import { Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Layout from './components/Layout.jsx'
import Home from './pages/Home.jsx'
import About from './pages/About.jsx'
import Ministries from './pages/Ministries.jsx'
import MinistryPage from './pages/MinistryPage.jsx'
import Events from './pages/Events.jsx'
import EventPage from './pages/EventPage.jsx'
import Connect from './pages/Connect.jsx'
import NotFound from './pages/NotFound.jsx'

function ScrollToTop() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    if (hash) {
      // Wait a frame so the target section has mounted
      const id = hash.slice(1)
      requestAnimationFrame(() => {
        const el = document.getElementById(id)
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
        else window.scrollTo({ top: 0, behavior: 'instant' })
      })
      return
    }
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [pathname, hash])
  return null
}

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/ministries" element={<Ministries />} />
          <Route path="/ministries/:slug" element={<MinistryPage />} />
          <Route path="/events" element={<Events />} />
          <Route path="/events/:slug" element={<EventPage />} />
          <Route path="/connect" element={<Connect />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </>
  )
}
