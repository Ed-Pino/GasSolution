import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { productService, serviceService } from '../services/api'
import { useCart } from '../context/CartContext'
import type { Product, Service } from '../types'

const categoryEmoji: Record<string, string> = {
  Calentadores: '🚿',
  Estufas: '🍳',
  Hornos: '🔥',
  Insumos: '🔩',
  Repuestos: '⚙️',
}

const IVA_RATE = 0.19

export default function ProductDetailPage() {
  const { id } = useParams<{ id: string }>()
  const { addItem } = useCart()
  const [product, setProduct] = useState<Product | null>(null)
  const [services, setServices] = useState<Service[]>([])
  const [selectedService, setSelectedService] = useState<number | null>(null)
  const [added, setAdded] = useState(false)
  const [imgIndex, setImgIndex] = useState(0)

  useEffect(() => {
    if (id) {
      productService.getById(Number(id)).then(setProduct)
      serviceService.getAll().then(setServices)
    }
  }, [id])

  if (!product) {
    return (
      <div className="flex items-center justify-center py-24">
        <div className="animate-spin h-10 w-10 rounded-full border-4 border-blue-200 border-t-blue-700" />
      </div>
    )
  }

  const images = (product.imagenUrl || '').split(',').map(s => s.trim()).filter(Boolean)

  const relatedServices = services.filter(
    s => s.activo && (s.categoriaAplicable === product.categoria || !s.categoriaAplicable)
  )

  const totalPrice =
    product.precioCOP +
    (selectedService ? (services.find(s => s.id === selectedService)?.precioCOP ?? 0) : 0)

  const handleAddToCart = async () => {
    await addItem('PRODUCT', product.id)
    if (selectedService) {
      await addItem('SERVICE', selectedService)
    }
    setAdded(true)
    setTimeout(() => setAdded(false), 2500)
  }

  return (
    <div className="py-10 px-4 max-w-5xl mx-auto">
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-400 mb-6 flex items-center gap-2">
        <Link to="/products" className="hover:text-blue-700 transition-colors">Productos</Link>
        <span>›</span>
        <span className="text-gray-600">{product.categoria}</span>
        <span>›</span>
        <span className="text-gray-800 font-medium truncate">{product.nombre}</span>
      </nav>

      <div className="grid md:grid-cols-2 gap-10">
        {/* Image Carousel */}
        <div className="relative rounded-2xl overflow-hidden bg-gray-50 shadow group min-h-72">
          {images.length > 0 ? (
            <>
              <img
                src={images[imgIndex]}
                alt={product.nombre}
                className="w-full h-full object-cover"
                onError={() => setImgIndex(i => Math.min(i + 1, images.length - 1))}
              />
              {images.length > 1 && (
                <>
                  <button onClick={() => setImgIndex(i => (i - 1 + images.length) % images.length)}
                    className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white rounded-full w-8 h-8 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">‹</button>
                  <button onClick={() => setImgIndex(i => (i + 1) % images.length)}
                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white rounded-full w-8 h-8 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">›</button>
                  <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5">
                    {images.map((_, i) => (
                      <button key={i} onClick={() => setImgIndex(i)}
                        className={`w-2 h-2 rounded-full transition-colors ${i === imgIndex ? 'bg-white' : 'bg-white/40'}`} />
                    ))}
                  </div>
                </>
              )}
            </>
          ) : (
            <span className="text-8xl flex items-center justify-center min-h-72">
              {categoryEmoji[product.categoria] ?? '📦'}
            </span>
          )}
        </div>

        {/* Info */}
        <div>
          <span className="inline-block bg-blue-100 text-blue-700 text-sm font-medium px-3 py-1 rounded-full mb-3">
            {product.categoria}
          </span>
          <h1 className="text-3xl font-bold text-gray-900 leading-snug">{product.nombre}</h1>
          <p className="text-gray-500 mt-3 leading-relaxed">{product.descripcion}</p>

          <div className="mt-5">
            <p className="text-sm text-gray-400">Precio base</p>
            <p className="text-4xl font-extrabold text-green-700">
              ${product.precioCOP.toLocaleString('es-CO')}
            </p>
            <p className="text-xs text-gray-400 mt-0.5">
              Incluye IVA (${Math.round(product.precioCOP - product.precioCOP / (1 + IVA_RATE)).toLocaleString('es-CO')})
            </p>
          </div>

          {/* Service selector */}
          {relatedServices.length > 0 && (
            <div className="mt-6">
              <p className="text-sm font-semibold text-gray-700 mb-2">¿Necesitas instalación o servicio?</p>
              <div className="space-y-2">
                <label className={`flex items-center gap-3 border rounded-xl p-3 cursor-pointer transition-colors ${
                  selectedService === null ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'
                }`}>
                  <input
                    type="radio"
                    name="service"
                    checked={selectedService === null}
                    onChange={() => setSelectedService(null)}
                    className="accent-blue-700"
                  />
                  <span className="text-sm font-medium text-gray-700">Solo el producto</span>
                </label>
                {relatedServices.map(s => (
                  <label key={s.id} className={`flex items-center gap-3 border rounded-xl p-3 cursor-pointer transition-colors ${
                    selectedService === s.id ? 'border-green-500 bg-green-50' : 'border-gray-200 hover:border-gray-300'
                  }`}>
                    <input
                      type="radio"
                      name="service"
                      checked={selectedService === s.id}
                      onChange={() => setSelectedService(s.id)}
                      className="accent-green-700"
                    />
                    <div className="flex-1">
                      <p className="text-sm font-semibold">{s.nombre}</p>
                      <p className="text-xs text-gray-500">{s.descripcion}</p>
                    </div>
                    <span className="text-sm font-bold text-green-700 shrink-0">
                      +${s.precioCOP.toLocaleString('es-CO')}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          )}

          {/* Total + Add button */}
          {selectedService !== null && (
            <div className="mt-4 bg-gray-50 rounded-xl px-4 py-3 flex justify-between items-center">
              <span className="text-sm text-gray-500">Total con servicio</span>
              <span className="text-xl font-bold text-green-700">${totalPrice.toLocaleString('es-CO')}</span>
            </div>
          )}

          <button
            onClick={handleAddToCart}
            className={`mt-5 w-full py-3.5 rounded-full font-bold text-lg transition-all ${
              added
                ? 'bg-green-600 text-white'
                : 'bg-blue-800 hover:bg-blue-900 text-white'
            }`}
          >
            {added ? '✓ Agregado al carrito' : 'Agregar al Carrito'}
          </button>
        </div>
      </div>
    </div>
  )
}
