import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Seo from '../components/Seo'

const maintImages = ['tec1.webp', 'ServTest.jpg', 'Image-2025-05-1.jpeg']
const repImages = ['tecnico2.png', 'tecnico-1.png', 'RheemTec.png', 'gas2-150x150.jpg']
const heroImages = [
  '/images/woman-shower.jpg',
  '/images/images4-150x150.jpg',
  '/images/images-_2_-150x150.png',
  '/images/images-_3_-e1635201813391.png',
  '/images/mujer-tina.jpg',
]

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

const projects: Record<string, { img: string; title: string; desc: string; zone: string; service: string }[]> = {
  residencial: [
    { img: '/images/instalacion-calentador.png', title: 'Instalación calentador Bosch 10L', desc: 'Reemplazo de calentador antiguo por equipo nuevo certificado con punto de gas incluido.', zone: 'Suba', service: 'Instalación' },
    { img: '/images/instal.jpg', title: 'Red de gas natural apartamento', desc: 'Instalación completa de red interna de gas para cocina y calentador en apartamento nuevo.', zone: 'Chapinero', service: 'Instalación' },
    { img: '/images/mantCalent.png', title: 'Mantenimiento calentador Challenger', desc: 'Mantenimiento preventivo anual con limpieza de quemador y revisión de válvulas.', zone: 'Kennedy', service: 'Mantenimiento' },
    { img: '/images/Image-2025-05-1.jpeg', title: 'Instalación estufa empotrable', desc: 'Instalación de estufa empotrable 4 puestos con certificado técnico Vanti.', zone: 'Usaquén', service: 'Instalación' },
    { img: '/images/revision-3.jpg', title: 'Revisión técnica preventiva', desc: 'Revisión de toda la red de gas del hogar: puntos, válvulas, ventilación y gasodomésticos.', zone: 'Engativá', service: 'Revisión' },
    { img: '/images/Image-2025-05-2.jpeg', title: 'Reparación calentador Rheem', desc: 'Diagnóstico y reparación de calentador sin agua caliente. Cambio de termopar y electroválvula.', zone: 'Bosa', service: 'Reparación' },
  ],
  comercial: [
    { img: '/images/Insta-horno.png', title: 'Instalación hornos restaurante', desc: 'Instalación de 3 hornos industriales a gas natural con red de alta presión y certificado NTC.', zone: 'Santa Fe', service: 'Instalación industrial' },
    { img: '/images/img3.jpeg', title: 'Red de gas hotel boutique', desc: 'Diseño e instalación de red de gas para 12 puntos en cocina industrial y lavandería.', zone: 'Chapinero', service: 'Red industrial' },
    { img: '/images/gasodomesticos varios.png', title: 'Mantenimiento flota calentadores', desc: 'Mantenimiento preventivo de 8 calentadores en edificio de apartamentos con certificados individuales.', zone: 'Barrios Unidos', service: 'Mantenimiento' },
    { img: '/images/tecnico.jpg', title: 'Revisión red gas empresa', desc: 'Revisión técnica completa de instalaciones de gas para renovación de certificado ante Vanti.', zone: 'Puente Aranda', service: 'Revisión certificada' },
    { img: '/images/manteEstuf.png', title: 'Mantenimiento estufas industriales', desc: 'Mantenimiento y calibración de 4 estufas industriales en panadería comercial.', zone: 'Fontibón', service: 'Mantenimiento' },
    { img: '/images/h332.jpg', title: 'Instalación chimenea restaurante', desc: 'Instalación y certificación de chimenea a gas natural con sistema de ventilación forzada.', zone: 'Teusaquillo', service: 'Instalación' },
  ],
}


const testimonials = [
  { name: 'Carlos M.', service: 'Instalación calentador Bosch', rating: 5, comment: 'Excelente servicio, llegaron a tiempo y dejaron todo limpio. Mi calentador funciona perfecto.' },
  { name: 'Ana L.', service: 'Mantenimiento preventivo estufa', rating: 5, comment: 'Técnico muy profesional, explicó todo el proceso y nos dio recomendaciones para el mantenimiento.' },
  { name: 'Roberto P.', service: 'Reparación calentador Challenger', rating: 5, comment: 'Resolvieron el problema el mismo día. Precios justos y trabajo garantizado.' },
  { name: 'María G.', service: 'Instalación estufa empotrable', rating: 5, comment: 'Muy buena atención. La instalación quedó perfecta y cumpliendo todas las normas de Vanti.' },
  { name: 'Andrés F.', service: 'Revisión técnica preventiva', rating: 5, comment: 'Servicio confiable y puntual. Ya los tengo como mi servicio técnico de confianza en Bogotá.' },
  { name: 'Sandra V.', service: 'Instalación calentador Rheem', rating: 5, comment: 'Desde que instalaron mi calentador no he tenido ningún problema. 100% recomendados.' },
]

