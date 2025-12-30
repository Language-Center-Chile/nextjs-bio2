import HeroConsultores from '@/components/HeroConsultores';
import PublicarOfertaSection from '@/components/PublicarOfertaSection';
import ConsultantGrid from '@/components/ConsultantGrid'
import OfferGrid from '@/components/OfferGrid'
import { supabase } from '@/lib/supabase'

interface Consultant {
  id: string
  name: string
  specialty: string
  bio: string
  avatar: string
  isActive: boolean
  created_at: string
}

interface Offer {
  id: string
  title: string
  description: string
  location: any
  salaryMin?: number
  salaryMax?: number
  modality: string
  employmentType: string
  contact: string
  tags: string[]
  isApproved: boolean
  created_at: string
  _id?: string
}

export default async function ConsultoresPage() {
  let consultores: Consultant[] = []
  let offers: Offer[] = []

  try {
    const { data: consData, error: consError } = await supabase
      .from('consultants')
      .select('id,name,specialty,bio,avatar,isActive,created_at')
      .eq('isActive', true)
      .order('created_at', { ascending: false })
    if (!consError && consData) {
      consultores = consData as unknown as Consultant[]
    }
    const showPending = process.env.OFFERS_SHOW_PENDING === 'true'
    const query = supabase
      .from('offers')
      .select('id,title,description,location,salaryMin,salaryMax,modality,employmentType,contact,tags,isApproved,created_at')
      .order('created_at', { ascending: false })
      .limit(12)
    const { data: offData, error: offError } = showPending
      ? await query
      : await query.eq('isApproved', true)
    if (!offError && offData) {
      offers = offData as unknown as Offer[]
    }
  } catch (err) {
    console.error('Error fetching consultants:', err)
  }

  const serialized = consultores.map((c) => ({
    id: c.id,
    name: c.name,
    specialty: c.specialty,
    bio: c.bio,
    image: c.avatar
  }))

  // serialize offers for rendering
  const serializedOffers = (typeof offers !== 'undefined' ? offers : []).map((o) => ({
    id: o.id || (o._id ? o._id : o.id),
    title: o.title,
    description: o.description,
    location: o.location || {},
    salaryMin: o.salaryMin,
    salaryMax: o.salaryMax,
    modality: o.modality,
    employmentType: o.employmentType,
    contact: o.contact,
    tags: o.tags || []
  }))

  return (
    <>
      <HeroConsultores />
      <ConsultantGrid items={serialized} />
      <OfferGrid items={serializedOffers} />
      
      <PublicarOfertaSection />
    </>
  );
}