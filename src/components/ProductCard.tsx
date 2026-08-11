import { Link } from 'react-router-dom'
import type { Product } from '../data/products'
import { formatPrice } from '../data/products'

type ProductCardProps = {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <article className="product-card">
      <div className="product-image-wrap">
        {product.isNew ? <span className="product-badge">NEW</span> : null}
        <img src={product.image} alt={product.alt} loading="lazy" width="1200" height="1500" />
      </div>
      <div className="product-card-body">
        <div>
          <h3><Link to={`/products/${product.id}`}>{product.name}</Link></h3>
          <p>{product.category}</p>
        </div>
        <p className="product-price">{formatPrice(product.price)}</p>
        <p className="finish-list"><span>Finishes:</span> {product.finishes.join(' · ')}</p>
        <Link className="text-link product-link" to={`/products/${product.id}`}>
          View details
        </Link>
      </div>
    </article>
  )
}
