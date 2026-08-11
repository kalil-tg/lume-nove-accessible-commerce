import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { BagIcon, CloseIcon, MenuIcon, SearchIcon, UserIcon } from './Icons'

type SiteHeaderProps = {
  bagCount?: number
}

export default function SiteHeader({ bagCount = 0 }: SiteHeaderProps) {
  const searchDialogRef = useRef<HTMLDialogElement>(null)
  const accountDialogRef = useRef<HTMLDialogElement>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [submittedQuery, setSubmittedQuery] = useState('')

  function handleSearch(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setSubmittedQuery(searchQuery.trim())
  }

  return (
    <>
      <a className="skip-link" href="#products">
        Skip to products
      </a>
      <p className="announcement">Complimentary EU delivery on orders over €250</p>
      <header className="site-header">
        <div className="mobile-menu">
          <details>
            <summary>
              <MenuIcon />
              <span>Menu</span>
            </summary>
            <nav aria-label="Mobile navigation">
              <a href="/#products">Lighting</a>
              <a href="/#spaces">Spaces</a>
              <a href="/#journal">Journal</a>
              <a href="/#studio">Our studio</a>
            </nav>
          </details>
        </div>

        <nav className="primary-nav" aria-label="Primary navigation">
          <a href="/#products">Lighting</a>
          <a href="/#spaces">Spaces</a>
          <a href="/#journal">Journal</a>
          <a href="/#studio">Our studio</a>
        </nav>

        <Link className="wordmark" to="/" aria-label="LUME NOVE home">
          LUME NOVE
        </Link>

        <div className="header-actions">
          <button
            className="header-action search-trigger"
            type="button"
            onClick={() => searchDialogRef.current?.showModal()}
          >
            <SearchIcon />
            <span>Search</span>
          </button>
          <button
            className="header-action account-trigger"
            type="button"
            onClick={() => accountDialogRef.current?.showModal()}
          >
            <UserIcon />
            <span>Account</span>
          </button>
          <Link className="header-action" to={bagCount > 0 ? '/checkout' : '/products/arco-01'}>
            <BagIcon />
            <span className="bag-label-full">Bag, {bagCount} {bagCount === 1 ? 'item' : 'items'}</span>
            <span className="bag-label-short" aria-hidden="true">Bag, {bagCount}</span>
          </Link>
        </div>
      </header>

      <dialog className="utility-dialog" ref={searchDialogRef} aria-labelledby="search-title">
        <div className="dialog-heading">
          <h2 id="search-title">Search the collection</h2>
          <form method="dialog">
            <button className="icon-text-button" type="submit">
              <CloseIcon />
              Close
            </button>
          </form>
        </div>
        <form className="search-form" onSubmit={handleSearch}>
          <label htmlFor="site-search">Product name or category</label>
          <div className="inline-field">
            <input
              id="site-search"
              type="search"
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              autoFocus
            />
            <button className="button button-primary" type="submit">
              Search
            </button>
          </div>
        </form>
        <div className="search-response" aria-live="polite">
          {submittedQuery ? (
            <p>
              Best match for “{submittedQuery}”: <Link to="/products/arco-01">Arco 01 floor lamp</Link>
            </p>
          ) : (
            <p>Try “floor lamp”, “Arco”, or “repair”.</p>
          )}
        </div>
      </dialog>

      <dialog className="utility-dialog" ref={accountDialogRef} aria-labelledby="account-title">
        <div className="dialog-heading">
          <div>
            <p className="eyebrow">DEMONSTRATION ACCOUNT</p>
            <h2 id="account-title">Your studio account</h2>
          </div>
          <form method="dialog">
            <button className="icon-text-button" type="submit">
              <CloseIcon />
              Close
            </button>
          </form>
        </div>
        <p>This case-study storefront does not collect account credentials.</p>
        <a className="text-link" href="mailto:hello@lumenove.example">
          Request product details by email
        </a>
      </dialog>
    </>
  )
}
