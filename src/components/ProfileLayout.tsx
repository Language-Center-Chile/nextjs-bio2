'use client'

import { ReactNode, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'

interface UserMetadata {
  name?: string
  full_name?: string
  avatar_url?: string
  picture?: string
}

interface UserIdentity {
  identity_data?: {
    name?: string
    full_name?: string
    avatar_url?: string
    picture?: string
  }
}

export default function ProfileLayout({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    let active = true
    ;(async () => {
      const { data } = await supabase.auth.getSession()
      if (!active) return
      if (!data.session) {
        router.push('/login')
        return
      }
      setUser(data.session.user)
      setLoading(false)
    })()
    return () => { active = false }
  }, [router])

  if (loading) return <div className="p-8 text-center">Cargando perfil...</div>
  if (!user) return null

  const meta = (user.user_metadata || {}) as UserMetadata
  const identities = (user.identities || []) as unknown as UserIdentity[]
  const identity = identities.length > 0 ? identities[0].identity_data || {} : {}
  const name = meta.name || meta.full_name || identity.name || identity.full_name || user.email?.split('@')[0] || 'Usuario'
  // eslint-disable-next-line @next/next/no-img-element
  const avatar = meta.avatar_url || meta.picture || identity.avatar_url || identity.picture || null

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8">
      <div className="mb-8 flex items-center gap-4">
        {avatar ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={avatar} alt={name} className="w-20 h-20 rounded-full object-cover border-2 border-green-600" />
        ) : (
          <div className="w-20 h-20 rounded-full bg-neutral-700 grid place-items-center text-2xl font-bold">
            {name[0].toUpperCase()}
          </div>
        )}
        <div>
          <h1 className="text-3xl font-bold">{name}</h1>
          <p className="text-gray-400">{user.email}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <aside className="space-y-2">
          <nav className="flex flex-col gap-2 text-sm">
            <a href="/perfil" className="px-3 py-2 rounded bg-neutral-800 hover:bg-neutral-700 font-medium text-green-400">
              Información General
            </a>
            <a href="/perfil/seguridad" className="px-3 py-2 rounded hover:bg-neutral-800 text-gray-300">
              Seguridad
            </a>
            <a href="/perfil/notificaciones" className="px-3 py-2 rounded hover:bg-neutral-800 text-gray-300">
              Notificaciones
            </a>
            <a href="/mis-publicaciones" className="px-3 py-2 rounded hover:bg-neutral-800 text-gray-300 mt-4 border-t border-neutral-700 pt-4">
              Mis Publicaciones
            </a>
            <a href="/membresia" className="px-3 py-2 rounded hover:bg-neutral-800 text-gray-300">
              Membresía
            </a>
          </nav>
        </aside>

        <main className="md:col-span-3">
          {children}
        </main>
      </div>
    </div>
  )
}