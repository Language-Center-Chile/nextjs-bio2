'use client'

const SidebarFilters = () => {
  return (
    <aside className="w-full md:w-[270px] flex-shrink-0 space-y-8 p-6 bg-neutral-900 rounded-2xl text-white border border-neutral-700 shadow-md self-start">
      {/* CATEGORÍAS */}
      <div className="space-y-2">
        <h4 className="text-lg font-bold text-white border-b border-green-700 pb-1">Marketplace</h4>
        {[
          { icon: '🌐', name: 'Todo' },
          { icon: '🧴', name: 'Cosmética' },
          { icon: '🍎', name: 'Alimentos' },
          { icon: '👐', name: 'Artesanía' },
          { icon: '🌱', name: 'Semillas' },
          { icon: '📚', name: 'Educación' },
        ].map((cat) => (
          <button
            key={cat.name}
            className="w-full text-left px-4 py-2 rounded-md bg-neutral-800 hover:bg-green-700 transition flex items-center gap-2 cursor-pointer"
          >
            <span>{cat.icon}</span> {cat.name}
          </button>
        ))}
      </div>

      {/* UBICACIÓN */}
      <div className="space-y-2">
        <h4 className="text-lg font-bold border-b border-green-700 pb-1">Ubicación</h4>
        <label className="flex items-center gap-2 text-sm">
          📍 Región:
          <select className="w-full p-2 bg-neutral-800 text-white rounded-md border border-neutral-600 cursor-pointer">
            <option value="">Todas</option>
            <option value="metropolitana">Metropolitana</option>
            <option value="valparaiso">Valparaíso</option>
            <option value="antofagasta">Antofagasta</option>
            <option value="biobio">Biobío</option>
          </select>
        </label>
      </div>

      {/* FILTROS AVANZADOS */}
      <div className="space-y-3">
        <h4 className="text-lg font-bold border-b border-green-700 pb-1">Filtros avanzados</h4>
        <label className="block text-sm">Precio mínimo:</label>
        <input
          type="number"
          placeholder="$0"
          className="w-full p-2 bg-neutral-800 text-white rounded-md border border-neutral-700"
        />
        <label className="block text-sm">Precio máximo:</label>
        <input
          type="number"
          placeholder="$100.000"
          className="w-full p-2 bg-neutral-800 text-white rounded-md border border-neutral-700"
        />

        <div className="space-y-2 mt-2 text-sm">
          {[
            'Envío gratis',
            'Producto certificado',
            'Disponible en stock',
            'Solo emprendedores'
          ].map((filtro) => (
            <label key={filtro} className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" /> {filtro}
            </label>
          ))}
        </div>
      </div>

      {/* RECOMENDADOS */}
      <div>
        <h4 className="text-lg font-bold border-b border-green-700 pb-1 mb-2">Populares</h4>
        <ul className="text-sm space-y-1">
          <li>⭐ Shampoo de aloe vera</li>
          <li>🔥 Compostera urbana</li>
          <li>🍃 Semillas de albahaca</li>
        </ul>
      </div>

      {/* BOTÓN */}
      <div>
        <a
          href="#publicar"
          className="block text-center bg-green-600 hover:bg-green-700 transition text-white font-bold py-2 rounded-md cursor-pointer"
        >
          + Publicar producto
        </a>
      </div>
    </aside>
  )
}

export default SidebarFilters
