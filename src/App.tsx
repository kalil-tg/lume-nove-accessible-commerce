import { Route, Routes } from 'react-router-dom'
import CheckoutPage from './pages/CheckoutPage'
import HomePage from './pages/HomePage'
import ProductPage from './pages/ProductPage'
import NotFoundPage from './pages/NotFoundPage'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/products/:productId" element={<ProductPage />} />
      <Route path="/checkout" element={<CheckoutPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  )
}
