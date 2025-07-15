export default function CompartirRecursoSection() {
  return (
    <section className="bg-green-700 py-12 text-white text-center">
      <div className="max-w-xl mx-auto space-y-4">
        <div className="text-4xl"><i className="fas fa-chalkboard-teacher"></i></div>
        <h3 className="text-2xl font-semibold">¿Tienes material educativo?</h3>
        <p>ONGs, docentes y organizaciones pueden compartir sus recursos con la comunidad.</p>
        <a href="#" className="inline-block bg-white text-green-700 font-semibold px-6 py-2 rounded hover:bg-gray-100 transition">
          + Compartir recurso
        </a>
      </div>
    </section>
  );
}
