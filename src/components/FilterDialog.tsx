import type { RefObject } from 'react'
import { CloseIcon } from './Icons'

export type CategoryFilter = 'Floor lamp' | 'Pendant light' | 'Table lamp' | 'Wall light'

type FilterDialogProps = {
  dialogRef: RefObject<HTMLDialogElement | null>
  selected: CategoryFilter[]
  onToggle: (category: CategoryFilter) => void
  onClear: () => void
}

const categories: CategoryFilter[] = ['Floor lamp', 'Pendant light', 'Table lamp', 'Wall light']

export default function FilterDialog({ dialogRef, selected, onToggle, onClear }: FilterDialogProps) {
  return (
    <dialog className="filter-dialog" ref={dialogRef} aria-labelledby="filter-title">
      <div className="dialog-heading">
        <div>
          <p className="eyebrow">COLLECTION 01</p>
          <h2 id="filter-title">Filter products</h2>
        </div>
        <form method="dialog">
          <button className="icon-text-button" type="submit">
            <CloseIcon />
            Close
          </button>
        </form>
      </div>
      <fieldset className="filter-options">
        <legend>Product type</legend>
        {categories.map((category) => (
          <label key={category}>
            <input
              type="checkbox"
              checked={selected.includes(category)}
              onChange={() => onToggle(category)}
            />
            <span>{category}</span>
          </label>
        ))}
      </fieldset>
      <div className="dialog-actions">
        <button className="button button-secondary" type="button" onClick={onClear}>Clear all</button>
        <form method="dialog">
          <button className="button button-primary" type="submit">Show products</button>
        </form>
      </div>
    </dialog>
  )
}
