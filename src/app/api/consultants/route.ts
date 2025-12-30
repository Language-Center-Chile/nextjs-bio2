import { NextRequest, NextResponse } from 'next/server'
import dbConnect from '@/lib/db'
import { getToken } from 'next-auth/jwt'
import { sendAdminNotification, sendAuthorNotification } from '@/lib/email'

export async function POST(request: NextRequest) {
  try {
    const supabase = await dbConnect()
    const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET })
    let userId: string | undefined = undefined
    if (token && token.sub) {
      userId = token.sub
    }

    if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const body = await request.json()
    const existingRes = await supabase.from('consultants').select('id').eq('user', userId).single()
    const existing = !existingRes.error ? existingRes.data : null
    const base = process.env.NEXTAUTH_URL || ''
    const secretParam = process.env.MODERATION_SECRET ? `&secret=${encodeURIComponent(process.env.MODERATION_SECRET)}` : ''

    if (existing) {
      const updateRes = await supabase.from('consultants').update({ ...body, isApproved: false }).eq('id', existing.id).select('*').single()
      if (updateRes.error) return NextResponse.json({ error: 'Datos inválidos', details: updateRes.error.message }, { status: 400 })
      await supabase.from('users').update({ role: 'consultant' }).eq('id', userId)

      const approveUrl = `${base}/api/moderation/approve?type=consultant&id=${existing.id}${secretParam}`
      await sendAdminNotification({ subject: `Perfil de consultor a revisar: ${userId}`, text: `Revisar: ${approveUrl}` })
      try {
        let authorEmail: string | undefined = undefined
        if (token && (token as any).email) authorEmail = (token as any).email
        if (!authorEmail) {
          const authorUser = await supabase.from('users').select('email').eq('id', userId).single()
          if (!authorUser.error && authorUser.data && (authorUser.data as any).email) authorEmail = String((authorUser.data as any).email)
        }
        if (authorEmail) await sendAuthorNotification({ to: authorEmail, subject: 'Tu perfil de consultor fue enviado para revisión', text: 'Tu perfil fue actualizado y está pendiente de aprobación.' })
      } catch (e) {
        console.error('[api/consultants] author notification error', e)
      }

      return NextResponse.json({ ok: true, consultant: updateRes.data })
    }

    const insertRes = await supabase.from('consultants').insert({ ...body, user: userId, isApproved: false }).select('*').single()
    if (insertRes.error) return NextResponse.json({ error: 'Datos inválidos', details: insertRes.error.message }, { status: 400 })
    const consultant = insertRes.data
    await supabase.from('users').update({ role: 'consultant' }).eq('id', userId)

    const approveUrl = `${base}/api/moderation/approve?type=consultant&id=${consultant.id}${secretParam}`
    await sendAdminNotification({ subject: `Nuevo perfil de consultor a revisar`, text: `Revisar: ${approveUrl}` })
    try {
      let authorEmail: string | undefined = undefined
      if (token && (token as any).email) authorEmail = (token as any).email
      if (!authorEmail) {
        const authorUser = await supabase.from('users').select('email').eq('id', userId).single()
        if (!authorUser.error && authorUser.data && (authorUser.data as any).email) authorEmail = String((authorUser.data as any).email)
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
