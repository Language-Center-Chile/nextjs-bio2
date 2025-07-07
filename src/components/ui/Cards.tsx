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

const newsItems = [
  {
    imageSrc: "/assets/blog-1.jpg",
    title: "Título Noticia 1",
    description: "Descripción de la noticia 1",
    href: "/noticias/1"
  },
  {
    imageSrc: "/assets/blog-2.jpg",
    title: "Título Noticia 2",
    description: "Descripción de la noticia 2",
    href: "/noticias/2"
  }
];

const blogItems = [
  {
    imageSrc: "/assets/new-1.jpg",
    title: "Título Blog 1",
    description: "Descripción del blog 1",
    href: "/blog/1"
  },
  {
    imageSrc: "/assets/new-2.jpg",
    title: "Título Blog 2",
    description: "Descripción del blog 2",
    href: "/blog/2"
  }
];

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