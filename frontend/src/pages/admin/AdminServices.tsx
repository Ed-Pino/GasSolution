import { useState, useEffect } from 'react'
import { serviceService } from '../../services/api'
import type { Service } from '../../types'

export default function AdminServices() {
  const [services, setServices] = useState<Service[]>([])
  const [editing, setEditing] = useState<Service | null>(null)
  const [form, setForm] = useState({ nombre: '', descripcion: '', precioCOP: 0, categoriaAplicable: '', imagenUrl: '', activo: true })

  useEffect(() => { load() }, [])
  const load = async () => { setServices(await serviceService.getAll()) }

  const save = async (e: React.FormEvent) => {
    e.preventDefault()
    const data = { ...form, imagenUrl: form.imagenUrl || null }
    if (editing) {
      await serviceService.update(editing.id, data)
    } else {
      await serviceService.create(data)
    }
    setEditing(null)
    setForm({ nombre: '', descripcion: '', precioCOP: 0, categoriaAplicable: '', imagenUrl: '', activo: true })
    load()
  }

  const edit = (s: Service) => {
    setEditing(s)
    setForm({ nombre: s.nombre, descripcion: s.descripcion, precioCOP: s.precioCOP, categoriaAplicable: s.categoriaAplicable || '', imagenUrl: s.imagenUrl || '', activo: s.activo })
  }

  const remove = async (id: number) => {
    if (confirm('¿Desactivar servicio?')) { await serviceService.delete(id); load() }
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Servicios Técnicos</h1>

      <form onSubmit={save} className="bg-gray-50 p-4 rounded-lg mb-6 grid grid-cols-2 md:grid-cols-3 gap-4">
        <input placeholder="Nombre" value={form.nombre} onChange={e => setForm({...form, nombre: e.target.value})}
          className="border rounded px-3 py-2" required />
        <input placeholder="Descripción" value={form.descripcion} onChange={e => setForm({...form, descripcion: e.target.value})}
          className="border rounded px-3 py-2" />
        <input type="number" placeholder="Precio COP" value={form.precioCOP || ''} onChange={e => setForm({...form, precioCOP: Number(e.target.value)})}
          className="border rounded px-3 py-2" required />
        <input placeholder="Categoría aplicable (opcional)" value={form.categoriaAplicable} onChange={e => setForm({...form, categoriaAplicable: e.target.value})}
          className="border rounded px-3 py-2" />
        <input placeholder="URL de imagen" value={form.imagenUrl} onChange={e => setForm({...form, imagenUrl: e.target.value})}
          className="border rounded px-3 py-2" />
        <button type="submit" className="bg-azul-energia text-white rounded px-4 py-2 hover:bg-blue-700">
          {editing ? 'Actualizar' : 'Crear Servicio'}
        </button>
        {editing && <button type="button" onClick={() => { setEditing(null); setForm({ nombre: '', descripcion: '', precioCOP: 0, categoriaAplicable: '', imagenUrl: '', activo: true }) }}
          className="bg-gray-400 text-white rounded px-4 py-2 hover:bg-gray-500">Cancelar</button>}
      </form>

      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-200">
            <th className="text-left p-2">Imagen</th>
            <th className="text-left p-2">Nombre</th>
            <th className="text-left p-2">Categoría</th>
            <th className="text-right p-2">Precio</th>
            <th className="text-center p-2">Activo</th>
            <th className="p-2"></th>
          </tr>
        </thead>
        <tbody>
          {services.map(s => (
            <tr key={s.id} className="border-b">
              <td className="p-2">
                {s.imagenUrl ? <img src={s.imagenUrl.split(',')[0].trim()} alt={s.nombre} className="w-12 h-12 object-cover rounded" /> : <span className="text-gray-400">—</span>}
              </td>
              <td className="p-2">{s.nombre}</td>
              <td className="p-2">{s.categoriaAplicable || '-'}</td>
              <td className="text-right p-2">${s.precioCOP.toLocaleString('es-CO')}</td>
              <td className="text-center p-2">{s.activo ? '✅' : '❌'}</td>
              <td className="p-2">
                <button onClick={() => edit(s)} className="text-azul-energia hover:underline mr-2">Editar</button>
                <button onClick={() => remove(s.id)} className="text-red-600 hover:underline">Desactivar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
