import { Link } from 'react-router-dom'
import Seo from '../components/Seo'

const faqs = [
  {
    q: '¿Cada cuánto debo hacer el mantenimiento a un calentador o estufa a gas?',
    a: 'Se recomienda realizar una revisión preventiva al menos una vez al año para calentadores y estufas a gas. Si el equipo es de alto uso o tiene más de 5 años, lo ideal es revisarlo cada 6 meses. El mantenimiento preventivo detecta fallas antes de que se conviertan en averías costosas y garantiza un funcionamiento seguro y eficiente.',
  },
  {
    q: '¿Emiten certificado técnico válido ante Vanti o entidades de control?',
    a: 'Sí. Nuestros técnicos están certificados bajo la normativa NTC colombiana y emitimos el certificado técnico de instalación y/o revisión periódica, válido ante Vanti y demás entidades de control de gas natural en Bogotá.',
  },
  {
    q: '¿Qué garantía tienen las instalaciones y repuestos?',
    a: 'Todas nuestras instalaciones y reparaciones cuentan con garantía por escrito. Los repuestos y equipos nuevos tienen la garantía del fabricante, y el trabajo técnico de instalación o reparación tiene garantía de mano de obra que consta en el certificado de servicio.',
  },
  {
    q: '¿Qué debo hacer si percibo olor a gas o una fuga?',
    a: 'En caso de olor a gas: 1) No enciendas ni apagues luces, interruptores ni electrodomésticos. 2) Cierra la llave de paso del gas. 3) Abre ventanas y puertas para ventilar. 4) Sal del lugar y llama a la línea de emergencia de gas de tu ciudad o a nosotros al 314 253 3524 desde un lugar seguro. No uses el teléfono dentro del área con el olor.',
  },
  {
    q: '¿Qué zonas de Bogotá atienden a domicilio?',
    a: 'Prestamos servicio a domicilio en toda Bogotá y municipios aledaños como Soacha, Funza, Madrid, Mosquera, Chía y Cajicá. Cubrimos localidades como Suba, Usaquén, Engativá, Chapinero y Kennedy, entre otras.',
  },
  {
    q: '¿Cuánto demora una instalación de calentador a gas?',
    a: 'La mayoría de instalaciones de calentadores a gas natural se completan el mismo día de la visita, normalmente en 2 a 4 horas dependiendo de la complejidad del punto de gas y el tipo de equipo instalado.',
  },
  {
    q: '¿Qué calentadores y estufas venden?',
    a: 'Comercializamos calentadores, estufas, hornos, insumos y repuestos certificados de marcas reconocidas como Bosch, Challenger, Rheem, Haceb y Cimsa. Todos nuestros productos tienen garantía y cumplen la normativa colombiana.',
  },
]

// Schema.org FAQPage
const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map(f => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: {
      '@type': 'Answer',
      text: f.a,
    },
  })),
}

export default function FaqPage() {
  return (
    <div className="py-12 px-4 max-w-3xl mx-auto">
      <Seo
        title="Preguntas Frecuentes | GasSolutions Bogotá"
        description="Respuestas a las dudas más comunes sobre mantenimiento de calentadores a gas, certificados Vanti, garantías, instalaciones y zonas de atención en Bogotá."
        path="/faq"
        jsonLd={faqJsonLd}
      />
      <h1 className="text-3xl font-bold text-blue-900 mb-2">Preguntas Frecuentes</h1>
      <p className="text-gray-500 mb-8">Resolvemos las dudas más comunes antes de contratar nuestros servicios</p>

      <div className="space-y-4">
        {faqs.map(f => (
          <div key={f.q} className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
            <h2 className="font-semibold text-gray-800">{f.q}</h2>
            <p className="text-gray-600 text-sm leading-relaxed mt-2">{f.a}</p>
          </div>
        ))}
      </div>

      <div className="mt-10 bg-blue-50 border border-blue-100 rounded-2xl p-6 text-center">
        <h2 className="text-lg font-bold text-blue-900 mb-2">¿Tienes otra pregunta?</h2>
        <p className="text-sm text-gray-600 mb-4">Llámanos o escríbenos por WhatsApp y te asesoramos sin costo.</p>
        <div className="flex flex-wrap justify-center gap-3">
          <a
            href="https://wa.me/573142533524?text=Hola%2C%20tengo%20una%20consulta%20sobre%20un%20servicio%20de%20gas"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-2.5 rounded-full transition-colors"
          >
            Chatear por WhatsApp
          </a>
          <Link
            to="/services"
            className="inline-block bg-blue-800 hover:bg-blue-900 text-white font-semibold px-6 py-2.5 rounded-full transition-colors"
          >
            Ver Servicios
          </Link>
        </div>
      </div>
    </div>
  )
}