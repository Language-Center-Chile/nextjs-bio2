'use client'

import React, { useEffect, useRef, useState } from 'react'


interface Offer {
  id: string
  title: string
  description?: string
  location?: any
  contact?: string
  salaryMin?: number
  salaryMax?: number
  modality?: string
  employmentType?: string
  tags?: string[]
}

interface Props {
  offer: Offer | null
  onClose: () => void
}

export default function OfferSidePanel({ offer, onClose }: Props) {
  const [visible, setVisible] = useState(false)
  const panelRef = useRef<HTMLDivElement | null>(null)
  const closeButtonRef = useRef<HTMLButtonElement | null>(null)
  const previouslyFocused = useRef<HTMLElement | null>(null)

  useEffect(() => {
    if (!offer) return
    
    // Guardar el elemento enfocado anteriormente
    previouslyFocused.current = document.activeElement as HTMLElement | null
    
    // Mostrar panel con un pequeño retraso para permitir la transición CSS
    setTimeout(() => setVisible(true), 10)

    // Manejo del foco: mover el foco al botón de cerrar o al primer elemento enfocable
    const timer = setTimeout(() => {
      const focusTarget = closeButtonRef.current || panelRef.current?.querySelector('a,button,input,textarea,select') as HTMLElement | null
      focusTarget?.focus()
    }, 50)

    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        e.preventDefault()
        handleClose()
        return
      }

      if (e.key === 'Tab') {
        // Atrapamiento del foco dentro del panel
        const container = panelRef.current
        if (!container) return
        const focusable = Array.from(container.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'
        )).filter(el => el.offsetParent !== null)
        
        if (focusable.length === 0) return
        
        const first = focusable[0]
        const last = focusable[focusable.length - 1]
        
        if (e.shiftKey) {
          if (document.activeElement === first) {
            e.preventDefault()
            last.focus()
          }
        } else {
          if (document.activeElement === last) {
            e.preventDefault()
            first.focus()
          }
        }
      }
    }

    document.addEventListener('keydown', onKey)
    return () => {
      clearTimeout(timer)
      document.removeEventListener('keydown', onKey)
      // Restaurar el foco al elemento anterior
      previouslyFocused.current?.focus()
    }
  }, [offer]) // eslint-disable-line react-hooks/exhaustive-deps

  if (!offer) return null

  function handleClose() {
    setVisible(false)
    // Esperar a que termine la transición antes de desmontar
    setTimeout(() => onClose(), 300)
  }

  return (
    <>
      {/* Backdrop (Fondo oscuro) */}
      <div
        className={`fixed inset-0 bg-black/50 transition-opacity duration-300 z-40 ${visible ? 'opacity-100' : 'opacity-0'}`}
        onClick={handleClose}
        aria-hidden="true"
      />

      {/* Panel lateral */}
      <aside
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={`offer-${offer.id}-title`}
        className={`fixed right-0 top-0 h-full w-full md:w-1/3 bg-neutral-900 text-white shadow-xl z-50 transform transition-transform duration-300 ease-in-out ${visible ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <div className="flex h-full flex-col overflow-y-scroll bg-neutral-900 shadow-xl">
          <div className="px-4 py-6 sm:px-6">
            <div className="flex items-start justify-between">
              <h2 id={`offer-${offer.id}-title`} className="text-lg font-medium text-white leading-6">
                {offer.title}
              </h2>
              <div className="ml-3 flex h-7 items-center">
                <button
                  ref={closeButtonRef}
                  type="button"
                  className="rounded-md bg-neutral-800 text-gray-400 hover:text-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 p-1"
                  onClick={handleClose}
                >
                  <span className="sr-only">Cerrar panel</span>
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
          
          <div className="relative mt-2 flex-1 px-4 sm:px-6">
            <div className="space-y-6 pb-8">
              {/* Descripción */}
              <div>
                <h4 className="font-bold text-green-400 text-sm uppercase tracking-wide mb-2">Descripción</h4>
                <p className="text-gray-300 whitespace-pre-wrap leading-relaxed text-sm">
                  {offer.description || 'Sin descripción disponible.'}
                </p>
              </div>

              {/* Ubicación */}
              {offer.location && (
                <div>
                  <h4 className="font-bold text-green-400 text-sm uppercase tracking-wide mb-2">Ubicación</h4>
                  <p className="text-gray-300">
                    {offer.location.city ? `${offer.location.city}, ` : ''}{offer.location.country || 'No especificada'}
                  </p>
                </div>
              )}

              {/* Salario */}
              {(offer.salaryMin || offer.salaryMax) && (
                <div>
                  <h4 className="font-bold text-green-400 text-sm uppercase tracking-wide mb-2">Salario</h4>
                  <p className="text-gray-300 font-medium">
                    {offer.salaryMin ? `$${offer.salaryMin.toLocaleString()}` : ''} 
                    {offer.salaryMin && offer.salaryMax ? ' - ' : ''}
                    {offer.salaryMax ? `$${offer.salaryMax.toLocaleString()}` : ''}
                  </p>
                </div>
              )}

              {/* Detalles: Modalidad y Tipo */}
              <div className="grid grid-cols-2 gap-4">
                {offer.modality && (
                  <div>
                    <h4 className="font-bold text-green-400 text-sm uppercase tracking-wide mb-2">Modalidad</h4>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-900 text-blue-200 capitalize">
                      {offer.modality}
                    </span>
                  </div>
                )}
                {offer.employmentType && (
                  <div>
                    <h4 className="font-bold text-green-400 text-sm uppercase tracking-wide mb-2">Tipo de Empleo</h4>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-900 text-purple-200 capitalize">
                      {offer.employmentType}
                    </span>
                  </div>
                )}
              </div>

              {/* Contacto */}
              {offer.contact && (
                <div>
                  <h4 className="font-bold text-green-400 text-sm uppercase tracking-wide mb-2">Contacto</h4>
                  <p className="text-gray-300">{offer.contact}</p>
                </div>
              )}

              {/* Etiquetas */}
              {offer.tags && offer.tags.length > 0 && (
                <div>
                  <h4 className="font-bold text-green-400 text-sm uppercase tracking-wide mb-2">Etiquetas</h4>
                  <div className="flex flex-wrap gap-2">
                    {offer.tags.map(tag => (
                      <span key={tag} className="px-2 py-1 bg-neutral-800 rounded text-xs text-gray-300 border border-neutral-700">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Botón de Acción */}
              <div className="pt-6 border-t border-neutral-800 mt-6">
                 <button className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 font-semibold transition-colors shadow-lg hover:shadow-green-900/20">
                   Postular a esta oferta
                 </button>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  )
}