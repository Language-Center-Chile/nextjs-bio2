import HeroMarketplace from '@/components/ui/HeroMarketplace'
import SidebarFilters from '@/components/ui/SidebarFilters'
import ProductGrid from '@/components/ui/ProductGrid'
import { dbConnect } from '@/lib/mongodb'
import Product from '@/models/Product'
import User from '@/models/User'

interface ProductData {
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

async function getProducts(): Promise<ProductData[]> {
  try {
    await dbConnect()
    
    // Importar explícitamente el modelo User para asegurar que esté registrado
    User
    
    const products = await Product.find({ status: 'ACTIVE' })
      .populate('createdBy', 'name')
      .sort({ createdAt: -1 })
      .lean()
    
    // Serializar para Next.js
    return products.map((product: any) => ({
      _id: product._id.toString(),
      name: product.name,
      description: product.description,
      price: product.price,
      category: product.category,
      image: product.image,
      location: product.location,
      createdBy: product.createdBy ? {
        name: product.createdBy.name,
      } : undefined,
      createdAt: product.createdAt.toISOString(),
      updatedAt: product.updatedAt.toISOString(),
    }))
  } catch (error) {
    console.error('Error fetching products:', error)
    return []
  }
}

export default async function MarketplacePage() {
  const productos = await getProducts()

  return (
    <div className="bg-neutral-900 text-white min-h-screen">
      <HeroMarketplace />
      <section className="marketplace-layout max-w-7xl mx-auto flex flex-col md:flex-row gap-10 px-6 py-12">
        <SidebarFilters />
        <main className="product-area flex-1">
          <ProductGrid productos={productos} isLoading={false} />
        </main>
      </section>
    </div>
  )
}
