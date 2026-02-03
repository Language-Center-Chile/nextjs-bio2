
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Agregar headers de seguridad
  const response = NextResponse.next()
  
  // Prevenir ataques de clickjacking
  response.headers.set('X-Frame-Options', 'DENY')
  
  // Prevenir MIME type sniffing
  response.headers.set('X-Content-Type-Options', 'nosniff')
  
  // XSS Protection
  response.headers.set('X-XSS-Protection', '1; mode=block')
  
  // Referrer Policy
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin')
  
  // Content Security Policy básico (Permitir WS en localhost para desarrollo)
  const isDev = process.env.NODE_ENV === 'development'
  const connectSrc = "connect-src 'self' https://*.supabase.co https://*.supabase.com wss://*.supabase.co" + (isDev ? " ws://127.0.0.1:* ws://localhost:*" : "") + ";"
  
  response.headers.set(
    'Content-Security-Policy',
    `default-src 'self'; img-src 'self' data: https:; script-src 'self' 'unsafe-eval' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; ${connectSrc}`
  )

  // Rate limiting básico para APIs (opcional - requerirá implementación adicional)
  if (request.nextUrl.pathname.startsWith('/api/')) {
    // Aquí podrías implementar rate limiting
    // Por ahora solo log para monitoreo
    console.log(`API call: ${request.method} ${request.nextUrl.pathname}`)
  }

  return response
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
}
