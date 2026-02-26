"use client";

import { useState } from 'react';
import { FaChevronDown } from 'react-icons/fa';

export default function DiagnosticForm() {
  return (
    <section  id="formulario" className="py-20 bg-[#0F1115] text-white flex justify-center">
      <div className="container max-w-4xl px-6">
        
        <div className="bg-[#0F1115] rounded-3xl p-8 md:p-12 border border-neutral-800 shadow-2xl">
          
          {/* Header */}
          <div className="mb-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-3 text-white">Comienza aquí (5 minutos)</h2>
            <p className="text-neutral-400 text-lg">
              Completa el formulario y te recomendamos el plan correcto. Puedes pagar y agendar al final.
            </p>
          </div>

          {/* Form */}
          <form className="space-y-6">
            
            {/* Row 1 */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm text-neutral-400">Nombre y cargo</label>
                <input 
                  type="text" 
                  placeholder="Ej: Ana Pérez, Operaciones" 
                  className="w-full bg-[#1E1E1E] border border-neutral-800 rounded-lg px-4 py-3 text-white placeholder-neutral-600 focus:outline-none focus:border-green-600 focus:ring-1 focus:ring-green-600 transition-colors"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm text-neutral-400">Empresa (Razón social)</label>
                <input 
                  type="text" 
                  placeholder="Ej: Constructora XYZ SpA" 
                  className="w-full bg-[#1E1E1E] border border-neutral-800 rounded-lg px-4 py-3 text-white placeholder-neutral-600 focus:outline-none focus:border-green-600 focus:ring-1 focus:ring-green-600 transition-colors"
                />
              </div>
            </div>

            {/* Row 2 */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm text-neutral-400">RUT empresa</label>
                <input 
                  type="text" 
                  placeholder="Ej: 76.123.456-7" 
                  className="w-full bg-[#1E1E1E] border border-neutral-800 rounded-lg px-4 py-3 text-white placeholder-neutral-600 focus:outline-none focus:border-green-600 focus:ring-1 focus:ring-green-600 transition-colors"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm text-neutral-400">Rubro / actividad principal</label>
                <input 
                  type="text" 
                  placeholder="Ej: Construcción, alimentos, logística, etc." 
                  className="w-full bg-[#1E1E1E] border border-neutral-800 rounded-lg px-4 py-3 text-white placeholder-neutral-600 focus:outline-none focus:border-green-600 focus:ring-1 focus:ring-green-600 transition-colors"
                />
              </div>
            </div>

            {/* Row 3 */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm text-neutral-400">Email</label>
                <input 
                  type="email" 
                  placeholder="correo@empresa.cl" 
                  className="w-full bg-[#1E1E1E] border border-neutral-800 rounded-lg px-4 py-3 text-white placeholder-neutral-600 focus:outline-none focus:border-green-600 focus:ring-1 focus:ring-green-600 transition-colors"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm text-neutral-400">Teléfono</label>
                <input 
                  type="tel" 
                  placeholder="+56 9 ..." 
                  className="w-full bg-[#1E1E1E] border border-neutral-800 rounded-lg px-4 py-3 text-white placeholder-neutral-600 focus:outline-none focus:border-green-600 focus:ring-1 focus:ring-green-600 transition-colors"
                />
              </div>
            </div>

            {/* Row 4 */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm text-neutral-400">Región / comuna</label>
                <input 
                  type="text" 
                  placeholder="Ej: RM, Santiago" 
                  className="w-full bg-[#1E1E1E] border border-neutral-800 rounded-lg px-4 py-3 text-white placeholder-neutral-600 focus:outline-none focus:border-green-600 focus:ring-1 focus:ring-green-600 transition-colors"
                />
              </div>
              <div className="space-y-2 relative">
                <label className="text-sm text-neutral-400">N° de trabajadores</label>
                <div className="relative">
                  <select className="w-full bg-[#1E1E1E] border border-neutral-800 rounded-lg px-4 py-3 text-neutral-400 focus:text-white focus:outline-none focus:border-green-600 focus:ring-1 focus:ring-green-600 transition-colors appearance-none cursor-pointer">
                    <option>Selecciona</option>
                    <option>1-10</option>
                    <option>11-50</option>
                    <option>51-200</option>
                    <option>+200</option>
                  </select>
                  <FaChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-500 pointer-events-none text-xs" />
                </div>
              </div>
            </div>

            {/* Row 5 */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2 relative">
                <label className="text-sm text-neutral-400">¿Fiscalización o requerimiento reciente?</label>
                <div className="relative">
                  <select className="w-full bg-[#1E1E1E] border border-neutral-800 rounded-lg px-4 py-3 text-neutral-400 focus:text-white focus:outline-none focus:border-green-600 focus:ring-1 focus:ring-green-600 transition-colors appearance-none cursor-pointer">
                    <option>Selecciona</option>
                    <option>Sí, tengo plazos</option>
                    <option>No, es preventivo</option>
                    <option>Auditoría interna</option>
                  </select>
                  <FaChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-500 pointer-events-none text-xs" />
                </div>
              </div>
              <div className="space-y-2 relative">
                <label className="text-sm text-neutral-400">¿Qué necesitas resolver primero?</label>
                <div className="relative">
                  <select className="w-full bg-[#1E1E1E] border border-neutral-800 rounded-lg px-4 py-3 text-neutral-400 focus:text-white focus:outline-none focus:border-green-600 focus:ring-1 focus:ring-green-600 transition-colors appearance-none cursor-pointer">
                    <option>Selecciona</option>
                    <option>Evitar multas</option>
                    <option>Licitar proyecto</option>
                    <option>Orden interno</option>
                    <option>Certificación</option>
                  </select>
                  <FaChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-500 pointer-events-none text-xs" />
                </div>
              </div>
            </div>

            {/* Row 6 */}
            <div className="space-y-2">
              <label className="text-sm text-neutral-400">Link a carpeta (Drive) o referencias (opcional)</label>
              <input 
                type="text" 
                placeholder="Ej: https://drive.google.com/..." 
                className="w-full bg-[#1E1E1E] border border-neutral-800 rounded-lg px-4 py-3 text-white placeholder-neutral-600 focus:outline-none focus:border-green-600 focus:ring-1 focus:ring-green-600 transition-colors"
              />
              <p className="text-xs text-neutral-600 mt-1">
                MVP: puedes pedir link a Drive ahora. Más adelante habilitas subidas directas.
              </p>
            </div>

            {/* Row 7 */}
            <div className="space-y-2">
              <label className="text-sm text-neutral-400">Comentarios</label>
              <textarea 
                rows={4}
                placeholder="Cuéntanos tu contexto (breve)."
                className="w-full bg-[#1E1E1E] border border-neutral-800 rounded-lg px-4 py-3 text-white placeholder-neutral-600 focus:outline-none focus:border-green-600 focus:ring-1 focus:ring-green-600 transition-colors resize-none"
              ></textarea>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4 justify-center">
              <button 
                type="submit"
                className="bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-8 rounded-full transition-colors text-center"
              >
                Enviar y recibir recomendación de plan
              </button>
              
              <button 
                onClick={() => window.scrollTo({ top: document.getElementById('planes')?.offsetTop || 0, behavior: 'smooth' })}
                type="button"
                className="bg-orange-500 hover:bg-orange-600 text-white font-medium py-3 px-8 rounded-full transition-colors text-center"
              >
                Ver planes
              </button>
            </div>

          </form>
        </div>
      </div>
    </section>
  );
}
