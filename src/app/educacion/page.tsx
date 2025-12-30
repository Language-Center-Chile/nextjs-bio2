import HeroEducacion from '@/components/HeroEducacion';
import CompartirRecursoSection from '@/components/CompartirRecursoSection';
import dbConnect from '@/lib/db'
import Resource from '@/models/Resource'

export default async function EducacionPage() {
  let recursos: any[] = []

  try {
    await dbConnect()
    recursos = await Resource.find({ isActive: true }).sort({ createdAt: -1 }).lean()
  } catch (err) {
    console.error('Error fetching resources:', err)
  }

  // serializar
  const serialized = recursos.map(r => ({
    _id: r._id.toString(),
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
