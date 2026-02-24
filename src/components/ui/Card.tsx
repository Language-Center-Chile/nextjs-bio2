import React from 'react'
import Image from 'next/image'

interface CardProps {
  imageSrc?: string
  imageAlt?: string
  title?: string
  description?: string
  href?: string
  className?: string
  children?: React.ReactNode
}

const Card: React.FC<CardProps> = ({ imageSrc,imageAlt, title, description, href, className, children }) => {
  if (children) {
    return (
      <div className={className || 'bg-white rounded-lg shadow-lg'}>
        {children}
      </div>
    )
  }
  return (
    <article className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105">
      <div className="relative w-full h-48">
        {imageSrc ? (
          <Image 
            src={imageSrc} 
            alt={imageAlt || (title || '')} 
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="w-full h-full bg-gray-200" />
        )}
      </div>
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
