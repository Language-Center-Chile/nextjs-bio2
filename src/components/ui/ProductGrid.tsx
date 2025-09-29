'use client'

import ProductSkeleton from './ProductSkeleton'
import ProtectedAction from '../ProtectedAction'

interface Product {
  _id: string
  title: string
  description: string
  price: number
  category: string
  images: string[]
  seller: {
    _id: string
    name: string
    avatar?: string
    // email removido por seguridad - no se expone al cliente
  }
  location: {
    country: string
    city: string
    // coordenadas removidas por privacidad
  }
  createdAt: string
}

interface Pagination {
  currentPage: number
  totalPages: number
  totalProducts: number
  hasNextPage: boolean
  hasPrevPage: boolean
}

interface ProductGridProps {
  productos: Product[]
  isLoading: boolean
  pagination?: Pagination
}

const ProductGrid = ({ productos, isLoading, pagination }: ProductGridProps) => {
  return (
    <div className="space-y-6">
      {/* Información de resultados */}
      {pagination && (
        <div className="text-sm text-gray-400">
          Mostrando {productos.length} de {pagination.totalProducts} productos
        </div>
      )}

      {/* Grid de productos */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {isLoading
          ? Array.from({ length: 6 }).map((_, i) => <ProductSkeleton key={i} />)
          : productos.map((producto: Product) => (
            <article
              key={producto._id}
              className="bg-[#1f1f1f] border border-neutral-700 hover:border-green-900 p-4 rounded-xl shadow hover:shadow-lg transition"
            >
              <div className="w-full h-40 bg-gray-700 rounded mb-3 flex items-center justify-center">
                <span className="text-gray-400">Sin imagen</span>
              </div>
              <h4 className="mt-2 text-lg font-semibold">{producto.title}</h4>
              <p className="text-sm text-gray-300 mb-2 line-clamp-2">{producto.description}</p>
              <p className="text-green-400 font-bold text-lg">${producto.price.toLocaleString()} CLP</p>
              
              {/* Información del vendedor */}
              <div className="mt-3 pt-3 border-t border-gray-700">
                <p className="text-xs text-gray-400">Vendido por: {producto.seller.name}</p>
                <p className="text-xs text-gray-500">{producto.location.city}, {producto.location.country}</p>
              </div>
              
              <button className="mt-3 w-full px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors">
                Ver detalles
              </button>
            </article>
          ))}
      </div>

      {/* Paginación */}
      {pagination && pagination.totalPages > 1 && (
        <div className="flex justify-center items-center space-x-2 mt-8">
          {pagination.hasPrevPage && (
            <a 
              href={`?page=${pagination.currentPage - 1}`}
              className="px-3 py-2 bg-gray-700 text-white rounded hover:bg-gray-600"
            >
              Anterior
            </a>
          )}
          
          <span className="px-3 py-2 text-gray-300">
            Página {pagination.currentPage} de {pagination.totalPages}
          </span>
          
          {pagination.hasNextPage && (
            <a 
              href={`?page=${pagination.currentPage + 1}`}
              className="px-3 py-2 bg-gray-700 text-white rounded hover:bg-gray-600"
            >
              Siguiente
            </a>
          )}
        </div>
      )}
    </div>
  )
}

export default ProductGrid
