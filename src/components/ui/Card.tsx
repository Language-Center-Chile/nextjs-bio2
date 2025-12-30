import React from 'react'
import Image from 'next/image'
import Cards from '../../../public/assets/blog-1.png'

interface CardProps {
  imageSrc?: string
  imageAlt?: string
  title?: string
  description?: string
  href?: string
  className?: string
  children?: React.ReactNode
}

const Card: React.FC<CardProps> = ({ imageAlt, title, description, href, className, children }) => {
  if (children) {
    return (
      <div className={className || 'bg-white rounded-lg shadow-lg'}>
        {children}
      </div>
    )
  }
  return (
    <article className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105">
      <Image 
        src={Cards} 
        alt={imageAlt || (title || '')} 
        className="w-full h-48 object-cover"
      />
      <div className="p-6">
        {title ? <h3 className="text-xl font-semibold text-gray-800 mb-2">{title}</h3> : null}
        {description ? <p className="text-gray-600 mb-4">{description}</p> : null}
        {href ? (
          <a 
            href={href} 
            className="inline-block px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors duration-300"
          >
            Leer más
          </a>
        ) : null}
      </div>
    </article>
  )
}

export default Card
