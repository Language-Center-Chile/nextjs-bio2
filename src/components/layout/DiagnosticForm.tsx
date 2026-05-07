"use client";

import { useState } from 'react';
import { FaChevronDown } from 'react-icons/fa';

interface FormData {
  nombre_Completo: string,
  rubro: string,
  email: string,
  telefono: string,
  pais: string,
  ciudad: string,
  fiscalizacion: string,
  necesidad: string,
  comentarios: string,
}

export default function DiagnosticForm() {
  const [formData, setFormData] = useState<FormData>({
    nombre_Completo: '',
    rubro: '',
    email: '',
    telefono: '',
    pais: '',
    ciudad: '',
    fiscalizacion: '',
    necesidad: '',
    comentarios: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const requiredFields: (keyof FormData)[] = [
    'nombre_Completo',
    'rubro',
    'email',
    'telefono',
    'pais',
    'ciudad',
    'fiscalizacion',
    'necesidad',
    'comentarios',
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const emptyFields = requiredFields.filter(field => !formData[field].trim());
    if (emptyFields.length > 0) {
      setError('Por favor, completa todos los campos requeridos.');
      return;
    }

    if (!formData.ciudad.trim() && !formData.comentarios.trim()) {
      setError('Debes ingresar una ciudad o un comentario.');
      return;
    }

    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
      setError('Por favor, ingresa un correo electrónico válido.');
      return;
    }

    setIsSubmitting(true);

    try {
      const dataToSend = Object.fromEntries(
        Object.entries(formData).filter(([_, value]) => value.trim() !== '')
      );

      const response = await fetch('/api/diagnostic', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dataToSend),
      });

      if (!response.ok) {
        throw new Error('Error al enviar');
      }

      setSubmitted(true);
      setFormData({
      nombre_Completo: '',
      rubro: '',
      email: '',
      telefono: '',
      pais: '',
      ciudad: '',
      fiscalizacion: '',
      necesidad: '',
      comentarios: ''
    });
    } catch {
      setError('Error al enviar el formulario. Intenta nuevamente.');
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <section id="formulario" className="py-20 bg-[#0F1115] text-white flex justify-center">
      <div className="container max-w-4xl px-6">

        <div className="bg-[#0F1115] rounded-3xl p-8 md:p-12 border border-neutral-800 shadow-2xl">

          {/* Header */}
          <div className="mb-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-3 text-white">Comienza aquí (5 minutos)</h2>
            <p className="text-neutral-400 text-lg">
              Completa el formulario y te contactaremos.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">

            {/* Row 1 */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm text-neutral-400">Nombre Completo</label>
                <input
                  type="text"
                  name="nombre_Completo"
                  value={formData.nombre_Completo}
                  onChange={handleChange}
                  placeholder="Ej: Ana Pérez"
                  className="w-full bg-[#1E1E1E] border border-neutral-800 rounded-lg px-4 py-3 text-white placeholder-neutral-600 focus:outline-none focus:border-green-600 focus:ring-1 focus:ring-green-600 transition-colors"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm text-neutral-400">Rubro</label>
                <input
                  type="text"
                  name="rubro"
                  value={formData.rubro}
                  onChange={handleChange}
                  placeholder="Ej: Construcción, alimentos, logística, etc."
                  className="w-full bg-[#1E1E1E] border border-neutral-800 rounded-lg px-4 py-3 text-white placeholder-neutral-600 focus:outline-none focus:border-green-600 focus:ring-1 focus:ring-green-600 transition-colors"
                />
              </div>

            </div>

            {/* Row 2 */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm text-neutral-400">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="correo@empresa.cl"
                  className="w-full bg-[#1E1E1E] border border-neutral-800 rounded-lg px-4 py-3 text-white placeholder-neutral-600 focus:outline-none focus:border-green-600 focus:ring-1 focus:ring-green-600 transition-colors"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm text-neutral-400">Teléfono</label>
                <input
                  type="tel"
                  name="telefono"
                  value={formData.telefono}
                  onChange={handleChange}
                  placeholder="+56 9 ..."
                  className="w-full bg-[#1E1E1E] border border-neutral-800 rounded-lg px-4 py-3 text-white placeholder-neutral-600 focus:outline-none focus:border-green-600 focus:ring-1 focus:ring-green-600 transition-colors"
                />
              </div>
            </div>

            {/* Row 3 */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm text-neutral-400">Pais</label>
                <input
                  type="text"
                  name="pais"
                  value={formData.pais}
                  onChange={handleChange}
                  placeholder="Ej: Chile"
                  className="w-full bg-[#1E1E1E] border border-neutral-800 rounded-lg px-4 py-3 text-white placeholder-neutral-600 focus:outline-none focus:border-green-600 focus:ring-1 focus:ring-green-600 transition-colors"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm text-neutral-400">Ciudad</label>
                <input
                  type="text"
                  name="ciudad"
                  value={formData.ciudad}
                  onChange={handleChange}
                  placeholder="Ej: Santiago"
                  className="w-full bg-[#1E1E1E] border border-neutral-800 rounded-lg px-4 py-3 text-white placeholder-neutral-600 focus:outline-none focus:border-green-600 focus:ring-1 focus:ring-green-600 transition-colors"
                />
              </div>

            </div>

            {/* Row 4 */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2 relative">
                <label className="text-sm text-neutral-400">¿Fiscalización o requerimiento reciente?</label>
                <div className="relative">
                  <select
                    name="fiscalizacion"
                    value={formData.fiscalizacion}
                    onChange={handleChange}
                    className="w-full bg-[#1E1E1E] border border-neutral-800 rounded-lg px-4 py-3 text-neutral-400 focus:text-white focus:outline-none focus:border-green-600 focus:ring-1 focus:ring-green-600 transition-colors appearance-none cursor-pointer"
                  >
                    <option value="">Selecciona</option>
                    <option>Sí, tengo plazos</option>
                    <option>No, es preventivo</option>
                    <option>Auditoría interna</option>
                    <option>Otro</option>
                  </select>
                  <FaChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-500 pointer-events-none text-xs" />
                </div>
              </div>
              <div className="space-y-2 relative">
                <label className="text-sm text-neutral-400">¿Qué necesitas resolver primero?</label>
                <div className="relative">
                  <select
                    name="necesidad"
                    value={formData.necesidad}
                    onChange={handleChange}
                    className="w-full bg-[#1E1E1E] border border-neutral-800 rounded-lg px-4 py-3 text-neutral-400 focus:text-white focus:outline-none focus:border-green-600 focus:ring-1 focus:ring-green-600 transition-colors appearance-none cursor-pointer"
                  >
                    <option value="">Selecciona</option>
                    <option>Evitar multas</option>
                    <option>Licitar proyecto</option>
                    <option>Orden interno</option>
                    <option>Certificación</option>
                    <option>Otro</option>

                  </select>
                  <FaChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-500 pointer-events-none text-xs" />
                </div>
              </div>
            </div>

            {/* Row 6 */}
            <div className="space-y-2">
              <label className="text-sm text-neutral-400">Comentarios</label>
              <textarea
                name="comentarios"
                value={formData.comentarios}
                onChange={handleChange}
                rows={4}
                placeholder="Cuéntanos tu contexto (breve)."
                className="w-full bg-[#1E1E1E] border border-neutral-800 rounded-lg px-4 py-3 text-white placeholder-neutral-600 focus:outline-none focus:border-green-600 focus:ring-1 focus:ring-green-600 transition-colors resize-none"
              ></textarea>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4 justify-center">
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-orange-500 hover:bg-orange-600 text-white font-medium py-3 px-8 rounded-full transition-colors text-center"
              >
                {isSubmitting ? 'Enviando...' : 'Enviar'}
              </button>
            </div>

            {submitted && (
              <div className="mt-6 p-4 bg-green-900/30 border border-green-600 rounded-lg text-center">
                <p className="text-green-400 font-medium">¡Formulario enviado con éxito! Te contactaremos pronto.</p>
              </div>
            )}

            {error && (
              <div className="mt-6 p-4 bg-red-900/30 border border-red-600 rounded-lg text-center">
                <p className="text-red-400 font-medium">{error}</p>
              </div>
            )}

          </form>
        </div>
      </div>
    </section>
  );
}
