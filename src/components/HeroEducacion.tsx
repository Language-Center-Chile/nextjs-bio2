'use client';

export default function HeroEducacion() {
  return (
     <section className="relative bg-[url('/assets/news-2.jpg')] bg-cover bg-center min-h-[400px] flex items-center justify-center text-center">
      <div className="bg-neutral-900/50 backdrop-blur-sm p-8 rounded-2xl text-white max-w-3xl mx-auto shadow-xl">
        <h1 className="text-3xl md:text-4xl font-bold text-white">Educación Ambiental</h1>
        <p className="text-white mt-4">Aprende, descarga y participa en iniciativas educativas sobre el medio ambiente.</p>
        <div className="flex flex-col md:flex-row gap-4 mt-6 justify-center">
          <select className="px-4 py-2 rounded bg-white text-black">
            <option>Tipo de recurso</option>
            <option>Cursos</option>
            <option>Webinars</option>
            <option>Guías</option>
            <option>Eventos</option>
          </select>
          <select className="px-4 py-2 rounded bg-white text-black">
            <option>Nivel educativo</option>
            <option>Escolar</option>
            <option>Universitario</option>
            <option>Ciudadanía</option>
          </select>
          <button className="bg-green-700 hover:bg-green-800 text-white px-6 py-2 rounded transition transform hover:scale-105">
            🔍 Buscar
          </button>
        </div>
      </div>
    </section>
  );
}
