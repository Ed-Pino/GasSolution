import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { serviceService } from '../services/api'
import ServiceCard from '../components/ServiceCard'
import type { Service } from '../types'

const filterCategories = [
  { label: 'Todos', value: null },
  { label: 'Calentadores', value: 'Calentadores' },
  { label: 'Estufas', value: 'Estufas' },
  { label: 'Hornos', value: 'Hornos' },
  { label: 'General / Preventivo', value: 'General' },
]

export default function ServicesPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [services, setServices] = useState<Service[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState(searchParams.get('search') || '')
  const activeCat = searchParams.get('categoria')

  useEffect(() => {
    setLoading(true)
    serviceService.getAll().then(setServices).finally(() => setLoading(false))
  }, [])

  const selectCategory = (cat: string | null) => {
    const params = new URLSearchParams()
    if (cat) params.set('categoria', cat)
    setSearchParams(params)
  }

  const filtered = services
    .filter(s => s.activo)
    .filter(s =>
      (!activeCat ||
        s.categoriaAplicable === activeCat ||
        (activeCat === 'General' && !s.categoriaAplicable)) &&
      (!search ||
        s.nombre.toLowerCase().includes(search.toLowerCase()) ||
        s.descripcion.toLowerCase().includes(search.toLowerCase()))
    )

  return (
    <div className="py-10 px-4 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-blue-900">Servicios Técnicos</h1>
        <p className="text-gray-500 mt-1">
          Instalación, mantenimiento, revisión y reparación de equipos a gas natural en Bogotá
        </p>
      </div>

      {/* Search */}
      <div className="mb-6 max-w-lg">
        <div className="relative">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Buscar servicios..."
            className="border border-gray-300 rounded-full pl-10 pr-4 py-2.5 w-full focus:outline-none focus:border-green-600 focus:ring-1 focus:ring-green-600"
          />
        </div>
      </div>

      {/* Category filters */}
      <div className="flex gap-2 mb-8 flex-wrap">
        {filterCategories.map(fc => (
          <button
            key={fc.label}
            onClick={() => selectCategory(fc.value)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              activeCat === fc.value || (!activeCat && fc.value === null)
                ? 'bg-green-700 text-white shadow-sm'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {fc.label}
          </button>
        ))}
      </div>

      {/* Results count */}
      {!loading && (
        <p className="text-sm text-gray-500 mb-4">
          {filtered.length === 0
            ? 'Sin resultados'
            : `${filtered.length} servicio${filtered.length !== 1 ? 's' : ''} disponible${filtered.length !== 1 ? 's' : ''}`}
        </p>
      )}

      {/* Grid */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="bg-gray-100 rounded-2xl h-64 animate-pulse" />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-20 text-gray-400">
          <span className="text-6xl block mb-4">🔍</span>
          <p className="text-lg font-medium">No se encontraron servicios</p>
          <p className="text-sm mt-1">Intenta con otra categoría o término de búsqueda</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map(s => <ServiceCard key={s.id} service={s} />)}
        </div>
      )}
    </div>
  )
}
