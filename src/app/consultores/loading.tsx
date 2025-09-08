export default function LoadingConsultores() {
  return (
    <div className="bg-neutral-900 text-white min-h-screen">
      <div className="h-40 bg-gradient-to-r from-green-800 to-green-900 flex items-center justify-center">
        <div className="text-center space-y-2">
          <div className="w-48 h-6 bg-gray-700 rounded animate-pulse mx-auto"></div>
          <div className="w-32 h-4 bg-gray-600 rounded animate-pulse mx-auto"></div>
        </div>
      </div>

      <section className="py-12 px-4 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="bg-[#1f1f1f] border border-neutral-700 p-4 rounded-xl animate-pulse">
              <div className="w-full h-40 bg-gray-700 rounded mb-4"></div>
              <div className="h-5 bg-gray-700 rounded mb-2 w-3/4"></div>
              <div className="h-3 bg-gray-700 rounded mb-2 w-full"></div>
              <div className="h-8 bg-gray-700 rounded w-24 mt-4"></div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
