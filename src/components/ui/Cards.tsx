import Card from './Card'

interface CardsProps {
  title: string;
  news: Array<{
    imageSrc: string;
    imageAlt?: string;
    title: string;
    description: string;
    href: string;
  }>;
  blog: Array<{
    imageSrc: string;
    imageAlt?: string;
    title: string;
    description: string;
    href: string;
  }>;
}

const Cards = ({ title, news, blog }: CardsProps) => {
  return (
   <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">{title}</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-8">
            {news.map((item, index) => (
              <Card key={`news-${index}`} {...item} />
            ))}
          </div>
          <div className="space-y-8">
            {blog.map((item, index) => (
              <Card key={`blog-${index}`} {...item} />
            ))}
          </div>
        </div>
      </div>
    </section>
    
  )
}

export default Cards