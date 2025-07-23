export default function CampanasSection() {
  return (
    <>
      {/* HERO */}
      <section className="relative bg-[url('/assets/Consultores1.jpg')] bg-cover bg-center min-h-[400px] flex items-center justify-center text-center">
        <div className="bg-neutral-900/50 backdrop-blur-sm p-8 rounded-2xl text-white max-w-3xl mx-auto shadow-xl">
          <h1 className="text-3xl md:text-4xl font-bold text-white">Súmate a las Campañas Verdes</h1>
          <p className="text-white mt-4">Impacta positivamente en la naturaleza con acciones concretas. ¡Cada aporte cuenta!</p>
          <a href="#campanas" className="bg-green-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-green-700 transition flex flex-col md:flex-row gap-4 mt-6">Explorar campañas</a>
        </div>
      </section>

      {/* CAMPAÑA DESTACADA MEJORADA */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center gap-8">
          <div className="md:w-1/2">
            <span className="text-green-600 font-semibold">🌱 Campaña destacada</span>
            <h2 className="text-2xl font-bold text-gray-800 mt-2">Reforestación en Patagonia</h2>
            <p className="text-gray-600 mt-4">
              Súmate a la restauración de los bosques nativos del sur de Chile. Queremos plantar <strong>5.000 árboles</strong> para devolver vida a ecosistemas degradados. ¡Cada aporte cuenta!
            </p>
            <div className="mt-6">
              <div className="w-full bg-gray-200 rounded-full h-4">
                <div className="bg-green-600 h-4 rounded-full" style={{ width: '72%' }}></div>
              </div>
              <p className="text-gray-600 mt-2">Meta alcanzada: <strong>72%</strong></p>
            </div>
            <a href="#" className="bg-green-600 text-white px-6 py-3 rounded-full font-semibold mt-6 inline-block hover:bg-green-700 transition">💚 Donar ahora</a>
          </div>
          <div className="md:w-1/2">
            <img src="https://images.unsplash.com/photo-1580411196492-027c480950c1?w=500&auto=format&fit=crop&q=60" alt="Campaña Patagonia" className="rounded-lg shadow-md" />
          </div>
        </div>
      </section>

      {/* OTRAS CAMPAÑAS */}
      <section className="bg-gray-100 py-16" id="campanas">
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white rounded-lg shadow-md p-4 text-center">
            <img src="https://images.unsplash.com/photo-1592194996308-7b43878e84a6?auto=format&fit=crop&w=400&q=80" alt="Protección de humedales" className="rounded-lg mb-4" />
            <h4 className="text-lg font-bold text-gray-800">Protección de Humedales Urbanos</h4>
            <p className="text-gray-600">Meta: Conservación y educación ambiental</p>
            <a href="#" className="bg-green-600 text-white px-4 py-2 rounded-full font-semibold mt-4 inline-block hover:bg-green-700 transition">Apoyar</a>
          </div>
          <div className="bg-white rounded-lg shadow-md p-4 text-center">
            <img src="https://images.unsplash.com/photo-1508780709619-79562169bc64?auto=format&fit=crop&w=400&q=80" alt="Campaña de reciclaje" className="rounded-lg mb-4" />
            <h4 className="text-lg font-bold text-gray-800">Campaña Nacional de Reciclaje</h4>
            <p className="text-gray-600">Meta: 1.000 kits educativos</p>
            <a href="#" className="bg-green-600 text-white px-4 py-2 rounded-full font-semibold mt-4 inline-block hover:bg-green-700 transition">Sumarse</a>
          </div>
          <div className="bg-white rounded-lg shadow-md p-4 text-center">
            <img src="https://images.unsplash.com/photo-1580411196492-027c480950c1?w=500&auto=format&fit=crop&q=60" alt="Salvemos los polinizadores" className="rounded-lg mb-4" />
            <h4 className="text-lg font-bold text-gray-800">Salvemos a los Polinizadores</h4>
            <p className="text-gray-600">Meta: 200 jardines urbanos</p>
            <a href="#" className="bg-green-600 text-white px-4 py-2 rounded-full font-semibold mt-4 inline-block hover:bg-green-700 transition">Contribuir</a>
          </div>
        </div>
      </section>

      {/* INVITACIÓN A CREAR CAMPAÑA */}
      <section className="bg-green-600 text-white py-16 text-center">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center">
            <i className="fas fa-hand-holding-heart text-4xl mb-4"></i>
            <h3 className="text-2xl font-bold mb-4">¿Tienes una causa verde?</h3>
            <p className="text-lg mb-6">
              Si eres una ONG o emprendimiento verificado, puedes crear tu propia campaña ambiental. Comparte tu propósito y encuentra apoyo en la comunidad.
            </p>
            <a href="#" className="bg-white text-green-600 px-6 py-3 rounded-full font-semibold hover:bg-gray-100 transition">+ Crear campaña</a>
          </div>
        </div>
      </section>
    </>
  );
}

