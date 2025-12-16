import HeroMarketplace from '@/components/ui/HeroMarketplace'
import ProductGrid from '@/components/ui/ProductGrid'
import SidebarFilters from '@/components/ui/SidebarFilters'
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

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
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL
    const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    const supabase = url && key ? createServerClient(url, key, {
      cookies: {
        async getAll() {
          return (await cookies()).getAll()
        },
      async setAll(cookiesToSet) {
        const store = await cookies()
        cookiesToSet.forEach(({ name, value, options }) => store.set(name, value, options))
      },
      },
    }) : null
    if (!supabase) throw new Error('Supabase no configurado')

    const page = parseInt(searchParams.page || '1')
    const limit = 12
    const category = searchParams.category
    const search = searchParams.search
    const country = searchParams.country
    const city = searchParams.city

    const from = (page - 1) * limit
    const to = from + limit - 1

    let query = supabase
      .from('products')
      .select('*', { count: 'exact' })
      .eq('isActive', true)
      .order('created_at', { ascending: false })

    if (category && category !== 'all') {
      query = query.eq('category', category)
    }
    if (search) {
      query = query.or(`title.ilike.%${search}%,description.ilike.%${search}%`)
    }
    if (country) {
      query = query.eq('country', country)
    }
    if (city) {
      query = query.eq('city', city)
    }

    const { data, count, error } = await query.range(from, to)
    if (error) throw error
    const totalProducts = count || 0
    const totalPages = Math.ceil(totalProducts / limit)

    const serializedProducts = (data || []).map((product: any) => ({
      _id: String(product.id ?? Math.random()),
      title: product.title ?? 'Producto',
      description: product.description ?? '',
      price: Number(product.price ?? 0),
      category: product.category ?? 'otros',
      images: Array.isArray(product.images) ? product.images : [],
      seller: {
        _id: String(product.seller ?? 'unknown'),
        name: product.seller_name ?? 'Usuario',
        avatar: product.seller_avatar ?? undefined
      },
      location: {
        country: product.country ?? 'No especificado',
        city: product.city ?? 'No especificado'
      },
      createdAt: product.created_at ? new Date(product.created_at).toISOString() : new Date().toISOString()
    }))

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
