'use client'

import React, { useEffect, useRef, useState } from 'react'

interface Props {
  consultant: null | { id: string; image: string; name: string; specialty: string; email?: string; bio?: string }
  onClose: () => void
}

export default function ConsultantSidePanel({ consultant, onClose }: Props) {
  const [visible, setVisible] = useState(false)
  const panelRef = useRef<HTMLDivElement | null>(null)
  const closeButtonRef = useRef<HTMLButtonElement | null>(null)
  const previouslyFocused = useRef<HTMLElement | null>(null)

  useEffect(() => {
    if (!consultant) return
    // show panel (for CSS transition)
    previouslyFocused.current = document.activeElement as HTMLElement | null
    setTimeout(() => setVisible(true), 10)

    // focus management: move focus into panel
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
        // trap focus inside panel
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
      // restore focus
      previouslyFocused.current?.focus()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [consultant])

  if (!consultant) return null

  function handleClose() {
    setVisible(false)
    // small delay for animation before calling onClose to unmount
    setTimeout(() => onClose(), 180)
  }

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black/50 transition-opacity duration-200 ${visible ? 'opacity-100' : 'opacity-0'}`}
        onClick={handleClose}
        aria-hidden
      />

      <aside
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={`consultant-${consultant.id}-title`}
        className={`fixed right-0 top-0 h-full w-full md:w-1/3 bg-neutral-900 text-white shadow-lg z-50 transform transition-transform duration-200 ${visible ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <div className="p-6 h-full flex flex-col">
          <div className="flex justify-between items-start">
            <div>
              <h3 id={`consultant-${consultant.id}-title`} className="text-2xl font-semibold">{consultant.name}</h3>
              <p className="text-sm text-gray-300">{consultant.specialty}</p>
            </div>
            <button
              ref={closeButtonRef}
              onClick={handleClose}
              className="ml-4 bg-neutral-800 px-3 py-1 rounded focus:outline-none focus:ring-2 focus:ring-amber-400"
            >
              Cerrar
            </button>
          </div>

          <div className="mt-4 flex-1 overflow-auto">
            <img src={consultant.image} alt={consultant.name} className="w-full h-48 object-cover rounded mb-4" />
            <p className="text-sm text-gray-200">{consultant.bio}</p>

            <div className="mt-6">
              <h4 className="text-sm font-medium">Contacto</h4>
              {consultant.email ? (
                <a
                  href={`mailto:${consultant.email}`}
                  className="inline-block mt-2 px-4 py-2 bg-green-600 rounded focus:outline-none focus:ring-2 focus:ring-green-400"
                >
                  Contactar
                </a>
              ) : (
                <div className="text-sm text-gray-400 mt-2">No hay email disponible</div>
              )}
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
