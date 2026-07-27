import { Link } from 'react-router-dom'

export default function AboutPage() {
  return (
    <div className="py-12 px-4 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-blue-900 mb-2">Sobre Nosotros</h1>
      <p className="text-gray-500 mb-8">Conoce más sobre GasSolutions</p>

      <div className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-8 shadow-sm space-y-6">
        <div>
          <h2 className="text-xl font-bold text-gray-800 mb-2">Nuestra Empresa</h2>
          <p className="text-gray-600 leading-relaxed">
            En <strong>GasSolutions</strong> somos una empresa especializada en la comercialización de productos
            y servicios para gas natural en Bogotá. Contamos con más de 10 años de experiencia brindando
            soluciones seguras y confiables a hogares y empresas.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-bold text-gray-800 mb-2">Misión</h2>
          <p className="text-gray-600 leading-relaxed">
            Proveer productos y servicios de gas natural de alta calidad, garantizando la seguridad y
            satisfacción de nuestros clientes a través de un equipo profesional y comprometido.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-bold text-gray-800 mb-2">Visión</h2>
          <p className="text-gray-600 leading-relaxed">
            Ser la empresa líder en soluciones de gas natural en Colombia, reconocida por nuestra
            excelencia en el servicio, innovación y compromiso con el medio ambiente.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-bold text-gray-800 mb-2">Contáctanos</h2>
          <p className="text-gray-600 leading-relaxed">
            📍 Calle 2 # 93D30, Bogotá<br />
            📞 314 253 3524
          </p>
        </div>
      </div>

      <div className="mt-8 text-center">
        <Link
          to="/products"
          className="inline-block bg-blue-800 hover:bg-blue-900 text-white font-semibold px-8 py-3 rounded-full transition-colors"
        >
          Ver nuestros productos
        </Link>
      </div>
    </div>
  )
}