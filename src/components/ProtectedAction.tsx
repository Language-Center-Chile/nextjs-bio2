'use client'

import { useSession } from 'next-auth/react'
import { ReactNode } from 'react'
import Link from 'next/link'

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
  const { data: session, status } = useSession()

  if (status === 'loading') {
    return (
      <div className="inline-block">
        <div className="w-6 h-6 border-2 border-gray-300 border-t-green-600 rounded-full animate-spin"></div>
      </div>
    )
  }

  if (requireAuth && !session) {
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
