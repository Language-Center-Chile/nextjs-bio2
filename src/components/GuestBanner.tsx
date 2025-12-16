'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { supabaseClient } from '@/lib/supabaseClient'
import type { User } from '@supabase/supabase-js'

export default function GuestBanner() {
  const [user, setUser] = useState<User | null>(null)
  const [status, setStatus] = useState<'loading' | 'ready'>('loading')
  
  useEffect(() => {
    const supabase = supabaseClient
    let mounted = true
    const init = async () => {
      if (!supabase) { setStatus('ready'); return }
      const { data } = await supabase.auth.getUser()
      if (mounted) setUser(data.user ?? null)
      setStatus('ready')
      supabase.auth.onAuthStateChange((_event, session) => {
        setUser(session?.user ?? null)
      })
    }
    init()
    return () => { mounted = false }
  }, [])

  if (status === 'loading' || user) {
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
