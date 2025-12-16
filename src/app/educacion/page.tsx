import HeroEducacion from '@/components/HeroEducacion';
import CompartirRecursoSection from '@/components/CompartirRecursoSection';
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

export default async function EducacionPage() {
  let recursos: any[] = []

  try {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL
    const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    const supabase = url && key ? createServerClient(url, key, {
      cookies: {
        getAll() {
          return cookies().getAll()
        },
      setAll(cookiesToSet) {
        const store = cookies()
        cookiesToSet.forEach(({ name, value, options }) => store.set(name, value, options))
      },
      },
    }) : null
    if (!supabase) throw new Error('Supabase no configurado')
    const { data, error } = await supabase
      .from('resources')
      .select('*')
      .eq('isActive', true)
      .order('created_at', { ascending: false })
    if (error) throw error
    recursos = data || []
  } catch (err) {
    console.error('Error fetching resources:', err)
  }

  // serializar
  const serialized = recursos.map(r => ({
    _id: String(r.id ?? Math.random()),
    title: r.title ?? 'Recurso',
    description: r.description ?? '',
    image: r.image ?? '/assets/featured/chakana.jpg',
    link: r.link ?? '#'
  }))

  return (
    <>
      <HeroEducacion />
      <section className="py-12 px-4 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {serialized.map((recurso) => (
            <div key={recurso._id} className="bg-[#1f1f1f] border border-neutral-700 hover:border-green-800 p-4 rounded-xl shadow hover:shadow-lg transition duration-300 flex flex-col items-center text-center">
              <img src={recurso.image || '/assets/featured/chakana.jpg'} alt={recurso.title} className="w-full h-40 object-cover rounded mb-4" />
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
