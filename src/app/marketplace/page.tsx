import HeroMarketplace from '@/components/ui/HeroMarketplace'
import SidebarFilters from '@/components/ui/SidebarFilters'
import ProductGrid from '@/components/ui/ProductGrid'


export default function MarketplacePage() {
  return (
    <div className="bg-neutral-900 text-white min-h-screen">
      <HeroMarketplace />
      <section className="marketplace-layout max-w-7xl mx-auto flex flex-col md:flex-row gap-10 px-6 py-12">
        <SidebarFilters />
        <main className="product-area flex-1">
          <ProductGrid />
        </main>
      </section>
      
    </div>
  )
}
