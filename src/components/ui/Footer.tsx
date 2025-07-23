export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-6 relative">
      <div className="container mx-auto px-4 flex items-center justify-between">
        <img
          src="/assets/Isotipo.png"
          alt="Isotipo Biodiversidad.cl"
          className="h-8 md:h-12 lg:h-16"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <p className="text-sm">&copy; 2025 Biodiversidad.cl. Todos los derechos reservados.</p>
          <div className="flex justify-center gap-4 mt-4">
            <a href="/privacy" className="text-green-400 hover:text-green-500 transition">Política de Privacidad</a>
            <a href="/terms" className="text-green-400 hover:text-green-500 transition">Términos de Uso</a>
            <a href="/contact" className="text-green-400 hover:text-green-500 transition">Contacto</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
