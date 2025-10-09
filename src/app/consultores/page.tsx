import HeroConsultores from '@/components/HeroConsultores';
import PublicarOfertaSection from '@/components/PublicarOfertaSection';
import dbConnect from '@/lib/mongodb'
import Consultant from '@/models/Consultant'
import Offer from '@/models/Offer'
import ConsultantGrid from '@/components/ConsultantGrid'
import OfferCard from '@/components/ui/OfferCard'
import OfferGrid from '@/components/OfferGrid'

export default async function ConsultoresPage() {
  let consultores: any[] = []
  let offers: any[] = []

  try {
    await dbConnect()
    consultores = await Consultant.find({ isActive: true }).sort({ createdAt: -1 }).lean()
  // fetch offers according to feature flag: when OFFERS_SHOW_PENDING=true include pending offers
  const offerFilter = process.env.OFFERS_SHOW_PENDING === 'true' ? {} : { isApproved: true }
  offers = await Offer.find(offerFilter).sort({ createdAt: -1 }).limit(12).lean()
  } catch (err) {
    console.error('Error fetching consultants:', err)
  }

  const serialized = consultores.map(c => ({
    id: c._id.toString(),
    name: c.name,
    specialty: c.specialty,
    bio: c.bio,
    image: c.avatar
  }))

  // serialize offers for rendering
  const serializedOffers = (typeof offers !== 'undefined' ? offers : []).map((o: any) => ({
    id: o._id && o._id.toString ? o._id.toString() : o._id,
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
