export default function PrivacyPolicy() {
  return (
    <main className="bg-neutral-950 text-white">
      <article className="container mx-auto max-w-4xl px-4 py-12">
        <header className="mb-8">
          <h1 className="text-3xl font-bold md:text-4xl">Política de Privacidad</h1>
          <p className="mt-2 text-sm text-neutral-400">Última actualización: 11 de mayo de 2026</p>
        </header>

        <div className="space-y-8 leading-relaxed text-neutral-200">
          <section>
            <h2 className="text-xl font-semibold text-white">1. Alcance</h2>
            <p className="mt-2">
              Esta Política de Privacidad describe cómo Biodiversidad.cl recopila, utiliza y protege la información
              personal cuando utilizas la plataforma Bio2 y sus funcionalidades asociadas.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white">2. Información que recopilamos</h2>
            <ul className="mt-2 list-disc space-y-2 pl-5">
              <li>Datos de cuenta: nombre, correo electrónico y credenciales asociadas al acceso.</li>
              <li>Datos de perfil: información que decidas publicar (por ejemplo, biografía, avatar, intereses).</li>
              <li>Datos de uso: eventos básicos para operar y mejorar el servicio (por ejemplo, páginas visitadas).</li>
              <li>Comunicaciones: mensajes que nos envíes a través de formularios o canales de contacto.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white">3. Cómo usamos la información</h2>
            <ul className="mt-2 list-disc space-y-2 pl-5">
              <li>Proveer y mantener el funcionamiento de la plataforma.</li>
              <li>Gestionar autenticación, seguridad y prevención de abuso.</li>
              <li>Mejorar experiencia, rendimiento y calidad del servicio.</li>
              <li>Responder solicitudes, consultas o soporte.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white">4. Base legal y consentimiento</h2>
            <p className="mt-2">
              Cuando corresponda, tratamos tus datos sobre la base de tu consentimiento, la ejecución del servicio
              solicitado y/o el interés legítimo de operar una plataforma segura y funcional.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white">5. Compartición con terceros</h2>
            <p className="mt-2">
              No vendemos tu información personal. Podremos compartir datos con proveedores que nos ayudan a operar la
              plataforma (por ejemplo, infraestructura), bajo acuerdos y medidas razonables de seguridad.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white">6. Conservación</h2>
            <p className="mt-2">
              Conservamos la información el tiempo necesario para prestar el servicio y cumplir obligaciones legales o
              de seguridad. Puedes solicitar eliminación cuando aplique.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white">7. Tus derechos</h2>
            <ul className="mt-2 list-disc space-y-2 pl-5">
              <li>Acceder, rectificar o actualizar tu información.</li>
              <li>Solicitar eliminación y/o limitar ciertos tratamientos, cuando aplique.</li>
              <li>Retirar consentimiento para tratamientos basados en éste, cuando aplique.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white">8. Contacto</h2>
            <p className="mt-2">
              Si tienes dudas sobre esta Política de Privacidad, contáctanos desde la página de{' '}
              <a href="/contact" className="text-green-400 transition hover:text-green-500">
                Contacto
              </a>
              .
            </p>
          </section>
        </div>
      </article>
    </main>
  )
}
