import HeroEducacion from '@/components/HeroEducacion';
import CompartirRecursoSection from '@/components/CompartirRecursoSection';
import dbConnect from '@/lib/db'
import { supabase } from '@/lib/supabase'
import Image from 'next/image'

interface Recurso {
  id: string
  title: string
  description: string
  image: string
  link: string
  isActive: boolean
  created_at: string
}

export default async function EducacionPage() {
  let recursos: Recurso[] = []

  try {
    await dbConnect()
    const { data, error } = await supabase
      .from('resources')
      .select('id,title,description,image,link,isActive,created_at')
      .eq('isActive', true)
      .order('created_at', { ascending: false })
    if (!error && data) recursos = data as unknown as Recurso[]
  } catch (err) {
    console.error('Error fetching resources:', err)
  }

  // serializar
  const serialized = recursos.map((r) => ({
    _id: String(r.id),
    title: r.title,
    description: r.description,
    image: r.image,
    link: r.link
  }))

  return (
    <>
      <HeroEducacion />
      <section className="py-12 px-4 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {serialized.map((recurso) => (
            <div key={recurso._id} className="bg-[#1f1f1f] border border-neutral-700 hover:border-green-800 p-4 rounded-xl shadow hover:shadow-lg transition duration-300 flex flex-col items-center text-center">
              <div className="w-full h-40 relative mb-4">
                <Image 
                  src={recurso.image || '/assets/featured/chakana.jpg'} 
                  alt={recurso.title} 
                  fill
                  className="object-cover rounded" 
                />
              </div>
              <h4 className="text-white text-lg font-semibold">{recurso.title}</h4>
              <p className="text-sm text-gray-300 mt-1">{recurso.description}</p>
              <a href={recurso.link || '#'} className="mt-4 px-4 py-1 bg-green-700 text-white rounded-md hover:bg-green-800 hover:scale-105 transition-transform duration-200">Acceder</a>
            </div>
          ))}
        </div>
      </section>
      <CompartirRecursoSection />
    </>
  );
}