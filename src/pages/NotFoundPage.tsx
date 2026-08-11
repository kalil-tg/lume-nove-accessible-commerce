import { Link } from 'react-router-dom'

export default function NotFoundPage() {
  return (
    <main className="not-found" id="main-content">
      <p className="eyebrow">404 · PAGE NOT FOUND</p>
      <h1>This light is out of view.</h1>
      <p>The page may have moved, or the address may be incomplete.</p>
      <Link className="button button-primary" to="/">Return to the collection</Link>
    </main>
  )
}
