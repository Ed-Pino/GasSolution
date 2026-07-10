import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

const categoryCards = [
  { label: 'Calentadores', emoji: '🚿', color: 'from-blue-500 to-blue-700', href: '/products?categoria=Calentadores' },
  { label: 'Estufas', emoji: '🍳', color: 'from-orange-400 to-orange-600', href: '/products?categoria=Estufas' },
  { label: 'Hornos', emoji: '🔥', color: 'from-red-500 to-red-700', href: '/products?categoria=Hornos' },
  { label: 'Insumos', emoji: '🔩', color: 'from-gray-500 to-gray-700', href: '/products?categoria=Insumos' },
  { label: 'Repuestos', emoji: '⚙️', color: 'from-slate-500 to-slate-700', href: '/products?categoria=Repuestos' },
  { label: 'Servicios', emoji: '🛠️', color: 'from-green-500 to-green-700', href: '/services' },
]

const trustBadges = [
  { icon: '✅', title: 'Técnicos Certificados', desc: 'Norma NTC colombiana' },
  { icon: '⚡', title: 'Respuesta Rápida', desc: 'Visita en Bogotá' },
  { icon: '🛡️', title: 'Garantía en Servicios', desc: 'Trabajo con respaldo' },
  { icon: '💰', title: 'Precios Transparentes', desc: 'Sin cobros ocultos' },
]

const clientLogos = [
  { src: '/images/takamy.png',    alt: 'Takamy' },
  { src: '/images/ppc.png',       alt: 'PPC' },
  { src: '/images/vanti-logo.jpg', alt: 'Vanti' },
  { src: '/images/cali.jpg',      alt: 'Cali' },
  { src: '/images/charlys.png',   alt: 'Charlys' },
  { src: '/images/pizahot.jpg',   alt: 'Pizza Hut' },
]

const brandLogos = [
  { src: '/images/bosch.png',      alt: 'Bosch' },
  { src: '/images/challenger.png', alt: 'Challenger' },
  { src: '/images/cimsa.png',      alt: 'Cimsa' },
  { src: '/images/clasic.png',     alt: 'Classic' },
  { src: '/images/exel.png',       alt: 'Exel' },
  { src: '/images/haceb1.png',     alt: 'Haceb' },
  { src: '/images/oka.png',        alt: 'Oka' },
]

