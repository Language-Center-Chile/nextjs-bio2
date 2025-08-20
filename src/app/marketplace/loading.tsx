export default function Loading() {
  return (
    <div className="bg-neutral-900 text-white min-h-screen">
      {/* Hero Skeleton */}
      <div className="h-64 bg-gradient-to-r from-green-800 to-green-900 flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-64 h-8 bg-gray-700 rounded animate-pulse mx-auto"></div>
          <div className="w-48 h-4 bg-gray-600 rounded animate-pulse mx-auto"></div>
        </div>
      </div>

      {/* Content Skeleton */}
      <section className="max-w-7xl mx-auto flex flex-col md:flex-row gap-10 px-6 py-12">
        {/* Sidebar Skeleton */}
        <aside className="w-full md:w-64 space-y-4">
          <div className="h-6 bg-gray-700 rounded animate-pulse w-32"></div>
          <div className="space-y-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="h-4 bg-gray-600 rounded animate-pulse w-24"></div>
            ))}
          </div>
          <div className="h-6 bg-gray-700 rounded animate-pulse w-28 mt-6"></div>
          <div className="space-y-2">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="h-4 bg-gray-600 rounded animate-pulse w-20"></div>
            ))}
          </div>
        </aside>

        {/* Products Grid Skeleton */}
        <main className="flex-1">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="bg-[#1f1f1f] border border-neutral-700 p-4 rounded-xl animate-pulse">
                <div className="w-full h-40 bg-gray-700 rounded mb-4"></div>
                <div className="h-6 bg-gray-600 rounded mb-2 w-3/4"></div>
                <div className="h-4 bg-gray-600 rounded mb-4 w-1/2"></div>
                <div className="h-8 bg-gray-600 rounded w-20"></div>
              </div>
            ))}
          </div>
        </main>
      </section>
    </div>
  )
}
