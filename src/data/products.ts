export type Product = {
  id: string
  name: string
  category: string
  price: number
  image: string
  alt: string
  finishes: string[]
  isNew?: boolean
}

export const products: Product[] = [
  {
    id: 'arco-01',
    name: 'Arco 01',
    category: 'Floor lamp',
    price: 590,
    image: '/images/arco-01-hero.webp',
    alt: 'Arco 01 floor lamp with a black steel arc, linen shade and pale stone base in a warm interior',
    finishes: ['Travertine / Linen', 'Verde stone / Linen', 'Nero stone / Canvas'],
  },
  {
    id: 'vela-02',
    name: 'Vela 02',
    category: 'Pendant light',
    price: 420,
    image: '/images/vela-02.webp',
    alt: 'Vela 02 pendant light with a softly folded ivory shade and brushed brass stem',
    finishes: ['Avorio linen', 'Graphite linen'],
    isNew: true,
  },
  {
    id: 'nodo-03',
    name: 'Nodo 03',
    category: 'Table lamp',
    price: 310,
    image: '/images/nodo-03.webp',
    alt: 'Nodo 03 table lamp with a pale plaster column and warm opal dome on a stone workbench',
    finishes: ['Travertine plaster', 'Verde plaster'],
  },
  {
    id: 'linea-04',
    name: 'Linea 04',
    category: 'Wall light',
    price: 270,
    image: '/images/linea-04.webp',
    alt: 'Linea 04 wall light with a vertical glowing opal cylinder and aged brass backplate',
    finishes: ['Avorio glass', 'Graphite glass'],
  },
]

export const arco = products[0] as Product

export function formatPrice(price: number) {
  return new Intl.NumberFormat('en-IE', {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: 0,
  }).format(price)
}
