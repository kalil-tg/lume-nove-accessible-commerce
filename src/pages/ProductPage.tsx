import { useRef, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import CartDrawer from '../components/CartDrawer'
import { ArrowLeftIcon, ArrowRightIcon, HeartIcon, ReturnIcon, ShieldIcon, TruckIcon } from '../components/Icons'
import ProductCard from '../components/ProductCard'
import QuantityControl from '../components/QuantityControl'
import SiteFooter from '../components/SiteFooter'
import SiteHeader from '../components/SiteHeader'
import { formatPrice, products } from '../data/products'
import NotFoundPage from './NotFoundPage'

const productCopy: Record<string, string> = {
  'arco-01': 'A quiet arc of blackened steel, grounded in travertine and softened by a hand-finished linen shade.',
  'vela-02': 'A softly folded linen form that turns overhead light into a warm, architectural glow.',
  'nodo-03': 'A compact study in plaster and opal glass, made for desks, shelves and low evening light.',
  'linea-04': 'A slender wall light that washes plaster and stone with a calm, even glow.',
}

export default function ProductPage() {
  const { productId } = useParams()
  const product = products.find((item) => item.id === productId)
  const cartDialogRef = useRef<HTMLDialogElement>(null)
  const [quantity, setQuantity] = useState(1)
  const [finish, setFinish] = useState(product?.finishes[0] ?? '')
  const [saved, setSaved] = useState(false)
  const [galleryIndex, setGalleryIndex] = useState(0)
  const [cartStatus, setCartStatus] = useState('')

  if (!product) return <NotFoundPage />

  const gallery = product.id === 'arco-01'
    ? [
        { src: product.image, alt: product.alt, label: 'Room view' },
        { src: '/images/arco-01-detail.webp', alt: 'Close view of the Arco 01 linen shade, brass collar and black steel arc', label: 'Material detail' },
      ]
    : [{ src: product.image, alt: product.alt, label: 'Product view' }]

  const currentImage = gallery[galleryIndex] ?? gallery[0]!
  const related = products.filter((item) => item.id !== product.id).slice(0, 2)

  function moveGallery(direction: -1 | 1) {
    setGalleryIndex((current) => (current + direction + gallery.length) % gallery.length)
  }

  function addToBag() {
    setCartStatus(`${product?.name ?? 'Product'} added to bag.`)
    cartDialogRef.current?.showModal()
  }

  function removeFromBag() {
    cartDialogRef.current?.close()
    setQuantity(1)
    setCartStatus(`${product?.name ?? 'Product'} removed from bag.`)
  }

  return (
    <div className="page-shell">
      <SiteHeader bagCount={1} />
      <main id="main-content" className="product-page">
        <nav className="breadcrumbs shell" aria-label="Breadcrumb">
          <ol>
            <li><Link to="/">Lighting</Link></li>
            <li><a href="/#products">{product.category}s</a></li>
            <li aria-current="page">{product.name}</li>
          </ol>
        </nav>

        <section className="product-detail shell" aria-labelledby="product-title">
          <div className="product-gallery">
            <div className="gallery-thumbnails" aria-label="Product images">
              {gallery.map((image, index) => (
                <button
                  type="button"
                  key={image.src}
                  className={index === galleryIndex ? 'is-current' : ''}
                  aria-pressed={index === galleryIndex}
                  onClick={() => setGalleryIndex(index)}
                >
                  <img src={image.src} alt="" width="120" height="120" />
                  <span>{image.label}</span>
                </button>
              ))}
            </div>
            <div className="gallery-main">
              <img src={currentImage.src} alt={currentImage.alt} width="1536" height="1024" />
              {gallery.length > 1 ? (
                <div className="gallery-arrows">
                  <button type="button" onClick={() => moveGallery(-1)}><ArrowLeftIcon /><span>Previous image</span></button>
                  <button type="button" onClick={() => moveGallery(1)}><span>Next image</span><ArrowRightIcon /></button>
                </div>
              ) : null}
            </div>
          </div>

          <div className="product-info">
            <p className="eyebrow">{product.category.toUpperCase()} · COLLECTION 01</p>
            <h1 id="product-title">{product.name}</h1>
            <p className="product-detail-price">{formatPrice(product.price)}</p>
            <p className="product-description">{productCopy[product.id]}</p>
            <p className="made-status">Made to order · Dispatches in 2–3 weeks</p>

            <fieldset className="finish-options">
              <legend>Finish</legend>
              {product.finishes.map((item, index) => (
                <label key={item}>
                  <input
                    type="radio"
                    name="finish"
                    value={item}
                    checked={finish === item}
                    onChange={() => setFinish(item)}
                  />
                  <span className={`finish-swatch finish-${index + 1}`} aria-hidden="true" />
                  <span>{item}</span>
                </label>
              ))}
            </fieldset>

            <div className="product-quantity">
              <span id="quantity-label">Quantity</span>
              <QuantityControl value={quantity} onChange={setQuantity} label="Product quantity" />
            </div>

            <button className="button button-primary add-to-bag" type="button" onClick={addToBag}>
              Add to bag — {formatPrice(product.price * quantity)}
            </button>
            <button
              className="save-button"
              type="button"
              aria-pressed={saved}
              onClick={() => setSaved((current) => !current)}
            >
              <HeartIcon /> {saved ? 'Saved for later' : 'Save for later'}
            </button>
            <p className="visually-hidden" role="status">{cartStatus}</p>

            <ul className="product-assurances">
              <li><ShieldIcon /> 5-year repair promise</li>
              <li><ReturnIcon /> 30-day returns</li>
              <li><TruckIcon /> EU-wide delivery</li>
            </ul>

            <div className="product-accordions" id="materials">
              <details open>
                <summary>Dimensions & materials</summary>
                <dl>
                  <div><dt>Overall height</dt><dd>165 cm</dd></div>
                  <div><dt>Shade diameter</dt><dd>35 cm</dd></div>
                  <div><dt>Materials</dt><dd>Blackened steel, stone, linen</dd></div>
                  <div><dt>Cable</dt><dd>200 cm, fabric covered</dd></div>
                </dl>
              </details>
              <details><summary>Light & compatibility</summary><p>E27 fitting. Dimmable bulb supported when paired with a compatible wall dimmer.</p></details>
              <details><summary>Delivery & installation</summary><p>Base and stem arrive in protective reusable sections with illustrated assembly guidance.</p></details>
              <details><summary>Care & repair</summary><p>Dust with a dry soft cloth. Components can be serviced individually through our repair programme.</p></details>
            </div>
            <aside className="format-callout">
              <p>Need a measurement in another format?</p>
              <a className="text-link" href="mailto:hello@lumenove.example?subject=Accessible product details">Request product details</a>
            </aside>
          </div>
        </section>

        <section className="repair-story shell" aria-labelledby="repair-title">
          <div>
            <p className="eyebrow">CARE & REPAIR</p>
            <h2 id="repair-title">Built around repair, not replacement.</h2>
            <p>Each piece comes apart into serviceable sections, so worn components can be restored without discarding the whole lamp.</p>
            <a className="text-link" href="#studio">Inside our workshop</a>
          </div>
          <img src="/images/workshop.webp" alt="Artisan preparing a plaster lamp component for assembly" width="1536" height="1024" loading="lazy" />
        </section>

        <section className="related-products shell" aria-labelledby="related-title">
          <h2 id="related-title">Complete the room</h2>
          <div className="related-grid">
            {related.map((item) => <ProductCard product={item} key={item.id} />)}
          </div>
        </section>
      </main>
      <SiteFooter />
      <CartDrawer
        dialogRef={cartDialogRef}
        product={product}
        quantity={quantity}
        onQuantityChange={setQuantity}
        onRemove={removeFromBag}
      />
    </div>
  )
}
