export default function Footer() {
  return (
    <footer className="bg-blue-900 text-white mt-auto">
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 sm:grid-cols-3 gap-8">
        {/* Brand */}
        <div>
          <img src="/images/logo.png" alt="GasSolutions" className="h-12 w-auto mb-3" />
          <p className="text-blue-200 text-sm leading-relaxed">
            Especialistas en gas natural para tu hogar y negocio en Bogotá. Técnicos certificados,
            productos con garantía y cumplimiento normativa NTC.
          </p>
        </div>

        {/* Navigation */}
        <div>
          <h4 className="font-semibold text-white mb-3">Navegación</h4>
          <ul className="space-y-2 text-sm text-blue-200">
            <li><a href="/products" className="hover:text-white transition-colors">Catálogo de Productos</a></li>
            <li><a href="/services" className="hover:text-white transition-colors">Servicios Técnicos</a></li>
            <li><a href="/cart" className="hover:text-white transition-colors">Mi Carrito</a></li>
            <li><a href="/login" className="hover:text-white transition-colors">Ingresar / Registrarse</a></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="font-semibold text-white mb-3">Contacto</h4>
          <ul className="space-y-2 text-sm text-blue-200">
            <li className="flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              314 253 3524
            </li>
            <li className="flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              Calle 2 # 93D30 Bogotá, Colombia
            </li>
            <li className="flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Lun–Sáb, 7am–6pm
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-blue-800 py-4 text-center text-xs text-blue-300">
        &copy; {new Date().getFullYear()} GasSolutions Bogotá — Todos los derechos reservados
      </div>
    </footer>
  )
}
