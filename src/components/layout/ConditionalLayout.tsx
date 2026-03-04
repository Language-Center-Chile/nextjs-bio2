'use client'

import { usePathname } from 'next/navigation'
import Navbar from './Navbar'
import HomeNavbar from './HomeNavbar'
import Footer from './Footer'

export default function ConditionalLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  
  // Páginas donde no queremos mostrar navbar y footer
  const authPages = ['/login', '/registro', '/forgot-password']
  const isAuthPage = authPages.includes(pathname)

  if (isAuthPage) {
    return <>{children}</>
  }

  // Usar diferentes navbars según la ruta
  const isLandingPage = pathname === '/landing'
  const NavbarComponent = isLandingPage ? Navbar : HomeNavbar

  return (
    <>
      <NavbarComponent />
      {children}
      <Footer />
    </>
  )
}
