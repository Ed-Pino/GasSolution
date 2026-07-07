import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { productService } from '../services/api'
import ProductCard from '../components/ProductCard'
import type { Product } from '../types'

const categories = ['Calentadores', 'Estufas', 'Hornos', 'Insumos', 'Repuestos']
const categoryEmoji: Record<string, string> = {
  Calentadores: '🚿',
  Estufas: '🍳',
  Hornos: '🔥',
  Insumos: '🔩',
  Repuestos: '⚙️',
}

export default function ProductsPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState(searchParams.get('search') || '')
  const activeCat = searchParams.get('categoria')

  useEffect(() => {
    setLoading(true)
    productService.getAll(activeCat || undefined, search || undefined)
      .then(setProducts)
      .finally(() => setLoading(false))
  }, [activeCat, search])

  const selectCategory = (cat: string | null) => {
    const params = new URLSearchParams()
    if (cat) params.set('categoria', cat)
    if (search) params.set('search', search)
    setSearchParams(params)
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    selectCategory(activeCat)
  }

  return (
    <div className="py-10 px-4 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-blue-900">Catálogo de Productos</h1>
        <p className="text-gray-500 mt-1">Gasodomésticos certificados con garantía para tu hogar</p>
      </div>

      {/* Search */}
      <form onSubmit={handleSearch} className="mb-6 flex gap-2 max-w-lg">
        <div className="relative flex-1">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Buscar productos..."
            className="border border-gray-300 rounded-full pl-10 pr-4 py-2.5 w-full focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-800 text-white px-6 py-2.5 rounded-full hover:bg-blue-900 transition-colors font-medium"
        >
          Buscar
        </button>
      </form>

      {/* Category filters */}
      <div className="flex gap-2 mb-8 flex-wrap">
        <button
          onClick={() => selectCategory(null)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${!activeCat ? 'bg-blue-800 text-white shadow-sm' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
        >
          Todos
        </button>
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => selectCategory(cat)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors flex items-center gap-1.5 ${activeCat === cat ? 'bg-blue-800 text-white shadow-sm' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
          >
            <span>{categoryEmoji[cat]}</span>
            {cat}
          </button>
        ))}
      </div>

      {/* Results count */}
      {!loading && (
        <p className="text-sm text-gray-500 mb-4">
          {products.length === 0 ? 'Sin resultados' : `${products.length} producto${products.length !== 1 ? 's' : ''} encontrado${products.length !== 1 ? 's' : ''}`}
          {activeCat && ` en ${activeCat}`}
        </p>
      )}

      {/* Grid */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="bg-gray-100 rounded-2xl h-72 animate-pulse" />
          ))}
        </div>
      ) : products.length === 0 ? (
        <div className="text-center py-20 text-gray-400">
          <span className="text-6xl block mb-4">🔍</span>
          <p className="text-lg font-medium">No se encontraron productos</p>
          <p className="text-sm mt-1">Intenta con otra categoría o término de búsqueda</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map(p => <ProductCard key={p.id} product={p} />)}
        </div>
      )}
    </div>
  )
}
