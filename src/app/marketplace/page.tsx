import HeroMarketplace from '@/components/ui/HeroMarketplace'
import ProductGrid from '@/components/ui/ProductGrid'
import SidebarFilters from '@/components/ui/SidebarFilters'
import dbConnect from '@/lib/db'
import { supabase } from '@/lib/supabase'

interface ProductType {
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
  }
  location: {
    country: string
    city: string
  }
  createdAt: string
}

interface MarketplacePageProps {
  searchParams: Promise<{
    page?: string
    category?: string
    search?: string
    country?: string
    city?: string
  }>
}

async function getProducts(searchParams: Awaited<MarketplacePageProps['searchParams']>) {
  try {
    await dbConnect()

    if (process.env.NODE_ENV === 'development') {
      console.log('Aplicando delay de 3 segundos para ver el loading...')
      await new Promise(resolve => setTimeout(resolve, 3000))
    }

    const page = parseInt(searchParams.page || '1')
    const limit = 12
    const category = searchParams.category
    const search = searchParams.search
    const country = searchParams.country
    const city = searchParams.city

    const filters: any = { isActive: true }
    
    if (category && category !== 'all') {
      filters.category = category
    }
    
    if (search) {
      filters.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ]
    }
    
    if (country) filters['location.country'] = country
    if (city) filters['location.city'] = city

    const skip = (page - 1) * limit

    const baseQuery = supabase.from('products').select('*').order('created_at', { ascending: false })
    const from = skip
    const to = skip + limit - 1
    const pageRes = await baseQuery.range(from, to)
    const countRes = await supabase.from('products').select('id', { count: 'exact', head: true })
    const productsData = pageRes.data || []
    const totalProducts = countRes.count || 0
    const totalPages = Math.ceil(totalProducts / limit)

    const sellerIds = Array.from(new Set(productsData.map((p: any) => p.seller_id).filter(Boolean)))
    const sellersMap: Record<string, any> = {}
    if (sellerIds.length > 0) {
      const sellersRes = await supabase.from('users').select('id,name,avatar').in('id', sellerIds as any)
      const sellers = sellersRes.data || []
      for (const s of sellers) sellersMap[String(s.id)] = s
    }
    const serializedProducts = productsData.map((product: any) => {
      const seller = product.seller_id ? sellersMap[String(product.seller_id)] : null
      return {
        _id: String(product.id),
        title: product.title,
        description: product.description,
        price: product.price,
        category: product.category,
        images: product.images || [],
        seller: seller ? {
          _id: String(seller.id),
          name: seller.name,
          avatar: seller.avatar
        } : {
          _id: 'unknown',
          name: 'Usuario no disponible',
          avatar: undefined
        },
        location: {
          country: product.country || product.location?.country || 'No especificado',
          city: product.city || product.location?.city || 'No especificado'
        },
        createdAt: product.created_at ? new Date(product.created_at).toISOString() : new Date().toISOString()
      }
    })

    return {
      products: serializedProducts,
      pagination: {
        currentPage: page,
        totalPages,
        totalProducts,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1
      }
    }

  } catch (error) {
    console.error('Error fetching products:', error)
    return {
      products: [],
      pagination: {
        currentPage: 1,
        totalPages: 0,
        totalProducts: 0,
        hasNextPage: false,
        hasPrevPage: false
      }
    }
  }
}

export default async function MarketplacePage({ searchParams }: MarketplacePageProps) {
  const resolvedSearchParams = await searchParams
  const { products, pagination } = await getProducts(resolvedSearchParams)
  return (
    <div className="bg-neutral-900 text-white min-h-screen">
      <HeroMarketplace />
      <section className="marketplace-layout max-w-7xl mx-auto flex flex-col md:flex-row gap-10 px-6 py-12">
        <aside className="md:w-1/4">
          <SidebarFilters />
        </aside>
        
        <main className="md:w-3/4">
          <ProductGrid 
            productos={products} 
            isLoading={false}
            pagination={pagination}
          />
        </main>
      </section>
    </div>
  )
}
