import Image from 'next/image'

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-6">
      <div className="container mx-auto px-4 m-2 grid grid-cols-1 items-center gap-4 md:grid-cols-3">
        <div className="flex justify-center md:justify-start">
          <Image
            src="/assets/Isotipo.png"
            alt="Isotipo Biodiversidad.cl"
            width={256}
            height={256}
            quality={100}
            priority
            className="h-8 md:h-12 lg:h-16 w-auto"
          />
        </div>

        <div className="flex flex-col items-center text-center">
          <p className="text-sm">&copy; 2026 Biodiversidad.cl. Todos los derechos reservados.</p>
          <div className="mt-2 flex flex-wrap justify-center gap-x-4 gap-y-2 text-sm">
            <a href="/landing/privacity" className="text-green-400 hover:text-green-500 transition">
              Política de Privacidad
            </a>
            <a href="/terms" className="text-green-400 hover:text-green-500 transition">
              Términos de Uso
            </a>
            <a href="/contact" className="text-green-400 hover:text-green-500 transition">
              Contacto
            </a>
          </div>
          <p className="mt-2 text-sm text-orange-500">Desarrollo web por Equipo Language Center Chile Tech.</p>
        </div>

        <div className="hidden md:block" />
      </div>
    </footer>
  );
}
