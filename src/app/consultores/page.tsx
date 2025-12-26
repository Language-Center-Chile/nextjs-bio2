import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import HeroConsultores from '@/components/HeroConsultores';
import PublicarOfertaSection from '@/components/PublicarOfertaSection';
import ConsultantGrid from '@/components/ConsultantGrid'

export default async function ConsultoresPage() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  const supabase = url && key ? createServerClient(url, key, {
    cookies: {
      async getAll() {
        return (await cookies()).getAll()
      },
      async setAll(cookiesToSet) {
        const store = await cookies()
        cookiesToSet.forEach(({ name, value, options }) => store.set(name, value, options))
      },
    },
  }) : null
  
  let consultores: any[] = []

  try {
    if (!supabase) throw new Error('Supabase no configurado')
    const { data, error } = await supabase
      .from('consultants')
      .select('*')
      .eq('isApproved', true)
      .order('created_at', { ascending: false })
    if (error) throw error
    consultores = data || []
  } catch (err) {
    console.error('Error fetching consultants:', err)
  }

  const serialized = consultores.map(c => ({
    id: String(c.id ?? c.user ?? Math.random()),
    name: c.name ?? 'Consultor',
    specialty: c.specialty ?? (Array.isArray(c.skills) ? c.skills.join(', ') : undefined),
    bio: c.bio ?? c.description ?? '',
    image: c.avatar ?? c.image ?? '/assets/featured/chakana.jpg',
  }))

  return (
    <>
      <HeroConsultores />
      <ConsultantGrid items={serialized} />
      <PublicarOfertaSection />
    </>
  );
}
