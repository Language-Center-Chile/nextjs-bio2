'use client'

import { useEffect, useState } from 'react'

interface Product {
  id: string
  name: string
  price: string
}

const ProductGrid = () => {
  const [productos, setProductos] = useState<Product[]>([])
  const [error, setError] = useState(false)

  useEffect(() => {
    fetch('https://6838f0f26561b8d882aea3c9.mockapi.io/bioMP')
      .then(res => res.json())
      .then(data => setProductos(data))
      .catch(() => setError(true))
  }, [])

  if (error) {
    return <p className="text-red-500">Error al cargar productos.</p>
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {productos.map(prod => (
        <article key={prod.id} className="bg-[#1f1f1f] border border-neutral-700 hover:border-green-900 p-4 rounded-xl shadow hover:shadow-lg transition">
          <img src="/assets/news-2.jpg" alt={prod.name} className="w-full h-40 object-cover rounded" />
          <h4 className="mt-2 text-lg font-semibold">{prod.name}</h4>
          <p className="text-green-700 font-bold">${prod.price} CLP</p>
         <button className="mt-2 px-4 py-1 cursor-pointer bg-green-700 text-white rounded-md hover:bg-green-800 hover:scale-105 transition-transform duration-200">
            Ver más
          </button>

        </article>
      ))}
    </div>
  )
}

export default ProductGrid
