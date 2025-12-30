'use client';

import ConsultantCard from './ui/ConsultantCard';
import { useState } from 'react';
import ConsultantSidePanel from './ConsultantSidePanel';

interface ConsultantItem {
  id: string;
  image?: string;
  name: string;
  specialty?: string;
  email?: string;
  bio?: string;
  [key: string]: string | undefined; // Allow additional string properties
}

export default function ConsultantGrid({ items }: { items?: ConsultantItem[] }) {
  const sample = [
    {
      id: '1',
      image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=500&q=80',
      name: 'María Fernanda Rojas',
      specialty: 'Especialista en Impacto Ambiental',
      email: 'maria@example.com',
      bio: 'Profesional con 10 años de experiencia en proyectos de conservación y reforestación.',
    },
    {
      id: '2',
      image: 'https://images.unsplash.com/photo-1595152772835-219674b2a8a6?w=400&q=80',
      name: 'Ignacio Pérez',
      specialty: 'Consultor en Legislación Ambiental',
      email: 'ignacio@example.com',
      bio: 'Abogado ambiental con foco en normativa y cumplimiento regulatorio.',
    },
    {
      id: '3',
      image: 'https://images.unsplash.com/photo-1607746882042-944635dfe10e?w=400&q=80',
      name: 'Sofía Navarro',
      specialty: 'Educadora Ambiental y Biodiversidad',
      email: 'sofia@example.com',
      bio: 'Especializada en educación comunitaria y diseño de programas pedagógicos.',
    },
  ];

  const consultants = items && items.length ? items : sample;

  const [selected, setSelected] = useState<string | null>(null);
  const selectedConsultant = consultants.find(c => c.id === selected) || null;

  return (
    <section className="py-12 px-4 max-w-6xl mx-auto">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {consultants.map(consultant => (
          <div key={consultant.id} onClick={() => setSelected(consultant.id)}>
            <ConsultantCard
              id={consultant.id}
              image={consultant.image || ''}
              name={consultant.name}
              specialty={consultant.specialty || ''}
              email={consultant.email}
              bio={consultant.bio}
            />
          </div>
        ))}
      </div>

      <ConsultantSidePanel
        consultant={
          selectedConsultant
            ? {
                id: selectedConsultant.id,
                image: selectedConsultant.image || '',
                name: selectedConsultant.name,
                specialty: selectedConsultant.specialty || '',
                email: selectedConsultant.email,
                bio: selectedConsultant.bio,
              }
            : null
        }
        onClose={() => setSelected(null)}
      />
    </section>
  );
}