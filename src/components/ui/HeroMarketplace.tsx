'use client'

const HeroMarketplace = () => {
  return (
    <section className="relative bg-[url('/assets/Plantas.jpg')] bg-cover bg-center min-h-[400px] flex items-center justify-center text-center">
  <div className="bg-neutral-900/50 backdrop-blur-sm p-8 rounded-2xl text-white max-w-3xl mx-auto shadow-xl">

    <h1 className="text-3xl md:text-5xl font-bold mb-4">Conecta con la naturaleza</h1>
    <p className="text-lg mb-6">Más de 10.000 productos ecológicos y sustentables</p>
    <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
      <select className="p-2 rounded bg-white text-black">
        <option>Categoría</option>
        <option>Cosmética</option>
        <option>Alimentos</option>
        <option>Artesanía</option>
      </select>
      <select className="p-2 rounded bg-white text-black">
        <option>Región</option>
        <option>Valparaíso</option>
        <option>Antofagasta</option>
      </select>
      <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
        🔍 Buscar
      </button>
    </div>
  </div>
</section>

  )
}

export default HeroMarketplace
