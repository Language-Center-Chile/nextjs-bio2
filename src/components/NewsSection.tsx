import Cards from './ui/Cards';

const NewsSection = () => {
  const news = [
  
      {
      imageSrc: "https://images.unsplash.com/photo-1542601906990-b4d3fb7d5763?w=500&q=80",
      imageAlt: "Reforestación en la Patagonia",
      title: "Reforestación en la Patagonia",
      description: "Iniciativa para plantar 1 millón de árboles nativos en la región de Aysén.",
      href: "/noticias/reforestacion-patagonia",
    },
    {
      imageSrc: "https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?w=500&q=80",
      imageAlt: "Conservación de Humedales",
      title: "Conservación de Humedales",
      description: "Nuevas medidas para proteger los humedales urbanos en Valdivia.",
      href: "/noticias/conservacion-humedales",
    },
  ];

  const blog = [
    {
      imageSrc: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=500&q=80",
      imageAlt: "Guía de Compostaje",
      title: "Guía de Compostaje en Casa",
      description: "Aprende a transformar tus residuos orgánicos en abono para tus plantas.",
      href: "/blog/guia-compostaje",
    },
      {
      imageSrc: "https://images.unsplash.com/photo-1542601906990-b4d3fb7d5763?w=500&q=80",
      imageAlt: "Reforestación en la Patagonia",
      title: "Gestionando el fuego",
      description: "El texto presenta un análisis crítico sobre la gestión ambiental en Chile frente a la crisis de los incendios forestales",
      href: "https://biodiversidad.cl/gestionando-el-fuego/",
    },
    
    {
      imageSrc: "https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?w=500&q=80",
      imageAlt: "Energía Solar",
      title: "Beneficios de la Energía Solar",
      description: "Cómo la energía solar puede reducir tu huella de carbono y ahorrar dinero.",
      href: "/blog/energia-solar",
    },
  ];

  return (
    <Cards title="Noticias y Blog" news={news} blog={blog} />
  );
};

export default NewsSection;