import Image from 'next/image'

interface InfoSectionProps {
  image: string
  alt: string
  title: string
  description: string
}

const InfoSection = ({ image, alt, title, description }: InfoSectionProps) => {
  return (
    <section className="relative overflow-hidden rounded-xl bg-cream-100 shadow-md">
      <div className="relative aspect-[16/10] w-full">
        <Image 
          src={image} 
          alt={alt} 
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent">
          <div className="absolute bottom-0 p-4 text-white">
            <h2 className="text-xl font-bold mb-1">{title}</h2>
            <p className="text-sm leading-snug">{description}</p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default InfoSection