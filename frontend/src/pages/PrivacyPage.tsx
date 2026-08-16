import { Link } from 'react-router-dom'
import Seo from '../components/Seo'

export default function PrivacyPage() {
  return (
    <div className="py-12 px-4 max-w-3xl mx-auto">
      <Seo
        title="Política de Tratamiento de Datos Personales | GasSolutions Bogotá"
        description="Política de tratamiento de datos personales (Habeas Data) de GasSolutions Bogotá, en cumplimiento de la Ley 1581 de 2012 de Colombia."
        path="/privacy"
      />
      <h1 className="text-3xl font-bold text-blue-900 mb-6">Política de Tratamiento de Datos Personales</h1>

      <div className="space-y-6 text-gray-600 leading-relaxed text-sm">
        <div>
          <h2 className="text-lg font-bold text-gray-800 mb-2">1. Responsable del tratamiento</h2>
          <p>
            <strong>GasSolutions Bogotá</strong>, con domicilio en Calle 2 # 93D-30, Bogotá, Colombia
            (teléfono 314 253 3524), es el responsable del tratamiento de los datos personales recolectados
            a través de este sitio web, en cumplimiento de la Ley 1581 de 2012 y sus normas
            reglamentarias (Decreto 1377 de 2013).
          </p>
        </div>

        <div>
          <h2 className="text-lg font-bold text-gray-800 mb-2">2. Datos recolectados</h2>
          <p>
            Recolectamos únicamente los datos necesarios para atender los servicios y ventas: nombre,
            teléfono, correo electrónico y dirección de entrega o de instalación. Estos datos se obtienen
            directamente del titular al momento de registrar un pedido o solicitar un servicio.
          </p>
        </div>

        <div>
          <h2 className="text-lg font-bold text-gray-800 mb-2">3. Finalidad del tratamiento</h2>
          <p>
            Los datos personales son utilizados para: procesar pedidos y servicios, coordinar visitas
            técnicas, emitir certificados de instalación, facturación, garantías y atención al cliente.
            GasSolutions no vende ni cede datos personales a terceros con fines comerciales.
          </p>
        </div>

        <div>
          <h2 className="text-lg font-bold text-gray-800 mb-2">4. Derechos del titular</h2>
          <p>
            De conformidad con el artículo 8 de la Ley 1581 de 2012, el titular puede: conocer, actualizar y
            rectificar sus datos; solicitar prueba de la autorización; ser informado del uso dado a sus datos;
            presentar quejas ante la Superintendencia de Industria y Comercio; revocar la autorización y/o
            solicitar la supresión de sus datos cuando corresponda.
          </p>
        </div>

        <div>
          <h2 className="text-lg font-bold text-gray-800 mb-2">5. Procedimiento de reclamos (Habeas Data)</h2>
          <p>
            Para ejercer los derechos anteriores, el titular puede enviar su solicitud al correo de contacto
            o al teléfono <strong>314 253 3524</strong>, indicando su nombre, el derecho que desea ejercer y
            los datos objeto de la consulta o reclamo. Responderemos en los términos previstos por la ley.
          </p>
        </div>

        <div>
          <h2 className="text-lg font-bold text-gray-800 mb-2">6. Vigencia</h2>
          <p>
            Esta política está vigente a partir de su publicación y podrá ser actualizada cuando sea
            necesario. La versión aplicable es la publicada en este sitio web.
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