const zones = [
  'Usaquén', 'Chapinero', 'Santa Fe', 'San Cristóbal', 'Usme',
  'Tunjuelito', 'Bosa', 'Kennedy', 'Fontibón', 'Engativá',
  'Suba', 'Barrios Unidos', 'Teusaquillo', 'Mártires', 'Antonio Nariño',
  'Puente Aranda', 'Candelaria', 'Rafael Uribe', 'Ciudad Bolívar',
  'Soacha', 'Chía', 'Cajicá', 'Zipaquirá',
]

export default function HomePage() {
  const [heroIdx, setHeroIdx] = useState(0)
  const [maintIdx, setMaintIdx] = useState(0)
  const [repIdx, setRepIdx] = useState(0)
  const [projectTab, setProjectTab] = useState<'residencial' | 'comercial'>('residencial')

  useEffect(() => {
    const t = setInterval(() => setHeroIdx(i => (i + 1) % heroImages.length), 4000)
    return () => clearInterval(t)
  }, [])

  useEffect(() => {
    const t = setInterval(() => setMaintIdx(i => (i + 1) % maintImages.length), 4000)
    return () => clearInterval(t)
  }, [])

  useEffect(() => {
    const t = setInterval(() => setRepIdx(i => (i + 1) % repImages.length), 4000)
    return () => clearInterval(t)
  }, [])

  return (
    <div>
      <Seo
        title="GasSolutions Bogotá | Ventas e Instalación de Gas Natural"
        description="Venta, instalación y mantenimiento de calentadores, estufas, hornos y gasodomésticos a gas natural en Bogotá. Técnicos certificados NTC. Llamanos al 314 253 3524."
        path="/"
      />
      <section className="relative min-h-[520px] flex items-center justify-center overflow-hidden">
        {heroImages.map((src, i) => (
          <div
            key={src}
            className="absolute inset-0 bg-cover bg-center transition-opacity duration-1000"
            style={{
              backgroundImage: `url(${src})`,
              opacity: i === heroIdx ? 1 : 0,
            }}
          />
        ))}
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
      <section className="py-16 px-6 text-center max-w-5xl mx-auto overflow-hidden">
        <p className="text-gray-400 text-base uppercase tracking-widest mb-8">Trabajamos con las mejores marcas</p>
        <div className="marquee-wrapper relative overflow-hidden w-full">
          <div className="marquee-track flex gap-16" style={{ width: 'fit-content' }}>
            {[...brandLogos, ...brandLogos].map((brand, i) => (
              <div key={i} className="flex items-center justify-center w-44 h-28 shrink-0">
                <img
                  src={brand.src}
                  alt={brand.alt}
                  loading="lazy"
                  decoding="async"
                  className="max-h-24 max-w-full object-contain opacity-60 hover:opacity-100 transition-opacity duration-300"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── MAINTENANCE ──────────────────────────────────────── */}
      <section className="py-20 px-6 max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row items-center gap-12">
          <div className="w-full md:w-1/2 rounded-2xl overflow-hidden shadow-xl relative h-72 bg-gray-100">
            {maintImages.map((img, i) => (
              <img
                key={img}
                src={`/images/${img}`}
                alt="Mantenimiento preventivo"
                loading="lazy"
                decoding="async"
                width={800}
                height={600}
                className="absolute inset-0 w-full h-full object-contain p-4 transition-opacity duration-1000"
                style={{ opacity: i === maintIdx ? 1 : 0 }}
              />
            ))}
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
          <div className="w-full md:w-1/2 rounded-2xl overflow-hidden shadow-xl relative h-72 bg-gray-100">
            {repImages.map((img, i) => (
              <img
                key={img}
                src={`/images/${img}`}
                alt="Reparación profesional"
                loading="lazy"
                decoding="async"
                width={800}
                height={600}
                className="absolute inset-0 w-full h-full object-contain p-4 transition-opacity duration-1000"
                style={{ opacity: i === repIdx ? 1 : 0 }}
              />
            ))}
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
      <section className="py-16 px-6 text-center max-w-5xl mx-auto overflow-hidden">
        <p className="text-gray-400 text-base uppercase tracking-widest mb-8">Nuestros Clientes Confían en Nosotros</p>
        <div className="marquee-wrapper relative overflow-hidden w-full">
          <div className="marquee-track flex gap-16" style={{ width: 'fit-content' }}>
            {[...clientLogos, ...clientLogos].map((client, i) => (
              <div key={i} className="flex items-center justify-center w-44 h-28 shrink-0">
                <img
                  src={client.src}
                  alt={client.alt}
                  loading="lazy"
                  decoding="async"
                  className="max-h-24 max-w-full object-contain opacity-60 hover:opacity-100 transition-opacity duration-300"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIOS ─────────────────────────────────────── */}
      <section className="py-16 px-6 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-blue-900 text-center mb-2">Lo que dicen nuestros clientes</h2>
        <p className="text-gray-500 text-center mb-10">Instalaciones y servicios certificados en Bogotá</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <div key={i} className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm flex flex-col">
              <div className="text-yellow-400 text-lg mb-2" aria-label={`${t.rating} de 5 estrellas`}>{"★".repeat(t.rating)}{"☆".repeat(5 - t.rating)}</div>
              <p className="text-gray-600 text-sm leading-relaxed flex-1">"{t.comment}"</p>
              <div className="mt-4 flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-blue-800 flex items-center justify-center text-white font-bold">
                  {t.name.charAt(0)}
                </div>
                <div>
                  <p className="font-semibold text-gray-800 text-sm">{t.name}</p>
                  <p className="text-xs text-gray-400">{t.service}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── OBRAS E INSTALACIONES ───────────────────────────── */}
      <section className="py-16 px-6 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-blue-900 text-center mb-2">Nuestras Obras e Instalaciones</h2>
        <p className="text-gray-500 text-center mb-4">Trabajos realizados en hogares y negocios de Bogotá</p>

        {/* Tabs residencial / comercial */}
        <div className="flex justify-center gap-3 mb-10">
          <button
            onClick={() => setProjectTab('residencial')}
            className={`px-6 py-2 rounded-full text-sm font-semibold transition-colors ${projectTab === 'residencial' ? 'bg-blue-800 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
          >
            🏠 Residencial
          </button>
          <button
            onClick={() => setProjectTab('comercial')}
            className={`px-6 py-2 rounded-full text-sm font-semibold transition-colors ${projectTab === 'comercial' ? 'bg-orange-500 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
          >
            🏢 Comercial
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects[projectTab].map((p, i) => (
            <div key={i} className="bg-white rounded-2xl shadow hover:shadow-xl transition-shadow overflow-hidden group">
              <div className="relative h-52 overflow-hidden">
                <img
                  src={p.img}
                  alt={p.title}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <span className={`absolute top-3 left-3 text-xs font-semibold px-3 py-1 rounded-full ${
                  projectTab === 'residencial' ? 'bg-blue-800 text-white' : 'bg-orange-500 text-white'
                }`}>
                  {projectTab === 'residencial' ? '🏠 Residencial' : '🏢 Comercial'}
                </span>
              </div>
              <div className="p-4">
                <h3 className="font-bold text-gray-800">{p.title}</h3>
                <p className="text-sm text-gray-500 mt-1">{p.desc}</p>
                <div className="flex items-center gap-2 mt-3 text-xs text-gray-400">
                  <span>📍 {p.zone}</span>
                  <span>·</span>
                  <span>✅ {p.service}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link
            to="/services"
            className="inline-block bg-blue-800 hover:bg-blue-900 text-white font-semibold px-8 py-3 rounded-full transition-colors"
          >
            Solicitar tu Instalación
          </Link>
        </div>
      </section>

      {/* ── COBERTURA / ZONAS ───────────────────────────────── */}
      <section className="py-16 px-6 bg-blue-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-blue-900 mb-2">Servicio a domicilio en toda Bogotá</h2>
          <p className="text-gray-600 mb-8">
            Atendemos todas las localidades de Bogotá y municipios cercanos de la Sabana Occidente y Norte.
          </p>
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {zones.map(z => (
              <span key={z} className="bg-white border border-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium">
                📍 {z}
              </span>
            ))}
          </div>
          <Link
            to="/services"
            className="inline-block bg-blue-800 hover:bg-blue-900 text-white font-semibold px-8 py-3 rounded-full transition-colors"
          >
            Solicitar Visita Técnica
          </Link>
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
