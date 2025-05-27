import { Link } from "wouter";
import { ArrowLeft } from "lucide-react";
import { useState } from "react";

export default function TermsOfService() {
  const [language, setLanguage] = useState('en');

  return (
    <div className="min-h-screen bg-black text-white">
      <header className="bg-black p-4 border-b border-gray-800">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center text-blue-400 hover:text-blue-300 transition-colors">
            <ArrowLeft className="w-5 h-5 mr-2" />
            {language === 'es' ? 'Volver a TattooStencilPro' : 'Back to TattooStencilPro'}
          </Link>
          <button 
            onClick={() => setLanguage(language === 'es' ? 'en' : 'es')}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            {language === 'es' ? 'EN' : 'ES'}
          </button>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8 text-center">
          {language === 'es' ? 'Términos de Servicio' : 'Terms of Service'}
        </h1>
        <p className="text-gray-400 text-center mb-8">
          {language === 'es' ? 'Última actualización:' : 'Last updated:'} {new Date().toLocaleDateString()}
        </p>

        <div className="space-y-8 text-gray-300 leading-relaxed">
          {language === 'es' ? (
            // Spanish Content
            <>
              <section>
                <h2 className="text-2xl font-bold text-white mb-4">1. Aceptación de Términos</h2>
                <p>
                  Al acceder y utilizar TattooStencilPro, usted acepta estar sujeto a estos Términos de Servicio. 
                  Si no está de acuerdo con alguno de estos términos, no debe utilizar nuestro servicio.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">2. Propiedad Intelectual</h2>
                <div className="space-y-3">
                  <p>
                    <strong className="text-blue-400">Derechos de Autor:</strong> Todo el contenido, código, diseño, algoritmos, 
                    y tecnología de TattooStencilPro están protegidos por derechos de autor y son propiedad exclusiva de Darwin Enríquez.
                  </p>
                  <p>
                    <strong className="text-blue-400">Prohibiciones:</strong> Está estrictamente prohibido:
                  </p>
                  <ul className="list-disc ml-6 space-y-1">
                    <li>Copiar, reproducir o distribuir el código fuente</li>
                    <li>Realizar ingeniería inversa de la aplicación</li>
                    <li>Crear aplicaciones derivadas o competidoras</li>
                    <li>Extraer o utilizar nuestros algoritmos de IA</li>
                    <li>Replicar el diseño o funcionalidad</li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">3. Uso Autorizado</h2>
                <p>
                  Este servicio está destinado exclusivamente para uso personal y profesional legítimo de artistas del tatuaje. 
                  Cualquier uso para fines de copia, reproducción o desarrollo de productos competidores está prohibido.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">4. Tecnología Propietaria</h2>
                <p>
                  TattooStencilPro utiliza tecnología propietaria patentada para la generación de stencils y procesamiento de imágenes. 
                  Esta tecnología está protegida por patentes pendientes y secretos comerciales.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">5. Violaciones y Sanciones</h2>
                <div className="space-y-3">
                  <p>Las violaciones a estos términos pueden resultar en:</p>
                  <ul className="list-disc ml-6 space-y-1">
                    <li>Suspensión inmediata del servicio</li>
                    <li>Acciones legales por infracción de derechos de autor</li>
                    <li>Demandas por daños y perjuicios</li>
                    <li>Órdenes judiciales de cese y desistimiento</li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">6. Contacto Legal</h2>
                <p>
                  Para asuntos legales o informes de violaciones, contacte: 
                  <a href="mailto:contact@tattoostencilpro.app" className="text-blue-400 hover:text-blue-300 ml-1">
                    contact@tattoostencilpro.app
                  </a>
                </p>
              </section>

              <section className="bg-gray-900 p-6 rounded-lg border border-gray-800">
                <h2 className="text-xl font-bold text-red-400 mb-3">⚠️ Aviso Importante</h2>
                <p className="text-sm">
                  La violación de estos términos constituye una infracción grave de derechos de propiedad intelectual 
                  y será perseguida con todo el rigor de la ley. TattooStencilPro emplea tecnología de detección 
                  avanzada para identificar usos no autorizados.
                </p>
              </section>
            </>
          ) : (
            // English Content
            <>
              <section>
                <h2 className="text-2xl font-bold text-white mb-4">1. Terms Acceptance</h2>
                <p>
                  By accessing and using TattooStencilPro, you agree to be bound by these Terms of Service. 
                  If you do not agree with any of these terms, you should not use our service.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">2. Intellectual Property</h2>
                <div className="space-y-3">
                  <p>
                    <strong className="text-blue-400">Copyright:</strong> All content, code, design, algorithms, 
                    and technology of TattooStencilPro are protected by copyright and are the exclusive property of Darwin Enríquez.
                  </p>
                  <p>
                    <strong className="text-blue-400">Prohibitions:</strong> It is strictly prohibited to:
                  </p>
                  <ul className="list-disc ml-6 space-y-1">
                    <li>Copy, reproduce or distribute source code</li>
                    <li>Reverse engineer the application</li>
                    <li>Create derivative or competing applications</li>
                    <li>Extract or use our AI algorithms</li>
                    <li>Replicate design or functionality</li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">3. Authorized Use</h2>
                <p>
                  This service is intended exclusively for legitimate personal and professional use by tattoo artists. 
                  Any use for copying, reproduction or development of competing products is prohibited.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">4. Proprietary Technology</h2>
                <p>
                  TattooStencilPro uses proprietary patented technology for stencil generation and image processing. 
                  This technology is protected by pending patents and trade secrets.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">5. Violations and Sanctions</h2>
                <div className="space-y-3">
                  <p>Violations of these terms may result in:</p>
                  <ul className="list-disc ml-6 space-y-1">
                    <li>Immediate service suspension</li>
                    <li>Legal action for copyright infringement</li>
                    <li>Lawsuits for damages</li>
                    <li>Cease and desist court orders</li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">6. Legal Contact</h2>
                <p>
                  For legal matters or violation reports, contact: 
                  <a href="mailto:contact@tattoostencilpro.app" className="text-blue-400 hover:text-blue-300 ml-1">
                    contact@tattoostencilpro.app
                  </a>
                </p>
              </section>

              <section className="bg-gray-900 p-6 rounded-lg border border-gray-800">
                <h2 className="text-xl font-bold text-red-400 mb-3">⚠️ Important Notice</h2>
                <p className="text-sm">
                  Violation of these terms constitutes a serious infringement of intellectual property rights 
                  and will be prosecuted to the full extent of the law. TattooStencilPro employs advanced detection 
                  technology to identify unauthorized uses.
                </p>
              </section>
            </>
          )}
        </div>

        <div className="mt-12 text-center">
          <Link href="/" className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">
            {language === 'es' ? 'Volver al Inicio' : 'Back to Home'}
          </Link>
        </div>
      </main>
    </div>
  );
}