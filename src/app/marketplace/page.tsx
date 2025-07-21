'use client'

import { useEffect, useState } from 'react'
import HeroMarketplace from '@/components/ui/HeroMarketplace'
import SidebarFilters from '@/components/ui/SidebarFilters'
import ProductGrid from '@/components/ui/ProductGrid'

interface Product {
  id: string
  name: string
  price: string
}

export default function MarketplacePage() {
  const [productos, setProductos] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    fetch('https://6838f0f26561b8d882aea3c9.mockapi.io/bioMP')
      .then(res => res.json())
      .then(data => setProductos(data))
      .catch(() => setError(true))
      .finally(() => setIsLoading(false))
  }, [])

  return (
    <div className="bg-neutral-900 text-white min-h-screen">
      <HeroMarketplace />
      <section className="marketplace-layout max-w-7xl mx-auto flex flex-col md:flex-row gap-10 px-6 py-12">
        <SidebarFilters />
        <main className="product-area flex-1">
          {error ? (
            <p className="text-red-500">Error al cargar productos.</p>
          ) : (
            <ProductGrid productos={productos} isLoading={isLoading} />
          )}
        </main>
      </section>
    </div>
  )
}
