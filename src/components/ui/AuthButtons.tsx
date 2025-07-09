'use client'

import Link from 'next/link'
import { useState } from 'react'

export const AuthButtons = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  return (
    <li className="auth-buttons">
      {!isLoggedIn ? (
        <Link href="/login" className="btn-login">
          Ingresar
        </Link>
      ) : (
        <Link 
          href="#" 
          className="btn-logout"
          onClick={() => setIsLoggedIn(false)}
        >
          Cerrar Sesión
        </Link>
      )}
    </li>
  )
}