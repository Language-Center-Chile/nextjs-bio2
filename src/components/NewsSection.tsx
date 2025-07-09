import Image from 'next/image'
import Link from 'next/link'

interface ContentCardProps {
  image: string
  alt: string
  title: string
  description: string
  link: string
}

import ContentCard from './ui/ContentCard'

const NewsSection = () => {
  const articles = [
    {
      image: '/assets/news-1.jpg',
      alt: 'Conservación de Especies Nativas',
      title: 'Conservación de Especies Nativas',
      description: 'Nuevos proyectos para proteger la flora endémica de Chile.',
      link: '/noticias/conservacion-especies'
    },
    {
      image: '/assets/blog-1.png',
      alt: 'Guía de Compostaje',
      title: 'Guía de Compostaje',
      description: 'Aprende a crear tu propio compost en casa.',
      link: '/noticias/guia-compostaje'
    },
    {
      image: '/assets/news-2.jpg',
      alt: 'Iniciativas Sustentables',
      title: 'Iniciativas Sustentables',
      description: 'Comunidades locales implementan proyectos verdes.',
      link: '/noticias/iniciativas-sustentables'
    },
    {
      image: '/assets/blog-2.jpg',
      alt: 'Biodiversidad Urbana',
      title: 'Biodiversidad Urbana',
      description: 'Cómo crear espacios verdes en la ciudad.',
      link: '/noticias/biodiversidad-urbana'
    }
  ]

  return (
    <section className="py-12 ">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold mb-8 text-center text-white">Últimas Noticias y Artículos</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {articles.map((item, index) => (
            <ContentCard key={index} {...item} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default NewsSection