export default function HomePage() {
  const [brandIndex, setBrandIndex] = useState(0)
  const [clientIndex, setClientIndex] = useState(0)
  const visibleCount = 4

  useEffect(() => {
    const timer = setInterval(() => {
      setBrandIndex(i => (i + 1) % brandLogos.length)
    }, 2500)
    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    const timer = setInterval(() => {
      setClientIndex(i => (i + 1) % clientLogos.length)
    }, 2500)
    return () => clearInterval(timer)
  }, [])

  const visibleBrands = Array.from({ length: visibleCount }, (_, i) =>
    brandLogos[(brandIndex + i) % brandLogos.length]
  )

  const visibleClients = Array.from({ length: visibleCount }, (_, i) =>
    clientLogos[(clientIndex + i) % clientLogos.length]
  )

  return (
    <div>
      {/* ── HERO ─────────────────────────────────────────────── */}
      <section
        className="relative min-h-[520px] flex items-center justify-center bg-cover bg-center"
        style={{ backgroundImage: 'url(/images/woman-shower.jpg)' }}>
        <div className="absolute inset-0 bg-blue-950/70" />
        <div className="relative z-10 text-center text-white px-6 max-w-3xl mx-auto">
          <span className="inline-block bg-orange-500 text-white text-xs font-semibold px-3 py-1 rounded-full mb-4 uppercase tracking-wider">
            Bogotá · Gas Natural
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight mb-4">
            Expertos en Gas Natural<br />y Gasodomésticos
          </h1>
          <p className="text-lg text-blue-100 max-w-xl mx-auto mb-8">
            Instalación, mantenimiento y reparación por técnicos certificados.
            Tu seguridad es nuestra prioridad.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/products"
              className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-8 py-3 rounded-full text-lg transition-colors shadow-lg"
            >
              Ver Productos
            </Link>
            <Link
              to="/services"
              className="bg-white/15 hover:bg-white/25 border border-white/40 text-white font-semibold px-8 py-3 rounded-full text-lg transition-colors backdrop-blur-sm"
            >
              Agendar Servicio
            </Link>
          </div>
        </div>
      </section>

      {/* ── TRUST BADGES ─────────────────────────────────────── */}
      <section className="bg-blue-800 text-white py-6">
        <div className="max-w-5xl mx-auto px-6 grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
          {trustBadges.map(b => (
            <div key={b.title} className="flex flex-col items-center gap-1">
              <span className="text-2xl">{b.icon}</span>
              <p className="font-semibold text-sm">{b.title}</p>
              <p className="text-blue-200 text-xs">{b.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── CATEGORIES ───────────────────────────────────────── */}
      <section className="py-16 px-6 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-blue-900 text-center mb-2">¿Qué estás buscando?</h2>
        <p className="text-gray-500 text-center mb-10">Encuentra lo que necesitas para tu hogar o negocio</p>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {categoryCards.map(c => (
            <Link
              key={c.label}
              to={c.href}
              className={`bg-gradient-to-br ${c.color} text-white rounded-2xl p-5 flex flex-col items-center gap-2 hover:scale-105 transition-transform shadow-md`}
            >
              <span className="text-3xl">{c.emoji}</span>
              <span className="font-semibold text-sm text-center">{c.label}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* ── INSTALLATION SECTION ─────────────────────────────── */}
      <section
        className="relative py-24 bg-cover bg-center"
        style={{ backgroundImage: 'url(/images/blueflames.jpg)' }}
      >
        <div className="absolute inset-0 bg-black/65" />
        <div className="relative max-w-4xl mx-auto px-6 text-center text-white">
          <h2 className="text-4xl font-bold mb-4">Instalación de Gasodomésticos</h2>
          <p className="text-lg text-gray-200 max-w-2xl mx-auto mb-8">
            Instalación segura de calentadores, estufas, hornos y chimeneas a gas natural.
            Cumplimiento de la normativa colombiana con técnicos certificados.
          </p>
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {['Calentadores', 'Estufas', 'Hornos', 'Chimeneas'].map(item => (
              <span key={item} className="bg-white/20 backdrop-blur-sm border border-white/30 px-4 py-2 rounded-full text-sm font-medium">
                ✅ {item}
              </span>
            ))}
          </div>
          <Link
            to="/services"
            className="inline-block bg-orange-500 hover:bg-orange-600 text-white font-bold px-8 py-3 rounded-full text-lg transition-colors"
          >
            Ver Servicios
          </Link>
        </div>
      </section>

      {/* ── BRANDS / MARCAS ──────────────────────────────────── */}
      <section className="py-16 px-6 text-center max-w-5xl mx-auto">
        <p className="text-gray-400 text-sm uppercase tracking-widest mb-8">Trabajamos con las mejores marcas</p>
        <div className="relative flex items-center justify-center gap-2">
          <button
            onClick={() => setBrandIndex(i => (i - 1 + brandLogos.length) % brandLogos.length)}
            className="shrink-0 w-9 h-9 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
            aria-label="Anterior"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <div className="flex items-center justify-center gap-8 overflow-hidden flex-1">
            {visibleBrands.map((brand, i) => (
              <div key={`${brand.alt}-${i}`} className="flex items-center justify-center w-32 h-20 shrink-0">
                <img
                  src={brand.src}
                  alt={brand.alt}
                  className="max-h-16 max-w-full object-contain opacity-60 hover:opacity-100 transition-opacity duration-300 grayscale hover:grayscale-0"
                />
              </div>
            ))}
          </div>

          <button
            onClick={() => setBrandIndex(i => (i + 1) % brandLogos.length)}
            className="shrink-0 w-9 h-9 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
            aria-label="Siguiente"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        <div className="flex justify-center gap-2 mt-6">
          {brandLogos.map((_, i) => (
            <button
              key={i}
              onClick={() => setBrandIndex(i)}
              className={`w-2 h-2 rounded-full transition-colors ${i === brandIndex ? 'bg-blue-800' : 'bg-gray-300'}`}
              aria-label={`Marca ${i + 1}`}
            />
          ))}
        </div>
      </section>

      {/* ── MAINTENANCE ──────────────────────────────────────── */}
      <section className="py-20 px-6 max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row items-center gap-12">
          <div className="w-full md:w-1/2 rounded-2xl overflow-hidden shadow-xl">
            <img src="/images/tecnico-1.png" alt="Mantenimiento preventivo" className="w-full h-72 object-cover" />
          </div>
          <div className="md:w-1/2">
            <span className="text-orange-500 text-sm font-semibold uppercase tracking-wider">Mantenimiento</span>
            <h2 className="text-3xl font-bold text-blue-900 mt-2 mb-4">Prevención que Ahorra Dinero</h2>
            <p className="text-gray-600 leading-relaxed">
              El mantenimiento preventivo de tus gasodomésticos garantiza su funcionamiento seguro
              y eficiente. Revisiones periódicas detectan problemas antes de que se conviertan en
              averías costosas, prolongando la vida útil de tus equipos.
            </p>
            <p className="text-gray-600 leading-relaxed mt-4">
              Programa tu revisión y ten la tranquilidad de un hogar seguro.
            </p>
            <Link
              to="/services"
              className="inline-block mt-6 bg-blue-800 hover:bg-blue-900 text-white font-semibold px-6 py-2.5 rounded-full transition-colors"
            >
              Agendar Mantenimiento
            </Link>
          </div>
        </div>
      </section>

      {/* ── REPAIR ───────────────────────────────────────────── */}
      <section className="py-20 px-6 max-w-5xl mx-auto bg-gray-50 rounded-3xl">
        <div className="flex flex-col md:flex-row-reverse items-center gap-12 px-4">
          <div className="w-full md:w-1/2 rounded-2xl overflow-hidden shadow-xl">
            <img src="/images/tecnico2.png" alt="Reparación profesional" className="w-full h-72 object-cover" />
          </div>
          <div className="md:w-1/2">
            <span className="text-red-600 text-sm font-semibold uppercase tracking-wider">Reparación</span>
            <h2 className="text-3xl font-bold text-blue-900 mt-2 mb-4">Soluciones Rápidas y Confiables</h2>
            <p className="text-gray-600 leading-relaxed">
              Reparación ágil para cualquier inconveniente con tus equipos de gas natural.
              Atendemos fugas, puntos de gas, ventilación y gasodomésticos en el menor tiempo posible.
            </p>
            <div className="flex flex-wrap gap-2 mt-5">
              {['Fugas de gas', 'Puntos de gas', 'Ventilación', 'Gasodomésticos'].map(tag => (
                <span key={tag} className="bg-red-50 text-red-700 border border-red-100 px-3 py-1 rounded-full text-sm">
                  🔧 {tag}
                </span>
              ))}
            </div>
            <Link
              to="/services"
              className="inline-block mt-6 bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-2.5 rounded-full transition-colors"
            >
              Solicitar Reparación
            </Link>
          </div>
        </div>
      </section>

      {/* ── CLIENTES ─────────────────────────────────────────── */}
      <section className="py-16 px-6 text-center max-w-5xl mx-auto">
        <p className="text-gray-400 text-sm uppercase tracking-widest mb-8">Nuestros Clientes Confían en Nosotros</p>
        <div className="relative flex items-center justify-center gap-2">
          <button
            onClick={() => setClientIndex(i => (i - 1 + clientLogos.length) % clientLogos.length)}
            className="shrink-0 w-9 h-9 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
            aria-label="Anterior"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <div className="flex items-center justify-center gap-8 overflow-hidden flex-1">
            {visibleClients.map((client, i) => (
              <div key={`${client.alt}-${i}`} className="flex items-center justify-center w-32 h-20 shrink-0">
                <img
                  src={client.src}
                  alt={client.alt}
                  className="max-h-16 max-w-full object-contain opacity-60 hover:opacity-100 transition-opacity duration-300 grayscale hover:grayscale-0"
                />
              </div>
            ))}
          </div>

          <button
            onClick={() => setClientIndex(i => (i + 1) % clientLogos.length)}
            className="shrink-0 w-9 h-9 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
            aria-label="Siguiente"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        <div className="flex justify-center gap-2 mt-6">
          {clientLogos.map((_, i) => (
            <button
              key={i}
              onClick={() => setClientIndex(i)}
              className={`w-2 h-2 rounded-full transition-colors ${i === clientIndex ? 'bg-orange-500' : 'bg-gray-300'}`}
              aria-label={`Cliente ${i + 1}`}
            />
          ))}
        </div>
      </section>

      {/* ── CTA BOTTOM ───────────────────────────────────────── */}
      <section className="bg-orange-500 py-14 text-center px-6">
        <h2 className="text-3xl font-bold text-white mb-3">¿Listo para empezar?</h2>
        <p className="text-orange-100 text-lg mb-8 max-w-xl mx-auto">
          Agenda tu servicio técnico o explora nuestro catálogo de productos certificados.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link
            to="/products"
            className="bg-white text-orange-600 font-bold px-8 py-3 rounded-full text-lg hover:bg-orange-50 transition-colors"
          >
            Ver Catálogo
          </Link>
          <Link
            to="/services"
            className="bg-orange-600 border-2 border-white text-white font-bold px-8 py-3 rounded-full text-lg hover:bg-orange-700 transition-colors"
          >
            Agendar Servicio
          </Link>
        </div>
      </section>
    </div>
  )
}
