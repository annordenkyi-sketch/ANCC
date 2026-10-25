import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <section className="section">
      <div className="container">
        <h1>Page not found</h1>
        <p className="lede">
          The page you are looking for has moved or does not exist.
        </p>
        <Link to="/" className="btn btn--primary">Back to home</Link>
      </div>
    </section>
  )
}
