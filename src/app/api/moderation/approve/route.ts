import { NextRequest, NextResponse } from 'next/server'
import dbConnect from '@/lib/db'
import { sendAuthorNotification } from '@/lib/email'

interface AuthorUser {
  email?: string
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { type, id, secret } = body
    if (!process.env.MODERATION_SECRET || secret !== process.env.MODERATION_SECRET) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    if (!type || !id) return NextResponse.json({ error: 'Missing params' }, { status: 400 })

    const supabase = await dbConnect()

    if (!['product', 'offer', 'consultant'].includes(type)) {
      return NextResponse.json({ error: 'Unknown type' }, { status: 400 })
    }

    let authorId: string | null = null
    if (type === 'product') {
      const update = await supabase.from('products').update({ is_approved: true }).eq('id', id).select('seller_id').single()
      if (update.error) return NextResponse.json({ error: 'Server error' }, { status: 500 })
      authorId = update.data?.seller_id ? String(update.data.seller_id) : null
    } else if (type === 'offer') {
      const update = await supabase.from('offers').update({ isApproved: true }).eq('id', id).select('author').single()
      if (update.error) return NextResponse.json({ error: 'Server error' }, { status: 500 })
      authorId = update.data?.author ? String(update.data.author) : null
    } else if (type === 'consultant') {
      const update = await supabase.from('consultants').update({ isApproved: true, isActive: true }).eq('id', id).select('user').single()
      if (update.error) return NextResponse.json({ error: 'Server error' }, { status: 500 })
      authorId = update.data?.user ? String(update.data.user) : null
    }

    // notify author if possible
    let authorEmail: string | null = null
    if (authorId) {
      if (type === 'product' || type === 'offer' || type === 'consultant') {
        const user = await supabase.from('users').select('email').eq('id', String(authorId)).single()
        const userData = user.data as AuthorUser
        authorEmail = userData?.email || null
      }
    }

    if (authorEmail) {
      await sendAuthorNotification({ to: authorEmail, subject: 'Tu publicación ha sido aprobada', text: `Tu ${type} ha sido aprobada y ya es visible en la plataforma.` })
    }

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('[api/moderation/approve] error', err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}