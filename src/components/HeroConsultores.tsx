'use client';

export default function HeroConsultores() {
  return (
    <section className="relative bg-[url('/assets/news-2.jpg')] bg-cover bg-center min-h-[400px] flex items-center justify-center text-center">
    <div className="bg-neutral-900/50 backdrop-blur-sm p-8 rounded-2xl text-white max-w-3xl mx-auto shadow-xl">
        <h1 className="text-3xl md:text-4xl font-bold text-white">Red de Consultores Ambientales</h1>
        <p className="text-white mt-4">
          Encuentra profesionales para asesorarte en proyectos ecológicos, estudios técnicos y regulaciones.
        </p>
        <div className="flex flex-col md:flex-row gap-4 mt-6 justify-center">
          <select className="px-4 py-2 rounded bg-white text-black">
            <option>Especialidad</option>
            <option>Impacto Ambiental</option>
            <option>Educación</option>
            <option>Normativa</option>
          </select>
          <select className="px-4 py-2 rounded bg-white text-black">
            <option>Región</option>
            <option>Metropolitana</option>
            <option>Valparaíso</option>
            <option>Antofagasta</option>
          </select>
          <select className="px-4 py-2 rounded bg-white text-black">
            <option>Modalidad</option>
            <option>Presencial</option>
            <option>Online</option>
          </select>
          <button className="bg-green-700 hover:bg-green-800 text-white px-6 py-2 rounded transition transform hover:scale-105">
            🔍 Buscar
          </button>
        </div>
      </div>
    </section>
  );
}
