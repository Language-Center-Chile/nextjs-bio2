'use client'

import { useState } from 'react'

export default function SubscribePanel() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle'|'loading'|'success'|'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    try {
      // Simular llamada a API
      await new Promise(resolve => setTimeout(resolve, 1000))
      setStatus('success')
      setEmail('')
    } catch (err) { // eslint-disable-line @typescript-eslint/no-unused-vars
      setStatus('error')
    }
  }

  return (
    <div className="bg-neutral-800 p-6 rounded-xl">
      <h3 className="text-xl font-bold text-white mb-2">Mantente informado</h3>
      <p className="text-gray-400 mb-4">Suscríbete a nuestro boletín para recibir las últimas noticias sobre biodiversidad y eventos.</p>
      
      {status === 'success' ? (
        <div className="text-green-400 bg-green-900/30 p-3 rounded border border-green-800">
          ¡Gracias por suscribirte! Revisa tu correo pronto.
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex gap-2">
          <input 
            type="email" 
            required
            placeholder="tu@email.com" 
            className="flex-1 px-4 py-2 rounded bg-neutral-900 border border-neutral-700 focus:border-green-500 outline-none text-white"
            value={email}
            onChange={e => setEmail(e.target.value)}
            disabled={status === 'loading'}
          />
          <button 
            type="submit"
            disabled={status === 'loading'}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded font-medium transition-colors"
          >
            {status === 'loading' ? '...' : 'Suscribirse'}
          </button>
        </form>
      )}
      {status === 'error' && <p className="text-red-400 text-sm mt-2">Hubo un error, intenta de nuevo.</p>}
    </div>
  )
}