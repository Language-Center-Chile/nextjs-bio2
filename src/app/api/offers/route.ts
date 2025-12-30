import { NextRequest, NextResponse } from 'next/server'
import dbConnect from '@/lib/db'
import { getAuthUser } from '@/lib/auth-helper'
import { sendAdminNotification, sendAuthorNotification, isSmtpConfigured } from '@/lib/email'

interface UserToken {
  sub: string
  email?: string
}

interface AuthorUser {
  email?: string
}

export async function POST(request: NextRequest) {
  try {
    const supabase = await dbConnect()
    const token = await getAuthUser(request)
    let userId: string | undefined = undefined
    if (token && token.sub) {
      userId = token.sub
    }

    if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    // Feature flag: if OFFERS_ENFORCE_SMTP=true then require SMTP to be configured before allowing new offers
    if (process.env.OFFERS_ENFORCE_SMTP === 'true' && !isSmtpConfigured()) {
      return NextResponse.json({ error: 'SMTP not configured on server. Cannot publish offers.' }, { status: 500 })
    }

    const body = await request.json()
    const insertRes = await supabase
      .from('offers')
      .insert({ ...body, author: userId, isApproved: false })
      .select('*')
      .single()
    if (insertRes.error) {
      return NextResponse.json({ error: 'Datos inválidos', details: insertRes.error.message }, { status: 400 })
    }
    const offer = insertRes.data

    // notify admins to review
    const base = process.env.NEXTAUTH_URL || ''
    const secretParam = process.env.MODERATION_SECRET ? `&secret=${encodeURIComponent(process.env.MODERATION_SECRET)}` : ''
    const approveUrl = `${base}/api/moderation/approve?type=offer&id=${offer.id}${secretParam}`
    await sendAdminNotification({
      subject: `Nueva oferta por aprobar: ${offer.title}`,
      text: `Se creó una nueva oferta: ${offer.title}\nRevisar y aprobar: ${approveUrl}`
    })

    // optionally notify author: try token email, otherwise lookup user email from DB
    try {
      let authorEmail: string | undefined = undefined
      const userToken = token as unknown as UserToken
      if (userToken && userToken.email) authorEmail = userToken.email
      if (!authorEmail) {
        const authorUser = await supabase.from('users').select('email').eq('id', userId).single()
        const userData = authorUser.data as AuthorUser
        if (!authorUser.error && userData && userData.email) authorEmail = String(userData.email)
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