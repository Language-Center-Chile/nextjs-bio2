import Image from 'next/image'
import Link from 'next/link'

interface ContentCardProps {
  image: string
  alt: string
  title: string
  description: string
  link: string
}

const ContentCard = ({ image, alt, title, description, link }: ContentCardProps) => {
  return (
    <article className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      <div className="relative aspect-video w-full">
        <Image 
          src={image} 
          alt={alt} 
          fill
          className="object-cover"
          priority
        />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">{title}</h3>
        <p className="text-sm text-gray-600 mb-3">{description}</p>
        <Link 
          href={link} 
          className="text-green-600 text-sm font-medium hover:text-green-700 transition-colors"
        >
          Leer más
        </Link>
      </div>
    </article>
  )
}

export default ContentCard