import { useState } from 'react'
import { useCart } from '../context/CartContext'
import type { Service } from '../types'

const typeConfig: Record<string, { bg: string; icon: string }> = {
  INSTALACION:   { bg: 'from-blue-500 to-blue-700',   icon: '🔧' },
  MANTENIMIENTO: { bg: 'from-green-500 to-green-700', icon: '🛠️' },
  REVISION:      { bg: 'from-indigo-500 to-indigo-700', icon: '🔍' },
  EMERGENCIA:    { bg: 'from-red-500 to-red-700',     icon: '🚨' },
}

function getConfig(nombre: string) {
  const key = Object.keys(typeConfig).find(k => nombre.toUpperCase().includes(k))
  return key ? typeConfig[key] : { bg: 'from-gray-500 to-gray-700', icon: '⚙️' }
}

export default function ServiceCard({ service }: { service: Service }) {
  const { addItem } = useCart()
  const { bg, icon } = getConfig(service.nombre)
  const images = (service.imagenUrl || '').split(',').map(s => s.trim()).filter(Boolean)
  const [imgIdx, setImgIdx] = useState(0)

  const handleAdd = async () => {
    await addItem('SERVICE', service.id)
  }

  return (
    <div className="bg-white rounded-2xl shadow hover:shadow-xl transition-shadow overflow-hidden flex flex-col group">
      {images.length > 0 ? (
        <div className="relative bg-gray-50">
          <img
            src={images[imgIdx]}
            alt={service.nombre}
            className="w-full h-40 sm:h-52 object-contain"
          />
          {images.length > 1 && (
            <div className="absolute bottom-1.5 right-2 flex gap-1">
              {images.map((_, i) => (
                <button key={i} onClick={() => setImgIdx(i)}
                  className={`w-2 h-2 sm:w-1.5 sm:h-1.5 rounded-full ${i === imgIdx ? 'bg-white' : 'bg-white/50'}`} />
              ))}
            </div>
          )}
        </div>
      ) : (
        <div className={`h-40 sm:h-52 bg-gradient-to-br ${bg} flex items-center justify-center text-4xl sm:text-5xl`}>
          {icon}
        </div>
      )}

      <div className="p-3 sm:p-4 flex flex-col flex-1">
        <span className="inline-block bg-green-100 text-green-700 text-xs font-medium px-2.5 py-0.5 rounded-full mb-2 self-start">
          {service.categoriaAplicable || 'General'}
        </span>
        <h3 className="font-semibold text-gray-800 leading-snug line-clamp-2 text-sm sm:text-base">
          {service.nombre}
        </h3>
        <p className="text-xs sm:text-sm text-gray-500 mt-1 line-clamp-3 flex-1">{service.descripcion}</p>

        <div className="mt-3 sm:mt-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-1 sm:gap-2">
          <p className="text-lg sm:text-xl font-bold text-green-700">
            ${service.precioCOP.toLocaleString('es-CO')}
          </p>
          <button
            onClick={handleAdd}
            className="w-full sm:w-auto bg-green-700 hover:bg-green-800 text-white text-sm font-semibold px-4 py-2.5 sm:py-2 rounded-full transition-colors whitespace-nowrap"
          >
            + Agendar
          </button>
        </div>
      </div>
    </div>
  )
}
