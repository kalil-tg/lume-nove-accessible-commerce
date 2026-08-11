import type { RefObject } from 'react'
import { Link } from 'react-router-dom'
import type { Product } from '../data/products'
import { formatPrice } from '../data/products'
import { CheckIcon, CloseIcon, TruckIcon } from './Icons'
import QuantityControl from './QuantityControl'

type CartDrawerProps = {
  dialogRef: RefObject<HTMLDialogElement | null>
  product: Product
  quantity: number
  onQuantityChange: (value: number) => void
  onRemove: () => void
}

export default function CartDrawer({
  dialogRef,
  product,
  quantity,
  onQuantityChange,
  onRemove,
}: CartDrawerProps) {
  const total = product.price * quantity

  return (
    <dialog className="cart-drawer" ref={dialogRef} aria-labelledby="cart-title">
      <div className="cart-drawer-inner">
        <div className="dialog-heading cart-heading">
          <h2 id="cart-title">Added to your bag</h2>
          <form method="dialog">
            <button className="icon-text-button" type="submit" autoFocus>
              <CloseIcon />
              Close bag
            </button>
          </form>
        </div>

        <p className="cart-success"><CheckIcon /> {product.name} was added.</p>

        <article className="cart-line-item">
          <img src={product.image} alt="" width="180" height="220" />
          <div>
            <h3>{product.name}</h3>
            <p>{product.category} · {product.finishes[0]}</p>
            <p className="cart-price">{formatPrice(total)}</p>
            <QuantityControl value={quantity} onChange={onQuantityChange} label={`${product.name} quantity`} />
            <button className="text-button" type="button" onClick={onRemove}>Remove</button>
          </div>
        </article>

        <div className="delivery-progress">
          <p><TruckIcon /> You qualify for complimentary EU delivery.</p>
          <div className="progress-track" aria-hidden="true"><span /></div>
        </div>

        <dl className="cart-totals">
          <div><dt>Subtotal</dt><dd>{formatPrice(total)}</dd></div>
          <div><dt>Delivery</dt><dd>Calculated at checkout</dd></div>
        </dl>

        <div className="cart-actions">
          <Link className="button button-primary" to="/checkout">Checkout securely</Link>
          <Link className="button button-secondary" to="/checkout">View bag</Link>
        </div>
        <p className="cart-assurance">30-day returns · 5-year repair promise</p>
      </div>
    </dialog>
  )
}
