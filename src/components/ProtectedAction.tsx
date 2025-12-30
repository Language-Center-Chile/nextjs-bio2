'use client'

import { ReactNode, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { Session } from '@supabase/supabase-js'

export default function ProtectedAction({ children, fallback }: { children: ReactNode, fallback?: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    let active = true
    ;(async () => {
      const { data } = await supabase.auth.getSession()
      if (!active) return
      setSession(data.session)
      setLoading(false)
    })()
    return () => { active = false }
  }, [])

  if (loading) return null // o un spinner pequeño

  if (!session) {
    if (fallback) return <>{fallback}</>
    return (
      <button 
        onClick={() => router.push('/login')}
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 font-semibold"
      >
        Inicia sesión para continuar
      </button>
    )
  }

  return <>{children}</>
}