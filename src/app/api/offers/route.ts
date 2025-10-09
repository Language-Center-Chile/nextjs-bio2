import { NextRequest, NextResponse } from 'next/server'
import dbConnect from '@/lib/mongodb'
import Offer from '@/models/Offer'
import { getToken } from 'next-auth/jwt'
import { sendAdminNotification, sendAuthorNotification, isSmtpConfigured } from '@/lib/email'
import User from '@/models/User'
import { MongoClient } from 'mongodb'

export async function POST(request: NextRequest) {
  try {
    await dbConnect()
    const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET })
    let userId: string | undefined = undefined
    if (token && token.sub) {
      userId = token.sub
    } else {
      // Fallback: extract next-auth.session-token cookie and lookup sessions collection
      const cookieHeader = request.headers.get('cookie') || ''
      const match = cookieHeader.match(/(?:__Secure-)?next-auth.session-token=([^;\s]+)/) || cookieHeader.match(/next-auth.session-token=([^;\s]+)/)
      const sessionToken = match ? decodeURIComponent(match[1]) : null
      if (sessionToken && process.env.MONGODB_URI) {
        const client = new MongoClient(process.env.MONGODB_URI)
        await client.connect()
        try {
          const db = client.db()
          const sessionsCol = db.collection('sessions')
          const sess = await sessionsCol.findOne({ sessionToken })
          if (sess && (sess as any).userId) userId = String((sess as any).userId)
        } finally {
          await client.close()
        }
      }
    }

    if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    // Feature flag: if OFFERS_ENFORCE_SMTP=true then require SMTP to be configured before allowing new offers
    if (process.env.OFFERS_ENFORCE_SMTP === 'true' && !isSmtpConfigured()) {
      return NextResponse.json({ error: 'SMTP not configured on server. Cannot publish offers.' }, { status: 500 })
    }

    const body = await request.json()
    const offer = new Offer({ ...body, author: userId, isApproved: false })
    await offer.save()

    // notify admins to review
    const base = process.env.NEXTAUTH_URL || ''
    const secretParam = process.env.MODERATION_SECRET ? `&secret=${encodeURIComponent(process.env.MODERATION_SECRET)}` : ''
    const approveUrl = `${base}/api/moderation/approve?type=offer&id=${offer._id}${secretParam}`
    await sendAdminNotification({
      subject: `Nueva oferta por aprobar: ${offer.title}`,
      text: `Se creó una nueva oferta: ${offer.title}\nRevisar y aprobar: ${approveUrl}`
    })

    // optionally notify author: try token email, otherwise lookup user email from DB
    try {
      let authorEmail: string | undefined = undefined
      if (token && (token as any).email) authorEmail = (token as any).email
      if (!authorEmail) {
        // ensure DB connected (dbConnect called earlier) and lookup user
        const authorUser = await User.findById(userId).lean()
        if (authorUser && (authorUser as any).email) authorEmail = String((authorUser as any).email)
      }

      if (authorEmail) {
        await sendAuthorNotification({ to: authorEmail, subject: 'Tu oferta fue enviada para revisión', text: `Gracias, tu oferta '${offer.title}' fue enviada y está pendiente de aprobación por un administrador.` })
      }
    } catch (e) {
      console.error('[api/offers] author notification error', e)
    }

    return NextResponse.json({ ok: true, offer })
  } catch (err) {
    console.error('[api/offers] error', err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
