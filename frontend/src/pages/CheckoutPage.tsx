import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { orderService } from '../services/api'
import { useCart } from '../context/CartContext'

const IVA_RATE = 0.19

const inputClass =
  'border border-gray-300 rounded-xl w-full px-4 py-2.5 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-sm'

export default function CheckoutPage() {
  const navigate = useNavigate()
  const { items, total, clear } = useCart()
  const [form, setForm] = useState({ nombre: '', email: '', telefono: '', direccion: '' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const subtotal = Math.round(total / (1 + IVA_RATE))
  const iva = total - subtotal

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const order = await orderService.checkout(form)
      const paid = await orderService.pay(order.id)
      clear()
      navigate(`/order/${paid.id}`)
    } catch (err: unknown) {
      const anyErr = err as { response?: { data?: { error?: string } } }
      setError(anyErr.response?.data?.error || 'Error al procesar el pedido')
    } finally {
      setLoading(false)
    }
  }

  if (items.length === 0) {
    navigate('/cart')
    return null
  }

  return (
    <div className="py-10 px-4 max-w-4xl mx-auto">
      {/* Step indicator */}
      <div className="flex items-center gap-2 text-sm mb-8 text-gray-500">
        <Link to="/cart" className="hover:text-blue-700 transition-colors">1. Carrito</Link>
        <span className="text-gray-300">→</span>
        <span className="font-semibold text-blue-800 bg-blue-100 rounded-full px-3 py-0.5">2. Datos de entrega</span>
        <span className="text-gray-300">→</span>
        <span>3. Confirmación</span>
      </div>

      <h1 className="text-3xl font-bold text-blue-900 mb-8">Datos de Entrega</h1>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl mb-6 text-sm">
          {error}
        </div>
      )}

      <div className="grid md:grid-cols-5 gap-8">
        {/* Form — 3 cols */}
        <form onSubmit={handleSubmit} className="md:col-span-3 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nombre completo *</label>
            <input
              required
              value={form.nombre}
              onChange={e => setForm({ ...form, nombre: e.target.value })}
              className={inputClass}
              placeholder="Tu nombre completo"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
            <input
              required
              type="email"
              value={form.email}
              onChange={e => setForm({ ...form, email: e.target.value })}
              className={inputClass}
              placeholder="correo@ejemplo.com"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Teléfono</label>
            <input
              value={form.telefono}
              onChange={e => setForm({ ...form, telefono: e.target.value })}
              className={inputClass}
              placeholder="310 000 0000"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Dirección de entrega *</label>
            <input
              required
              value={form.direccion}
              onChange={e => setForm({ ...form, direccion: e.target.value })}
              className={inputClass}
              placeholder="Calle 00 # 00-00, Bogotá, localidad..."
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-700 hover:bg-green-800 disabled:bg-gray-400 text-white py-3.5 rounded-full font-bold text-lg transition-colors mt-2"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                </svg>
                Procesando...
              </span>
            ) : (
              `Confirmar Pedido · $${total.toLocaleString('es-CO')}`
            )}
          </button>
          <p className="text-xs text-gray-400 text-center">Pago simulado — no se requiere tarjeta</p>
        </form>

        {/* Summary — 2 cols */}
        <div className="md:col-span-2">
          <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm sticky top-20">
            <h2 className="font-bold text-gray-800 mb-4">Tu Pedido</h2>
            <div className="space-y-2 text-sm text-gray-600 max-h-52 overflow-y-auto pr-1">
              {items.map(item => (
                <div key={item.id} className="flex justify-between gap-2">
                  <span className="truncate">
                    {item.nombre}
                    {item.quantity > 1 && <span className="text-gray-400"> x{item.quantity}</span>}
                  </span>
                  <span className="shrink-0">${item.subtotal.toLocaleString('es-CO')}</span>
                </div>
              ))}
            </div>
            <div className="border-t border-gray-100 mt-4 pt-4 space-y-2 text-sm text-gray-600">
              <div className="flex justify-between">
                <span>Subtotal (sin IVA)</span>
                <span>${subtotal.toLocaleString('es-CO')}</span>
              </div>
              <div className="flex justify-between">
                <span>IVA (19%)</span>
                <span>${iva.toLocaleString('es-CO')}</span>
              </div>
            </div>
            <div className="border-t border-gray-100 mt-3 pt-3 flex justify-between font-bold text-lg text-gray-900">
              <span>Total</span>
              <span>${total.toLocaleString('es-CO')}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
