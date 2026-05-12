import type { Metadata } from 'next'
import PrivacyPolicy from '@/components/legal/PrivacyPolicy'

export const metadata: Metadata = {
  title: 'Política de Privacidad | Bio2',
  description: 'Política de Privacidad de la plataforma Bio2 (Biodiversidad.cl).',
}

export default function LandingPrivacityPage() {
  return <PrivacyPolicy />
}
