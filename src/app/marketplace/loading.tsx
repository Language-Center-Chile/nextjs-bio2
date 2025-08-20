import HeroMarketplace from '@/components/ui/HeroMarketplace'
import SidebarFilters from '@/components/ui/SidebarFilters'

export default function Loading() {
  return (
    <div className="bg-neutral-900 text-white min-h-screen">
      <HeroMarketplace />
      <section className="marketplace-layout max-w-7xl mx-auto flex flex-col md:flex-row gap-10 px-6 py-12">
        <aside className="md:w-1/4">
          <SidebarFilters />
        </aside>
        
        <main className="md:w-3/4">
          <div className="space-y-6">
            {/* Información de carga */}
            <div className="flex items-center space-x-2 text-gray-400">
              <div className="w-4 h-4 border-2 border-green-600 border-t-transparent rounded-full animate-spin"></div>
              <span className="text-sm">Cargando productos desde la base de datos...</span>
            </div>

            {/* Grid de skeleton cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <article
                  key={i}
                  className="bg-[#1f1f1f] border border-neutral-700 p-4 rounded-xl animate-pulse"
                >
                  {/* Imagen skeleton */}
                  <div className="w-full h-40 bg-gray-700 rounded mb-3 flex items-center justify-center">
                    <div className="w-8 h-8 text-gray-500">
                      <svg fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                  
                  {/* Título skeleton */}
                  <div className="h-5 bg-gray-700 rounded mb-2"></div>
                  
                  {/* Descripción skeleton */}
                  <div className="space-y-1 mb-3">
                    <div className="h-3 bg-gray-700 rounded w-full"></div>
                    <div className="h-3 bg-gray-700 rounded w-3/4"></div>
                  </div>
                  
                  {/* Precio skeleton */}
                  <div className="h-6 bg-gray-700 rounded w-1/2 mb-3"></div>
                  
                  {/* Vendedor info skeleton */}
                  <div className="pt-3 border-t border-gray-700">
                    <div className="h-3 bg-gray-700 rounded w-1/2 mb-1"></div>
                    <div className="h-3 bg-gray-700 rounded w-1/3"></div>
                  </div>
                  
                  {/* Botón skeleton */}
                  <div className="mt-3 h-8 bg-gray-700 rounded"></div>
                </article>
              ))}
            </div>

            {/* Paginación skeleton */}
            <div className="flex justify-center items-center space-x-2 mt-8">
              <div className="h-8 w-16 bg-gray-700 rounded animate-pulse"></div>
              <div className="h-8 w-20 bg-gray-700 rounded animate-pulse"></div>
              <div className="h-8 w-16 bg-gray-700 rounded animate-pulse"></div>
            </div>
          </div>
        </main>
      </section>
    </div>
  )
}
