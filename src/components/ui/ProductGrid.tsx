'use client'

import ProductSkeleton from './ProductSkeleton'
import ProtectedAction from '../ProtectedAction'

interface Product {
  _id: string
  name: string
  description: string
  price: number
  category: string
  image?: string
  location?: string
  createdBy?: {
    name: string
  }
  createdAt: string
  updatedAt: string
}

interface ProductGridProps {
  productos: Product[]
  isLoading: boolean
}

const ProductGrid = ({ productos, isLoading }: ProductGridProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {isLoading
        ? Array.from({ length: 6 }).map((_, i) => <ProductSkeleton key={i} />)
        : productos.map(prod => (
          <article
            key={prod._id}
            className="bg-[#1f1f1f] border border-neutral-700 hover:border-green-900 p-4 rounded-xl shadow hover:shadow-lg transition"
          >
            <img 
              src={prod.image || "/assets/news-2.jpg"} 
              alt={prod.name} 
              className="w-full h-40 object-cover rounded" 
            />
            <h4 className="mt-2 text-lg font-semibold">{prod.name}</h4>
            <p className="text-sm text-gray-400 mb-2 line-clamp-2">{prod.description}</p>
            <p className="text-green-700 font-bold">${prod.price.toLocaleString()} CLP</p>
            {prod.location && (
              <p className="text-xs text-gray-500 mb-2">📍 {prod.location}</p>
            )}
            {prod.createdBy && (
              <p className="text-xs text-gray-500 mb-2">Por: {prod.createdBy.name}</p>
            )}
            
            <div className="mt-2 flex space-x-2">
              <button className="px-4 py-1 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors">
                Ver más
              </button>
              
              <ProtectedAction action="comprar productos">
                <button className="px-4 py-1 bg-green-700 text-white rounded-md hover:bg-green-800 hover:scale-105 transition-transform duration-200">
                  Comprar
                </button>
              </ProtectedAction>
            </div>
          </article>
        ))}
    </div>
  )
}

export default ProductGrid
