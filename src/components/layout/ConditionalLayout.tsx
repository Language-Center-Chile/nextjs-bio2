'use client'

import { usePathname } from 'next/navigation'
import Navbar from './Navbar'
import Footer from './Footer'

export default function ConditionalLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  
  // Páginas donde no queremos mostrar navbar y footer
  const authPages = ['/login', '/registro', '/forgot-password']
  const isAuthPage = authPages.includes(pathname)

  if (isAuthPage) {
    return <>{children}</>
  }

  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  )
}
