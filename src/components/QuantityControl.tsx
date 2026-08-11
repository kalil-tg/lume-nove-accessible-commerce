import { MinusIcon, PlusIcon } from './Icons'

type QuantityControlProps = {
  value: number
  onChange: (value: number) => void
  label?: string
}

export default function QuantityControl({ value, onChange, label = 'Quantity' }: QuantityControlProps) {
  return (
    <div className="quantity-control" role="group" aria-label={label}>
      <button type="button" onClick={() => onChange(Math.max(1, value - 1))} aria-label="Decrease quantity">
        <MinusIcon />
      </button>
      <output aria-live="polite" aria-label={`${label}: ${value}`}>{value}</output>
      <button type="button" onClick={() => onChange(value + 1)} aria-label="Increase quantity">
        <PlusIcon />
      </button>
    </div>
  )
}
