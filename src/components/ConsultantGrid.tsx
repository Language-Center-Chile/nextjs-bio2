'use client';

import ConsultantCard from './ui/ConsultantCard';
import { useState, useEffect } from 'react';
import ConsultantSidePanel from './ConsultantSidePanel';
import { supabase } from '@/lib/supabase';

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
  const [consultants, setConsultants] = useState<ConsultantItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchConsultants() {
      try {
        const { data, error } = await supabase
          .from('consultores')
          .select(`
            id,
            usuario_id,
            especialidad,
            experiencia,
            verificado,
            usuarios!inner (
              imagen_perfil,
              name
            )
          `)
           .eq('verificado', true);

        if (error) {
          console.error('Error fetching consultants:', error);
          // Fallback to sample data if there's an error
          setConsultants(items || []);
        } else {
          // Transform the data to match the ConsultantItem interface
          const transformedConsultants = data.map(consultant => {
            // Manejo seguro de la relación anidada (puede venir como objeto o array)
            const usuario = Array.isArray(consultant.usuarios)
              ? consultant.usuarios[0]
              : consultant.usuarios;

            return {
              id: consultant.id.toString(),
              image: usuario?.imagen_perfil || undefined,
              name: usuario?.name || '',
              specialty: consultant.especialidad || '',
              email: '', // no tenemos email en esta consulta
              bio: consultant.experiencia || '',
            };
          });
          setConsultants(transformedConsultants);
        }
      } catch (error) {
        console.error('Error:', error);
        setConsultants(items || []);
      } finally {
        setLoading(false);
      }
    }

    // Use provided items if available, otherwise fetch from Supabase
    if (items && items.length) {
      setConsultants(items);
      setLoading(false);
    } else {
      fetchConsultants();
    }
  }, [items]);

  const [selected, setSelected] = useState<string | null>(null);
  const selectedConsultant = consultants.find(c => c.id === selected) || null;

  if (loading) {
    return (
      <section className="py-12 px-4 max-w-6xl mx-auto">
        <div className="text-center">Cargando consultores...</div>
      </section>
    );
  }

  return (
    <section className="py-12 px-4 max-w-6xl mx-auto">
      {consultants.length === 0 ? (
        <div className="text-center text-gray-600">
          No hay consultores disponibles en este momento.
        </div>
      ) : (
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
      )}

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