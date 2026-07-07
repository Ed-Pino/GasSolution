import { useState, useEffect } from 'react'
import { adminService } from '../../services/api'
import type { Order } from '../../types'

export default function AdminOrders() {
  const [orders, setOrders] = useState<Order[]>([])
  const [filter, setFilter] = useState('')

  useEffect(() => { load() }, [filter])

  const load = async () => {
    setOrders(await adminService.getOrders(filter || undefined))
  }

  const updateStatus = async (id: number, status: string) => {
    await adminService.updateOrderStatus(id, status)
    load()
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Pedidos</h1>

      <div className="flex gap-2 mb-4">
        <button onClick={() => setFilter('')} className={`px-3 py-1 rounded ${!filter ? 'bg-azul-energia text-white' : 'bg-gray-200'}`}>Todos</button>
        <button onClick={() => setFilter('PENDING')} className={`px-3 py-1 rounded ${filter === 'PENDING' ? 'bg-yellow-500 text-white' : 'bg-gray-200'}`}>Pendientes</button>
        <button onClick={() => setFilter('PAID')} className={`px-3 py-1 rounded ${filter === 'PAID' ? 'bg-green-600 text-white' : 'bg-gray-200'}`}>Pagados</button>
        <button onClick={() => setFilter('CONFIRMED')} className={`px-3 py-1 rounded ${filter === 'CONFIRMED' ? 'bg-azul-energia text-white' : 'bg-gray-200'}`}>Confirmados</button>
      </div>

      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-200">
            <th className="text-left p-2">#</th>
            <th className="text-left p-2">Cliente</th>
            <th className="text-left p-2">Email</th>
            <th className="text-left p-2">Dirección</th>
            <th className="text-right p-2">Total</th>
            <th className="text-center p-2">Estado</th>
            <th className="p-2"></th>
          </tr>
        </thead>
        <tbody>
          {orders.map(o => (
            <tr key={o.id} className="border-b">
              <td className="p-2">{o.id}</td>
              <td className="p-2">{o.nombre}</td>
              <td className="p-2">{o.email}</td>
              <td className="p-2 text-sm">{o.direccion}</td>
              <td className="text-right p-2 font-bold">${o.total.toLocaleString('es-CO')}</td>
              <td className="text-center p-2">
                <span className={`px-2 py-1 rounded text-xs ${
                  o.status === 'PAID' ? 'bg-green-100 text-green-800' :
                  o.status === 'CONFIRMED' ? 'bg-azul-pureza/20 text-azul-energia' : 'bg-yellow-100 text-yellow-800'
                }`}>{o.status}</span>
              </td>
              <td className="p-2">
                <select value="" onChange={e => { if (e.target.value) updateStatus(o.id, e.target.value) }}
                  className="border rounded text-sm p-1">
                  <option value="">Cambiar estado</option>
                  <option value="PAID">Pagar</option>
                  <option value="CONFIRMED">Confirmar</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {orders.length === 0 && <p className="text-center text-gray-500 py-8">No hay pedidos</p>}
    </div>
  )
}
