'use client'

import { ReactNode, useEffect, useState } from 'react'
import Link from 'next/link'
import { supabaseClient } from '@/lib/supabaseClient'
import type { User } from '@supabase/supabase-js'

interface ProtectedActionProps {
  children: ReactNode
  fallback?: ReactNode
  requireAuth?: boolean
  action?: string
}

export default function ProtectedAction({ 
  children, 
  fallback, 
  requireAuth = true,
  action = "realizar esta acción"
}: ProtectedActionProps) {
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

  if (status === 'loading') {
    return (
      <div className="inline-block">
        <div className="w-6 h-6 border-2 border-gray-300 border-t-green-600 rounded-full animate-spin"></div>
      </div>
    )
  }

  if (requireAuth && !user) {
    return fallback || (
      <div className="relative group">
        <div className="opacity-50 cursor-not-allowed">
          {children}
        </div>
        <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg">
          <div className="bg-gray-900 text-white p-3 rounded-lg text-sm whitespace-nowrap shadow-lg">
            <p className="mb-2">Debes iniciar sesión para {action}</p>
            <div className="flex space-x-2">
              <Link 
                href="/login" 
                className="bg-green-600 hover:bg-green-700 px-3 py-1 rounded text-xs transition-colors"
              >
                Iniciar Sesión
              </Link>
              <Link 
                href="/registro" 
                className="bg-gray-600 hover:bg-gray-700 px-3 py-1 rounded text-xs transition-colors"
              >
                Registrarse
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return <>{children}</>
}
