import type { Metadata } from 'next'
import TermsOfUse from '@/components/legal/TermsOfUse'

export const metadata: Metadata = {
  title: 'Términos de Uso | Bio2',
  description: 'Términos de Uso de la plataforma Bio2 (Biodiversidad.cl).',
}

export default function LandingTermsPage() {
  return <TermsOfUse />
}
