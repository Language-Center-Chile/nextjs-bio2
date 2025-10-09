'use client'

import React, { useEffect, useRef, useState } from 'react'

interface Props {
  offer: null | { id: string; title: string; description?: string; contact?: string; salaryMin?: number; salaryMax?: number; location?: any; tags?: string[] }
  onClose: () => void
}

export default function OfferSidePanel({ offer, onClose }: Props) {
  const [visible, setVisible] = useState(false)
  const panelRef = useRef<HTMLDivElement | null>(null)
  const closeButtonRef = useRef<HTMLButtonElement | null>(null)
  const previouslyFocused = useRef<HTMLElement | null>(null)

  useEffect(() => {
    if (!offer) return
    previouslyFocused.current = document.activeElement as HTMLElement | null
    setTimeout(() => setVisible(true), 10)
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
      previouslyFocused.current?.focus()
    }
  }, [offer])

  if (!offer) return null

  function handleClose() {
    setVisible(false)
    setTimeout(() => onClose(), 180)
  }

  return (
    <>
      <div className={`fixed inset-0 bg-black/50 transition-opacity duration-200 ${visible ? 'opacity-100' : 'opacity-0'}`} onClick={handleClose} aria-hidden />

      <aside ref={panelRef} role="dialog" aria-modal="true" aria-labelledby={`offer-${offer.id}-title`} className={`fixed right-0 top-0 h-full w-full md:w-1/3 bg-neutral-900 text-white shadow-lg z-50 transform transition-transform duration-200 ${visible ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="p-6 h-full flex flex-col">
          <div className="flex justify-between items-start">
            <div>
              <h3 id={`offer-${offer.id}-title`} className="text-2xl font-semibold">{offer.title}</h3>
            </div>
            <button ref={closeButtonRef} onClick={handleClose} className="ml-4 bg-neutral-800 px-3 py-1 rounded focus:outline-none focus:ring-2 focus:ring-amber-400">Cerrar</button>
          </div>

          <div className="mt-4 flex-1 overflow-auto">
            <p className="text-sm text-gray-200">{offer.description}</p>

            <div className="mt-6">
              <h4 className="text-sm font-medium">Detalles</h4>
              <div className="text-sm text-gray-400 mt-2">{offer.location?.country || ''} {offer.location?.city ? `— ${offer.location.city}` : ''}</div>
              <div className="text-sm mt-2">{offer.salaryMin ? `${offer.salaryMin}${offer.salaryMax ? ` - ${offer.salaryMax}` : ''}` : 'Salario no especificado'}</div>
              {offer.tags && offer.tags.length > 0 && <div className="text-sm text-green-400 mt-2">{offer.tags.join(', ')}</div>}

              <div className="mt-6">
                <h4 className="text-sm font-medium">Contacto</h4>
                {offer.contact ? (
                  <a href={`tel:${offer.contact}`} className="inline-block mt-2 px-4 py-2 bg-green-600 rounded">Contactar</a>
                ) : (
                  <div className="text-sm text-gray-400 mt-2">No hay contacto disponible</div>
                )}
              </div>
            </div>

          </div>

          <div className="mt-4">
            <button onClick={handleClose} className="w-full py-2 bg-neutral-700 rounded">Cerrar</button>
          </div>
        </div>
      </aside>
    </>
  )
}
