import ConsultantCard from './ui/ConsultantCard';

const consultants = [
  {
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=500&q=80',
    name: 'María Fernanda Rojas',
    specialty: 'Especialista en Impacto Ambiental',
  },
  {
    image: 'https://images.unsplash.com/photo-1595152772835-219674b2a8a6?w=400&q=80',
    name: 'Ignacio Pérez',
    specialty: 'Consultor en Legislación Ambiental',
  },
  {
    image: 'https://images.unsplash.com/photo-1607746882042-944635dfe10e?w=400&q=80',
    name: 'Sofía Navarro',
    specialty: 'Educadora Ambiental y Biodiversidad',
  },
];

export default function ConsultantGrid() {
  return (
    <section className="py-12 px-4 max-w-6xl mx-auto">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {consultants.map((consultant, index) => (
          <ConsultantCard key={index} {...consultant} />
        ))}
      </div>
    </section>
  );
}
