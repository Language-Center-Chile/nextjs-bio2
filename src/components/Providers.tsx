'use client';

import { SessionProvider } from 'next-auth/react';
import { usePathname } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/ui/Footer';

export default function Providers({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const hideChrome =
    pathname?.startsWith('/login') || pathname?.startsWith('/register');

  return (
    <SessionProvider>
      {!hideChrome && <Navbar />}
      {children}
      {!hideChrome && <Footer />}
    </SessionProvider>
  );
}
