import { useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import FilterDialog, { type CategoryFilter } from '../components/FilterDialog'
import { ShieldIcon, SlidersIcon, TruckIcon, ReturnIcon } from '../components/Icons'
import ProductCard from '../components/ProductCard'
import SiteFooter from '../components/SiteFooter'
import SiteHeader from '../components/SiteHeader'
import { products } from '../data/products'

type SortOption = 'featured' | 'price-asc' | 'price-desc'

export default function HomePage() {
  const filterDialogRef = useRef<HTMLDialogElement>(null)
  const [selectedCategories, setSelectedCategories] = useState<CategoryFilter[]>([])
  const [sort, setSort] = useState<SortOption>('featured')

  const visibleProducts = useMemo(() => {
    const filtered = selectedCategories.length === 0
      ? [...products]
      : products.filter((product) => selectedCategories.includes(product.category as CategoryFilter))

    if (sort === 'price-asc') return filtered.sort((a, b) => a.price - b.price)
    if (sort === 'price-desc') return filtered.sort((a, b) => b.price - a.price)
    return filtered
  }, [selectedCategories, sort])

  function toggleCategory(category: CategoryFilter) {
    setSelectedCategories((current) => current.includes(category)
      ? current.filter((item) => item !== category)
      : [...current, category])
  }

  return (
    <div className="page-shell">
      <SiteHeader />
      <main id="main-content">
        <section className="hero" aria-labelledby="hero-title">
          <div className="hero-copy">
            <p className="eyebrow">MILANO · COLLECTION 01</p>
            <h1 id="hero-title">Light, shaped for everyday rituals.</h1>
            <p className="hero-intro">Sculptural lighting designed in small runs, built to soften rooms and outlast trends.</p>
            <div className="hero-actions">
              <a className="button button-primary" href="#products">Explore the collection</a>
              <a className="text-link" href="#studio">Meet the makers</a>
            </div>
          </div>
          <Link className="hero-image" to="/products/arco-01" aria-label="View Arco 01 floor lamp">
            <img
              src="/images/arco-01-hero.webp"
              alt="Arco 01 floor lamp illuminating a warm plaster and stone living room"
              width="1536"
              height="1024"
              fetchPriority="high"
            />
            <span>Arco 01 · Floor lamp · €590</span>
          </Link>
        </section>

        <section className="collection shell" id="products" tabIndex={-1} aria-labelledby="collection-title">
          <div className="section-heading">
            <div>
              <h2 id="collection-title">The first collection</h2>
              <p>Four forms. One warm vocabulary.</p>
            </div>
          </div>

          <div className="collection-toolbar" aria-label="Product controls">
            <button
              className="button button-filter"
              type="button"
              onClick={() => filterDialogRef.current?.showModal()}
              aria-haspopup="dialog"
            >
              <SlidersIcon />
              Filter products
              {selectedCategories.length > 0 ? <span className="filter-count">{selectedCategories.length}</span> : null}
            </button>
            <label className="sort-control">
              <span>Sort by</span>
              <select value={sort} onChange={(event) => setSort(event.target.value as SortOption)}>
                <option value="featured">Featured</option>
                <option value="price-asc">Price, low to high</option>
                <option value="price-desc">Price, high to low</option>
              </select>
            </label>
            <p className="result-count" aria-live="polite">
              {visibleProducts.length} {visibleProducts.length === 1 ? 'product' : 'products'}
            </p>
          </div>

          {visibleProducts.length > 0 ? (
            <div className="product-grid">
              {visibleProducts.map((product) => <ProductCard key={product.id} product={product} />)}
            </div>
          ) : (
            <div className="empty-state" role="status">
              <h3>No pieces match those filters.</h3>
              <button className="text-button" type="button" onClick={() => setSelectedCategories([])}>Clear filters</button>
            </div>
          )}
        </section>

        <section className="craft-section" id="studio" aria-labelledby="craft-title">
          <img
            src="/images/workshop.webp"
            alt="Artisan hand-finishing a pale plaster lamp base at a stone workbench"
            width="1536"
            height="1024"
            loading="lazy"
          />
          <div className="craft-copy">
            <p className="eyebrow">MADE IN SMALL RUNS</p>
            <h2 id="craft-title">Materials that become warmer with time.</h2>
            <p>Brushed brass, hand-cast plaster and mouth-blown glass. Chosen for repairability, patina and a quieter kind of permanence.</p>
            <a className="text-link" href="#materials">Inside our workshop</a>
          </div>
        </section>

        <section className="assurance-strip shell" aria-label="Purchase assurances">
          <article>
            <ShieldIcon />
            <div><h2>5-year repair promise</h2><p>Long-term care and replacement parts for every piece.</p></div>
          </article>
          <article>
            <TruckIcon />
            <div><h2>EU-wide delivery</h2><p>Carefully packed and delivered across the European Union.</p></div>
          </article>
          <article>
            <ReturnIcon />
            <div><h2>30-day returns</h2><p>Changed your mind? Return it within 30 days.</p></div>
          </article>
        </section>
      </main>
      <SiteFooter />
      <FilterDialog
        dialogRef={filterDialogRef}
        selected={selectedCategories}
        onToggle={toggleCategory}
        onClear={() => setSelectedCategories([])}
      />
    </div>
  )
}
