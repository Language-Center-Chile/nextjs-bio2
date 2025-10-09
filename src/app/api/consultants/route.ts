import { NextRequest, NextResponse } from 'next/server'
import dbConnect from '@/lib/mongodb'
import Consultant from '@/models/Consultant'
import { getToken } from 'next-auth/jwt'
import User from '@/models/User'
import { sendAdminNotification, sendAuthorNotification } from '@/lib/email'
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

    const body = await request.json()
    // Upsert consultant profile by user
  const existing = await Consultant.findOne({ user: userId })
    const base = process.env.NEXTAUTH_URL || ''
    const secretParam = process.env.MODERATION_SECRET ? `&secret=${encodeURIComponent(process.env.MODERATION_SECRET)}` : ''

    if (existing) {
  Object.assign(existing, body, { isApproved: false })
  await existing.save()
  await User.findByIdAndUpdate(userId, { role: 'consultant' })

      const approveUrl = `${base}/api/moderation/approve?type=consultant&id=${existing._id}${secretParam}`
      await sendAdminNotification({ subject: `Perfil de consultor a revisar: ${userId}`, text: `Revisar: ${approveUrl}` })
      try {
        let authorEmail: string | undefined = undefined
        if (token && (token as any).email) authorEmail = (token as any).email
        if (!authorEmail) {
          const authorUser = await User.findById(userId).lean()
          if (authorUser && (authorUser as any).email) authorEmail = String((authorUser as any).email)
        }
        if (authorEmail) await sendAuthorNotification({ to: authorEmail, subject: 'Tu perfil de consultor fue enviado para revisión', text: 'Tu perfil fue actualizado y está pendiente de aprobación.' })
      } catch (e) {
        console.error('[api/consultants] author notification error', e)
      }

      return NextResponse.json({ ok: true, consultant: existing })
    }

  const consultant = new Consultant({ ...body, user: userId, isApproved: false })
  await consultant.save()
  await User.findByIdAndUpdate(userId, { role: 'consultant' })

    const approveUrl = `${base}/api/moderation/approve?type=consultant&id=${consultant._id}${secretParam}`
    await sendAdminNotification({ subject: `Nuevo perfil de consultor a revisar`, text: `Revisar: ${approveUrl}` })
    try {
      let authorEmail: string | undefined = undefined
      if (token && (token as any).email) authorEmail = (token as any).email
      if (!authorEmail) {
        const authorUser = await User.findById(userId).lean()
        if (authorUser && (authorUser as any).email) authorEmail = String((authorUser as any).email)
      }
      if (authorEmail) await sendAuthorNotification({ to: authorEmail, subject: 'Tu perfil fue enviado para revisión', text: 'Gracias, tu perfil de consultor está pendiente de aprobación.' })
    } catch (e) {
      console.error('[api/consultants] author notification error', e)
    }

    return NextResponse.json({ ok: true, consultant })
  } catch (err) {
    console.error('[api/consultants] error', err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
