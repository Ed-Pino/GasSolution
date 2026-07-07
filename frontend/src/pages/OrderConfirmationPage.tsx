import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { orderService } from '../services/api'
import type { Order } from '../types'

export default function OrderConfirmationPage() {
  const { id } = useParams<{ id: string }>()
  const [order, setOrder] = useState<Order | null>(null)

  useEffect(() => {
    if (id) orderService.getById(Number(id)).then(setOrder)
  }, [id])

  if (!order) return <p className="text-center py-8">Cargando...</p>

  return (
    <div className="py-10 max-w-2xl mx-auto px-4 text-center">
      <div className="bg-green-50 border border-green-200 rounded-2xl p-8 shadow-sm">
        <div className="text-5xl mb-4">🎉</div>
        <h1 className="text-3xl font-bold text-green-800">¡Pedido Confirmado!</h1>
        <p className="text-lg mt-2 text-gray-600">Pedido <span className="font-bold text-gray-800">#{order.id}</span></p>
        <p className="text-gray-500 mt-1 text-sm">Estado: <span className="font-semibold text-green-700">{order.status}</span></p>
        <p className="text-3xl font-bold text-green-700 mt-4">${order.total.toLocaleString('es-CO')}</p>
        <p className="text-xs text-gray-400 mt-1">Total pagado</p>
      </div>

      <div className="mt-8 text-left bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
        <h2 className="font-bold text-gray-800 mb-3">Datos de entrega</h2>
        <div className="text-sm text-gray-600 space-y-1">
          <p className="font-medium text-gray-800">{order.nombre}</p>
          <p>{order.direccion}</p>
          <p>{order.email}{order.telefono && ` · ${order.telefono}`}</p>
        </div>
      </div>

      <div className="mt-4 text-left bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
        <h2 className="font-bold text-gray-800 mb-3">Productos y Servicios</h2>
        <div className="space-y-2">
          {order.items.map(item => (
            <div key={item.id} className="flex justify-between text-sm py-2 border-b border-gray-100 last:border-0">
              <span className="text-gray-700">
                {item.itemType === 'SERVICE' ? '🛠️' : '📦'}{' '}
                {item.itemType === 'SERVICE' ? 'Servicio' : 'Producto'} #{item.itemId}
                {item.quantity > 1 && <span className="text-gray-400"> x{item.quantity}</span>}
              </span>
              <span className="font-semibold">${(item.price * item.quantity).toLocaleString('es-CO')}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6">
        {order.items.some(i => i.itemType === 'SERVICE') && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-4 mb-5 text-sm text-yellow-800">
            ⏳ Tu servicio técnico fue registrado. El equipo te contactará para agendar la visita.
          </div>
        )}
        <Link to="/products" className="inline-block bg-blue-800 hover:bg-blue-900 text-white font-semibold px-8 py-3 rounded-full transition-colors">
          Seguir Comprando
        </Link>
      </div>
    </div>
  )
}
