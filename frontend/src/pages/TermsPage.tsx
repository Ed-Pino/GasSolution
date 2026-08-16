import { Link } from 'react-router-dom'
import Seo from '../components/Seo'

export default function TermsPage() {
  return (
    <div className="py-12 px-4 max-w-3xl mx-auto">
      <Seo
        title="Términos y Condiciones | GasSolutions Bogotá"
        description="Términos y condiciones de uso del sitio web de GasSolutions Bogotá: productos, servicios, garantías y política de compras."
        path="/terms"
      />
      <h1 className="text-3xl font-bold text-blue-900 mb-6">Términos y Condiciones</h1>

      <div className="space-y-6 text-gray-600 leading-relaxed text-sm">
        <div>
          <h2 className="text-lg font-bold text-gray-800 mb-2">1. Información general</h2>
          <p>
            Este sitio web es operado por <strong>GasSolutions Bogotá</strong>, empresa dedicada a la venta,
            instalación y mantenimiento de equipos y redes de gas natural en Bogotá, Colombia
            (Calle 2 # 93D-30, Bogotá · Teléfono 314 253 3524). Al utilizar este sitio, aceptas los siguientes
            términos y condiciones.
          </p>
        </div>

        <div>
          <h2 className="text-lg font-bold text-gray-800 mb-2">2. Productos y precios</h2>
          <p>
            Los precios se expresan en pesos colombianos (COP) e incluyen el IVA vigente. Los productos y
            servicios están sujetos a disponibilidad. Nos reservamos el derecho de modificar precios sin previo
            aviso; el precio vigente al momento de confirmar la compra será el aplicable.
          </p>
        </div>

        <div>
          <h2 className="text-lg font-bold text-gray-800 mb-2">3. Pedidos y pagos</h2>
          <p>
            El pedido se confirma tras registrar los datos de entrega. El pago se realiza contra visita o
            entrega del equipo, salvo acuerdos diferentes con el cliente. Una vez confirmado el pedido, un
            asesor se comunicará para coordinar la instalación o el servicio contratado.
          </p>
        </div>

        <div>
          <h2 className="text-lg font-bold text-gray-800 mb-2">4. Garantías</h2>
          <p>
            Los equipos nuevos cuentan con la garantía del fabricante y las instalaciones/reparaciones con
            garantía de mano de obra, emitida por escrito en el certificado de servicio. La garantía no cubre
            daños por mal uso, manipulación por personal no autorizado ni intervención de la red de gas sin
            certificación.
          </p>
        </div>

        <div>
          <h2 className="text-lg font-bold text-gray-800 mb-2">5. Servicios técnicos</h2>
          <p>
            Todos los trabajos de instalación, mantenimiento, revisión y reparación son realizados por
            técnicos certificados bajo la normativa NTC colombiana. Los trabajos que requieran certificación
            ante Vanti u otras entidades de control incluyen el certificado correspondiente.
          </p>
        </div>

        <div>
          <h2 className="text-lg font-bold text-gray-800 mb-2">6. Responsabilidad</h2>
          <p>
            GasSolutions no se hace responsable por el mal uso de los equipos, la manipulación de redes de gas
            por terceros no certificados ni por daños derivados del incumplimiento de las recomendaciones de
            seguridad entregadas al cliente.
          </p>
        </div>

        <div>
          <h2 className="text-lg font-bold text-gray-800 mb-2">7. Contacto</h2>
          <p>
            Para consultas sobre estos términos: <strong>314 253 3524</strong> ·
            <strong> Calle 2 # 93D-30, Bogotá</strong>.
          </p>
        </div>
      </div>

      <div className="mt-8 text-center">
        <Link to="/" className="inline-block bg-blue-800 hover:bg-blue-900 text-white font-semibold px-6 py-2.5 rounded-full transition-colors">
          Volver al inicio
        </Link>
      </div>
    </div>
  )
}