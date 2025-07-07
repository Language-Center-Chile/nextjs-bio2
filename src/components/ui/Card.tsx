import React from 'react'
import Image from 'next/image'
import Cards from '../../../public/assets/blog-1.png'
interface CardProps {
  imageSrc: string;
  imageAlt?: string;
  title: string;
  description: string;
  href: string;
}

const Card = ({ imageSrc, imageAlt, title, description, href }: CardProps) => {
  return (
    <article className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105">
      <Image 
        src={Cards} 
        alt={imageAlt || title} 
        className="w-full h-48 object-cover"
      />
      <div className="p-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-2">{title}</h3>
        <p className="text-gray-600 mb-4">{description}</p>
        <a 
          href={href} 
          className="inline-block px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors duration-300"
        >
          Leer más
        </a>
      </div>
    </article>
  )
}

export default Card