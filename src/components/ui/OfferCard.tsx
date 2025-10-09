interface OfferCardProps {
  title: string
  description?: string
  location?: { country?: string; city?: string }
  salaryMin?: number
  salaryMax?: number
  contact?: string
  tags?: string[]
}

export default function OfferCard({ title, description, location, salaryMin, salaryMax, contact, tags }: OfferCardProps) {
  return (
    <div className="bg-[#1f1f1f] border border-neutral-700 hover:border-green-800 p-4 rounded-xl shadow hover:shadow-lg transition duration-300">
      <h4 className="text-white text-lg font-semibold">{title}</h4>
      {tags && tags.length > 0 && <div className="text-sm text-green-400 mt-1">{tags.join(', ')}</div>}
      <p className="text-sm text-gray-300 mt-2 line-clamp-3">{description}</p>
      <div className="mt-3 text-sm text-gray-400">{location?.country || ''} {location?.city ? `— ${location.city}` : ''}</div>
      <div className="mt-2 text-sm">{salaryMin ? `${salaryMin}${salaryMax ? ` - ${salaryMax}` : ''}` : 'Salario no especificado'}</div>
      {contact && <div className="mt-3"><button className="px-3 py-1 bg-green-700 text-white rounded">Contactar</button></div>}
    </div>
  )
}
