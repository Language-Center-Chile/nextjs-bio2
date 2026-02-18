'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { Session } from '@supabase/supabase-js'

export default function GuestBanner() {
  const [session, setSession] = useState<Session | null>(null)
  const [status, setStatus] = useState<'loading' | 'ready'>('loading')

  useEffect(() => {
    let active = true
    ;(async () => {
      const { data } = await supabase.auth.getSession()
      if (!active) return
      setSession(data.session)
      setStatus('ready')
    })()
    return () => { active = false }
  }, [])

  if (status === 'loading' || session) {
    return null
  }

  return (
    <div className="bg-gradient-to-r from-green-700 to-green-800 text-white p-4 text-center">
      <div className="max-w-4xl mx-auto">
        <p className="text-lg mb-2">
          🌱 <strong>¡Únete a nuestra comunidad!</strong> Puedes explorar el marketplace, pero necesitas una cuenta para comprar y vender.
        </p>
        <div className="flex justify-center space-x-4">
          <Link 
            href="/registro" 
            className="bg-white text-green-700 font-semibold px-6 py-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            Crear Cuenta Gratis
          </Link>
          <Link 
            href="/login" 
            className="bg-green-600 text-white font-semibold px-6 py-2 rounded-lg hover:bg-green-500 transition-colors border border-green-500"
          >
            Iniciar Sesión
          </Link>
        </div>
      </div>
    </div>
  )
}