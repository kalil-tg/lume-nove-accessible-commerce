import { useState } from 'react'

const footerGroups = [
  { title: 'Shop', links: ['Lighting', 'All products', 'New arrivals'] },
  { title: 'Help', links: ['Delivery & returns', 'Care & repair', 'Accessibility', 'FAQs'] },
  { title: 'Studio', links: ['Our studio', 'Materials', 'Journal', 'Spaces'] },
  { title: 'Legal', links: ['Privacy', 'Terms'] },
]

export default function SiteFooter() {
  const [subscribed, setSubscribed] = useState(false)

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setSubscribed(true)
    event.currentTarget.reset()
  }

  return (
    <footer className="site-footer" id="journal">
      <section className="newsletter shell" aria-labelledby="newsletter-title">
        <div>
          <h2 id="newsletter-title">A slower letter about light.</h2>
          <p>New pieces, studio notes and practical guidance—sent occasionally.</p>
        </div>
        <form onSubmit={handleSubmit}>
          <label htmlFor="newsletter-email">Email address</label>
          <div className="inline-field">
            <input id="newsletter-email" type="email" autoComplete="email" required />
            <button className="button button-primary" type="submit">Subscribe</button>
          </div>
          <p className="fine-print">We respect your privacy. Unsubscribe at any time.</p>
          <p className="form-status" role="status">
            {subscribed ? 'Thank you. Check your inbox to confirm.' : ''}
          </p>
        </form>
      </section>

      <div className="footer-grid shell">
        {footerGroups.map((group) => (
          <details className="footer-group" key={group.title} open>
            <summary>{group.title}</summary>
            <ul>
              {group.links.map((link) => (
                <li key={link}>
                  <a href={`/#${link.toLowerCase().replaceAll(' ', '-')}`}>{link}</a>
                </li>
              ))}
            </ul>
          </details>
        ))}
        <div className="footer-meta">
          <label htmlFor="locale">Language and currency</label>
          <select id="locale" defaultValue="en-eur">
            <option value="en-eur">English · EUR</option>
            <option value="it-eur">Italiano · EUR</option>
          </select>
          <a href="mailto:hello@lumenove.example">hello@lumenove.example</a>
        </div>
      </div>

      <div className="footer-bottom shell">
        <p>© 2026 LUME NOVE</p>
        <p>Concept brand created for an independent accessibility engineering case study.</p>
      </div>
    </footer>
  )
}
