const MainSection = () => {
  const sections = [
    {
      image: '/assets/category/market.png',
      alt: 'Marketplace Verde',
      title: 'Marketplace Verde',
      description: 'Compra y vende productos ecológicos en un solo lugar.'
    },
    {
      image: '/assets/category/red_consultores.png',
      alt: 'Red de Consultores',
      title: 'Red de Consultores',
      description: 'Encuentra profesionales del área ambiental y publica tus proyectos.'
    },
    {
      image: '/assets/category/educacion.png',
      alt: 'Educación Ambiental',
      title: 'Educación Ambiental',
      description: 'Aprende, enseña y comparte conocimientos sobre sostenibilidad.'
    },
    {
      image: '/assets/category/campaña.png',
      alt: 'Campañas de Apoyo',
      title: 'Campañas de Apoyo',
      description: 'Contribuye con proyectos verdes y causas ambientales.'
    }
  ]

  return (
    <main className="bg-neutral-900 mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
        {sections.map((section, index) => (
          <div
            key={index}
            className="overflow-hidden rounded-xl shadow-md transition-transform duration-300 hover:scale-105"
          >
            <div className="relative bg-[#f0e5c8]"> {/* mismo color de fondo de la imagen */}
              <img
                src={section.image}
                alt={section.alt}
                className="w-full h-64 object-contain"
              />

              <div className="absolute bottom-0 left-0 w-full bg-black/50 text-white px-4 py-3">
                <h3 className="text-lg font-semibold">{section.title}</h3>
                <p className="text-sm">{section.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  )
}

export default MainSection
