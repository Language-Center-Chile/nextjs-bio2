import HeroConsultores from '@/components/HeroConsultores';
import PublicarOfertaSection from '@/components/PublicarOfertaSection';
import dbConnect from '@/lib/mongodb'
import Consultant from '@/models/Consultant'
import ConsultantGrid from '@/components/ConsultantGrid'

export default async function ConsultoresPage() {
  let consultores: any[] = []

  try {
    await dbConnect()
    consultores = await Consultant.find({ isActive: true }).sort({ createdAt: -1 }).lean()
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

  return (
    <>
      <HeroConsultores />
      <ConsultantGrid items={serialized} />
      <PublicarOfertaSection />
    </>
  );
}
