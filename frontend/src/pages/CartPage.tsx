import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'

const IVA_RATE = 0.19

export default function CartPage() {
  const { items, total, count, updateItem, removeItem } = useCart()

  const subtotal = Math.round(total / (1 + IVA_RATE))
  const iva = total - subtotal

  if (items.length === 0) {
    return (
      <div className="text-center py-24 px-6">
        <span className="text-7xl block mb-6">🛒</span>
        <h1 className="text-3xl font-bold text-blue-900 mb-3">Tu carrito está vacío</h1>
        <p className="text-gray-500 mb-8">Agrega productos o servicios para continuar</p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link to="/products" className="bg-blue-800 hover:bg-blue-900 text-white font-semibold px-8 py-3 rounded-full transition-colors">
            Ver Productos
          </Link>
          <Link to="/services" className="bg-green-700 hover:bg-green-800 text-white font-semibold px-8 py-3 rounded-full transition-colors">
            Ver Servicios
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="py-10 px-4 max-w-4xl mx-auto">
      {/* Step indicator */}
      <div className="flex items-center gap-2 text-sm mb-8 text-gray-500">
        <span className="font-semibold text-blue-800 bg-blue-100 rounded-full px-3 py-0.5">1. Carrito</span>
        <span className="text-gray-300">→</span>
        <span>2. Datos de entrega</span>
        <span className="text-gray-300">→</span>
        <span>3. Confirmación</span>
      </div>

      <h1 className="text-3xl font-bold text-blue-900 mb-6">
        Carrito
        <span className="ml-2 text-base font-normal text-gray-500">({count} {count === 1 ? 'item' : 'items'})</span>
      </h1>

      <div className="grid md:grid-cols-3 gap-8">
        {/* Items list */}
        <div className="md:col-span-2 space-y-3">
          {items.map(item => (
            <div key={item.id} className="bg-white border border-gray-200 rounded-2xl p-4 flex items-center gap-4 shadow-sm">
              <div
                className={`h-14 w-14 rounded-xl flex items-center justify-center text-2xl shrink-0 ${
                  item.itemType === 'SERVICE' ? 'bg-green-50' : 'bg-blue-50'
                }`}
              >
                {item.itemType === 'SERVICE' ? '🛠️' : '📦'}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-gray-800 truncate">{item.nombre}</h3>
                <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                  item.itemType === 'SERVICE'
                    ? 'bg-green-100 text-green-700'
                    : 'bg-blue-100 text-blue-700'
                }`}>
                  {item.itemType === 'SERVICE' ? 'Servicio' : 'Producto'}
                </span>
                <p className="text-green-700 text-sm font-semibold mt-0.5">
                  ${item.precioUnitario.toLocaleString('es-CO')} c/u
                </p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => updateItem(item.id, item.quantity - 1)}
                  className="bg-gray-100 hover:bg-gray-200 text-gray-700 w-8 h-8 rounded-full font-bold transition-colors"
                >
                  −
                </button>
                <span className="w-6 text-center font-semibold">{item.quantity}</span>
                <button
                  onClick={() => updateItem(item.id, item.quantity + 1)}
                  className="bg-gray-100 hover:bg-gray-200 text-gray-700 w-8 h-8 rounded-full font-bold transition-colors"
                >
                  +
                </button>
              </div>
              <p className="text-base font-bold text-gray-800 w-24 text-right shrink-0">
                ${item.subtotal.toLocaleString('es-CO')}
              </p>
              <button
                onClick={() => removeItem(item.id)}
                className="text-gray-300 hover:text-red-500 transition-colors shrink-0 ml-1"
                aria-label="Eliminar"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          ))}
        </div>

        {/* Order summary */}
        <div className="md:col-span-1">
          <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm sticky top-20">
            <h2 className="font-bold text-lg text-gray-800 mb-4">Resumen</h2>
            <div className="space-y-2 text-sm text-gray-600">
              <div className="flex justify-between">
                <span>Subtotal (sin IVA)</span>
                <span>${subtotal.toLocaleString('es-CO')}</span>
              </div>
              <div className="flex justify-between">
                <span>IVA (19%)</span>
                <span>${iva.toLocaleString('es-CO')}</span>
              </div>
            </div>
            <div className="border-t border-gray-100 mt-4 pt-4 flex justify-between font-bold text-lg text-gray-900">
              <span>Total</span>
              <span>${total.toLocaleString('es-CO')}</span>
            </div>
            <Link
              to="/checkout"
              className="block w-full mt-6 bg-green-700 hover:bg-green-800 text-white text-center font-bold py-3 rounded-full transition-colors"
            >
              Continuar →
            </Link>
            <Link
              to="/products"
              className="block w-full mt-3 text-center text-sm text-blue-700 hover:text-blue-900 transition-colors"
            >
              Seguir comprando
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
