export default function TermsOfUse() {
  return (
    <main className="bg-neutral-950 text-white">
      <article className="container mx-auto max-w-4xl px-4 py-12">
        <header className="mb-8">
          <h1 className="text-3xl font-bold md:text-4xl">Términos de Uso</h1>
          <p className="mt-2 text-sm text-neutral-400">Última actualización: 11 de mayo de 2026</p>
        </header>

        <div className="space-y-8 leading-relaxed text-neutral-200">
          <section>
            <h2 className="text-xl font-semibold text-white">1. Aceptación</h2>
            <p className="mt-2">
              Al acceder y utilizar la plataforma Bio2 (Biodiversidad.cl), aceptas estos Términos de Uso. Si no estás de
              acuerdo, debes abstenerte de utilizar el servicio.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white">2. Uso de la plataforma</h2>
            <ul className="mt-2 list-disc space-y-2 pl-5">
              <li>Usar el servicio de forma lícita y respetuosa con terceros.</li>
              <li>No intentar acceder sin autorización a sistemas, cuentas o datos.</li>
              <li>No publicar contenido ilegal, engañoso, ofensivo o que infrinja derechos de terceros.</li>
              <li>No realizar acciones que afecten la disponibilidad o seguridad de la plataforma.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white">3. Cuentas y seguridad</h2>
            <p className="mt-2">
              Eres responsable de mantener la confidencialidad de tus credenciales. Debes notificarnos si sospechas de
              un acceso no autorizado a tu cuenta.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white">4. Contenido y propiedad intelectual</h2>
            <p className="mt-2">
              La plataforma, su diseño y sus componentes están protegidos por normas de propiedad intelectual. El uso no
              otorga derechos sobre marcas, diseños o software, salvo lo expresamente permitido.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white">5. Enlaces y servicios de terceros</h2>
            <p className="mt-2">
              Podemos mostrar enlaces o integrar servicios de terceros. No controlamos sus políticas y no somos
              responsables por su contenido o funcionamiento.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white">6. Limitación de responsabilidad</h2>
            <p className="mt-2">
              El servicio se proporciona “tal cual”. En la medida permitida por la ley, no garantizamos disponibilidad
              ininterrumpida y no respondemos por daños indirectos derivados del uso o imposibilidad de uso.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white">7. Cambios</h2>
            <p className="mt-2">
              Podemos actualizar estos términos para reflejar cambios en el servicio o requisitos legales. La versión
              vigente estará disponible en esta página.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white">8. Contacto</h2>
            <p className="mt-2">
              Para consultas sobre estos Términos de Uso, contáctanos desde la página de{' '}
              <a href="/landing#formulario" className="text-green-400 transition hover:text-green-500">
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
