import ProtectedAction from './ProtectedAction'

export default function PublicarOfertaSection() {
  return (
    <section className="bg-green-700 py-12 text-white text-center">
      <div className="max-w-xl mx-auto space-y-4">
        <div className="text-4xl"><i className="fas fa-briefcase"></i></div>
        <h3 className="text-2xl font-semibold">¿Representas una empresa o institución?</h3>
        <p>Publica una oferta laboral o convocatoria para consultores ambientales.</p>
        
        <ProtectedAction fallback={<span className="inline-block bg-white text-green-700 font-semibold px-6 py-2 rounded opacity-50 cursor-not-allowed">+ Publicar oferta</span>}>
          <a href="#" className="inline-block bg-white text-green-700 font-semibold px-6 py-2 rounded hover:bg-gray-100 transition">
            + Publicar oferta
          </a>
        </ProtectedAction>
      </div>
    </section>
  );
}
