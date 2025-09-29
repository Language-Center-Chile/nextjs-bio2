import { NextRequest, NextResponse } from 'next/server'
import dbConnect from '@/lib/mongodb'
import Consultant from '@/models/Consultant'
import { getToken } from 'next-auth/jwt'
import User from '@/models/User'
import { sendAdminNotification, sendAuthorNotification } from '@/lib/email'

export async function POST(request: NextRequest) {
  try {
    await dbConnect()
    const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET })
    if (!token || !token.sub) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    // Upsert consultant profile by user
    const existing = await Consultant.findOne({ user: token.sub })
    const base = process.env.NEXTAUTH_URL || ''
    const secretParam = process.env.MODERATION_SECRET ? `&secret=${encodeURIComponent(process.env.MODERATION_SECRET)}` : ''

    if (existing) {
      Object.assign(existing, body, { isApproved: false })
      await existing.save()
      await User.findByIdAndUpdate(token.sub, { role: 'consultant' })

      const approveUrl = `${base}/api/moderation/approve?type=consultant&id=${existing._id}${secretParam}`
      await sendAdminNotification({ subject: `Perfil de consultor a revisar: ${token.sub}`, text: `Revisar: ${approveUrl}` })
      if ((token as any).email) await sendAuthorNotification({ to: (token as any).email, subject: 'Tu perfil de consultor fue enviado para revisión', text: 'Tu perfil fue actualizado y está pendiente de aprobación.' })

      return NextResponse.json({ ok: true, consultant: existing })
    }

    const consultant = new Consultant({ ...body, user: token.sub, isApproved: false })
    await consultant.save()
    await User.findByIdAndUpdate(token.sub, { role: 'consultant' })

    const approveUrl = `${base}/api/moderation/approve?type=consultant&id=${consultant._id}${secretParam}`
    await sendAdminNotification({ subject: `Nuevo perfil de consultor a revisar`, text: `Revisar: ${approveUrl}` })
    if ((token as any).email) await sendAuthorNotification({ to: (token as any).email, subject: 'Tu perfil fue enviado para revisión', text: 'Gracias, tu perfil de consultor está pendiente de aprobación.' })

    return NextResponse.json({ ok: true, consultant })
  } catch (err) {
    console.error('[api/consultants] error', err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
