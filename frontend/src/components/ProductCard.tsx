import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import type { Product } from '../types'

const categoryEmoji: Record<string, string> = {
  Calentadores: '🚿',
  Estufas: '🍳',
  Hornos: '🔥',
  Insumos: '🔩',
  Repuestos: '⚙️',
}

export default function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart()
  const images = (product.imagenUrl || '').split(',').map(s => s.trim()).filter(Boolean)
  const [imgIdx, setImgIdx] = useState(0)
  const [adding, setAdding] = useState(false)

  const handleAdd = async (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (adding) return
    setAdding(true)
    try {
      await addItem('PRODUCT', product.id)
    } catch (err) {
      console.error('Error agregando al carrito:', err)
      alert('Error al agregar al carrito. Revisa la consola (F12).')
    } finally {
      setAdding(false)
    }
  }

  return (
    <div className="bg-white rounded-2xl shadow hover:shadow-xl transition-shadow overflow-hidden flex flex-col group">
      <Link to={`/products/${product.id}`} className="block relative">
        {images.length > 0 ? (
          <div className="relative">
            <img
              src={images[imgIdx]}
              alt={product.nombre}
              className=" w-full h-auto min-h-[250px] object-cover group-hover:scale-105 transition-transform duration-300"
            />
            {images.length > 1 && (
              <div className="absolute bottom-1 right-2 flex gap-1">
                {images.map((_, i) => (
                  <button key={i} onClick={e => { e.preventDefault(); e.stopPropagation(); setImgIdx(i) }}
                    className={`w-2 h-2 sm:w-1.5 sm:h-1.5 rounded-full ${i === imgIdx ? 'bg-white' : 'bg-white/50'}`} />
                ))}
              </div>
            )}
          </div>
        ) : (
          <div className="w-full h-48 sm:h-64 bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center text-5xl sm:text-6xl group-hover:scale-105 transition-transform duration-300">
            {categoryEmoji[product.categoria] ?? '📦'}
          </div>
        )}
      </Link>

      <div className="p-3 sm:p-4 flex flex-col flex-1">
        <span className="inline-block bg-blue-100 text-blue-700 text-xs font-medium px-2.5 py-0.5 rounded-full mb-2 self-start">
          {product.categoria}
        </span>
        <Link to={`/products/${product.id}`}>
          <h3 className="font-semibold text-gray-800 leading-snug hover:text-blue-700 transition-colors line-clamp-2 text-sm sm:text-base">
            {product.nombre}
          </h3>
        </Link>
        <p className="text-gray-500 text-xs sm:text-sm mt-1 line-clamp-2 flex-1">{product.descripcion}</p>

        <div className="mt-3 sm:mt-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-1 sm:gap-2">
          <p className="text-lg sm:text-xl font-bold text-green-700">
            ${product.precioCOP.toLocaleString('es-CO')}
          </p>
          <button
            onClick={handleAdd}
            disabled={adding}
            className={`w-full sm:w-auto text-white text-sm font-semibold px-4 py-2.5 sm:py-2 rounded-full transition-colors whitespace-nowrap ${adding ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-800 hover:bg-blue-900'}`}
          >
            {adding ? 'Agregando...' : '+ Agregar'}
          </button>
        </div>
      </div>
    </div>
  )
}
