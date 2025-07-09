import InfoSection from './ui/InfoSection'


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
    <main className="container mx-auto px-4 py-8">
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
        {sections.map((section, index) => (
          <InfoSection
            key={index}
            image={section.image}
            alt={section.alt}
            title={section.title}
            description={section.description}
          />
        ))}
      </div>
    </main>
  )
}

export default MainSection