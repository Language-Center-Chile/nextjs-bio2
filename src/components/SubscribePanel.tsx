'use client'

import { useState } from 'react'

export default function SubscribePanel() {
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  const plans = [
    { id: 'basic', name: 'Básico', price: 5 },
    { id: 'standard', name: 'Standard', price: 10 },
    { id: 'pro', name: 'Pro', price: 15 }
  ]

  async function handleSubscribe(planId: string) {
    try {
      setLoading(true)
      setMessage('')
      const res = await fetch('/api/subscriptions/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ planId }),
        credentials: 'include'
      })
      const data = await res.json()
      if (!res.ok) {
        setMessage(data?.error || 'Error iniciando suscripción')
        return
      }
      if (data.checkoutUrl) {
        // redirigir a checkout (puede ser página externa)
        window.location.href = data.checkoutUrl
      } else {
        setMessage('No se obtuvo URL de pago')
      }
    } catch (err) {
      setMessage('Error de red')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-neutral-800 p-6 rounded space-y-4">
      <h3 className="text-xl font-semibold">Suscríbete</h3>
      <p className="text-sm text-gray-300">Planes mensuales orientados a apoyar iniciativas medioambientales.</p>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
        {plans.map(p => (
          <div key={p.id} className="p-4 bg-neutral-700 rounded">
            <div className="text-lg font-semibold">{p.name}</div>
            <div className="text-2xl font-bold">${p.price}</div>
            <div className="mt-4">
              <button disabled={loading} onClick={() => handleSubscribe(p.id)} className="w-full py-2 bg-green-600 rounded">{loading ? 'Procesando...' : 'Suscribirse'}</button>
            </div>
          </div>
        ))}
      </div>

      {message && <div className="text-sm text-amber-300 mt-2">{message}</div>}
    </div>
  )
}
