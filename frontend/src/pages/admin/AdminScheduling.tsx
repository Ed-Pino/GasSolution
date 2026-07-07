import { useState, useEffect } from 'react'
import { adminService } from '../../services/api'
import type { Scheduling } from '../../types'

export default function AdminScheduling() {
  const [schedulings, setSchedulings] = useState<Scheduling[]>([])
  const [filter, setFilter] = useState('')

  useEffect(() => { load() }, [filter])

  const load = async () => {
    setSchedulings(await adminService.getScheduling(filter || undefined))
  }

  const schedule = async (id: number) => {
    const fecha = prompt('Fecha y hora (YYYY-MM-DDTHH:mm):')
    if (!fecha) return
    const tecnico = prompt('Nombre del técnico:')
    if (!tecnico) return
    await adminService.updateScheduling(id, {
      fechaAsignada: fecha,
      tecnico,
      estado: 'SCHEDULED',
    })
    load()
  }

  const complete = async (id: number) => {
    await adminService.updateScheduling(id, { estado: 'COMPLETED' })
    load()
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Agenda de Visitas Técnicas</h1>

      <div className="flex gap-2 mb-4">
        <button onClick={() => setFilter('')} className={`px-3 py-1 rounded ${!filter ? 'bg-azul-energia text-white' : 'bg-gray-200'}`}>Todas</button>
        <button onClick={() => setFilter('PENDING')} className={`px-3 py-1 rounded ${filter === 'PENDING' ? 'bg-yellow-500 text-white' : 'bg-gray-200'}`}>Pendientes</button>
        <button onClick={() => setFilter('SCHEDULED')} className={`px-3 py-1 rounded ${filter === 'SCHEDULED' ? 'bg-azul-energia text-white' : 'bg-gray-200'}`}>Programadas</button>
        <button onClick={() => setFilter('COMPLETED')} className={`px-3 py-1 rounded ${filter === 'COMPLETED' ? 'bg-green-600 text-white' : 'bg-gray-200'}`}>Completadas</button>
      </div>

      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-200">
            <th className="text-left p-2">Pedido</th>
            <th className="text-left p-2">Servicio</th>
            <th className="text-left p-2">Fecha</th>
            <th className="text-left p-2">Técnico</th>
            <th className="text-center p-2">Estado</th>
            <th className="p-2"></th>
          </tr>
        </thead>
        <tbody>
          {schedulings.map(s => (
            <tr key={s.id} className="border-b">
              <td className="p-2">#{s.orderId}</td>
              <td className="p-2">{s.nombreServicio}</td>
              <td className="p-2">{s.fechaAsignada ? new Date(s.fechaAsignada).toLocaleString('es-CO') : '-'}</td>
              <td className="p-2">{s.tecnico || '-'}</td>
              <td className="text-center p-2">
                <span className={`px-2 py-1 rounded text-xs ${
                  s.estado === 'COMPLETED' ? 'bg-green-100 text-green-800' :
                  s.estado === 'SCHEDULED' ? 'bg-azul-pureza/20 text-azul-energia' : 'bg-yellow-100 text-yellow-800'
                }`}>{s.estado}</span>
              </td>
              <td className="p-2">
                {s.estado === 'PENDING' && (
                  <button onClick={() => schedule(s.id)}
                    className="bg-azul-energia text-white px-3 py-1 rounded text-sm hover:bg-blue-700">
                    Programar
                  </button>
                )}
                {s.estado === 'SCHEDULED' && (
                  <button onClick={() => complete(s.id)}
                    className="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700">
                    Completar
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {schedulings.length === 0 && <p className="text-center text-gray-500 py-8">No hay visitas agendadas</p>}
    </div>
  )
}
