import RecursoCard from './ui/RecursoCard';

const recursos = [
  {
    image: 'https://images.unsplash.com/photo-1581091870622-2c9f409b3a3b?auto=format&fit=crop&w=400&q=80',
    title: 'Curso: Introducción al Cambio Climático',
    description: 'Modalidad online - Gratuito',
    buttonText: 'Acceder',
  },
  {
    image: 'https://images.unsplash.com/photo-1613051968083-28331892bc8d?auto=format&fit=crop&w=400&q=80',
    title: 'Guía Escolar: Flora Nativa de Chile',
    description: 'PDF descargable - Para educadores',
    buttonText: 'Descargar',
  },
  {
    image: 'https://images.unsplash.com/photo-1529070538774-1843cb3265df?auto=format&fit=crop&w=400&q=80',
    title: 'Calendario de Eventos Verdes',
    description: 'Conoce actividades ambientales en tu región',
    buttonText: 'Ver más',
  },
];

export default function EducacionGrid() {
  return (
    <section className="py-12 px-4 max-w-6xl mx-auto">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {recursos.map((recurso, index) => (
          <RecursoCard key={index} {...recurso} />
        ))}
      </div>
    </section>
  );
}
