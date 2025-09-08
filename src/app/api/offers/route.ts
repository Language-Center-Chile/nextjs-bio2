import { NextRequest, NextResponse } from 'next/server'
import dbConnect from '@/lib/mongodb'
import Offer from '@/models/Offer'
import { getToken } from 'next-auth/jwt'
import { sendAdminNotification, sendAuthorNotification } from '@/lib/email'

export async function POST(request: NextRequest) {
  try {
    await dbConnect()
    const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET })
    if (!token || !token.sub) {
      // fallback: try to read session-token cookie
      const cookie = request.headers.get('cookie') || ''
      const match = cookie.match(/next-auth.session-token=([^;]+)/)
      if (!match) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
      const sessionToken = match[1]
      // If you need a fallback to look up sessions collection, implement here
      return NextResponse.json({ error: 'Unauthorized - session fallback not implemented' }, { status: 401 })
    }

    const body = await request.json()
    const offer = new Offer({ ...body, author: token.sub, isApproved: false })
    await offer.save()

    // notify admins to review
    const base = process.env.NEXTAUTH_URL || ''
    const secretParam = process.env.MODERATION_SECRET ? `&secret=${encodeURIComponent(process.env.MODERATION_SECRET)}` : ''
    const approveUrl = `${base}/api/moderation/approve?type=offer&id=${offer._id}${secretParam}`
    await sendAdminNotification({
      subject: `Nueva oferta por aprobar: ${offer.title}`,
      text: `Se creó una nueva oferta: ${offer.title}\nRevisar y aprobar: ${approveUrl}`
    })

    // optionally notify author
    if ((token as any).email) {
      await sendAuthorNotification({ to: (token as any).email, subject: 'Tu oferta fue enviada para revisión' , text: `Gracias, tu oferta '${offer.title}' fue enviada y está pendiente de aprobación por un administrador.` })
    }

    return NextResponse.json({ ok: true, offer })
  } catch (err) {
    console.error('[api/offers] error', err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
