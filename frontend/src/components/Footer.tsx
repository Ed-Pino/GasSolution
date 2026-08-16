import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="bg-blue-900 text-white mt-auto">
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 sm:grid-cols-4 gap-8">
        {/* Brand */}
        <div className="sm:col-span-1">
          <img src="/images/logo.png" alt="GasSolutions Bogotá" className="h-12 w-auto mb-3" />
          <p className="text-blue-200 text-sm leading-relaxed">
            Especialistas en gas natural para tu hogar y negocio en Bogotá. Técnicos certificados,
            productos con garantía y cumplimiento normativa NTC.
          </p>
        </div>

        {/* Navigation */}
        <div>
          <h4 className="font-semibold text-white mb-3">Catálogo</h4>
          <ul className="space-y-2 text-sm text-blue-200">
            <li><Link to="/products" className="hover:text-white transition-colors">Productos</Link></li>
            <li><Link to="/services" className="hover:text-white transition-colors">Servicios Técnicos</Link></li>
            <li><Link to="/about" className="hover:text-white transition-colors">Nosotros</Link></li>
            <li><Link to="/faq" className="hover:text-white transition-colors">Preguntas Frecuentes</Link></li>
          </ul>
        </div>

        {/* Legal */}
        <div>
          <h4 className="font-semibold text-white mb-3">Legal</h4>
          <ul className="space-y-2 text-sm text-blue-200">
            <li><Link to="/terms" className="hover:text-white transition-colors">Términos y Condiciones</Link></li>
            <li><Link to="/privacy" className="hover:text-white transition-colors">Política de Privacidad</Link></li>
            <li><Link to="/privacy" className="hover:text-white transition-colors">Habeas Data</Link></li>
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
              <a href="tel:+573142533524" className="hover:text-white transition-colors">314 253 3524</a>
            </li>
            <li className="flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              Calle 2 # 93D30 Bogotá
            </li>
            <li className="flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Lun–Sáb, 7am–6pm
            </li>
            <li className="flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 shrink-0" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                <path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.126 1.535 5.858L.057 23.887l6.174-1.453A11.94 11.94 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.844 0-3.576-.49-5.073-1.346l-.364-.214-3.666.862.924-3.574-.237-.375A9.944 9.944 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
              </svg>
              <a href="https://wa.me/573142533524" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">WhatsApp</a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-blue-800 py-4 text-center text-xs text-blue-300 px-4">
        &copy; {new Date().getFullYear()} GasSolutions Bogotá — Especialistas en gas natural ·
        <Link to="/terms" className="hover:text-white ml-2 transition-colors">Términos</Link> ·
        <Link to="/privacy" className="hover:text-white ml-2 transition-colors">Privacidad</Link> ·
        <Link to="/faq" className="hover:text-white ml-2 transition-colors">FAQ</Link>
      </div>
    </footer>
  )
}
