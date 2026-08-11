import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { AlertIcon, ArrowLeftIcon, LockIcon, ReturnIcon } from '../components/Icons'
import QuantityControl from '../components/QuantityControl'
import { arco, formatPrice } from '../data/products'

type CheckoutField = 'email' | 'firstName' | 'lastName' | 'street' | 'city' | 'postalCode'
type FormErrors = Partial<Record<CheckoutField, string>>
type DeliveryMethod = 'standard' | 'scheduled'

const labels: Record<CheckoutField, string> = {
  email: 'Email address',
  firstName: 'First name',
  lastName: 'Last name',
  street: 'Street address',
  city: 'City',
  postalCode: 'Postal code',
}

function FieldError({ id, message }: { id: string; message?: string }) {
  return message ? <p className="field-error" id={id}><AlertIcon /> {message}</p> : null
}

function formatDetailedPrice(price: number) {
  return new Intl.NumberFormat('en-IE', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(price)
}

export default function CheckoutPage() {
  const errorSummaryRef = useRef<HTMLDivElement>(null)
  const completionRef = useRef<HTMLDivElement>(null)
  const [errors, setErrors] = useState<FormErrors>({})
  const [quantity, setQuantity] = useState(1)
  const [deliveryMethod, setDeliveryMethod] = useState<DeliveryMethod>('standard')
  const [promoMessage, setPromoMessage] = useState('')
  const [completed, setCompleted] = useState(false)

  const subtotal = arco.price * quantity
  const delivery = deliveryMethod === 'scheduled' ? 24 : 0
  const total = subtotal + delivery
  const vat = total * 22 / 122

  function validate(form: HTMLFormElement) {
    const data = new FormData(form)
    const nextErrors: FormErrors = {}
    const requiredFields: CheckoutField[] = ['email', 'firstName', 'lastName', 'street', 'city', 'postalCode']

    requiredFields.forEach((field) => {
      if (!String(data.get(field) ?? '').trim()) nextErrors[field] = `Enter your ${labels[field].toLowerCase()}.`
    })

    const email = String(data.get('email') ?? '')
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      nextErrors.email = 'Enter an email address in the format name@example.com.'
    }

    const postalCode = String(data.get('postalCode') ?? '').trim()
    if (postalCode && !/^\d{5}$/.test(postalCode)) {
      nextErrors.postalCode = 'Enter a valid 5-digit postal code.'
    }

    return nextErrors
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const nextErrors = validate(event.currentTarget)
    setErrors(nextErrors)
    setCompleted(false)

    if (Object.keys(nextErrors).length > 0) {
      requestAnimationFrame(() => errorSummaryRef.current?.focus())
      return
    }

    setCompleted(true)
    requestAnimationFrame(() => completionRef.current?.focus())
  }

  function focusField(field: CheckoutField) {
    document.getElementById(field)?.focus()
  }

  function applyPromo(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setPromoMessage('This demonstration does not issue promotion codes.')
  }

  return (
    <div className="checkout-page">
      <a className="skip-link" href="#checkout-form">Skip to delivery details</a>
      <header className="checkout-header">
        <Link className="checkout-return" to="/products/arco-01"><ArrowLeftIcon /> Return to shop</Link>
        <Link className="wordmark" to="/" aria-label="LUME NOVE home">LUME NOVE</Link>
        <p><LockIcon /> Secure checkout</p>
      </header>

      <nav className="checkout-progress" aria-label="Checkout progress">
        <ol>
          <li className="is-complete"><span aria-hidden="true">✓</span> Bag</li>
          <li aria-current="step"><span aria-hidden="true">2</span> Delivery</li>
          <li><span aria-hidden="true">3</span> Payment</li>
          <li><span aria-hidden="true">4</span> Review</li>
        </ol>
      </nav>

      <main className="checkout-layout" id="main-content">
        <section className="checkout-form-section" aria-labelledby="delivery-title">
          <h1 id="delivery-title">Delivery details</h1>
          <p>Fields marked <span aria-hidden="true">*</span><span className="visually-hidden">required</span> are required.</p>

          {Object.keys(errors).length > 0 ? (
            <div className="error-summary" ref={errorSummaryRef} tabIndex={-1} role="alert" aria-labelledby="error-title">
              <AlertIcon />
              <div>
                <h2 id="error-title">Check the highlighted fields</h2>
                <ul>
                  {(Object.entries(errors) as [CheckoutField, string][]).map(([field, message]) => (
                    <li key={field}>
                      <button type="button" onClick={() => focusField(field)}>{labels[field]} — {message}</button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ) : null}

          {completed ? (
            <div className="checkout-complete" ref={completionRef} tabIndex={-1} role="status">
              <h2>Delivery details saved.</h2>
              <p>This technical demonstration stops before collecting any payment information.</p>
            </div>
          ) : null}

          <form id="checkout-form" noValidate onSubmit={handleSubmit}>
            <fieldset className="checkout-fieldset">
              <legend>Contact</legend>
              <div className="field-row single-field">
                <label htmlFor="email">Email address <span aria-hidden="true">*</span></label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  defaultValue="maria.rossi@example.com"
                  aria-invalid={errors.email ? true : undefined}
                  aria-describedby={errors.email ? 'email-error' : undefined}
                />
                <FieldError id="email-error" message={errors.email} />
              </div>
              <label className="checkbox-label">
                <input type="checkbox" name="updates" defaultChecked />
                <span>Email me delivery updates</span>
              </label>
            </fieldset>

            <fieldset className="checkout-fieldset">
              <legend>Delivery address</legend>
              <div className="field-grid">
                <div className="field-row">
                  <label htmlFor="firstName">First name <span aria-hidden="true">*</span></label>
                  <input id="firstName" name="firstName" autoComplete="given-name" defaultValue="Maria" aria-invalid={errors.firstName ? true : undefined} aria-describedby={errors.firstName ? 'first-name-error' : undefined} />
                  <FieldError id="first-name-error" message={errors.firstName} />
                </div>
                <div className="field-row">
                  <label htmlFor="lastName">Last name <span aria-hidden="true">*</span></label>
                  <input id="lastName" name="lastName" autoComplete="family-name" defaultValue="Rossi" aria-invalid={errors.lastName ? true : undefined} aria-describedby={errors.lastName ? 'last-name-error' : undefined} />
                  <FieldError id="last-name-error" message={errors.lastName} />
                </div>
                <div className="field-row field-span-2">
                  <label htmlFor="street">Street address <span aria-hidden="true">*</span></label>
                  <input id="street" name="street" autoComplete="address-line1" defaultValue="Via Manzoni, 12" aria-invalid={errors.street ? true : undefined} aria-describedby={errors.street ? 'street-error' : undefined} />
                  <FieldError id="street-error" message={errors.street} />
                </div>
                <div className="field-row field-span-2">
                  <label htmlFor="apartment">Apartment, suite, etc. (optional)</label>
                  <input id="apartment" name="apartment" autoComplete="address-line2" defaultValue="Interno 5" />
                </div>
                <div className="field-row">
                  <label htmlFor="city">City <span aria-hidden="true">*</span></label>
                  <input id="city" name="city" autoComplete="address-level2" defaultValue="Milano" aria-invalid={errors.city ? true : undefined} aria-describedby={errors.city ? 'city-error' : undefined} />
                  <FieldError id="city-error" message={errors.city} />
                </div>
                <div className="field-row">
                  <label htmlFor="postalCode">Postal code <span aria-hidden="true">*</span></label>
                  <input id="postalCode" name="postalCode" autoComplete="postal-code" inputMode="numeric" aria-invalid={errors.postalCode ? true : undefined} aria-describedby={errors.postalCode ? 'postal-error' : 'postal-hint'} />
                  <p className="field-hint" id="postal-hint">Use the 5-digit Italian format.</p>
                  <FieldError id="postal-error" message={errors.postalCode} />
                </div>
                <div className="field-row field-span-2">
                  <label htmlFor="country">Country or region <span aria-hidden="true">*</span></label>
                  <select id="country" name="country" autoComplete="country" defaultValue="IT">
                    <option value="IT">Italy</option>
                    <option value="FR">France</option>
                    <option value="DE">Germany</option>
                    <option value="ES">Spain</option>
                  </select>
                </div>
              </div>
            </fieldset>

            <fieldset className="checkout-fieldset delivery-options">
              <legend>Delivery method</legend>
              <label className={deliveryMethod === 'standard' ? 'radio-card is-selected' : 'radio-card'}>
                <input type="radio" name="delivery" value="standard" checked={deliveryMethod === 'standard'} onChange={() => setDeliveryMethod('standard')} />
                <span><strong>Standard delivery</strong><small>3–5 business days</small></span>
                <strong>Complimentary</strong>
              </label>
              <label className={deliveryMethod === 'scheduled' ? 'radio-card is-selected' : 'radio-card'}>
                <input type="radio" name="delivery" value="scheduled" checked={deliveryMethod === 'scheduled'} onChange={() => setDeliveryMethod('scheduled')} />
                <span><strong>Scheduled delivery</strong><small>Choose a preferred weekday</small></span>
                <strong>€24</strong>
              </label>
            </fieldset>

            <div className="checkout-actions">
              <button className="button button-primary" type="submit">Continue to payment</button>
              <Link className="text-link" to="/products/arco-01">Return to bag</Link>
            </div>
            <p className="encrypted-note"><LockIcon /> Your information is encrypted in transit.</p>
          </form>
        </section>

        <aside className="order-summary" aria-labelledby="summary-title">
          <h2 id="summary-title">Order summary</h2>
          <article className="summary-product">
            <img src={arco.image} alt="" width="180" height="220" />
            <div>
              <h3>{arco.name}</h3>
              <p>{arco.category} · {arco.finishes[0]}</p>
              <p>{formatPrice(arco.price * quantity)}</p>
              <QuantityControl value={quantity} onChange={setQuantity} label={`${arco.name} quantity`} />
              <Link className="text-link" to="/products/arco-01">Remove</Link>
            </div>
          </article>

          <details className="gift-note">
            <summary>Add a gift note</summary>
            <label htmlFor="gift-note">Gift message</label>
            <textarea id="gift-note" name="gift-note" rows={3} maxLength={180} />
          </details>

          <form className="promo-form" onSubmit={applyPromo}>
            <label htmlFor="promo">Gift card or promotion code</label>
            <div className="inline-field">
              <input id="promo" name="promo" />
              <button className="button button-secondary" type="submit">Apply</button>
            </div>
            <p className="form-status" role="status">{promoMessage}</p>
          </form>

          <dl className="summary-totals">
            <div><dt>Subtotal</dt><dd>{formatPrice(subtotal)}</dd></div>
            <div><dt>Delivery</dt><dd>{delivery === 0 ? 'Complimentary' : formatPrice(delivery)}</dd></div>
            <div><dt>VAT included</dt><dd>{formatDetailedPrice(vat)}</dd></div>
            <div className="summary-total"><dt>Total</dt><dd>{formatPrice(total)} EUR</dd></div>
          </dl>
          <p className="summary-assurance"><ReturnIcon /> 30-day returns · 5-year repair promise</p>
        </aside>
      </main>

      <footer className="checkout-footer">
        <nav aria-label="Checkout support"><a href="/#accessibility">Accessibility</a><a href="/#privacy">Privacy</a><a href="/#terms">Terms</a><a href="mailto:hello@lumenove.example">Contact</a></nav>
        <p>Concept checkout created for an independent accessibility engineering case study.</p>
      </footer>
    </div>
  )
}
